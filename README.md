# EeZee Conceptz: homepage rebuild

A static homepage for **new.eezeeconceptz.org**. It uses the content and section order of the current site and the layout and design language of the Gelaf Framer template (gelaf.framer.website), recoloured to the EeZee logo.

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

## Palette

The colours match the EeZee logo: red, black and white. They are tokens at the top of `assets/css/styles.css`:

| Token | Value | Used for |
|---|---|---|
| `--brand` | `#0e0e0e` | Black blocks, primary buttons, footer |
| `--accent` | `#e10600` | Logo red: CTAs, stats, icons, gradients, hovers |
| `--accent-ink` | `#c40500` | Small red text on white (section labels, artiste links) |
| `--accent-soft` | `#fff4f3` | Cards on the red gradient |
| `--muted` | `#5e5e5e` | Secondary text |

The logo itself is pure `#FC0000`. White text on pure red only reaches about 4:1 contrast, which fails WCAG AA for button-sized text, so the UI uses `#E10600`. It looks the same next to the logo and passes AA (about 4.9:1). Red on black is used only for large text (the stats) or decoration. Small links in the footer turn white with a red underline on hover rather than red.

## Dark mode

- **Toggle:** the sun/moon button in the header (visible at every screen size). The icon morphs between sun and moon, and a red ring pulses out of the button on each click.
- **Switch animation:** in browsers with the View Transitions API (Chrome, Edge, Safari 18+), the new theme grows out of the toggle as a circle. Other browsers get a short colour cross-fade. Visitors with "reduce motion" turned on get an instant switch.
- **Default:** follows the visitor's device setting until they press the toggle. After that, their choice is saved in the browser (`localStorage`, key `ez-theme`) and restored on the next visit.
- **No flash:** a small script in `<head>` sets the theme before the page paints. Without JavaScript, the page still follows the device setting.
- **Colours:** dark values are in the `:root[data-theme="dark"]` block near the top of `assets/css/styles.css`. Small red text switches to a lighter red (`#ff5a50`) so it stays readable on black.

## Wiring up the forms

The contact and newsletter forms validate input and then open the visitor's email app, addressed to hello@eezeeconceptz.org. To send submissions to a backend (a Supabase table, an n8n or Make webhook, Formspree), replace the `window.location.href = 'mailto:...'` lines in `assets/js/main.js` with a `fetch()` POST.

## Links

On-page sections use anchors (`#about`, `#artistes`, `#releases`, `#services`, `#contact`). Inner pages use the existing site's routes (`/events`, `/announcements`, `/booking`, `/artists`, `/releases/<slug>`), so they work once the homepage is deployed on the same domain.
