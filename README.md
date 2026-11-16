# EeZee Conceptz: homepage rebuild

A static homepage for **new.eezeeconceptz.org**. It uses the content and section order of the current site and the design language of the Gelaf Framer template (gelaf.framer.website).

See **[CRITIQUE.md](CRITIQUE.md)** for the review of the current site.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Structure

```
index.html            all homepage content (static, crawlable)
assets/css/styles.css design tokens + components
assets/js/main.js     letter-roll buttons, mobile menu, scroll reveal, counters, opt-in music, form hand-off
assets/img/           WebP images resized to display size (~1.1 MB total)
assets/fonts/         Satoshi 300/400/500 (Fontshare free licence); Inter comes from Google Fonts
```

## Changing the palette

The colours are tokens at the top of `assets/css/styles.css`. The defaults follow Gelaf (deep green `#1c403d`, lime `#e4ee4f`). To match EeZee's red, black and white logo instead, change these:

```css
--brand: #141414;
--brand-deep: #0b0b0b;
--accent: #e2231a;
--accent-soft: #fdf2f1;
--muted: #5c5c5c;
```

## Wiring up the forms

The contact and newsletter forms validate input and then open the visitor's email app, addressed to hello@eezeeconceptz.org. To send submissions to a backend (a Supabase table, an n8n or Make webhook, Formspree), replace the `window.location.href = 'mailto:...'` lines in `assets/js/main.js` with a `fetch()` POST.

## Links

On-page sections use anchors (`#about`, `#artistes`, `#releases`, `#services`, `#contact`). Inner pages use the existing site's routes (`/events`, `/announcements`, `/booking`, `/artists`, `/releases/<slug>`), so they work once the homepage is deployed on the same domain.
