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

## Mobile hero

On screens up to 820px wide the hero is redesigned rather than just shrunk:

- **Layout:** it fits one screen. The turntable photo fills the top, and the tag, headline and two equal-width buttons sit at the bottom over a dark fade.
- **One message:** the giant "Gospel Music" word and the tag's pill are hidden on phones, so the headline is the only message.
- **"Now playing" bar:** the music player moves to the bottom of the hero as a bar (see Music player below).

## Music player

The hero has a 9-track player: a "now playing" pill at the top right on desktop, and a bar at the bottom of the hero on phones.

- **Display:** shows the cover, title, artist, status ("Now playing", "Paused", "30s preview") and position (e.g. 2/9). On desktop the cover spins like a record while playing.
- **Controls:**
  - Play/pause has a ring that fills with progress.
  - Previous restarts the current track if more than 3 seconds have played, and otherwise goes back a track.
  - Next skips ahead. Tracks also advance on their own and wrap round at the end.
  - On phones narrower than 480px, previous is hidden to make room.
- **Lock screen:** works with lock-screen and headphone controls (Media Session API).
- **Loading:** never autoplays, and nothing downloads until play is pressed. A track that fails to load is skipped.

**Editing tracks:** the list is the `<script type="application/json" id="playlist">` block inside the hero in `index.html`. Each track has `title`, `artist`, `cover`, `src`, `kind` (`full` or `preview`) and `link`.

| Track | Audio |
|---|---|
| Done It Again (De Samist) | Full song, hosted on new.eezeeconceptz.org |
| The other 8 homepage releases | Apple Music 30-second previews |

The previews come from Apple's public iTunes Search API. Apple's terms require them to be streamed from Apple, not downloaded and re-hosted, with a link to the track on Apple Music. Both are already in place. To play full songs instead, upload the MP3s and change each track's `src` and `kind` to `"full"`.

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
