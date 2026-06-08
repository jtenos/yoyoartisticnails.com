# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing website for YoYo Artistic Nails, a nail salon in Tempe, AZ. Plain HTML/CSS/vanilla JS with no build step, framework, or package manager. Deployed via GitHub Pages — the `CNAME` file binds the site to `yoyoartisticnails.com`, so pushes to `main` publish directly.

## Development

There is nothing to build, install, or test. Edit files and open them directly, or serve the directory so absolute paths and `fetch()` work:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

Use a server rather than `file://` — `scripts.js` fetches `/data/reviews.json`, which fails under `file://` due to CORS.

## Architecture

Three pages share an identical header/footer and link to the same `/styles.css`: `index.html` (home — hours, location, reviews), `services.html` (pricing), `contact.html`. There is no templating, so any change to the nav, footer, or `<head>` (e.g. the Font Awesome CDN `<link>`) must be made in all three HTML files by hand. The "active" nav link is marked with `aria-current="page"`.

Asset and page links are root-absolute (`/styles.css`, `/img/...`, `/services.html`) because the site is served from the domain root — keep that convention.

### Reviews

The home page review list is the only dynamic piece. `scripts.js` (`loadReviews`) fetches `/data/reviews.json` and renders each entry into the `#reviews` accordion (`<details>`/`<summary>`). To change displayed reviews, edit `data/reviews.json` — no code change needed. Each entry needs `name`, `rating`, `text`, and `url` (a Google Maps review link; an empty `url` simply omits the "Read full review" link).

## Conventions

- Styling is driven by CSS custom properties defined in `:root` in `styles.css` (the `--pink-*` palette, `--text`, `--bg`, etc.). Reuse these variables instead of hardcoding colors.
- All external links use `target="_blank" rel="noopener noreferrer"`.
- Booking links point to `https://book.yoyoartisticnails.com/`; reviews link to `https://google.yoyoartisticnails.com/` — these are the canonical destinations.
