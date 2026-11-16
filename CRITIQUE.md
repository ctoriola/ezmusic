# Critique: new.eezeeconceptz.org (homepage)

Reviewed 16 Nov 2026 with a headless browser at 1440px (desktop) and 390px (mobile).

## What works

1. **Clear positioning.** The hero says what the company is straight away: "Gospel Music Label & Artiste Development", followed by the mission.
2. **Real content.** There are 4 artiste bios, 8 dated releases with cover art, 6 YouTube videos and 6 services, each with concrete deliverables. Plenty of templates never get this far.
3. **Logical order.** About → Artistes → Releases → Videos → Services → CTA → Contact moves a visitor from "who are you" to "how do I work with you".
4. **Contact basics are done right.** The tel:, mailto: and Google Maps links work, business hours are listed, and the subject dropdown includes "Demo Submission", the main thing an artiste would come for.
5. **Accessibility baseline.** There is one H1, a sensible H2/H3 hierarchy, and none of the 22 images is missing alt text.
6. **Shareable release URLs.** Each release has its own slug (`/releases/zam`) and a share link.

## What doesn't work

### Performance (most urgent)
- **The homepage downloads about 18 MB.** Two release covers are 3.6 MB and 3.3 MB PNGs but display at about 280px. The hero is a 5800 × 3867 px stock photo (1.8 MB). The JS bundle is 586 KB. For visitors on Nigerian mobile data this is slow and costs them money.
- **There is an 8.3 MB background music file** (`De-SAMIST-DONE-IT-AGAIN.mp3`) with a toggle in the hero.

### SEO and sharing
- **The site is rendered on the client.** The HTML that search engines and link previews receive is an empty `<div id="root">`. Artiste names, releases and services are not in it.
- **`og:image` uses a relative path** (`/assets/Live-studioArtboard-1.jpg`). Many scrapers (WhatsApp, LinkedIn) need an absolute URL, so shared links may show no image.
- **There is no structured data** (Organization, MusicGroup or MusicRecording).

### Visual design
- **It looks like a generic template.** The dark background with purple-to-pink gradient words is a common AI/template style and has nothing to do with the brand's red, black and white logo.
- **Every section has the same rhythm:** a centred title with a gradient word, then a grid of cards, repeated six times. Nothing stands out, so nothing gets attention.
- **Three accent colours compete.** The purple/pink gradient, the bright red YouTube "Watch Now" buttons and the red logo are all fighting for attention.
- **The stock hero image is off-message.** A Technics turntable (Unsplash) suggests a DJ or secular label. EeZee has its own studio and live-worship photography, which is stronger.
- **The Featured Artistes grid leaves a card on its own.** Four cards in a 3-column grid put Minister GUC alone on a second row.
- **Mobile layout bugs:** the hero H1 breaks as "Using Music as / a / Dynamic Tool", and the page scrolls sideways at 390px (content is 440px wide).

### Trust and credibility
- **The stats don't match what's shown.** "50+ Artistes / 200+ Releases / 10+ Years" sits next to 4 featured artistes. If the numbers are accurate, show more proof (a roster strip, an artiste count by year). If not, change them.
- **The location is unclear.** The company is registered with Nigeria's CAC and uses a +234 number, but the office address is in Arlington, Texas. Say "Lagos · Arlington, TX" (or similar) so visitors aren't confused.
- **There are no testimonials, press mentions or partner logos.**

### Copy consistency
- The brand name appears as both "EeZee Conceptz" and "Eezee Conceptz".
- Release titles mix cases: "OH MY DADDY", "ASSURANCE" and "BILIE" next to "Miracle Working God".
- Typo: "top-notched studios" should be "top-notch studios".
- Dates use US format (10/23/2026), which is ambiguous for a Nigerian audience. "23 Oct 2026" or "Oct 23, 2026" is clearer.

### Links that mislead
- **Footer labels point to pages that don't exist:** Press Kit → `/releases`, FAQ → `/services`, Licensing → `/contact`, Cookie Policy → `/privacy`.
- **Streaming chips go to platform homepages.** Apple Music, Amazon Music, Audiomack, Deezer, Boomplay, Tidal and SoundCloud open the platform's home page, not EeZee's profile there. Spotify opens a user profile, not an artist page.
- **Artiste cards link to the label's accounts.** The Instagram/Spotify icons on each card all go to the EeZee label accounts, not the individual artiste's.
- **Events and News are in the nav but not on the homepage.**

## What the rebuild changes

| Problem | In the rebuild |
|---|---|
| 18 MB page | All images re-encoded as WebP at display size: **1.1 MB for every image**. Images are lazy-loaded, fonts self-hosted, no framework, about 8 KB of JS |
| Empty HTML for crawlers | Static HTML: every artiste, release, video and service is in the source. Organization JSON-LD added, absolute OG image URL |
| Template look, same rhythm everywhere | Gelaf design language: light canvas, alternating inset blocks (photo hero → light → lime gradient → grey panel → dark list → cards → photo CTA → lime → dark footer), Satoshi display type, pill buttons with letter-roll hover |
| Stock turntable hero | Kept as the hero background (it's the site's current hero), but the glass card and CTA now use EeZee's own studio and live-worship photos |
| Orphaned artiste card | 2 × 2 pill cards |
| Mobile overflow and H1 orphan | No horizontal scroll at 390px; headings use `text-wrap: balance` |
| Red YouTube buttons | Videos are a numbered dark list (`{01}`…`{06}`) with thumbnails that grow on hover |
| Generic platform links | Platforms are a non-clickable marquee until the real profile URLs are supplied |
| Footer links to missing pages | Only links that go somewhere real (removed Press Kit, FAQ, Licensing, Cookie Policy) |
| Inconsistent casing and typo | Normalised to "EeZee Conceptz", title-case release names, "top-notch" |
| Music file | Opt-in only, `preload="none"`, so nothing downloads unless the visitor presses play |

## Still to do (needs input from the client)
1. Real artiste-level Instagram and Spotify URLs, and real DSP profile URLs for the platform strip.
2. Confirm the 50+ / 200+ / 10+ stats.
3. Clarify Lagos vs Arlington, TX in the address block.
4. A backend for the contact and newsletter forms (Supabase table, n8n webhook or Formspree). They currently open the visitor's email app.
5. Inner pages (About, Artistes, Releases, Events, News, Services, Booking) in the same design.
6. Testimonials and FAQ sections. Gelaf has both, and they would address the trust gap.
