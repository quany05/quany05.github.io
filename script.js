const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0.01,
  },
);

sections.forEach((section) => observer.observe(section));

const SVG_NS = "http://www.w3.org/2000/svg";
const visitedCities = [
  { name: "Champaign", lat: 40.1164, lon: -88.2434, country: "united-states", color: "red", note: "since Aug 2024 lived here" },
  { name: "Chicago", lat: 41.8781, lon: -87.6298, country: "united-states", color: "orange", note: "multiple times since 2024" },
  { name: "Evanston", lat: 42.0451, lon: -87.6877, country: "united-states", color: "orange", note: "multiple times since 2024" },
  { name: "Buffalo", lat: 42.8864, lon: -78.8784, country: "united-states", color: "blue", note: "July 2016" },
  { name: "Boston", lat: 42.3601, lon: -71.0589, country: "united-states", color: "blue", note: "July 2016" },
  { name: "New Haven", lat: 41.3083, lon: -72.9279, country: "united-states", color: "blue", note: "July 2016" },
  { name: "New York", lat: 40.7128, lon: -74.0060, country: "united-states", color: "blue", note: "July 2016" },
  { name: "Salt Lake City", lat: 40.7608, lon: -111.8910, country: "united-states", color: "blue", note: "July 2016" },
  { name: "Las Vegas", lat: 36.1716, lon: -115.1391, country: "united-states", color: "blue", note: "July 2016" },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437, country: "united-states", color: "orange", note: "Aug 2016, Mar 2026" },
  { name: "San Diego", lat: 32.7157, lon: -117.1611, country: "united-states", color: "orange", note: "Aug 2016, Mar 2026" },
  { name: "Yellowstone National Park", lat: 44.4280, lon: -110.5885, country: "united-states", color: "blue", note: "July 2016" },
  { name: "Grand Canyon National Park", lat: 36.0544, lon: -112.1401, country: "united-states", color: "blue", note: "July 2016" },
  { name: "Cincinnati", lat: 39.1031, lon: -84.5120, country: "united-states", color: "orange", note: "Jun 2025, Dec 2025" },
  { name: "Indianapolis", lat: 39.7684, lon: -86.1581, country: "united-states", color: "blue", note: "Dec 2025" },
  { name: "Gatlinburg", lat: 35.7143, lon: -83.5102, country: "united-states", color: "blue", note: "July 2025" },
  { name: "Nashville", lat: 36.1627, lon: -86.7816, country: "united-states", color: "blue", note: "July 2025" },
  { name: "Fresno", lat: 36.7378, lon: -119.7871, country: "united-states", color: "blue", note: "Nov 2025" },
  { name: "Great Smoky Mountains National Park", lat: 35.6118, lon: -83.4895, country: "united-states", color: "blue", note: "July 2025" },
  { name: "Yosemite National Park", lat: 37.8651, lon: -119.5383, country: "united-states", color: "blue", note: "Nov 2025" },
  { name: "Sequoia National Park", lat: 36.4864, lon: -118.5658, country: "united-states", color: "blue", note: "Nov 2025" },
  { name: "Toronto", lat: 43.6532, lon: -79.3832, country: "canada", color: "blue", note: "July 2017" },
  { name: "Kingston", lat: 44.2312, lon: -76.4860, country: "canada", color: "blue", note: "July 2017" },
  { name: "Calgary", lat: 51.0447, lon: -114.0719, country: "canada", color: "blue", note: "July 2017" },
  { name: "Edmonton", lat: 53.5461, lon: -113.4938, country: "canada", color: "blue", note: "July 2017" },
  { name: "Ottawa", lat: 45.4215, lon: -75.6972, country: "canada", color: "blue", note: "July 2017" },
  { name: "Vancouver", lat: 49.2827, lon: -123.1207, country: "canada", color: "blue", note: "Aug 2017" },
  { name: "Banff National Park", lat: 51.4968, lon: -115.9281, country: "canada", color: "blue", note: "July 2017" },
  { name: "Jasper National Park", lat: 52.8737, lon: -117.9543, country: "canada", color: "blue", note: "July 2017" },
  { name: "Yoho National Park", lat: 51.4993, lon: -116.4855, country: "canada", color: "blue", note: "July 2017" },
  { name: "Wuxi", lat: 31.4912, lon: 120.3119, country: "china", color: "red", note: "since Sept 2005 lived here" },
  { name: "Shanghai", lat: 31.2304, lon: 121.4737, country: "china", color: "orange", note: "multiple times since 2006" },
  { name: "Suzhou", lat: 31.2989, lon: 120.5853, country: "china", color: "orange", note: "multiple times since 2022" },
  { name: "Hangzhou", lat: 30.2741, lon: 120.1551, country: "china", color: "blue", note: "Aug 2012" },
  { name: "Wuhan", lat: 30.5928, lon: 114.3055, country: "china", color: "blue", note: "Jul 2009" },
  { name: "Changsha", lat: 28.2282, lon: 112.9388, country: "china", color: "blue", note: "Jul 2009" },
  { name: "Harbin", lat: 45.8038, lon: 126.5349, country: "china", color: "blue", note: "Jan 2013" },
  { name: "Sanya", lat: 18.2528, lon: 109.5119, country: "china", color: "blue", note: "Jul 2013" },
  { name: "Lijiang", lat: 26.8565, lon: 100.2279, country: "china", color: "blue", note: "Jul 2014" },
  { name: "Dali", lat: 25.6065, lon: 100.2676, country: "china", color: "blue", note: "Jul 2014" },
  { name: "Kunming", lat: 25.0389, lon: 102.7183, country: "china", color: "blue", note: "Jul 2014" },
  { name: "Guangzhou", lat: 23.1291, lon: 113.2644, country: "china", color: "blue", note: "Jan 2015" },
  { name: "Huangshan", lat: 29.7147, lon: 118.3375, country: "china", color: "blue", note: "Jan 2016" },
  { name: "Dunhuang", lat: 40.1421, lon: 94.6619, country: "china", color: "blue", note: "Jul 2015" },
  { name: "Xining", lat: 36.6171, lon: 101.7781, country: "china", color: "blue", note: "Jul 2015" },
  { name: "Zhangye", lat: 38.9259, lon: 100.4498, country: "china", color: "blue", note: "Jul 2015" },
  { name: "Xi'an", lat: 34.3416, lon: 108.9398, country: "china", color: "blue", note: "Aug 2015" },
  { name: "Xiamen", lat: 24.4798, lon: 118.0894, country: "china", color: "blue", note: "Jan 2017" },
  { name: "Beijing", lat: 39.9042, lon: 116.4074, country: "china", color: "blue", note: "Jul 2010" },
  { name: "Shijiazhuang", lat: 38.0428, lon: 114.5149, country: "china", color: "blue", note: "Jul 2010" },
  { name: "Changzhou", lat: 31.8107, lon: 119.9741, country: "china", color: "blue", note: "Apr 2019" },
  { name: "Nanjing", lat: 32.0603, lon: 118.7969, country: "china", color: "blue", note: "Jun 2018" },
  { name: "Shunde", lat: 22.8058, lon: 113.2939, country: "china", color: "blue", note: "Aug 2024" },
  { name: "Chaozhou", lat: 23.6567, lon: 116.6226, country: "china", color: "blue", note: "Aug 2024" },
  { name: "Shantou", lat: 23.3541, lon: 116.6819, country: "china", color: "blue", note: "Aug 2024" },
  { name: "Guilin", lat: 25.2736, lon: 110.2900, country: "china", color: "blue", note: "Aug 2023" },
  { name: "Hong Kong", lat: 22.3193, lon: 114.1694, country: "china", color: "orange", note: "multiple times since 2023" },
  { name: "Macau", lat: 22.1987, lon: 113.5439, country: "china", color: "orange", note: "Dec 2022, Jun 2023" },
  { name: "Heidelberg", lat: 49.3988, lon: 8.6724, country: "germany", color: "blue", note: "July 2019" },
  { name: "Frankfurt", lat: 50.1109, lon: 8.6821, country: "germany", color: "blue", note: "July 2019" },
  { name: "Stuttgart", lat: 48.7758, lon: 9.1829, country: "germany", color: "blue", note: "July 2019" },
  { name: "Munich", lat: 48.1351, lon: 11.5820, country: "germany", color: "blue", note: "July 2019" },
  { name: "Nice", lat: 43.7102, lon: 7.2620, country: "france", color: "blue", note: "July 2019" },
  { name: "Paris", lat: 48.8566, lon: 2.3522, country: "france", color: "blue", note: "July 2019" },
  { name: "Provence", lat: 43.9493, lon: 4.8055, country: "france", color: "blue", note: "July 2019" },
  { name: "Monaco", lat: 43.7384, lon: 7.4246, country: "monaco", color: "blue", note: "July 2019" },
  { name: "Venice", lat: 45.4408, lon: 12.3155, country: "italy", color: "blue", note: "July 2019" },
  { name: "Florence", lat: 43.7696, lon: 11.2558, country: "italy", color: "blue", note: "July 2019" },
  { name: "Rome", lat: 41.9028, lon: 12.4964, country: "italy", color: "blue", note: "July 2019" },
];

const worldMapWidth = 1000;
const worldMapHeight = 500;
const projectWorldCity = ({ lat, lon }) => ({
  x: ((lon + 180) / 360) * worldMapWidth,
  y: ((90 - lat) / 180) * worldMapHeight,
});
const cropWorldMap = (bounds) => {
  const topLeft = projectWorldCity({ lat: bounds.north, lon: bounds.west });
  const bottomRight = projectWorldCity({ lat: bounds.south, lon: bounds.east });
  const width = bottomRight.x - topLeft.x;
  const height = bottomRight.y - topLeft.y;
  const scale = 100 / width;

  return {
    imageHeight: worldMapHeight * scale,
    imageWidth: 100 * scale,
    imageX: -topLeft.x * scale,
    imageY: -topLeft.y * scale,
    mapHeight: height * scale,
    project: (city) => {
      const point = projectWorldCity(city);
      return {
        x: (point.x - topLeft.x) * scale,
        y: (point.y - topLeft.y) * scale,
      };
    },
  };
};

const geoCountryBounds = {
  canada: { north: 72.0, south: 41.0, west: -141.5, east: -52.0 },
  germany: { north: 55.2, south: 47.0, west: 5.4, east: 15.6 },
  france: { north: 51.5, south: 41.0, west: -5.5, east: 9.8 },
  monaco: { north: 44.25, south: 43.30, west: 6.75, east: 8.15 },
  italy: { north: 47.6, south: 36.3, west: 6.0, east: 19.0 },
};

const geoCountryMaps = Object.fromEntries(
  Object.entries(geoCountryBounds).map(([country, bounds]) => [country, cropWorldMap(bounds)]),
);

const projectCity = {
  world: projectWorldCity,
  china: ({ lat, lon }) => ({ x: ((lon - 70) / 70) * 100, y: ((55 - lat) / 40) * 68.75 }),
  "united-states": ({ lat, lon }) => ({ x: ((lon + 125.5) / 59) * 100, y: ((49.8 - lat) / 25.6) * 52.1 }),
  canada: geoCountryMaps.canada.project,
  germany: geoCountryMaps.germany.project,
  france: geoCountryMaps.france.project,
  monaco: geoCountryMaps.monaco.project,
  italy: geoCountryMaps.italy.project,
};

const countryModalId = {
  china: "china-map-modal",
  "united-states": "united-states-map-modal",
  canada: "canada-map-modal",
  germany: "germany-map-modal",
  france: "france-map-modal",
  monaco: "monaco-map-modal",
  italy: "italy-map-modal",
};

const countryName = {
  china: "China",
  "united-states": "United States",
  canada: "Canada",
  germany: "Germany",
  france: "France",
  monaco: "Monaco",
  italy: "Italy",
};

const cityColorPriority = {
  blue: 0,
  orange: 1,
  red: 2,
};

const createSvgElement = (tagName) => document.createElementNS(SVG_NS, tagName);

const sortCityLayer = (layer) => {
  [...layer.querySelectorAll(".city")]
    .sort((a, b) => Number(a.dataset.colorPriority) - Number(b.dataset.colorPriority))
    .forEach((marker) => layer.append(marker));
};

const clearCityLabels = (layer) => {
  layer.querySelectorAll(".country-city.is-hovered").forEach((marker) => {
    marker.classList.remove("is-hovered");
  });
  sortCityLayer(layer);
};

const cityLabelLines = (name) => {
  const maxLength = 22;
  const words = name.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length > maxLength && currentLine && lines.length < 1) {
      lines.push(currentLine);
      currentLine = word;
      return;
    }
    currentLine = nextLine;
  });

  if (currentLine) lines.push(currentLine);
  return lines.length > 2 ? [lines[0], lines.slice(1).join(" ")] : lines;
};

const appendCityMarker = (layer, city, point, isWorldLayer) => {
  const marker = createSvgElement("g");
  marker.classList.add("city", `city-${city.color}`);
  marker.classList.toggle("world-city", isWorldLayer);
  marker.setAttribute("transform", `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
  marker.dataset.colorPriority = String(cityColorPriority[city.color]);

  if (isWorldLayer) {
    marker.setAttribute("role", "button");
    marker.setAttribute("tabindex", "0");
    marker.setAttribute("aria-label", `Open ${countryName[city.country]} map for ${city.name}`);
    marker.setAttribute("aria-controls", countryModalId[city.country]);
    marker.dataset.modalTarget = countryModalId[city.country];
  } else {
    marker.classList.add("country-city");
    marker.setAttribute("tabindex", "0");
    marker.setAttribute("aria-label", `${city.name}: ${city.note}`);
  }

  if (isWorldLayer) {
    const title = createSvgElement("title");
    title.textContent = `${city.name} - ${city.note}`;
    marker.append(title);
  }

  const hitArea = createSvgElement("circle");
  hitArea.classList.add("city-hit");
  hitArea.setAttribute("r", isWorldLayer ? "8" : "1.5");
  marker.append(hitArea);

  const circle = createSvgElement("circle");
  circle.setAttribute("r", isWorldLayer ? "3.8" : "0.9");
  marker.append(circle);

  if (!isWorldLayer) {
    const labelOnLeft = point.x > 82;
    const labelX = labelOnLeft ? "-1.25" : "1.25";
    const label = createSvgElement("text");
    label.classList.add("city-label");
    label.setAttribute("x", labelX);
    label.setAttribute("y", "-1.1");
    label.setAttribute("text-anchor", labelOnLeft ? "end" : "start");

    cityLabelLines(city.name).forEach((line, index) => {
      const cityLine = createSvgElement("tspan");
      cityLine.setAttribute("x", labelX);
      cityLine.setAttribute("dy", index === 0 ? "0" : "1.55");
      cityLine.textContent = line;
      label.append(cityLine);
    });

    const noteLine = createSvgElement("tspan");
    noteLine.setAttribute("x", labelX);
    noteLine.setAttribute("dy", "1.55");
    noteLine.textContent = city.note;
    label.append(noteLine);

    marker.append(label);

    const showLabel = () => {
      clearCityLabels(layer);
      marker.classList.add("is-hovered");
      layer.append(marker);
    };
    const hideLabel = () => {
      marker.classList.remove("is-hovered");
      sortCityLayer(layer);
    };

    marker.addEventListener("pointerenter", showLabel);
    marker.addEventListener("pointerleave", hideLabel);
    marker.addEventListener("blur", hideLabel);
  }

  layer.append(marker);
};

document.querySelectorAll("[data-geo-map]").forEach((map) => {
  const country = map.dataset.geoMap;
  const settings = geoCountryMaps[country];
  if (!settings) return;

  const overlay = map.parentElement?.querySelector(`[data-city-layer="${country}"]`);
  const viewBox = `0 0 100 ${settings.mapHeight.toFixed(2)}`;

  map.setAttribute("viewBox", viewBox);
  overlay?.setAttribute("viewBox", viewBox);

  const image = map.querySelector("image");
  image?.setAttribute("x", settings.imageX.toFixed(2));
  image?.setAttribute("y", settings.imageY.toFixed(2));
  image?.setAttribute("width", settings.imageWidth.toFixed(2));
  image?.setAttribute("height", settings.imageHeight.toFixed(2));
});

document.querySelectorAll("[data-city-layer]").forEach((layer) => {
  const layerName = layer.dataset.cityLayer;
  const projector = projectCity[layerName];
  if (!projector) return;

  visitedCities
    .filter((city) => layerName === "world" || city.country === layerName)
    .sort((a, b) => cityColorPriority[a.color] - cityColorPriority[b.color])
    .forEach((city) => appendCityMarker(layer, city, projector(city), layerName === "world"));

  if (layerName !== "world") {
    layer.addEventListener("pointerleave", () => clearCityLabels(layer));
    layer.addEventListener("pointermove", (event) => {
      if (event.target instanceof Element && event.target.closest(".country-city")) return;
      clearCityLabels(layer);
    });
  }
});

const modals = [...document.querySelectorAll(".modal-backdrop")];
let activeModalTrigger = null;

const openModal = (modal, trigger) => {
  if (!modal) return;

  activeModalTrigger = trigger;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close")?.focus();
};

const closeModal = (modal) => {
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  activeModalTrigger?.focus();
};

const modalTriggerFor = (target) => {
  if (!(target instanceof Element)) return null;
  if (target.closest("a[href]")) return null;
  return target.closest("[data-modal-target]");
};

document.addEventListener("click", (event) => {
  const trigger = modalTriggerFor(event.target);
  if (!trigger) return;

  const modal = document.querySelector(`#${trigger.dataset.modalTarget}`);
  openModal(modal, trigger);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;

  const trigger = modalTriggerFor(event.target);
  if (!trigger) return;

  event.preventDefault();
  const modal = document.querySelector(`#${trigger.dataset.modalTarget}`);
  openModal(modal, trigger);
});

modals.forEach((modal) => {
  modal.querySelector(".modal-close")?.addEventListener("click", () => closeModal(modal));
  modal.addEventListener("click", (event) => {
    if (event.target !== modal) return;
    closeModal(modal);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  const openModalElement = modals.find((modal) => modal.classList.contains("open"));
  closeModal(openModalElement);
});
