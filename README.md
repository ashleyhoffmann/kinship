# Kinship

Free, open education for meeting our needs, in six tiers: Choices, Roots, Protect, Nurture, Resilience and Craft. Tier 1, Choices, starts inside (Emotions), connects outward (Relationships), and then looks at the rules around us (Governance). Kinship is California-centered (FOUNDATION §9). Each lens is a way of looking at your home and life: what is quietly making you sick, what it costs, and what you can fix yourself.

Plain HTML, CSS and JavaScript. No build step, no server, no accounts.

**Read [FOUNDATION.md](FOUNDATION.md) first.** It holds the ideas every lens is built on: needs are universal and strategies are many, meeting needs is fun and done together, no blame/shame/"should" language, the same skills apply to people, animals, plants and the house, and every page works for disabled people and phone-only visitors from the start (section 7).

## Files
| File | What |
| --- | --- |
| `index.html` | The page shell |
| `style.css` | Look: colour tokens (light only), glass panels, layout. On phones (≤720px) each tier's cards scroll sideways one at a time inside the tier panel, with dots below (`tierDots` in `app.js`) |
| `lenses.js` | The lens catalogue (`window.MN_TIERS`): tiers (each with one colour), lenses, status, copy. Tier 1 is Emotions, Relationships, Governance |
| `app.js` | Home, About (linked beside the Kinship logo in the header), lens pages, My tools (in the Plans menu), profile, the `PERSONALIZE` switch and the shared Go deeper block (`MN.deeper`); hash routes `#`, `#about`, `#resources`, `#plans`, `#favorites`, `#tools`, `#profile`, `#lens-<id>[/<sub>]` |
| `FOUNDATION.md` | The principles behind every lens |
| `.gitignore` | Keeps `.DS_Store`, `Claude outputs/` (QA screenshots, drafts) and `mockups/*-qa/` snapshot folders out of the repo, so they're never published |
| `rel-data.js` | Emotions and Relationships data: units (each with its `course`; `planned` units and sub-units show dashed with a short description), feelings wheel, needs, accusation words, examples, special situations |
| `rel.js` | The two tier 1 Choices courses from one file. **Emotions** (`#lens-emotions[/<unit>[/<sub>]]`): looking, plants, roots and soil, read top to bottom as going deeper: 1 Observe (planned; looking, an eye with golden rays on warm amber: 1.1 Conscious awareness, 1.2 Choices, 1.3 Pauses for self-reflection, 1.4 Meditation), 2 Feel (2.1 Emotions are messengers, 2.2 Accusatory feelings, 2.3 De-escalation tools, 2.4 Physical pain can signal emotions, 2.5 Feelings wheel, which suggests universal needs, 2.6 Grief and despair), 3 Identify the need (with the Identify a need tool), 4 Ego identity (planned, physical self through time: 4.1 Memories, 4.2 Other mental faculties, 4.3 Beliefs, values, & self-judgments, 4.4 Mind-body pain relationships). The sidebar shows sub-units, numbered in open circles, only under the unit you're in. **Relationships** (`#lens-relationships[/<unit>[/<sub>]]`): 1 Request, 2 Dialogue (with Communicate), 3 Special situations, one page with an accordion each, the three animal groups first (`#lens-relationships/special[/<id>]`). Every unit page has small previous / next arrows beside Back at the top, and a back card plus a big next-unit card at the bottom (a unit's `next` can point that card at a specific sub-unit, like Feel → 2.1 Universal needs). One sidebar shows both courses, inside then outside, the current one open. A unit opened under the other course's address (old links like `#lens-relationships/feel`, or `/special/animals`, now Captive animals) opens in the right place and the address is corrected |
| `rel.css` | Emotions and Relationships styles |
| `water.js` | Water course, v2: six steps that are each an ability (1 Thinking, 2 Use, 3 Sources, 4 Containers, 5 Purify, 6 Test) plus a Your abilities page. The Use calculator (by task, grade and household, with reuse options) carries its numbers into every later step and a plan tray (upfront, each year). Sortable sources table, container materials table, purify and test plans for your sources. Most section text is the v1 course, reused through `OLD()`; v1 routes still resolve (see `mockups/water-v1-coverage.md`, v1 kept as `mockups/water-v1.js`). Saves to `localStorage` `meeting-needs.water.v2` (clearable on the abilities page) and prices to `meeting-needs.water.prices.v1` (`#lens-water`, `#lens-water/<step>[/<section>]`, `#lens-water/abilities`) |
| `water.css` | Water course styles (steps in blues, darkest to lightest; v2 calculator, card-tables, abilities bar and plan tray at the end) |
| `food.js` | Food course: seven units (Gather, Cleanse, Rehydrate, Cook, Store, Gentle, Companions), one page each, tailored from the profile (including `pets`: cat, dog, small animals), with tools: Soak & cook, How long it keeps, Make it gentle (no-fridge living opens from the profile's `cold` answer or a portable-only place) (`#lens-food`, `#lens-food/<unit>[/<sub-unit>]`) |
| `food.css` | Food course styles (units in dark greens, darkest to lightest; `fo-` prefix) |
| `tox.js` | Poisons course: seven units (Exposures, Plastics, In the home, Pesticides, Soil, Living toxins, Neighbors), each sub-unit ending in a “How to fix” card (mode: One by one, Test once, Habit, Together; cost; steps free first) that can be added to **My list**, a reorderable one-by-one tracker (`localStorage` `meeting-needs.tox.v1`). Tools: Where to start, Soil batch planner (`#lens-toxins`, `#lens-toxins/list`, `#lens-toxins/<unit>[/<sub-unit>]`) |
| `tox.css` | Poisons course styles (units in reds, darkest to lightest; `tx-` prefix) |
| `air.js` | Air course: five units (What’s in the air, Ventilation, Dust, Heat & smoke, Sun & temperature), each sub-unit ending in a “How to fix” card (mode: Right now, Habit, Set up once, Together) that can be added to **My list** (`localStorage` `meeting-needs.air.v1`). Tools sit apart from the units as shortcuts, never gates: What do you notice? (`#lens-air/notice`) and Filter sizer. Reads `stove` and `hood` (`#lens-air`, `#lens-air/list`, `#lens-air/<unit>[/<sub-unit>]`) |
| `air.css` | Air course styles (units in yellows, darkest to lightest; `ai-` prefix; generated from `tox.css`) |
| `clean.js` | Cleaning course (tier 3): the gentle ladder (Water → Soap → Baking soda → Vinegar or 3% peroxide → Beyond, which hands off to Poisons) and five units (Water, The gentle shelf, Surfaces, Stains, Laundry). Surfaces ends with 3.7 Silver, copper, and cast iron; Stains opens with the Stain finder (kept out of the sidebar) and ends with 4.7 Skunk spray. Every “How to fix” card shows its rung and can be added to **My list** (`localStorage` `meeting-needs.clean.v1`). Tools: What needs cleaning? (`#lens-cleaning/now`) and Stain finder (`#lens-cleaning/stains/finder`). Reads `counter`, `laundry`, `pets`, `kids` and `consider` (`#lens-cleaning`, `#lens-cleaning/list`, `#lens-cleaning/beyond`, `#lens-cleaning/<unit>[/<sub-unit>]`) |
| `clean.css` | Cleaning course styles (units in whites, darkest to lightest; `cl-` prefix; generated from `air.css`) |
| `em.js` | Emergency prep course (tier 5, in progress): unit 1 What to prep for (hazard lookup tool, wildfire, earthquakes, heat, floods, outages, animals), each ending in a Before · During · After “Get ready” card and **My prep list** (`meeting-needs.em.v1`); units 2–6 planned (`#lens-emergency-prep`) |
| `em.css` | Emergency prep styles (units in blues; `em-` prefix; generated from `tox.css`) |
| `gov.js` | Governance course (tier 1, Beta): what legally stops people from meeting basic needs and how to advocate in and outside existing systems. Six units, each its own page with a sidebar like Emotions (sub-units show only under the unit you're in; planned ones dashed; a `.gv-bridge` line, “then, the law”, separates lovernance units 1–4 from the law units 5–6), and previous / next unit cards at the bottom. **Lovernance: Unit 1 Overview** (`#lens-governance/u1`, the default; `UNIT1`, `U1SEC`, `YARD`, `YIELD`, `PROOF`, `SIZES`, `STAGES_FREE`, `STAGES_LAW`, `TODO`, `WAYS`): hero, 1.1 “Lovernance” is interdependence (Fuller quote, intro, in short, three unit cards, what it isn’t), 1.2 There’s enough (`.gv-yard` one yard, one year: what goes in and what comes out, the 50/50 split; grow what saves the most, linking Growing; `.gv-proof` cards at every size from the Haven Street Bubbler to Champlain Housing Trust and At Home / Chez Soi; what skeptics say), 1.3 Ways in (`WAYS`: a five-step ladder Neighbor → Member → Step in → Pledge → All in), 1.4 Transition plan (`.gv-sizes` from a wave to a home, then `.gv-stairs` with `.gv-stages` in two groups: without changing any law (you, today; places that already exist) and with law (one pilot commons, city law, state law, grow; tribes can partner whenever they choose)), 1.5 What has to change (legal to-do table), 1.6 Ask for it (who, when, what, how, a letter to adapt, ballot rules). External links use `ext(url, label)` (new tab, screen-reader note). **Unit 2 Housing** (`u2`, `UNIT2` plus `S25`–`S28`): 2.1 Needs-meeting commons, 2.2 Collective-owned homes, 2.3 Give-and-get, 2.4 Renters, 2.5 Shelters to sanctuaries, 2.6 Tribal lands, 2.7 Room we already have, 2.8 Trees and wild neighbors. **Unit 3 Jobs and economy** (`u3`, `UNIT3`, `U3SEC`): 3.1 Needs-meeting businesses (four musts incl. harms no animals; any legal shape, honorary NMBs; plant-based, plus gifts from sanctuary animals; transfarmation, where no animal leaves to be killed; everyone’s invited), 3.2 Membership, 3.3 Work that needs doing, 3.4 Shops and spaces, 3.5 Public jobs, kept, 3.6 Taxes, time and gifts, 3.7 Old debts, 3.8 Less to throw away, 3.9 Unions, 3.10 Clean power. **Unit 4 Care and safety** (`u4`, `UNIT4`, `U4SEC`): 4.1 Least able first, 4.2 Born into safety, 4.3 Health together, 4.4 Safer together, 4.5 Community safety, 4.6 Who decides, 4.7 Needs met, on your word, 4.8 Held at the end. **Unit 5 The law today** (`u5`): 5.1 Rights you have by existing, 5.2 Criminalization and incarceration, 5.3 Stairs for change, 5.4 Paths outside law, 5.5 A transparency checklist. **Unit 6 Law by need** (`u6`, “(planned)”, pink): accordions built from `window.MN_TIERS`, one per tier 2–6 (6.1 Roots … 6.5 Craft) in its tier's colour, with one accordion per need inside, e.g. 6.1.1 Water (Beta via `LAWBODY`). Tier 1 is units 1–5. Sub-unit links: `1-6`, `2-8`, `3-10`, `4-8` (dashed), `5.3`, `6.1` (dotted); `go()` dashes units 1–4 only. Units were renumbered from 0–5 on Oct 25, 2026; old `u0` and `0-n` links still land on Unit 1. UNIT2 is one JSON-style HTML string (edit with json.loads / json.dumps(ensure_ascii=False)). **Helps** law tags are solid |
| `gov.css` | Governance course styles |
| `body.js` | Body care course (tier 3, Beta), kept plain (FOUNDATION §6). Each ready unit is its own screen, with all seven units in order at the top (planned ones dashed). Unit 1 Mouth (`#lens-body-care`), one page with 1.1 Why teeth decay (bacteria, acid and dryness, minerals, sugar), 1.2 Solutions (dislodge and remove bacteria with floss and a tongue scraper, neutralize the acid, slow the acid-makers, rebuild enamel; a morning-to-night game plan with an orange Morning joys note on coffee and tea; when a dentist helps) and 1.3 Make mouthwashes & mints (homemade rinse powder and mints, a Dog health note on xylitol, a yellow For sore gums note on adding 3% peroxide, then store-bought in one paragraph); unit 4 Hair bleaching (`#lens-body-care/bleach`), opening with a yellow Heads up note (creator isn’t a doctor or cosmetologist): 4.1 Steps as blocks with small bold subtitles (`step()`, `.bc-sub`): 0 Preparation, 1 Bleach, 2 Shower with shampoo, 3 Tone, 4 Shower with conditioner, then plain text for test a strand, care after, and go lighter in steps; 4.2 Materials & safety, materials as blocks (the creator’s picks as subtitles) and safety as plain text, then For kids, Cat and dog health, and Allies; 4.3 How bleach works. Go deeper is split by unit (`unitCredits`): credits whose line starts “Hair bleaching” show on unit 4, the rest on Mouth; units 2 Skin, 3 Hair, 5 Sleep & rest, 6 Bodies through time, and 7 Animal bodies planned |
| `body.css` | Body care styles (teals; `bc-` prefix) |
| `compost.js` | Composting & waste course (tier 4, Beta), kept plain like Body care: unit 1 Compost, one page with jump links: 1.1 How compost works (microbes, greens and browns, water and air, hot or cold; a Soil life note), 1.2 Ways to compost (Green bin with free kitchen pails, Lomi with fast and Grow modes, Bokashi, Worm bin, Pile or bin, Trench; a Worms or no worms note), 1.3 What goes in (broth and ferments first, then in-or-out bullets; notes on “compostable” vs. banana-peel compostable, Dog poop, and Weed killers, linking to Poisons → Soil), 1.4 Using compost (food plants vs. trees, shrubs, and flowers; how compost feeds veggie soil); units 2 Sewage & septic and 3 Less to throw away planned. Go deeper shows once a Resources credit names `composting-waste` (`#lens-composting-waste`) |
| `compost.css` | Composting & waste styles (soil browns; `cp-` prefix; built from `body.css`) |
| `grow.js` | Growing course (tier 4, Beta), one page kept hyper-plain like Body care, with unit jump links: 1 What plants need (1.1 The basics: light, water, something to root in, the right season; 1.2 Going further: compost, mulch, fertilizer, with a Potting mix note on *Legionella* linking Poisons → Soil; 1.3 Game plan), 2 Where plants come from (2.1 Scallions in a glass, 2.2 Herbs from cuttings, 2.3 Greens from seed, each with a “Same idea” line and quirks like dill being seed-only; 2.4 Starts and swaps; 2.5 How long it takes, grouped Easiest, Easy, Takes patience), 3 Indoors & small spaces, 4 Yard & outdoors (water per week; What saves the most in Grow it, One is plenty, and Usually cheaper to buy groups; how much a yard grows, linking Governance 1.2; Allies), 5 Sharing the garden (gentle insect and animal care: favorites, covers, move don’t kill, grow extra; separate Cat health and Dog health toxic-plant notes); 6 Your year (with the Garden planner) and 7 Prune & save seeds planned (`#lens-gardening`) |
| `grow.css` | Growing styles (leaf greens; `gr-` prefix; built from `compost.css`) |

## Run it locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Put it online (free)
- **GitHub Pages**: make a repo, push these files, then Settings → Pages → Deploy from branch → `main` / root.
- **Netlify Drop**: drag this folder onto https://app.netlify.com/drop.

## Personalization (hidden for now)
The Profile, the home page's Personalize card and all "For you" tailoring sit behind one switch, `PERSONALIZE` near the top of `app.js`, set to `false` until it's ready. While it's off there's no Profile link, `#profile` opens the home page, courses see an empty profile (so nothing is tailored) and their "Tailor this course" panels are hidden (`.me-off` in `style.css`). To preview it in one browser, open the site with `?personalize=1`; `?personalize=0` hides it again. Set `PERSONALIZE = true` to turn it on for everyone.

**Personal colour.** Anything that is only about the visitor is silver with slate text (`--personal`, `--me-*` in `style.css`): the Personalize card, the Profile button while the profile is empty, every course's "For you" pill and "Tailor this course" panel. Pink stays for the logo, tier 1 and creator's considerations.

**Personalize card.** Wide and short, beside the hero text, so it adds no height on wide screens (on narrower ones it becomes one slim row). The whole card opens the profile, with a ↑ under the Profile button, and it disappears once anything is on file.

## Profile data
Saved only in the visitor's browser (`localStorage`, key `meeting-needs.profile.v1`). Nothing is sent anywhere. The profile page has Copy backup / Restore for moving between devices.

Place questions describe the place and how long and how much you can shape it, never who owns it: `home` (kind of place), `stay` (how long you expect to stay), `shape` (how much you can change it; a friend who owns it counts) and `space` (outdoor or growing space, including acreage). The Water section (`#profile/water`) holds `sources` (each source with how much it carries you: Sometimes, Often, Main source; plus “No safe tap water at home”), `filters` you already own, `pipes` (before or after 1986) and `rain`. The Food section (`#profile/food`) holds `kitchen` (how you can cook right now), `cold` (how you keep food cold), `stove` (gas, electric, induction, hot plate, none) and `hood` (kitchen fan: vents outside, recirculates, none); the Air course reads the last two. The Cleaning section (`#profile/cleaning`) holds `counter` (counter material; marble, limestone and concrete skip vinegar) and `laundry` (machine at home, shared, laundromat, by hand). The Surroundings section (`#profile/toxins`) holds `built` (before or after 1978, for lead paint) and `near` (freeway, industry or wells, farm fields, airport); the Poisons course also reads `kids`, `consider` and `pets` (birds and cats change some advice). Courses read these to open the sections that fit and tag them "For you", and link back to the profile (with a hover summary of what's on file) for the rare times something changes. Every section stays available either way. Older profiles are migrated on load: renting/owning in `home` becomes the kind of place, “Land or farm” becomes a house plus acreage, and the old single `water` answer becomes a main source.

## Adding or changing a lens
Edit `lenses.js`. Status is one of `ready` (shown as **Beta**, filled in the tier colour), `building` (In progress), `soonest` (the next lens to be written; its card is quieter), `next`, `soon`, `later`, `last`, shown top right on every card. Right now tier 2 is all Beta, tier 3 is Soon except Cleaning and Body care (Beta), tier 4 is Soon except Composting & waste and Growing (Beta), and tier 6 is Last except Governance. The home page counts Beta and upcoming lenses itself. A lens takes its tier's `color`. A tier with `locked: true` shows its cards on the home page without linking them (Roots, for now).

## Creator opinions
Most copy aims to be plain and checkable. The creator's own views are set apart in pink (the tier 1 and logo color) with `MN.opinion(html, title)`, which renders a "Creator's consideration" box (no name on it) (`.opinion` in `style.css`).

- **Only when asked.** Add a Creator’s consideration only when Ashley explicitly asks for one, in her words. Never draft, suggest or add one on her behalf, and never add other notes in her voice without an explicit request.
- **One sentence.** A consideration is a pointer to the creator's perspective, usually a why, not an essay in her voice. Never write paragraphs, backstory or feelings on her behalf; the single sentence is the whole expression.
- **At the bottom.** Considerations sit at the end of a unit or page, after the regular content.
- **Short pink notes.** When Ashley asks, a consideration can instead be a short note with a topic label, styled like Allies and colored by topic (Body care's orange “Morning joys”, for food, `.bc-joy`), placed beside the copy it relates to.
- **Sourced.** Any fact in or behind the sentence gets a short source line. Keep opinions out of the regular copy.
- **Animals link home.** Any consideration or copy touching peace with animals (plant foods, farm water, secondhand animal materials) links to the Captive animals accordion (`#lens-relationships/special/captive`), which lists them under “Across Kinship” and holds the creator’s consideration on commodification.

## Go deeper (credits)
Every course ends with the same **Go deeper** block (“Shoulders we stand on”), built with `MN.deeper(intro, people)` in `app.js`. Each card names a person or organization, who they are, their work, what it shaped in Kinship, and a link when we have a confirmed one. The block says Kinship is its own synthesis, so anything that misses the mark is Kinship’s, not theirs: it recommends where to go for more and credits influence, without presenting anyone’s work as Kinship’s or Kinship’s as theirs. Never guess a link; leave it out until it’s confirmed (Wikipedia is fine for people who have passed and have no site). The Resources page (`#resources`) groups the same list by tier, in each tier's colour, using the `tier` on each `SHOULDERS` entry. Before launch, each person is asked for consent and invited to give feedback or help shape their section; anyone who declines is removed.

So far: Emotions (Marshall B. Rosenberg & CNVC; Howard Schubiner, *Unlearn Your Pain*), Relationships (CNVC; Michaeleen Doucleff; Barbara Rogoff), Poisons (Dr. Yvonne Burkart), Body care (Dr. Ellie Phillips; Aly Art for hair bleaching). It replaces the older “Nonviolence theory origins” fun fact.

## Labels
Section labels are plain: “Fun fact”, never “A grateful fun fact” (gratitude can live in the copy itself).

## Writing
- **Oxford comma.** Always, in any list of three or more, in copy, labels, alt text, and these docs: “water, soap, and vinegar”, never “water, soap and vinegar”.
- **Direct headings.** Headings say the thing: “Lovernance is interdependence”, “There’s enough”, never “What lovernance is” or “About the evidence”.
- **Say how it works.** Explain the mechanism (scientific or design) in plain, logical words instead of euphemisms, as succinctly as possible: “slows the oxygen-avoiding bacteria that inflame gums”, not “soothes gums”.

## Language for animals
Animals are someone, not something: they/them when sex is unknown, he/she when known, never "it". Never call animals by meat names ("beef", "pork", "poultry", "seafood") or "livestock", including in numbers, tables and labels. Don't soften animal agriculture either: name feedlots and slaughterhouses plainly, and say what a count leaves out. See FOUNDATION.md section 4.

## Logo
A cut-paper chain of three whole hearts, draped in a gentle curve and joined at the sides with dotted folds (the `LOGO` constant in `app.js`; mock-ups in `mockups/logo-heart-chain-mockup-v3.html`, option 3; a single paper heart is the favicon in `index.html`).

## Plans
The Plans menu (same on every page) lists Education plan, Improvements & budget, and Garden planner (`#plans/<id>`).

## Course colour themes
Tiers keep their colour at the top level (home page, lens cards, the tier pill). Inside a course, units take the lens's own theme, stepping from darkest (unit 1) to lightest (last unit):

| Lens | Unit theme |
| --- | --- |
| Water | Blues |
| Food | Dark greens |
| Air | Yellows |
| Emergency prep | Blues |
| Cleaning | Whites |
| Poisons | Reds |
| Body care | Teals |
| Composting & waste | Soil browns |
| Growing | Leaf greens |

Laws mentioned in courses are California's; the practices themselves are general.

## Where shared topics live
- **Harsh cleanups live in Poisons.** Cleaning stops at vinegar and 3% peroxide; big mold, sewage, droppings, a stomach bug, ash, lead dust and mercury go to Poisons (or Air for lead and floods) from Cleaning’s “Beyond the ladder”.
- **Mold and poisons live in Poisons** (Living toxins → Mold in the house and Mold on food; Exposures → Companion animals, what each species can’t process). Air, Water and Food mention damp or spoilage where it fits their own job and link there rather than repeating it.
- **Self-defense** (tier 3) holds noticing, de-escalation, getting away and home preparation; Emergency prep → Securing your home and Personal safety link to it rather than repeating it.
- **Natural disasters** are planned in Emergency prep; Air covers what each event puts into the air and how to read it, and links both ways.
- **Sun on skin** lives in Air & temperature (Sun & temperature); Body care links there rather than repeating it.
- **Food as medicine** (gentle foods, oral rehydration, soft textures) starts in Food → Gentle; Body care and First aid will build on it and link back.
- **What companion animals eat** lives in Food → Companions; what their bodies can’t process stays in Poisons → Exposures → Companion animals.
- **People in distress** (unhoused neighbors and people struggling in public) is a special situation in Relationships, beside Neighbors.
- **Animals in Relationships** come in three accordions: Family animals (companions and their emotional needs), Wild animals (wild neighbors, urban wildlife and shared land; pest work continues in Poisons) and Captive animals (animals humans keep for use: respectful language, farmed animals, Across Kinship, and the creator's consideration on commodification). Old `/pets`, `/wild` and `/animals` routes open the matching one.
- **Plastic nuance:** Poisons → Plastics → When plastic is the safer bet holds the calculated-risk view (tarps, tents, water jugs for people living outside or camping).
- **Tools never gate the teaching.** Every unit is open to read in order; tools are shortcuts into it.

## Courses inside a lens
A lens can open a course instead of the plain lens page. Its files load only when someone opens that lens (see `LAZY` in `app.js`), so the home page stays light. The app is light-theme only.

To add a course: register `window.MN_LENS_VIEWS[<lens id>] = function (sub, lens) { return { html, title }; }` in a script loaded before `app.js`. `window.MN` gives you `header`, `footer`, `esc`, `toast`, `opinion`, `deeper`, `profile()` and `personalize`. One file can register several lenses (Emotions and Relationships share `rel.js`; `LAZY` loads it once). See `rel.js`. Course progress is saved in `localStorage` (`meeting-needs.rel.v3`). Build every course to FOUNDATION.md section 7 (accessibility and phones).

## Line length
Body text runs the full width of its panel: no `max-width: …ch` caps on bullets, ledes, fun facts or paragraphs in any course, so lines don’t wrap early and waste vertical space.
