# Nektar Natura — redesign

Static site, no build step. GSAP + ScrollTrigger and Lenis load from CDNs, so an internet connection is needed.

**Quickest way to view:** unzip and double-click `index.html`. Add `?lang=en` or `?lang=de` to the address for English or German, or use the SL / EN / DE switch in the header.

Or serve it locally:

```bash
python3 -m http.server 5288
```

Then open http://localhost:5288.

- `index.html`: all sections (hero, pillars, systems, drinks, stats, venues, testimonials, sustainability, news, inquiry)
- `styles.css`: design tokens live at the top in `:root`
- `app.js`: product data (`SYSTEMS`, `DRINKS`), the inquiry basket (localStorage), the form and all animation
- `i18n.js`: English and German translations, plus product, drink and interface text for all three languages
- `assets/`: brand imagery generated with Higgsfield

## Languages (SL / EN / DE)
Slovenian is the source text in `index.html`. Any element with `data-i18n="key"` is swapped for `PAGE.en[key]` / `PAGE.de[key]`
in `i18n.js`. Attributes use `data-i18n-attr="aria-label:key"`, and links to the live site use `data-i18n-href`.
The language comes from `?lang=sl|en|de`, then the visitor's saved choice, then the browser language (falling back to SL).
Switching language updates the page instantly, without a reload.
When adding text, put the SL copy in the HTML with a new key and add that key to both `en` and `de`.

## Inquiry form
Set `data-endpoint="https://…"` on `<form class="js-form">` and the form will POST JSON
`{name, company, email, phone, venue, guests, message, items[]}` to it.
With no endpoint set, it validates the form, shows the thank-you state and offers a pre-filled email to hello@nektarnatura.com.
