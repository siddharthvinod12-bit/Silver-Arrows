# Silver Arrows — STEM Racing team website

Plain HTML, CSS and JavaScript. No build step. Served by GitHub Pages from the repo root.

## Files
- `index.html` — all page content
- `css/style.css` — styles. **All colours are CSS variables at the top of this file** (13 themes, OKLCH).
- `js/main.js` — mobile menu, gallery lightbox, contact form
- `images/` — placeholder SVGs. Replace with your own photos (see below)
- `docs/` — put the sponsorship prospectus PDF here

## Colour themes
Visitors pick a theme with the palette button in the top bar. The choice is saved in their browser.
Default: black, white and copper. Others: Sky & Hot Pink, Midnight Volt, Deep Blue & Pink, Mandarin & Forest,
Onyx & Indigo, Navy & Crimson, Sky & Amber, Red Orange & Punk, Sapphire & Jade, Teal & Magenta,
Linen & Psychedelic, Moonlight & Lemon. Every theme passes WCAG AA contrast (4.5:1) for text.

To change a theme, edit its `[data-theme="..."]` block in `css/style.css`.
To add one, copy a block, rename it, and add a matching `.swatch` button in `index.html`.

## Fill in placeholders
Every placeholder is in `[SQUARE BRACKETS]`. Search `index.html` for `[` to find them all.

## Images
- Team photos: square, about 320×320 px, JPG or WebP, under 60 KB each.
- Car gallery: 1200×800 px, JPG or WebP, under 150 KB each.
- Compress with https://squoosh.app before uploading.
- Update the `src` in `index.html` if you change file names.

## Contact form
1. Make a free form at https://formspree.io
2. Copy the form ID (e.g. `xyzabcd`).
3. In `index.html`, replace `[FORMSPREE FORM ID]` with it.

## Rules
Do not use "F1", "Formula 1" or "Formula One" anywhere in the site name, URL, title or handles. Do not use the official STEM Racing logo.
