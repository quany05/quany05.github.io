const fs = require("fs");
const path = require("path");

const width = 1000;
const height = 500;
const sourcePath = path.join(__dirname, "../assets/ne_110m_admin_0_countries.geojson");
const countryMapSourcePath = path.join(__dirname, "../assets/ne_50m_admin_0_countries.geojson");
const admin1LineSourcePath = path.join(__dirname, "../assets/ne_10m_admin_1_states_provinces_lines.geojson");
const admin1PolygonSourcePath = path.join(__dirname, "../assets/ne_10m_admin_1_states_provinces.geojson");
const outputPath = path.join(__dirname, "../assets/world-natural-earth.svg");

const geojson = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const countryGeojson = JSON.parse(fs.readFileSync(countryMapSourcePath, "utf8"));
const admin1LineGeojson = JSON.parse(fs.readFileSync(admin1LineSourcePath, "utf8"));
const admin1PolygonGeojson = JSON.parse(fs.readFileSync(admin1PolygonSourcePath, "utf8"));

const project = ([lon, lat]) => [
  ((lon + 180) / 360) * width,
  ((90 - lat) / 180) * height,
];

const ringToPath = (ring, projector = project) => {
  if (!ring.length) return "";
  const [first, ...rest] = ring;
  const [startX, startY] = projector(first);
  const commands = [`M${startX.toFixed(2)} ${startY.toFixed(2)}`];

  rest.forEach((point) => {
    const [x, y] = projector(point);
    commands.push(`L${x.toFixed(2)} ${y.toFixed(2)}`);
  });

  commands.push("Z");
  return commands.join(" ");
};

const lineToPath = (line, projector = project) => {
  if (!line.length) return "";
  const [first, ...rest] = line;
  const [startX, startY] = projector(first);
  const commands = [`M${startX.toFixed(2)} ${startY.toFixed(2)}`];

  rest.forEach((point) => {
    const [x, y] = projector(point);
    commands.push(`L${x.toFixed(2)} ${y.toFixed(2)}`);
  });

  return commands.join(" ");
};

const geometryToPath = (geometry, projector = project) => {
  if (geometry.type === "Polygon") {
    return geometry.coordinates.map((ring) => ringToPath(ring, projector)).join(" ");
  }

  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates
      .flatMap((polygon) => polygon.map((ring) => ringToPath(ring, projector)))
      .join(" ");
  }

  return "";
};

const lineGeometryToPath = (geometry, projector = project) => {
  if (geometry.type === "LineString") {
    return lineToPath(geometry.coordinates, projector);
  }

  if (geometry.type === "MultiLineString") {
    return geometry.coordinates.map((line) => lineToPath(line, projector)).join(" ");
  }

  return "";
};

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const featureName = (feature) => feature.properties?.NAME_LONG || feature.properties?.NAME || "Country";

const isTargetFeature = (feature, definition) => {
  const properties = feature.properties || {};
  const names = [
    featureName(feature),
    properties.ADMIN,
    properties.SOVEREIGNT,
    properties.NAME,
    properties.NAME_LONG,
    properties.GEOUNIT,
  ]
    .map(normalizeName)
    .filter(Boolean);

  return names.includes(normalizeName(definition.target));
};

const countryPaths = geojson.features
  .map((feature) => {
    const d = geometryToPath(feature.geometry);
    const name = featureName(feature);
    return `    <path d="${d}" data-name="${escapeAttr(name)}"/>`;
  })
  .join("\n");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="World map">
  <rect width="${width}" height="${height}" fill="#2f80b3"/>
  <g fill="#ffffff" fill-rule="evenodd" stroke="#7fb5d2" stroke-width="0.55" stroke-linejoin="round">
${countryPaths}
  </g>
</svg>
`;

fs.writeFileSync(outputPath, svg);

const collectCoordinates = (coordinates, points = []) => {
  if (!Array.isArray(coordinates)) return points;

  if (typeof coordinates[0] === "number") {
    points.push(coordinates);
    return points;
  }

  coordinates.forEach((item) => collectCoordinates(item, points));
  return points;
};

const geometryBounds = (geometry) => {
  const points = collectCoordinates(geometry.coordinates);

  return points.reduce(
    (bounds, [lon, lat]) => ({
      west: Math.min(bounds.west, lon),
      east: Math.max(bounds.east, lon),
      south: Math.min(bounds.south, lat),
      north: Math.max(bounds.north, lat),
    }),
    { west: Infinity, east: -Infinity, south: Infinity, north: -Infinity },
  );
};

const boundsIntersect = (a, b) =>
  a.west <= b.east && a.east >= b.west && a.south <= b.north && a.north >= b.south;

const cropProjection = (bounds, fixedMapHeight = null) => {
  const [topLeftX, topLeftY] = project([bounds.west, bounds.north]);
  const [bottomRightX, bottomRightY] = project([bounds.east, bounds.south]);
  const cropWidth = bottomRightX - topLeftX;
  const cropHeight = bottomRightY - topLeftY;
  const xScale = 100 / cropWidth;
  const mapHeight = fixedMapHeight ?? cropHeight * xScale;
  const yScale = mapHeight / cropHeight;

  return {
    mapHeight,
    project: (point) => {
      const [x, y] = project(point);
      return [(x - topLeftX) * xScale, (y - topLeftY) * yScale];
    },
  };
};

const countryMapDefinitions = {
  china: {
    title: "China",
    target: "China",
    file: "china-location-map.svg",
    bounds: { north: 55.0, south: 15.0, west: 70.0, east: 140.0 },
    mapHeight: 68.75,
    boundaryLevel: "all",
  },
  "united-states": {
    title: "United States",
    target: "United States of America",
    file: "usa-location-map.svg",
    bounds: { north: 49.8, south: 24.2, west: -125.5, east: -66.5 },
    mapHeight: 52.1,
    boundaryLevel: "all",
  },
  canada: {
    title: "Canada",
    target: "Canada",
    file: "canada-location-map.svg",
    bounds: { north: 72.0, south: 41.0, west: -141.5, east: -52.0 },
    boundaryLevel: "all",
  },
  germany: {
    title: "Germany",
    target: "Germany",
    file: "germany-location-map.svg",
    bounds: { north: 55.2, south: 47.0, west: 5.4, east: 15.6 },
    boundaryLevel: "all",
  },
  france: {
    title: "France",
    target: "France",
    file: "france-location-map.svg",
    bounds: { north: 51.5, south: 41.0, west: -5.5, east: 9.8 },
    boundaryLevel: "region",
  },
  monaco: {
    title: "Monaco",
    target: "Monaco",
    file: "monaco-location-map.svg",
    bounds: { north: 44.25, south: 43.30, west: 6.75, east: 8.15 },
    boundaryLevel: "none",
  },
  italy: {
    title: "Italy",
    target: "Italy",
    file: "italy-location-map.svg",
    bounds: { north: 47.6, south: 36.3, west: 6.0, east: 19.0 },
    boundaryLevel: "region",
  },
};

const normalizeName = (value) => String(value || "").trim().replace(/\s+/g, " ");

const regionLookupForCountry = (country) => {
  const lookup = new Map();

  admin1PolygonGeojson.features
    .filter((feature) => feature.properties?.admin === country)
    .forEach((feature) => {
      const properties = feature.properties;
      const region = normalizeName(properties.region || properties.name);
      const names = [
        properties.name,
        properties.name_en,
        properties.name_fr,
        properties.name_it,
        properties.name_de,
        ...(properties.name_alt ? String(properties.name_alt).split("|") : []),
      ];

      names.map(normalizeName).filter(Boolean).forEach((name) => lookup.set(name, region));
    });

  return lookup;
};

const adminBoundaryPaths = (definition, crop) => {
  if (definition.boundaryLevel === "none") return "";

  const regionLookup =
    definition.boundaryLevel === "region" ? regionLookupForCountry(definition.target) : null;
  const seen = new Set();

  return admin1LineGeojson.features
    .filter((feature) => feature.properties?.ADM0_NAME === definition.target)
    .filter((feature) => boundsIntersect(definition.bounds, geometryBounds(feature.geometry)))
    .filter((feature) => {
      if (definition.boundaryLevel !== "region") return true;

      const leftRegion = regionLookup.get(normalizeName(feature.properties.NAME_L));
      const rightRegion = regionLookup.get(normalizeName(feature.properties.NAME_R));
      return Boolean(leftRegion && rightRegion && leftRegion !== rightRegion);
    })
    .map((feature) => lineGeometryToPath(feature.geometry, crop.project))
    .filter((d) => {
      if (!d || seen.has(d)) return false;
      seen.add(d);
      return true;
    })
    .map((d) => `    <path class="admin1-boundary" d="${d}"/>`)
    .join("\n");
};

Object.values(countryMapDefinitions).forEach((definition) => {
  const crop = cropProjection(definition.bounds, definition.mapHeight);
  const visibleFeatures = countryGeojson.features
    .filter((feature) => boundsIntersect(definition.bounds, geometryBounds(feature.geometry)))
    .sort((a, b) => {
      const aTarget = isTargetFeature(a, definition) ? 1 : 0;
      const bTarget = isTargetFeature(b, definition) ? 1 : 0;
      return aTarget - bTarget;
    });

  const paths = visibleFeatures
    .map((feature) => {
      const name = featureName(feature);
      const className = isTargetFeature(feature, definition) ? "target-country" : "neighbor-country";
      return `    <path class="${className}" d="${geometryToPath(feature.geometry, crop.project)}" data-name="${escapeAttr(name)}"/>`;
    })
    .join("\n");

  const admin1Paths = adminBoundaryPaths(definition, crop);

  const mapSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 ${crop.mapHeight.toFixed(2)}" role="img" aria-label="${definition.title} map">
  <rect width="100" height="${crop.mapHeight.toFixed(2)}" fill="#c6ecff"/>
  <style>
    .neighbor-country { fill: #dedede; stroke: #707070; stroke-width: 0.12; stroke-linejoin: round; }
    .target-country { fill: #ffffee; stroke: #666666; stroke-width: 0.24; stroke-linejoin: round; }
    .admin1-boundary { fill: none; stroke: #777777; stroke-width: 0.10; stroke-linecap: round; stroke-linejoin: round; }
  </style>
${paths}
${admin1Paths}
</svg>
`;

  fs.writeFileSync(path.join(__dirname, "../assets", definition.file), mapSvg);
});
