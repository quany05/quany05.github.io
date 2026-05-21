# Quan (Ethan) Yuan's Homepage

A static personal website for Quan (Ethan) Yuan, built for GitHub Pages. The site presents an academic and engineering profile with an introduction, research interests, experience, selected projects, news, a CV page, and a More About Me page with sports, travel, and an interactive visited-cities map.

Live site:

```text
https://quany05.github.io/
```

## Pages

- `index.html` - main homepage with intro, research, experience, projects, news, and contact links.
- `cv.html` - web version of the CV, with education, experience, projects, skills, and honors.
- `more-about-me.html` - personal interests, sports, travelling photos, and the interactive map.

## Project Structure

```text
quanyuan_personal_website/
├── index.html
├── cv.html
├── more-about-me.html
├── styles.css
├── script.js
├── assets/
│   ├── quan-yuan-photo.jpg
│   ├── quan-yuan-cv.pdf
│   ├── project and travel images
│   └── map assets
└── scripts/
    └── helper scripts for generated assets
```

The root-level HTML files are intentional. GitHub Pages can serve this site directly from the repository root without any build step.

## Run Locally

From this folder:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy To GitHub Pages

Create a public GitHub repository named:

```text
quany05.github.io
```

Then push this folder to the repository:

```sh
git init
git add .
git commit -m "Publish personal homepage"
git branch -M main
git remote add origin https://github.com/quany05/quany05.github.io.git
git push -u origin main
```

In GitHub, go to `Settings > Pages`, then choose:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/root`

The site will be available at `https://quany05.github.io/` after GitHub Pages finishes deploying.

## Update Content

- Edit `index.html` for homepage content, project cards, and news.
- Edit `cv.html` for the web CV.
- Edit `more-about-me.html` for sports, travelling, and map entries.
- Edit `styles.css` for layout and visual design.
- Edit `script.js` for modal behavior and interactive map logic.
- Replace files in `assets/` when updating photos, project images, maps, or the PDF CV.

## Notes

This site is intentionally dependency-free: plain HTML, CSS, and JavaScript. That keeps it simple to preview locally and easy to publish on GitHub Pages.
