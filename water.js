/* Water lens: an overview and five units (Use, Sources, Containers, Purify, Test). Registers window.MN_LENS_VIEWS.water.
   Routes: #lens-water (overview) · #lens-water/<unit>[/<section>] for use, sources, containers, purify, test · #lens-water/abilities.
   Old #lens-water/think[/steps|/loop] links open the overview.
   Old v1 routes (uses, storage, testing, costs, cows and their sections) still resolve; see resolve() and mockups/water-v1-coverage.md.
   Numbers carry forward from the Use calculator to every later step and the plan tray (localStorage meeting-needs.water.v2).
   Tailoring: answers from the Profile (Place + Water) become tags; accordions tagged data-for open with a "For you" badge.
   Every section stays available to everyone. Laws mentioned are California's; the practices are general. */
(function () {
  var BASE = '#lens-water';
  function mn() { return window.MN; }
  function esc(s) { return mn().esc(s); }
  function prof() { return (mn().profile && mn().profile()) || {}; }

  /* ---------- profile → tags ---------- */
  function tags() {
    var p = prof(), t = {}, src = p.sources || {}, space = p.space || [], filters = p.filters || [];
    if (p.home === 'Shelter or no fixed place' || p.stay === 'No fixed place right now') t.nohome = 1;
    var rooted = p.stay === 'A few years' || p.stay === 'Long-term, putting down roots';
    var canShape = p.shape === 'Bigger changes, with an owner who’s on board' || p.shape === 'It’s ours to shape';
    if (rooted && canShape) t.invest = 1;
    else if (p.shape || p.stay === 'Under a year' || p.home === 'Vehicle or boat' || p.home === 'Apartment or room') t.portable = 1;
    if (space.indexOf('Acreage or farmland') !== -1) { t.land = 1; t.outdoor = 1; }
    if (p.home === 'House' || space.some(function (s) { return /Balcony|yard|plot/i.test(s); })) t.outdoor = 1;
    if (src.well || src.spring) t.well = 1;
    if (src.notap) t.notap = 1;
    if (src.rain) t.catch = 1;
    if (p.rain && p.rain.indexOf('Through') !== 0) t.dry = 1;
    if (Number(p.kids) > 0 || (p.consider || []).some(function (c) { return /Pregnancy|Babies/.test(c); })) t.kids = 1;
    if (/^Before/.test(p.pipes || '')) t.oldpipes = 1;
    if (filters.some(function (f) { return /reverse osmosis/i.test(f); })) t.hasRO = 1;
    if (filters.some(function (f) { return /Pitcher|Faucet|Under-sink filter|Gravity|Whole-house/.test(f); })) t.hasCarbon = 1;
    if (filters.indexOf('None yet') !== -1) t.nofilter = 1;
    return t;
  }
  var T = {};

  /* ---------- small builders ---------- */
  function acc(forTags, who, title, body) {
    var hit = forTags.split(' ').some(function (k) { return T[k]; });
    return '<details class="wa-acc' + (hit ? ' match' : '') + '" data-for="' + forTags + '"' + (hit ? ' open' : '') + '>' +
      '<summary><span class="wa-who">' + who + '</span><span class="wa-acc-t">' + title + '</span>' + (hit ? '<span class="wa-foryou">For you</span>' : '') + '</summary>' +
      '<div class="wa-in">' + body + '</div></details>';
  }
  function accs() { return '<div class="wa-accs">' + Array.prototype.join.call(arguments, '') + '</div>'; }
  function box(kind, html) { return '<p class="wa-box wa-' + kind + '">' + html + '</p>'; }
  function old(h) { return box('old', h); }
  function ca(h) { return box('ca', h); }
  function home(h) { return box('home', h); }
  function tryit(h) { return box('do', h); }
  function kind(h) { return '<p class="wa-kind">' + h + '</p>'; }
  function links(h) { return '<p class="wa-links">' + h + '</p>'; }
  function ul(items) { return '<ul>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
  function a(path, text) {
    var p = resolve(path), label = /^(Unit \d|\d\.\d)/.test(text) ? (titleFor(path) || text) : text;
    return '<a href="' + BASE + (p ? '/' + p : '') + '">' + label + '</a>';
  }
  function table(head, rows, cls) {
    return '<div class="wa-tbl"><table><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c) { var m = /^\[(y|p|n)\](.*)$/.exec(c); return m ? '<td class="' + m[1] + '">' + m[2] + '</td>' : '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>' + (cls ? '<p class="wa-legend">' + cls + '</p>' : '');
  }
  function truths(list) { return '<div class="wa-truths">' + list.map(function (t) { return '<div class="wa-truth"><b>' + t[0] + '</b><p>' + t[1] + '</p></div>'; }).join('') + '</div>'; }

  /* ---------- course content ---------- */
  function units() {
    return [
      { id: 'uses', num: 1, word: 'Uses', sub: 'Using water wisely',
        take: function () { return mn().opinion ? mn().opinion('<p>Since children’s bodies are smallest, they dehydrate fastest and are most sensitive to drought and famine.</p><p class="opinion-src">Worldwide, 1 in 5 children don’t have enough water for everyday needs (UNICEF, 2021).</p>') : ''; },
        lede: 'Not every job needs drinking water. Knowing what each use really needs is the base of every system later in this lens, and the easiest way to need less.',
        subs: [
          { id: 'needs', short: 'Needs', title: 'What we need it for', html: function () { return '<p>A day of water: drinking, cooking, brushing teeth, washing hands and bodies, dishes, laundry, flushing, cleaning, plants and animals. A body needs about 2–3 liters a day to drink, more in heat (' + a('uses/drink', '1.2') + '). Humanitarian groups plan around 15 liters (about 4 gallons) per person a day for drinking, cooking and basic washing. A typical US home with taps uses many times that.</p>' +
            old('When every drop was carried, every drop had a job: washing water went to the garden, dishwater to the animals’ trough or the fruit trees.') +
            tryit('Keep a one-day water diary: every time water runs, jot what it was for. Circle the jobs that didn’t need drinking-quality water.'); } },
          { id: 'drink', short: 'Drinking', title: 'How much to drink', html: function () { return '<p>Most adults need about <b>2.7 liters (women) to 3.7 liters (men)</b> of water a day in all. About 20% usually comes from food, which leaves roughly <b>9 to 13 cups to drink</b>. Tea, milk and soup count. Thirst and pale-yellow pee are good everyday guides.</p>' +
            accs(
              acc('kids', 'Babies', 'Babies and toddlers', '<p>Under 6 months, breast milk or formula is all the water a baby needs. Extra water can make a young baby seriously ill. From about 6 months, small sips: about 4–8 ounces (½ to 1 cup) a day alongside milk. After a year, water and milk become the main drinks.</p>'),
              acc('elder', 'Older bodies', 'Older adults', '<p>Thirst fades with age, so waiting to feel thirsty can mean waiting too long. Drink on a rhythm instead: with meals, with medicines, with visits. Some medicines, like water pills, change how much a body needs.</p>'),
              acc('athlete outdoor', 'Active bodies', 'Sport, work and heat', '<p>Sweat raises needs fast. Drink before, during and after. For long or very sweaty efforts, add salt or electrolytes: lots of plain water without salt can make someone sick too.</p>'),
              acc('pregnant', 'Pregnancy', 'Pregnancy and breastfeeding', '<p>Needs go up: about 3 liters a day in all while pregnant, and about 3.8 liters while breastfeeding.</p>'),
              acc('health', 'Health needs', 'Illness and fluid limits', '<p>Fever, vomiting and diarrhea pull water out. Sip often, and use an oral rehydration drink for big losses. Some kidney, heart and liver conditions call for drinking <i>less</i>; there, a doctor’s number comes first.</p>')
            ) +
            '<p><b>Water in food:</b> cucumbers, lettuce, melons, citrus and most fresh fruits and vegetables are about 85–96% water. A day full of them, plus soups and stews, means less to drink. A dry, salty day means more.</p>'; } },
          { id: 'grades', short: 'Grades', title: 'Four grades of water', html: function () { return '<p>Match the water to the job, from cleanest to least clean.</p>' +
            '<div class="wa-ladder">' +
            '<div class="wa-rung r1"><small>Grade 1</small><b>Drinking (potable)</b><p>Drinking, cooking, brushing teeth, baby formula, ice, washing produce eaten raw.</p></div>' +
            '<div class="wa-rung r2"><small>Grade 2</small><b>Clean, boil if unsure</b><p>Washing hands and bodies, dishes, laundry. Rain or stored water fits here, boiled if anyone might swallow it.</p></div>' +
            '<div class="wa-rung r3"><small>Grade 3</small><b>Gray water</b><p>Used once: shower, bath, bathroom sink, laundry. Good for flushing and watering non-edible plants.</p></div>' +
            '<div class="wa-rung r4"><small>Grade 4</small><b>Black water</b><p>Toilet waste (and in many places, the kitchen sink). Goes to sewer, septic or a proper compost toilet.</p></div></div>' +
            home('A bowl in the sink while washing veggies catches grade 2 water for the houseplants.'); } },
          { id: 'gray', short: 'Gray water', title: 'Gray water', html: function () { return ul(['Use it within a day. Stored gray water starts to smell and grow germs.', 'Send it into soil or mulch, not onto leaves you eat or root crops.', 'Plant-friendly soaps (low salt, no boron or bleach) keep the soil happy.']) +
            ca('A simple laundry-to-landscape system needs no permit if it follows the state plumbing code’s rules (no storage, no spraying, water stays on your land).') +
            accs(
              acc('portable nohome', 'Portable', 'Gray water without changing any pipes', '<p>A bucket in the shower while it warms up, then into the toilet tank or onto outdoor plants. A basin in the sink for hand-washing water. Nothing to install, nothing to ask permission for.</p>'),
              acc('invest', 'Long-term place', 'Laundry-to-landscape and branched drains', '<p>The washing machine’s drain hose feeds a pipe to mulch basins around trees. A branched drain does the same for showers. A 3-way valve lets you switch back to the sewer in rainy months.</p>' + links('<a href="#lens-gardening/u4">Growing → Yard &amp; outdoors</a> · <a href="#lens-composting-waste">Composting &amp; waste</a>')),
              acc('crisis', 'Outage', 'Flushing when the water is off', '<p>Pour a bucket of gray water (about 1–2 gallons) quickly into the bowl to flush. If sewer lines may be broken after an earthquake, don’t flush: use a lined bucket toilet instead.</p>' + links('<a href="#lens-composting-waste">Composting &amp; waste (sewage and septic, planned)</a> · <a href="#lens-emergency-prep">Emergency prep</a>'))
            ); } },
          { id: 'less', short: 'Use less', title: 'Small ways to use less', html: function () { return ul(['<b>Toilet leak test:</b> a few drops of food coloring in the tank. Color in the bowl after 10 minutes without flushing means a leak.', 'A faucet dripping once a second adds up to thousands of gallons a year.', 'Wash dishes in a basin, run full laundry loads, catch the cold water while the shower warms.', 'Water gardens early or late, at the roots, with mulch on top.']) +
            tryit('Do the toilet dye test with a child: they’re great at watching for color.'); } },
          { id: 'system', short: 'Your system', title: 'Designing your water system', html: function () { return '<p>Every life has a water loop: <b>source → storage → purify → use → reuse → back to soil</b>. A few truths of design hold everywhere, whatever you can change right now:</p>' +
            truths([['Where water falls is easiest', 'Places with steady rain or snow, springs and rivers need the least infrastructure. Dry places can thrive too, with storage sized for the whole dry season.'], ['Water flows downhill', 'Gravity is free energy. Store high, use low; put the barrel above the garden, not below it.'], ['Closer is easier', 'The shorter the trip from source to use, the less carrying, pumping and leaking.'], ['Slow it, spread it, sink it', 'Rain that soaks into the ground refills wells and springs for everyone downhill.'], ['Time decides the build', 'How long you’ll be somewhere, and whether you can shape it, decides whether a pitcher or a cistern makes sense.']]) +
            accs(
              acc('portable', 'Portable', 'A carry-it-with-you loop', '<p>Tap → filter pitcher or countertop unit → a few stored jugs → shower bucket to toilet → houseplants. Everything moves with you.</p>'),
              acc('invest outdoor', 'Rooted, with outdoor space', 'A house-and-yard loop', '<p>Tap and rain barrels → under-sink filter → stored drums → laundry-to-landscape → fruit trees and mulch. Rain gardens let what’s left soak in.</p>'),
              acc('land', 'Land', 'An off-grid loop', '<p>Well or roof catchment → cistern → sediment, carbon and UV (or slow sand) → house → gray water to orchard → swales that recharge the aquifer.</p>'),
              acc('nohome', 'No fixed home', 'A map-it loop', '<p>Free refill points → two or three clean bottles → a small backup filter → rinse water reused for washing up. Here the system is the map of where water is, and the people who share it.</p>'),
              acc('dry', 'Dry climate', 'Designing for the dry season', '<p>Most of California gets its rain in a few winter months. Count how many dry months you need to bridge, and let the garden plan follow the water: native, dry-adapted plants, deep mulch, and winter rain stored in the soil.</p>' + links('<a href="#lens-gardening">Growing</a> · <a href="#lens-weather">Weather</a>'))
            ) + tryit('Draw your loop on paper with arrows. Mark one step you’d like to add.'); } }
        ] },

      { id: 'sources', num: 2, word: 'Sources', sub: 'Where water comes from',
        take: function () { return mn().opinion ? mn().opinion('<details class="opinion-more"><summary>Where California’s farm water goes</summary><div class="opinion-facts">' + ul([
          'Farms use about <b>40%</b> of California’s water.',
          'That grows nearly half of US vegetables and over three-quarters of US fruits and nuts.',
          'Water per pound for the top plant crops: carrots 23 gal · tomatoes 26 · lettuce 28 · strawberries 42 · grapes 73 · pistachios 1,360 · almonds 1,930.',
          'About <b>27%</b> of farm water grows feed for farmed animals: alfalfa, pasture and corn silage, mostly for cows raised for milk and meat. Much of the corn and soy fed to chickens and pigs is grown out of state, so that water never shows up in California’s count.',
          'Of the water behind animal foods, about <b>98%</b> grows their feed. What the animals drink is about 1.1%; hosing down feedlots, barns and the animals themselves about 0.8%. Slaughterhouse water isn’t counted at all, so the real total runs higher.',
          'In all, per pound of animal foods: cow milk 120 gal · eggs 400 · chickens 520 · pigs 720 · cows 1,850.']) +
          '<p class="opinion-src">Sources: Public Policy Institute of California; California Department of Food and Agriculture (top crops by value, 2024); Water Footprint Network and Mekonnen &amp; Hoekstra (2012) (world averages, rain included).</p></div></details><p class="opinion-src">More on peace with animals in <a href="#lens-relationships/special/captive">Captive animals</a>.</p>') : ''; },
        lede: 'Water reaches us from the sky, the ground, or a pipe. Each source carries its own likely problems, which tells you what storage, purifying and testing it needs.',
        subs: [
          { id: 'know', short: 'Sources', title: 'Know your sources', html: function () { return '<p>Two truths come before every source:</p>' +
            truths([['Know what’s upstream', 'Water carries everything it has passed: towns, farms, roads, mines, factories, someone’s laundry. Clear and fast doesn’t mean clean.'], ['Unknown until you know', 'Until you know a water’s story or have tested it, treat it as unsafe. Today that’s most water you didn’t trace yourself.']]) +
            '<p>In <i>Traveler’s Joy</i>, herbalist Juliette de Baïracli Levy tells of being sent to a mountain stream as pure, then finding that upstream, sheets from typhus patients were being washed in it. Today the upstream can be a factory: DuPont’s Washington Works plant in West Virginia released PFOA, a “forever chemical,” into the Ohio River and nearby drinking water for decades. The US Geological Survey estimates at least 45% of US tap water carries some PFAS.</p>' +
            table(['Source', 'Usually watch for', 'Ready to drink?'], [
              ['Public tap', 'Lead from old pipes, chlorine taste, sometimes PFAS', '[y]Usually'], ['Rain', 'Roof dirt, bird droppings, roof materials', '[n]Treat first'], ['Well', 'Bacteria, nitrate, arsenic, minerals', '[p]After testing'],
              ['Spring', 'Surface water sneaking in after rain', '[p]After testing'], ['River, lake', 'Germs, farm and road runoff, algae toxins', '[n]Treat first'], ['Dehumidifier / AC', 'Metals and germs from the coils', '[n]Plants only']]) +
            old('Villages grew up beside springs and rivers. People drew drinking water upstream and washed downstream, and that order still matters.') +
            tryit('Find your watershed’s name and trace a raindrop from your roof to your tap, then to the sea.'); } },
          { id: 'taps', short: 'Taps &amp; refills', title: 'Taps and free refills', html: function () { return '<p>Public water is already treated and tested, which makes it the cheapest reliable water there is. Refill maps and apps show fountains and businesses happy to fill a bottle.</p>' +
            ca('State law (2012) recognizes that every person has a right to safe, clean, affordable water for drinking, cooking and washing.') +
            accs(
              acc('notap', 'No safe tap', 'Living without a safe tap', '<p>Many households carry or buy every drinking gallon. The options, roughly cheapest per gallon first: free refill points, refill machines with your own jugs, a gravity or countertop filter (if the tap runs but isn’t safe to drink), then delivered 5-gallon jugs, then cases of small bottles. ' + a('sources/table', 'The sources table') + ' prices each one for your household.</p>'),
              acc('nohome', 'No fixed home', 'Where water is free', kind('Without a home, water takes far more time, walking and planning, because most systems assume a tap of your own. That’s a gap in how things are built, not a personal failing.') + ul(['Public libraries, parks, community and rec centers, transit stations.', 'Cafés and fast-food counters will often fill a bottle with tap water when asked.', 'Day centers and shelters often have water, showers and laundry.', 'Calling or texting <b>211</b> finds local water, showers and food.'])),
              acc('crisis', 'Outage', 'Water already in your home', ul(['The water heater tank, often 30–80 gallons. Turn off power or gas, let it cool, drain from the bottom valve.', 'The toilet tank (not the bowl), if no cleaning tablets are in it.', 'Ice, and liquid in canned fruit and vegetables.', 'If the supply may be contaminated, close your main valve to keep it out of your pipes.']))
            ); } },
          { id: 'rain', short: 'Rain', title: 'Catching rain', html: function () { return '<p>One inch of rain on 1,000 sq ft of roof is about 620 gallons. A <b>first-flush diverter</b> sends the dirtiest first water away. Rainwater goes to the garden first, and to drinking only with treatment.</p>' +
            ca('Collecting rain from your roof is legal (Rainwater Capture Act, 2012). Many water agencies offer rebates or free barrels.') +
            accs(
              acc('portable hasRO', 'Portable', 'Balcony scale', '<p>A lidded bucket under a balcony drip or a chain from the gutter, for plants and mopping. Check with whoever owns the building before attaching anything. Even in a city you’ll never fully leave the grid in, every gallon caught is a step in the right direction.</p>'),
              acc('outdoor invest catch', 'Yard', 'Barrels on downspouts', '<p>One or two 55-gallon barrels with a diverter kit, a screen and an overflow pointed away from the foundation.</p>'),
              acc('land', 'Land', 'Cistern catchment', '<p>Metal roofs are the best for drinking water. Gutters → first flush → screened cistern (shaded or buried) → the filter train in ' + a('purify/permanent', '4.3') + '.</p>'),
              acc('dry', 'Dry climate', 'Sizing for a dry season', '<p>With winter-only rain, a barrel fills and empties within weeks. Storing water in the soil (mulch, basins, rain gardens) often beats storing it in tanks.</p>')
            ) +
            '<div class="wa-note"><b>Inspiration: Brad Lancaster plants the rain</b><p>In 1998, in Tucson’s Dunbar/Spring neighborhood, Brad Lancaster cut six notches in the curb in front of his home so rain running down the street would flow into the bare strip by the sidewalk, where he planted native mesquite and palo verde trees. It was illegal. He told the city himself, found a city hydrologist who agreed the cuts weren’t causing harm, and pointed out that more shade makes pavement last longer. Within about three years Tucson made curb cuts legal, later offered rebates for them, and in 2008 began requiring new businesses to water their landscaping with harvested rain. His neighbors have since planted more than 1,600 trees, and by 2012 their streets were catching over 700,000 gallons a year. A single mile of their street gets about a million gallons of rain a year: enough for about 400 low-water trees.</p>' +
            '<p><b>What we can borrow</b></p>' + ul([
              '<b>Plant the rain before the plant.</b> Shape the ground first, with a shallow basin a little lower than the path, so rain soaks in where the roots are. Soil is the cheapest tank there is.',
              '<b>Start at the top, and start small.</b> Catch water where it first lands, the roof, the path, the high corner, then slow it, spread it, and let it sink in. One basin you watch through a storm teaches more than a big plan.',
              '<b>Always plan the overflow.</b> Know where the extra goes in a big storm, away from walls and foundations, ideally into the next basin down.',
              '<b>Mulch the basin.</b> Wood chips and prunings keep the water from drying off, feed soil life, and help soil break down street grime. Rock and bare dirt do much less.',
              '<b>Native plants feed the most life.</b> A native mesquite feeds over 60 kinds of native pollinators; a non-native one, about a dozen.',
              '<b>Ask in the city’s own terms.</b> Shade makes pavement last, basins slow traffic, trees cool the street. Lead with the goals each department already has.',
              '<b>Do it together.</b> In Tucson one permit can cover many curb cuts, so a block can share one. Mulch delivery often costs the same for a full truck or half, so split a load with neighbors.']) + '</div>' +
            ca('Curbs and the strip by the street usually belong to the city. Ask public works about an encroachment permit before cutting or coring a curb, and ask your water agency about rain garden or “green street” rebates. Sending your own roof and path water into basins on your land is usually just gardening.'); } },
          { id: 'wells', short: 'Wells &amp; springs', title: 'Wells and springs', html: function () { return '<p>Groundwater is filtered by soil and rock, so it’s often cleaner than surface water, but it can pick up arsenic, nitrate, uranium or bacteria along the way.</p>' +
            accs(
              acc('well land', 'Wells', 'Caring for a well', ul(['Test yearly for coliform bacteria and nitrate, and after floods or repairs (' + a('testing/kits', '5.4') + ').', 'Keep a sealed cap and slope soil away from the wellhead. No chemicals or septic nearby.', 'County environmental health handles well permits and drilling records.'])),
              acc('well land nohome', 'Springs', 'Using a spring', '<p>Find out who owns or cares for it. A “spring box” protects it from runoff. Clear spring water can still carry germs from animals uphill, so treat it unless it’s tested. A spring you visit now and then is a lovely extra source, not one to bet the household on.</p>')
            ); } },
          { id: 'wild', short: 'Wild water', title: 'Rivers, lakes and the wild', html: function () { return ul(['<b>Running over still:</b> moving water is less likely to breed mosquitoes and algae.', '<b>But ask who’s upstream:</b> towns, farms, roads, mines and factories all drain somewhere. Running water carries their runoff too.', 'Skip water with green or blue-green scum, oily sheen, foam or dead fish.', 'Always purify before drinking (' + a('purify', 'Unit 4') + ').']) +
            old('“Running water is clean water” held when nobody upstream was spraying fields. Keep the habit, and add the question.') +
            links(a('testing/signs', '5.2 Reading the signs') + ' · ' + a('testing/outdoors', '5.5 Swimming and bathing outdoors')); } },
          { id: 'place', short: 'Where to live', title: 'Choosing where to live', html: function () { return '<p>If you’re choosing where to live, put clean water near the top of the list. Living near clean water is much easier than making dirty water clean.</p>' +
            ul(['<b>Public water:</b> read the provider’s yearly water quality report before you sign (' + a('testing/report', '5.3') + ').', '<b>A well:</b> ask for recent test results and the well log, and test before you buy (' + a('sources/wells', '2.4') + ').', '<b>Look upstream and uphill:</b> farms, feedlots, mines, factories, landfills, and airports or military bases (firefighting foam is a common PFAS source).', '<b>Look ahead:</b> drought history, falling groundwater, and who else draws on the same water.']); } }
        ] },

      { id: 'storage', num: 3, word: 'Storage', sub: 'Keeping water safe',
        lede: 'Stored water stays good with three things: a clean food-grade container, darkness and coolness. Then a date on the lid, and a reminder to refresh it.',
        subs: [
          { id: 'containers', short: 'Containers', title: 'Containers', html: function () { return ul(['Food-grade only: HDPE plastic (#2), containers sold for water, glass, stainless steel or glazed ceramic.', 'Never one that held chemicals, even rinsed. Milk jugs break down and are hard to clean: plant water only.', 'Secondhand first: food-grade barrels and jugs turn up free from bakeries, juice and soda bottlers, and on Craigslist, Facebook Marketplace and Buy Nothing. Ask what was in them.']) +
            old('Unglazed clay pots keep water cool: a little seeps through the walls and evaporates, carrying heat away.') +
            accs(
              acc('invest land', 'More space', 'Drums, totes and cisterns', '<p>A 55-gallon drum full of water weighs about 460 lb: fill it where it will stay and use a hand pump or siphon. 275-gallon IBC totes work for garden water; for drinking, only food-grade ones, covered from light.</p>'),
              acc('nohome', 'On the move', 'What to carry', '<p>A gallon weighs about 8.3 lb. Two or three sturdy refillable bottles plus a collapsible pouch usually beat one big jug.</p>')
            ); } },
          { id: 'where', short: 'Where', title: 'Where to keep it', html: function () { return '<p>Cool, dark and away from fumes. Gasoline, paint, pesticides and cleaners can pass through plastic into the water. Spread it around, so one damaged spot doesn’t take it all.</p>' +
            accs(acc('portable', 'Small spaces', 'Hiding spots indoors', '<p>Under beds, the back of closets, under the sink (away from cleaners), flat bricks behind the couch.</p>')); } },
          { id: 'algae', short: 'Algae', title: 'Beware green in the sun', html: function () { return '<p>Algae only need light, water and a few nutrients. A clear jug on a sunny porch can turn green in weeks.</p>' +
            ul(['Opaque containers, or cover clear ones and keep them in the dark.', 'Rain barrels: opaque, lidded and screened.', 'Pet bowls and bottles by a window grow the same film in miniature.']) +
            old('Standing water breeds mosquitoes: eggs can become biting adults in about a week. Empty, cover or keep water moving.') +
            tryit('Walk the house and yard with a child and find every place water sits in sunlight or stands still. Cover, empty or move each one.') +
            links('<a href="#lens-relationships/special/family">Relationships → Family animals</a> · <a href="#lens-toxins/living/blooms">Poisons → Water that blooms</a> · ' + a('purify/crisis', '4.4 Sunlight as a tool') + ' (the short-trip exception)'); } },
          { id: 'fresh', short: 'Fresh', title: 'Keeping it fresh', html: function () { return ul(['<b>Before filling:</b> wash with soap, rinse, swish with a little unscented bleach and water (about 1 tsp per quart), then rinse.', '<b>Label:</b> “filled on” date. Refresh tap water you bottled yourself every 6 months; sealed bottled water lasts to its date.', '<b>Pour, don’t dip:</b> a spigot or pouring keeps hands and cups out of the supply.', 'Old stored water makes great plant water.']); } },
          { id: 'amount', short: 'How much', title: 'How much to keep', html: function () { return '<p>A short-term bare minimum is about <b>1 gallon per person per day</b>. For longer stretches, humanitarian groups plan around <b>4 gallons (15 L)</b> to cover cooking and washing. Three days is a start; two weeks gives real ease. There’s no rush: a few jugs a month adds up.</p>' +
            '<div class="wa-tool"><b class="wa-tool-t">Storage planner</b><div class="wa-row">' +
            '<label class="wa-f">People<input type="number" data-wa="store" id="wa-ppl" min="1" value="' + people() + '"></label>' +
            '<label class="wa-f">Days<select data-wa="store" id="wa-days"><option value="3">3 days</option><option value="7">1 week</option><option value="14" selected>2 weeks</option></select></label>' +
            '<label class="wa-f">Level<select data-wa="store" id="wa-lvl"><option value="1">Bare minimum (1 gal)</option><option value="4">Comfortable (4 gal)</option></select></label>' +
            '<label class="wa-chk"><input type="checkbox" data-wa="store" id="wa-hot"> Hot weather, nursing or sick</label></div>' +
            '<div class="wa-out" id="wa-store-out" aria-live="polite"></div></div>' + links('<a href="#lens-emergency-prep">Emergency prep</a>'); } }
        ] },

      { id: 'purify', num: 4, word: 'Purify', sub: 'From a pitcher to an aquifer',
        lede: 'No single method does everything, and the priciest one isn’t automatically right. Start with what’s in your water, then choose the simplest thing that handles it, at whatever scale your life has right now.',
        subs: [
          { id: 'match', short: 'Match', title: 'Match the method to the problem', html: function () { return '<p>A filter’s box can claim anything. An independent certification (in North America, NSF/ANSI: <b>42</b> taste, <b>53</b> health contaminants like lead, <b>58</b> reverse osmosis, <b>401</b> newer chemicals) means someone outside the company tested that claim. NSF’s list is free to search by model number.</p>' +
            table(['Method', 'Germs', 'Lead', 'Nitrate', 'PFAS', 'Taste'], [
              ['Boiling', '[y]Yes', '[n]No', '[n]No (concentrates)', '[n]No', '[n]—'], ['Carbon pitcher / faucet', '[n]No', '[p]If certified 53', '[n]No', '[p]Some models', '[y]Yes'],
              ['Hollow-fiber squeeze', '[p]Bacteria &amp; parasites', '[n]No', '[n]No', '[n]No', '[n]No'], ['Gravity ceramic + carbon', '[p]Bacteria &amp; parasites', '[p]Check cert', '[n]No', '[p]Check cert', '[y]Yes'],
              ['Reverse osmosis', '[p]Most', '[y]Yes', '[y]Yes', '[y]Yes', '[y]Yes'], ['UV light', '[y]Clear water only', '[n]No', '[n]No', '[n]No', '[n]No'], ['Slow sand / biosand', '[p]Most', '[n]No', '[n]No', '[n]No', '[p]Some']],
              'Green = handles it · amber = depends on model or setup · red = doesn’t.') +
            '<div class="wa-tool"><b class="wa-tool-t">Which method?</b><label class="wa-f">I’m worried about<select data-wa="filt" id="wa-worry">' +
            '<option value="taste">Chlorine taste or smell</option><option value="lead">Lead (older pipes)</option><option value="microbes">Germs (wild water, wells, outages)</option>' +
            '<option value="nitrate">Nitrate (farm areas, wells)</option><option value="pfas">PFAS (“forever chemicals”)</option><option value="hard">Hard water, scale</option></select></label>' +
            '<div class="wa-out" id="wa-filt-out" aria-live="polite"></div></div>'; } },
          { id: 'everyday', short: 'Everyday', title: 'Everyday filtering', html: function () { return ul(['<b>Free first:</b> an open pitcher in the fridge overnight lets chlorine leave (not chloramine). Run the cold tap after water sits, cook with cold, clean the aerator.', '<b>Secondhand first:</b> ask Buy Nothing groups and neighbors, then eBay, Craigslist, Facebook Marketplace and OfferUp. Used body, new insides: always fit new cartridges and sanitize the housing. Check that replacement filters are still sold.', '<b>Care:</b> write the install date on every cartridge. An old filter can stop working or grow bacteria.']) +
            accs(
              acc('hasRO', 'You have', 'You already have reverse osmosis: what’s next', '<p>Drinking water at home is covered, and that’s a real foundation. From here the direction is resilience and sharing, not more gear:</p>' + ul([
                '<b>Older pipes?</b> In an older building, countertop RO is a sound choice for your family’s health while you live there: it handles whatever the last stretch of pipe adds, and it moves with you.',
                '<b>Ask for the lasting fix.</b> A friendly request to whoever owns the building for a building-wide lead test, replacing old service lines, or a filter at the main would clean everyone’s water for good. ' + '<a href="#lens-relationships/request">The Request tool</a> helps with the wording.',
                '<b>Share.</b> Ask neighbors whether they know their water’s safe. Offer filtered water, split a lab test, or pass along what you’ve learned. <a href="#lens-relationships/neighbors">Neighbors</a> has ideas for sharing a place well.',
                '<b>Step a little off the grid.</b> Catch rain on a balcony or in a barrel (if allowed) for plants, mopping and flushing; reuse the RO’s reject water the same way.',
                '<b>Put minerals back</b> if the water tastes flat (below), and compare filters with bottles in ' + a('sources/table', 'the sources table') + '.'])),
              acc('hasCarbon', 'You have', 'You already have a carbon filter', '<p>Check its certification against your water report: a pitcher certified only for taste (NSF 42) won’t touch lead. Change cartridges on time. If your pipes are old or the report shows lead, PFAS or nitrate, the table above shows what to add.</p>'),
              acc('oldpipes kids', 'Older pipes', 'Pipes put in before 1986', '<p>Lead solder and lead service lines were common before 1986. Run the cold tap until it feels colder after water sits for hours, cook and mix formula with cold water, and do a first-draw lead test (' + a('testing/kits', '5.4') + '). Until you know, a filter certified for lead (NSF 53) or reverse osmosis is the careful choice, especially with children or pregnancy in the house.</p>'),
              acc('portable', 'Can’t change pipes', 'Reverse osmosis as a stop-gap', '<p>When testing shows lead, nitrate or PFAS and the pipes aren’t yours to change, a countertop reverse osmosis unit (no drilling) removes most of them and moves with you. It sends some water down the drain: catch that for mopping or flushing.</p><p>Still worth a friendly request to whoever owns the building or runs the water: fixes upstream help everyone.</p>'),
              acc('hasRO portable invest', 'After RO', 'Putting minerals back', '<p>RO water is very low in calcium and magnesium, so it tastes flat. Most minerals come from food, so this is mostly about taste and a small top-up, and water that tastes good gets drunk.</p>' + ul(['A remineralizing cartridge after the membrane.', 'Trace-mineral drops, per the label.', 'A small pinch of mineral salt per pitcher, to taste.']) + '<p>A cheap TDS meter shows when the membrane is tiring: the number creeps up.</p>'),
              acc('invest', 'Rooted', 'Under-sink and whole-house', '<p>Under-sink carbon or RO at the kitchen tap covers drinking and cooking. Whole-house sediment and carbon help with taste and shower chlorine. If lead is the concern, replacing the service line fixes the source.</p>')
            ); } },
          { id: 'permanent', short: 'Permanent', title: 'Permanent systems', html: function () { return '<p>Safe water at the tap is step one. The longer arc runs toward water that doesn’t hang on one pipe. You don’t need to leave the grid; each step is the right direction:</p>' +
            truths([['1 · Clean at the tap', 'A filter matched to your water.'], ['2 · Water you catch', 'Rain for plants, mopping and flushing.'], ['3 · Water you share', 'Tests, filters and knowledge with neighbors.'], ['4 · Water you store and treat', 'Cisterns, wells and filter trains, where you can shape the place.']]) +
            accs(
              acc('well land', 'Well', 'A well water train', '<p>Well → pressure tank → sediment filter → carbon → UV light where water enters the house. Add a treatment for whatever testing finds (an iron filter, RO at the kitchen sink for nitrate or arsenic).</p>'),
              acc('land catch', 'Rain', 'Rain to drinking water', '<p>First flush → screened, dark cistern → floating intake (draws from just under the surface, above settled sediment) → sediment → carbon → UV. Test before trusting it.</p>'),
              acc('land nohome', 'Low-tech', 'Slow sand and biosand filters', '<p>Water trickles through fine sand; a living layer on top (the “schmutzdecke”) eats germs. Buildable from a barrel, gravel and sand, no power. Removes most germs and cloudiness, not chemicals. Takes a few weeks to mature.</p>' + old('Sand, charcoal, settling and sunlight are some of the oldest water tools people have.')),
              acc('land invest dry', 'Land', 'Feeding the aquifer', '<p>The longest-term system: help rain sink in instead of running off. Swales, rain gardens, mulch and less pavement recharge the groundwater that wells and springs draw from, for everyone downhill too.</p>' + links('<a href="#lens-gardening">Growing</a> · <a href="#lens-weather">Weather</a> · <a href="#lens-death-seasons">Death &amp; cycles</a>'))
            ); } },
          { id: 'crisis', short: 'Crisis', title: 'Crisis: boil, bleach, sun', html: function () { return '<p>These keep people alive for days when the usual systems stop. They aren’t meant to be how we drink every day.</p>' +
            '<ol><li><b>Settle:</b> let cloudy water sit, pour off the clearer top.</li><li><b>Strain:</b> through clean cloth, a coffee filter or paper towel.</li><li><b>Boil:</b> a full rolling boil kills germs. Many people keep it boiling for 1 minute to be sure (3 minutes at high altitude).</li></ol>' +
            '<p>Boiling won’t remove fuel, chemicals, metals or algae toxins. If a source may have those, choose another one.</p>' +
            old('Boiling water into tea, soup and broth made doubtful water safe long before anyone knew about germs.') +
            accs(
              acc('nohome', 'Can’t boil', 'The actual bleach situation',
                '<div class="wa-cols"><div class="wa-note"><b>What it does</b>' + ul(['Kills most bacteria and viruses in clear water.', 'Plain, unscented bleach only (about 6–8%). No scented, splash-less or color-safe.', 'Stir, wait 30 minutes. A slight chlorine smell means it worked. No smell? Repeat, wait 15 more.']) + '</div>' +
                '<div class="wa-note"><b>What it doesn’t</b>' + ul(['Doesn’t reliably kill Cryptosporidium. Boiling does.', 'Doesn’t remove lead, nitrate, fuel or PFAS.', 'With muddy or leafy water it forms by-products. Settle and strain first.', 'Loses strength over months: date the bottle, replace yearly.']) + '</div>' +
                '<div class="wa-note"><b>Why it’s for crises</b><p>Dosing jugs by hand every day is guesswork on strength, timing and by-products. For everyday life, tap or a matched filter is gentler and tastier.</p><p><b>Safety:</b> keep bleach away from ammonia and vinegar. Mixed, they release toxic gas.</p></div></div>' +
                '<div class="wa-tool"><b class="wa-tool-t">Bleach drops</b><div class="wa-row">' +
                '<label class="wa-f">Water<select data-wa="bleach" id="wa-gal"><option value="1">1 gallon</option><option value="2">2 gallons</option><option value="4">4 gallons</option><option value="8">8 gallons</option></select></label>' +
                '<label class="wa-f">Strength<select data-wa="bleach" id="wa-str"><option value="6">6% (most common)</option><option value="8.25">8.25%</option></select></label>' +
                '<label class="wa-chk"><input type="checkbox" data-wa="bleach" id="wa-cloudy"> Cloudy or very cold</label></div>' +
                '<div class="wa-out" id="wa-bleach-out" aria-live="polite"></div></div>'),
              acc('nohome', 'Free', 'Sunlight as a tool (SODIS)', '<p>Clear water in a clear plastic bottle (2 L or smaller), lying in full sun for about 6 hours (2 days if cloudy), is disinfected by UV. The flip side of ' + a('storage/algae', '3.3') + ': a short trip in the sun cleans; a long stay grows algae.</p>'),
              acc('crisis', 'Notices', 'During a boil-water notice', '<p>Use boiled or bottled water for drinking, brushing teeth, ice, baby bottles and washing produce. Showering is fine; keep it out of your mouth. When it lifts, run taps for a few minutes, empty the ice maker and change fridge and pitcher filters.</p>')
            ) + links('<a href="#lens-emergency-prep">Emergency prep</a> · <a href="#lens-first-aid">First aid</a> · <a href="#lens-cleaning">Cleaning</a>'); } },
          { id: 'nohome', short: 'No fixed home', title: 'With no fixed home', html: function () { return kind('Being unhoused makes all of this much harder: more carrying, more asking, fewer places to wash and store. These are real options, cheapest first.') +
            ul(['<b>Free:</b> refill points (' + a('sources/taps', '2.2') + '), SODIS with clear bottles, rinsing bottles with hot water and soap at a library or day center.', '<b>A few dollars:</b> a small dropper bottle of plain bleach (date it).', '<b>Around $10–40:</b> a squeeze hollow-fiber filter for bacteria and parasites. Buy this one new (a used one can’t be checked for cracks, and boiling or freezing damages it); keep it from freezing.', '<b>Tablets:</b> chlorine dioxide tablets are light and handle Cryptosporidium too, with a longer wait (check the label, up to 4 hours).', '<b>Heat:</b> drink before you’re thirsty; shade and a slow pace stretch water further.']) +
            links('<a href="#lens-first-aid">First aid</a> · <a href="#lens-body-care">Body care</a>'); } }
        ] },

      { id: 'testing', num: 5, word: 'Testing', sub: 'Knowing it’s safe',
        lede: 'Your senses and surroundings catch a lot; the serious problems are often invisible. Testing turns worry into a clear picture, and much of it is free.',
        subs: [
          { id: 'safe', short: 'Safe', title: 'What “safe” means', html: function () { return ul(['<b>Germs:</b> bacteria, viruses, parasites. Invisible; mostly from animal or human waste. Act fast (hours to days).', '<b>Chemicals and metals:</b> lead, nitrate, arsenic, pesticides, PFAS. Invisible, often tasteless; they add up over years.', '<b>Nuisances:</b> chlorine taste, cloudiness, scale, smells. Easy to notice, usually harmless.']) +
            home('Sparkling stream water can carry Giardia; cloudy tap water after a repair is often just air bubbles that clear from the bottom up.'); } },
          { id: 'signs', short: 'Signs', title: 'Reading the signs around you', html: function () { return table(['You notice', 'Often means'], [
              ['Rotten-egg smell', 'Hydrogen sulfide, or bacteria in a water heater or well'], ['Orange or red stains', 'Iron'], ['Blue-green stains', 'Copper from corroding pipes'], ['Metallic taste', 'Metals from pipes; worth a lead test'],
              ['Fuel or chemical smell', 'Contamination. Stop drinking it and report it'], ['Mayfly, stonefly or caddisfly larvae under creek stones', 'Clean, well-oxygenated water (they’re sensitive to pollution)'],
              ['Only worms, leeches and slime', 'Polluted or low-oxygen water'], ['Fields, feedlots, mines or factories upstream', 'Possible chemicals no sense can detect: test or choose another source']]) +
            '<p><b>Watch what animals drink.</b> Many animals smell far better than we do, so an animal who sniffs a source and walks away may be telling you something. It’s a clue, not a test: animals will drink polluted water when it’s all they have, so tracks at the edge don’t prove it’s clean.</p>' +
            home('If an animal you live with refuses the tap or a new source but drinks happily from filtered or bottled water, follow their lead. It may only be chlorine, but switch for now and test (' + a('testing/kits', '5.4') + ').') +
            tryit('Turn over a few stones in a creek with a child and count the little creatures clinging to them. That’s a real field test.') + links('<a href="#lens-identification">Identification &amp; foraging</a> · <a href="#lens-relationships/special/captive">Relationships: Captive animals</a> (reading their signals)'); } },
          { id: 'report', short: 'Reports &amp; maps', title: 'Water reports and maps', html: function () { return '<p>Every public water system publishes a yearly report of what it found. Search your water provider’s name + “water quality report.” Each line shows the <b>legal limit</b> and the <b>health goal</b>. Goals are set on health alone and are often stricter (for lead, the goal is zero), so compare to those.</p>' +
            '<p>Maps go further: they show where water is, and what’s been found in it, across a whole region.</p>' +
            '<div class="wa-cols"><div class="wa-note"><b>Where water is</b>' + ul(['Reservoir and snowpack levels (the state’s CDEC data exchange).', 'The US Drought Monitor, updated weekly.', 'Groundwater basins and how stressed they are (the state’s SGMA portal).']) + '</div>' +
            '<div class="wa-note"><b>What’s in it</b>' + ul(['The SAFER drinking water dashboard: which water systems are failing or at risk.', 'Drinking Water Watch: each public system’s test results and violations.', 'GAMA: groundwater test results, including some private wells.', 'CalEnviroScreen: drinking-water contaminant scores by neighborhood.', 'The harmful algal bloom map for lakes and rivers.']) + '</div>' +
            '<div class="wa-note"><b>Who tested it</b>' + ul(['Public water systems, on required schedules, through state-certified labs.', 'Researchers and state programs (GAMA), for groundwater.', 'Counties, for beaches.', 'Well owners themselves, for private wells.', 'Nonprofits like the EWG Tap Water Database compare the same results to stricter health guidelines.']) + '</div></div>' +
            table(['Maps show', 'Maps don’t show'], [
              ['Results from sampling points in a system', 'Your building’s pipes: lead usually comes from the last stretch'],
              ['Contaminants on the testing list', 'Anything not tested for. “No data” isn’t “clean”'],
              ['Averages, often over a year', 'Short spikes between tests'],
              ['Public water systems', 'Most private wells and very small systems (under 15 connections)']]) +
            '<p><b>What to look for:</b> your system’s name, any violations or “at-risk” status, anything near or above a health goal (not just the legal limit), nitrate, arsenic or uranium in groundwater areas, how recent the data is, and what sits upstream or nearby: farms, feedlots, mines, factories.</p>' +
            ca('The State Water Board runs SAFER, Drinking Water Watch and GAMA, and utilities publish lead service line maps; ask your provider about yours.') +
            tryit('Find your water system on Drinking Water Watch and the SAFER map, then compare with your yearly report. Circle anything above its health goal and bring it to ' + a('purify/match', '4.1') + '.') +
            links('<a href="#lens-governance">Governance</a>: who decides, and how to ask'); } },
          { id: 'kits', short: 'Kits &amp; labs', title: 'Kits and labs', html: function () { return ul(['<b>TDS meter</b> (a few dollars): dissolved minerals. Good for checking an RO filter; it can’t see germs, lead or PFAS.', '<b>Test strips:</b> rough reads for hardness, pH, chlorine, nitrate. Good for spotting changes.', '<b>Certified lab:</b> the real answer for bacteria, lead, arsenic, PFAS. Ask your water provider or county first: many offer free or discounted kits.']) +
            ca('Look for labs accredited by the state’s ELAP program.') +
            accs(
              acc('well land', 'Wells', 'A yearly testing rhythm', '<p>Coliform bacteria and nitrate every year; arsenic, uranium and others every few years; again after floods, repairs or a change in taste.</p>'),
              acc('oldpipes portable kids', 'Older buildings', 'A first-draw lead test', '<p>Test water that sat in the pipes overnight. Lead matters most for children and pregnancy. Share results with neighbors in the building: one test can help everyone.</p>')
            ); } },
          { id: 'outdoors', short: 'Outdoors', title: 'Swimming and bathing outdoors', html: function () { return '<p>Rivers, lakes and the sea can be lovely places to wash and swim. A few checks keep it that way.</p>' +
            ul(['Skip it for 2–3 days after heavy rain, when sewage and street runoff wash in.', 'Skip water with scum, foam, oily sheen, dead fish or a chemical smell. When in doubt, stay out, and keep dogs out too.', 'Stay away from pipes, storm drains and industrial, farm or mining runoff.', 'Don’t swallow, cover cuts, rinse off afterwards.']) +
            ca('Heal the Bay’s Beach Report Card grades the coast weekly; the state’s harmful algal bloom map covers lakes and rivers.') +
            accs(
              acc('nohome land', 'Warm water', 'Hot springs and warm lakes', '<p>Warm fresh water can rarely carry an amoeba (Naegleria fowleri) that is dangerous if it goes up the nose. Keep your head above water or use a nose clip. Same reason to use boiled or distilled water, never plain tap, in a neti pot.</p>'),
              acc('land well', 'Clues', 'Reading fish advisories', '<p>A “don’t eat the fish” advisory points to mercury, PCBs or other chemicals in the water. Those mostly matter for eating fish, but they’re a signal to choose another spot for regular bathing and never to drink from it, even filtered.</p>')
            ) + links(a('sources/wild', '2.5 Rivers, lakes and the wild') + ' · Animal care'); } }
        ] },

      { id: 'costs', num: 6, word: 'Costs', sub: 'The household math',
        lede: 'Households already do this math in their heads at the store. Here it is on paper: what water costs in each form, what your household spends, and when an upgrade pays for itself.',
        subs: [
          { id: 'prices', short: 'Prices', title: 'What water costs', html: function () {
            var zip = prof().address;
            return '<p>The same gallon can cost a fraction of a cent or several dollars depending on how it reaches you. Enter prices you actually see' + (zip ? ' around <b>' + esc(zip) + '</b>' : '') + '; the examples are placeholders.</p>' +
            '<div class="wa-tool"><b class="wa-tool-t">Price per gallon</b><div class="wa-prices">' +
            priceRow('tap', 'Tap water', 'per billing unit (748 gal)', 15, 'Find “per unit” or “per CCF” on your bill; add the sewer rate if it’s charged per unit too.') +
            priceRow('case', 'Case of bottles', 'per case of 24 × 16.9 oz', 6) +
            priceRow('jug', 'Gallon jug', 'per gallon jug', 1.75) +
            priceRow('refill', 'Refill machine', 'per gallon, your own jug', 0.5) +
            priceRow('deliv', 'Delivered 5-gallon jug', 'per jug', 10) +
            '</div><div class="wa-out" id="wa-price-out" aria-live="polite"></div>' +
            '<p class="wa-legend">Local price lookups by ZIP code are planned. Until then, these stay as you type them.</p></div>'; } },
          { id: 'math', short: 'Your math', title: 'Your household math', html: function () { return '<p>Drinking and cooking water is the part most households buy or filter. Multiply by the price of each form:</p>' +
            '<div class="wa-tool"><b class="wa-tool-t">Monthly and yearly cost</b><div class="wa-row">' +
            '<label class="wa-f">People<input type="number" data-wa="cost" id="wa-cppl" min="1" value="' + people() + '"></label>' +
            '<label class="wa-f">Gallons each per day<input type="number" data-wa="cost" id="wa-cgal" min="0.25" step="0.25" value="1"></label></div>' +
            '<div class="wa-out" id="wa-math-out" aria-live="polite"></div></div>'; } },
          { id: 'onetime', short: 'One-time vs ongoing', title: 'One-time vs ongoing', html: function () { return '<p>A filter costs money once, then a little every year. Bottles cost money every week, forever. Compare the two:</p>' +
            '<div class="wa-tool"><b class="wa-tool-t">When does it pay for itself?</b><div class="wa-row">' +
            '<label class="wa-f">Instead of<select data-wa="cost" id="wa-from"><option value="case">Cases of bottles</option><option value="jug">Gallon jugs</option><option value="deliv">Delivered jugs</option><option value="refill">Refill machine</option></select></label>' +
            '<label class="wa-f">Filter upfront ($)<input type="number" data-wa="cost" id="wa-up" min="0" value="300"></label>' +
            '<label class="wa-f">Cartridges per year ($)<input type="number" data-wa="cost" id="wa-yr" min="0" value="80"></label></div>' +
            '<div class="wa-out" id="wa-pay-out" aria-live="polite"></div></div>' +
            '<p>Secondhand bodies with new cartridges cut the upfront number a lot (' + a('purify/everyday', '4.2') + '). The <a href="#plans/budget">Improvements &amp; budget plan</a> will add every need together, before and after each improvement.</p>'; } },
          { id: 'poverty', short: 'Expensive being poor', title: 'It’s expensive being poor', html: function () { return '<p>Small sizes cost the most per gallon. A filter costs more today and much less every month after, so without the upfront money, people keep paying the higher price. No storage space means no bulk buying. None of that is a personal failing; it’s how the prices are built.</p>' +
            ul(['Refill machines with your own jugs usually beat bottles by a wide margin.', 'Secondhand filter bodies with new cartridges lower the upfront cost.', 'Many California water utilities offer low-income discounts on water and sewer bills: ask yours.', 'Buying or borrowing together (next) spreads the upfront cost.']); } },
          { id: 'sharing', short: 'Sharing', title: 'Sharing the cost', html: function () { return ul(['<b>Split a lab test</b> with neighbors on the same pipes or well. One result helps the whole building.', '<b>One filter, several households:</b> a countertop unit in a shared kitchen, or filtered water offered next door.', '<b>Buy together:</b> cartridges, barrels and test kits cost less in bulk.', '<b>Ask together:</b> a building-wide request to the owner or utility carries more weight than one.']) +
            links('<a href="#lens-relationships/neighbors">Neighbors</a> · <a href="#plans/budget">Improvements &amp; budget plan</a>'); } }
        ] }
    ];
  }

  function people() {
    var p = prof(), n = (Number(p.adults) || 0) + (Number(p.kids) || 0);
    return n > 0 ? n : 2;
  }
  function priceRow(id, name, unit, val, hint) {
    return '<label class="wa-price"><span><b>' + name + '</b><small>' + unit + (hint ? '. ' + hint : '') + '</small></span>' +
      '<span class="wa-money">$<input type="number" data-wa="cost" id="wa-p-' + id + '" min="0" step="0.01" value="' + val + '"></span></label>';
  }

  /* ---------- tools ---------- */
  var DOSE = { '6': { 1: '8 drops', 2: '16 drops (¼ tsp)', 4: '⅓ tsp', 8: '⅔ tsp' }, '8.25': { 1: '6 drops', 2: '12 drops (⅛ tsp)', 4: '¼ tsp', 8: '½ tsp' } };
  var FILT = {
    taste: ['Open pitcher in the fridge overnight (free, chlorine only)', 'Carbon pitcher or faucet filter, NSF 42', 'Chloramine in your report? Carbon handles it'],
    lead: ['Flush, cook with cold, clean the aerator (free)', 'Carbon filter certified NSF 53 for lead', 'Countertop reverse osmosis, NSF 58'],
    microbes: ['Rolling boil (free)', 'Hollow-fiber or ceramic filter', 'UV for clear well water; bleach in a crisis'],
    nitrate: ['Boiling concentrates nitrate, so skip it', 'Reverse osmosis, NSF 58', 'Wells: test yearly'],
    pfas: ['Check your water report first (free)', 'Carbon certified for PFOA/PFOS (NSF 53 or 401)', 'Reverse osmosis, NSF 58'],
    hard: ['Safe to drink: it’s calcium and magnesium', 'Vinegar soak for kettles and showerheads (free)', 'A softener only if scale is damaging pipes']
  };
  var PRICE_NAMES = { tap: 'Tap water', case: 'Cases of bottles', jug: 'Gallon jugs', refill: 'Refill machine', deliv: 'Delivered jugs' };
  /* Remember typed prices in this browser so the math follows you between pages. */
  var PKEY = 'meeting-needs.water.prices.v1', saved = {};
  try { saved = JSON.parse(localStorage.getItem(PKEY) || '{}') || {}; } catch (e) { saved = {}; }
  function $(id) { return document.getElementById(id); }
  function num(id, d) { var el = $(id); var v = el ? parseFloat(el.value) : NaN; return isNaN(v) ? d : v; }
  function money(v) { return v < 0.1 ? (v * 100).toFixed(v < 0.01 ? 2 : 1) + '¢' : '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function perGallon() {
    function pr(id, d) { return $('wa-p-' + id) ? num('wa-p-' + id, d) : (saved[id] != null ? saved[id] : d); }
    return { tap: pr('tap', 15) / 748, case: pr('case', 6) / (24 * 16.9 / 128), jug: pr('jug', 1.75), refill: pr('refill', 0.5), deliv: pr('deliv', 10) / 5 };
  }
  function runTools() {
    if ($('wa-store-out')) {
      var p = Math.max(1, num('wa-ppl', 2)), d = num('wa-days', 14), l = num('wa-lvl', 1), h = $('wa-hot').checked ? 2 : 1, g = p * d * l * h;
      $('wa-store-out').innerHTML = '<strong>' + g + ' gallons</strong>About ' + Math.ceil(g / 5) + ' five-gallon jugs. A few a month gets you there.<small>' + p + ' people × ' + d + ' days × ' + l + ' gal' + (h > 1 ? ' × 2 for heat or extra needs' : '') + '. Add water for animals.</small>';
    }
    if ($('wa-bleach-out')) {
      var dose = DOSE[$('wa-str').value][$('wa-gal').value], dbl = $('wa-cloudy').checked;
      $('wa-bleach-out').innerHTML = '<strong>' + dose + (dbl ? ', doubled' : '') + '</strong>Stir, wait 30 minutes; a slight chlorine smell means it’s ready.<small>' + (dbl ? 'Settle and strain cloudy water first. ' : '') + 'About 2 drops of 6% bleach per liter, the dose used in household guidance worldwide.</small>';
    }
    if ($('wa-filt-out')) {
      $('wa-filt-out').innerHTML = '<ol>' + FILT[$('wa-worry').value].map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol><small>Secondhand where you can, with new cartridges (Purify · Everyday).</small>';
    }
    ['tap', 'case', 'jug', 'refill', 'deliv'].forEach(function (k) { if ($('wa-p-' + k)) saved[k] = num('wa-p-' + k, 0); });
    try { localStorage.setItem(PKEY, JSON.stringify(saved)); } catch (e) { /* storage blocked */ }
    var pg = perGallon();
    if ($('wa-price-out')) {
      $('wa-price-out').innerHTML = '<div class="wa-bars">' + Object.keys(PRICE_NAMES).map(function (k) {
        var x = pg[k] / Math.max(pg.case, pg.jug, pg.deliv, pg.refill, pg.tap);
        return '<div class="wa-bar"><span>' + PRICE_NAMES[k] + '</span><i style="width:' + Math.max(1, x * 100).toFixed(1) + '%"></i><b>' + money(pg[k]) + '/gal</b></div>';
      }).join('') + '</div><small>Bottled in cases costs about ' + Math.round(pg.case / pg.tap).toLocaleString() + '× the same gallon from the tap.</small>';
    }
    var gpd = Math.max(1, num('wa-cppl', people())) * Math.max(0, num('wa-cgal', 1)), month = gpd * 30.4;
    if ($('wa-math-out')) {
      $('wa-math-out').innerHTML = '<p class="wa-mathhead"><b>' + Math.round(month) + ' gallons a month</b> for drinking and cooking</p>' + '<div class="wa-tbl"><table><thead><tr><th>Form</th><th>Per month</th><th>Per year</th></tr></thead><tbody>' +
        Object.keys(PRICE_NAMES).map(function (k) { return '<tr><td>' + PRICE_NAMES[k] + '</td><td>' + money(pg[k] * month) + '</td><td>' + money(pg[k] * month * 12) + '</td></tr>'; }).join('') + '</tbody></table></div>';
    }
    if ($('wa-pay-out')) {
      var from = pg[$('wa-from').value] * month, filt = num('wa-yr', 80) / 12 + pg.tap * month, save = from - filt, up = num('wa-up', 300);
      $('wa-pay-out').innerHTML = save > 0
        ? '<strong>Pays for itself in about ' + Math.max(1, Math.ceil(up / save)) + ' months</strong>Then saves about ' + money(save * 12) + ' a year.<small>Now: ' + money(from) + '/month. With the filter: ' + money(filt) + '/month (cartridges plus tap water).</small>'
        : '<strong>Doesn’t pay back on cost alone</strong>Your current option is already about as cheap per month. Health, taste and fewer bottles may still make it worth it.';
    }
  }
  document.addEventListener('input', function (e) { if (e.target.closest && e.target.closest('[data-wa]')) runTools(); });
  document.addEventListener('change', function (e) { if (e.target.closest && e.target.closest('[data-wa]')) runTools(); });

  /* ---------- profile panel: what's on file, and where to change it ---------- */
  function onFile() {
    var p = prof(), O = mn().options || {}, src = p.sources || {}, rows = [];
    var srcs = (O.sources || []).filter(function (o) { return src[o.id]; }).map(function (o) { return o.single ? o.label : o.label + ' (' + src[o.id].toLowerCase() + ')'; });
    if (srcs.length) rows.push(['Water sources', srcs.join(', ')]);
    if ((p.filters || []).length) rows.push(['Filters you have', p.filters.join(', ')]);
    if (p.pipes) rows.push(['Pipes', p.pipes]);
    if (p.rain) rows.push(['Rain or snow', p.rain]);
    var place = [p.home, p.stay, p.shape].filter(Boolean);
    if (place.length) rows.push(['Place', place.join(' · ')]);
    return rows;
  }
  function panel() {
    var rows = onFile();
    if (!rows.length) {
      return '<div class="wa-sit"><span class="eyebrow">Tailor this lens</span><p>A few questions in your Profile’s Water section open the parts that fit your life. Everything here stays open to everyone.</p><a class="btn personal sm" href="#profile/water">Answer in Profile</a></div>';
    }
    return '<div class="wa-sit"><span class="eyebrow">Tailored to your profile</span><p>Sections for you are open and marked <span class="wa-foryou">For you</span>.</p>' +
      '<span class="wa-review"><a href="#profile/water" aria-describedby="wa-onfile">Review your profile’s water subsection</a>' +
      '<span class="wa-pop" id="wa-onfile" role="tooltip"><span class="eyebrow">On file</span>' + rows.map(function (r) { return '<span class="wa-pop-row"><b>' + esc(r[0]) + '</b>' + esc(r[1]) + '</span>'; }).join('') +
      '<span class="wa-pop-foot">Changed something, like a new safe tap? Update it in your Profile.</span></span></span></div>';
  }

  /* ======================================================================
     v2: an overview, then five units: 1 Use · 2 Sources · 3 Containers · 4 Purify · 5 Test · Your abilities.
     Numbers carry forward: the Use calculator feeds Sources, Containers, Purify, Test and the plan tray.
     Most section text comes from units() above (the v1 course), so nothing written there is lost.
     ====================================================================== */
  var SKEY = 'meeting-needs.water.v2';
  var S = {};
  try { S = JSON.parse(localStorage.getItem(SKEY) || '{}') || {}; } catch (e) { S = {}; }
  function defaults() {
    var p = prof(), ad = Number(p.adults) || 0, kd = Number(p.kids) || 0;
    S.q = Object.assign({ adults: ad || 2, kids: kd, babies: 0, dogs: 0, cats: 0, hens: 0, pots: 4, beds: 0, nursing: 0, preg: 0, loads: 3, homes: 1 }, S.q || {});
    S.how = S.how || {}; S.flags = S.flags || {}; S.badges = S.badges || {}; S.last = S.last || {};
    S.plan = S.plan || { tap: 1 }; S.pur = S.pur || {}; S.test = S.test || { report: 1 };
    S.place = Object.assign({ climate: '18|7', spout: 250, roof: 1200 }, S.place || {});
    S.keep = Object.assign({ days: 14, rain: 'garden', second: 0 }, S.keep || {});
  }
  defaults();
  function saveS() { try { localStorage.setItem(SKEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ } }
  function r1(n) { return n >= 100 ? Math.round(n).toLocaleString('en-US') : (Math.round(n * 10) / 10).toString(); }
  function usd(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
  var _units = null; function UNITS() { return _units || (_units = units()); }
  function OLD(u, s) { var x = UNITS().filter(function (v) { return v.id === u; })[0]; var y = x && x.subs.filter(function (v) { return v.id === s; })[0]; return y ? y.html : function () { return ''; }; }
  function OLDTAKE(u) { var x = UNITS().filter(function (v) { return v.id === u; })[0]; return x && x.take; }

  /* Old links keep working: v1 unit and section ids map onto the new steps. */
  var ALIAS = { uses: 'use', storage: 'containers', testing: 'test', costs: 'sources', cows: 'sources/take' };
  var SUBALIAS = { 'use/needs': 'use/calc', 'use/system': 'think/loop', 'containers/containers': 'containers/kinds', 'containers/amount': 'containers/keep',
    'sources/math': 'use/calc', 'sources/onetime': 'sources/table', 'sources/poverty': 'sources/fair', 'sources/sharing': 'sources/fair' };
  /* ---------- Step 2: Use calculator ---------- */
  function P() { return S.q.adults + S.q.kids; }
  function heat() { return S.flags.heat ? 1.5 : 1; }
  var GRADE = { 1: 'Drinking-clean', 2: 'Clean', 3: 'Gray is fine' };
  /* opts: [label, value, reuse] · reuse 'g' = shower/sink gray water, 'k' = kitchen rinse or unsalted cooking water */
  var TASKS = [
    { id: 'drink', t: 'Drinking', g: 1, who: 'People (food covers the rest)', opts: [['Typical meals: about 20% of water from food', 0.2], ['Lots of fresh fruit and veg: about 30%', 0.3], ['Mostly dry or salty food: about 10%', 0.1]],
      f: function (m) { var q = S.q; return ((q.adults * 0.85 + q.kids * 0.53) * (1 - m) + q.babies * 0.25 + q.nursing * 0.25 + q.preg * 0.08) * heat(); } },
    { id: 'pets', t: 'Animals’ bowls', g: 1, who: 'Dogs, cats, chickens', opts: [['Fresh every day', 1]], f: function () { var q = S.q; return (q.dogs * 0.4 + q.cats * 0.07 + q.hens * 0.12) * heat(); } },
    { id: 'cook', t: 'Cooking', g: 1, who: 'Adults &amp; kids', opts: [['Boiling, soaking, soups', 0.5], ['Mostly raw or quick meals', 0.25]], f: function (m) { return P() * m; } },
    { id: 'food', t: 'Washing food', g: 1, who: 'Adults &amp; kids', opts: [['In a bowl (catch the rinse water)', 0.25], ['Under a running tap', 1]], f: function (m) { return P() * m; } },
    { id: 'teeth', t: 'Brushing teeth', g: 1, who: 'Twice a day each', opts: [['A cup, tap off', 0.1], ['Tap running', 4]], f: function (m) { return P() * m; } },
    { id: 'hands', t: 'Washing hands', g: 2, who: 'About 6 times a day each', opts: [['Tap off while soaping', 0.8], ['Tap running', 2.5]], f: function (m) { return P() * m; } },
    { id: 'bath', t: 'Bathing', g: 2, who: 'Each person; babies in a basin', opts: [['8-minute shower, daily', 16], ['4-minute shower, daily', 8], ['Shower every other day', 8], ['Bucket bath, daily', 3], ['Sponge bath, daily', 1]],
      f: function (m) { return S.q.adults * m + S.q.kids * m * 0.6 + S.q.babies * 0.5; } },
    { id: 'petbath', t: 'Animals’ baths', g: 2, who: 'Dogs (cats groom themselves; chickens dust-bathe)', opts: [['Tub bath once a month (~15 gal)', 15 / 30], ['Bucket or hose once a month (~5 gal)', 5 / 30], ['Tub bath every 2 weeks', 15 / 14], ['Rarely needed', 0]], f: function (m) { return S.q.dogs * m; } },
    { id: 'dish', t: 'Dishes', g: 2, who: 'The household', opts: [['Basin wash', 4], ['Efficient dishwasher', 4], ['Running tap', 20]], f: function (m) { return P() + S.q.babies > 0 ? m * Math.max(1, P() / 3) : 0; } },
    { id: 'laundry', t: 'Laundry', g: 2, who: 'loads', opts: [['Efficient machine (~14 gal a load)', 14], ['Older top-loader (~35 gal)', 35], ['By hand (~8 gal)', 8]], f: function (m) { return S.q.loads * m / 7; } },
    { id: 'mop', t: 'Cleaning &amp; mopping', g: 2, who: 'The household', opts: [['Fresh water, a bucket a day', 1], ['Fresh water, a bucket a week', 0.15], ['Veggie-rinse water, a bucket a day', 1, 'k'], ['Veggie-rinse water, a bucket a week', 0.15, 'k']], f: function (m) { return P() > 0 ? m : 0; } },
    { id: 'flush', t: 'Flushing', g: 3, who: 'About 5 a day each', opts: [['Newer toilet (1.3 gal)', 1.3], ['Older toilet (3.5 gal)', 3.5], ['A bucket of shower or sink water (1.5 gal)', 1.5, 'g'], ['Compost toilet', 0]], f: function (m) { return P() * 5 * m; } },
    { id: 'pots', t: 'Houseplants &amp; pots', g: 3, who: 'Each pot, about 1½ cups a watering', opts: [['Once a week', 0.1 / 7], ['Twice a week', 0.2 / 7], ['3 times a week', 0.3 / 7], ['Once a week, with rinse or unsalted cooking water', 0.1 / 7, 'k'], ['Twice a week, with rinse or unsalted cooking water', 0.2 / 7, 'k'], ['3 times a week, with rinse or unsalted cooking water', 0.3 / 7, 'k']], f: function (m) { return S.q.pots * m; } },
    { id: 'beds', t: 'Veggie beds', g: 2, who: 'Each 4 × 8 ft bed, in season', opts: [['About 1 inch a week, hose or can', 2.8], ['Drip or ollas under mulch', 1.6]], f: function (m) { return S.q.beds * m; } }
  ];
  function opt(t) { var i = Math.min(t.opts.length - 1, Math.max(0, +(S.how[t.id] || 0))); return t.opts[i]; }
  function computeUse() {
    var U = { g1: 0, g2: 0, g3: 0, by: {}, want: { g: 0, k: 0 } };
    TASKS.forEach(function (t) { var o = opt(t), v = t.f(o[1]); U.by[t.id] = v; U['g' + t.g] += v; if (o[2]) U.want[o[2]] += v; });
    U.made = { g: (U.by.bath + U.by.hands + U.by.laundry) * 0.8, k: (+(S.how.food || 0) === 0 ? U.by.food : 0) + U.by.cook * 0.5 };
    U.reused = Math.min(U.want.g, U.made.g) + Math.min(U.want.k, U.made.k);
    U.total = U.g1 + U.g2 + U.g3; U.fresh = U.total - U.reused; U.people = P() + S.q.babies;
    return U;
  }
  function stp(k, label, hint, min) {
    return '<div class="wa2-stp"><span>' + label + (hint ? '<small>' + hint + '</small>' : '') + '</span>' +
      '<button type="button" data-w2-step="' + k + '" data-d="-1" data-min="' + (min || 0) + '" aria-label="One fewer: ' + label.replace(/<[^>]+>/g, '') + '">−</button><output data-w2-o="' + k + '">' + S.q[k] + '</output>' +
      '<button type="button" data-w2-step="' + k + '" data-d="1" aria-label="One more: ' + label.replace(/<[^>]+>/g, '') + '">+</button></div>';
  }
  function gchip(g) { return '<span class="wa2-grade wa2-g' + g + '"><i>' + g + '</i>' + GRADE[g] + '</span>'; }
  function htmlCalc() {
    var rows = TASKS.map(function (t) {
      var cur = Math.min(t.opts.length - 1, +(S.how[t.id] || 0));
      var how = t.opts.length > 1 ? '<select data-w2-how="' + t.id + '" aria-label="How: ' + t.t.replace(/&amp;/g, '&') + '">' + t.opts.map(function (o, i) { return '<option value="' + i + '"' + (i === cur ? ' selected' : '') + '>' + o[0] + (o[2] ? ' ♻' : '') + '</option>'; }).join('') + '</select>' : '<span>' + t.opts[0][0] + '</span>';
      var who = t.who === 'loads' ? '<div class="wa2-stp in"><button type="button" data-w2-step="loads" data-d="-1" aria-label="One fewer laundry load a week">−</button><output data-w2-o="loads">' + S.q.loads + '</output><button type="button" data-w2-step="loads" data-d="1" aria-label="One more laundry load a week">+</button><span>loads a week</span></div>' : '<span>' + t.who + '</span>';
      return '<tr><td class="first"><b>' + t.t + '</b></td><td data-l="How clean">' + gchip(t.g) + '</td><td data-l="How">' + how + '</td><td data-l="Who">' + who + '</td><td class="num" data-l="Gal / day" data-w2-v="' + t.id + '"></td></tr>';
    }).join('');
    return '<p>Most US homes use about <b>80 gallons per person a day</b>, indoors and out. Humanitarian groups plan around <b>4 gallons (15 liters)</b> per person for drinking, cooking and basic washing, and <b>1 gallon</b> is the short-term minimum. Most of what we use doesn’t need to be drinking-clean.</p>' +
      '<div class="wa2-who">' +
      '<fieldset><legend>People</legend>' + stp('adults', 'Adults &amp; teens') + stp('kids', 'Kids', 'about 2–12') + stp('babies', 'Babies on formula', 'breastfed babies: count the nursing parent below') + '</fieldset>' +
      '<fieldset><legend>Animals</legend>' + stp('dogs', 'Dogs', 'medium-sized') + stp('cats', 'Cats') + stp('hens', 'Chickens') + '</fieldset>' +
      '<fieldset><legend>Plants</legend>' + stp('pots', 'Houseplants &amp; pots') + stp('beds', 'Veggie beds', '4 × 8 ft each') + '</fieldset></div>' +
      '<details class="wa-acc wa2-special"><summary><span class="wa-who">Special cases</span><span class="wa-acc-t">Nursing, pregnancy, heat, illness and more</span></summary><div class="wa-in">' +
      '<div class="wa2-who"><fieldset><legend>Adds to drinking water</legend>' + stp('nursing', 'Nursing', 'about 4 extra cups a day') + stp('preg', 'Pregnant', 'about 1–2 extra cups a day') +
      '<label class="wa2-stp"><span>Hot weather or hard work<small>drinking about 1.5×</small></span><input type="checkbox" data-w2-flag="heat"' + (S.flags.heat ? ' checked' : '') + '></label></fieldset></div>' +
      ul(['<b>Babies under 6 months</b> get all their water from breast milk or formula; extra water can make a young baby seriously ill. From about 6 months, small sips: ½ to 1 cup a day.',
        '<b>Formula</b> needs drinking-clean water. When you’re unsure of it, boil it and let it cool.',
        '<b>Illness</b> (fever, vomiting, diarrhea) raises needs fast. Oral rehydration: 6 level tsp sugar + ½ tsp salt in 1 liter of clean water. Some kidney, heart and liver conditions call for drinking <i>less</i>; there, a doctor’s number comes first.',
        '<b>Older bodies</b> often feel thirst later than they need water. Drink on a rhythm: with meals, medicines and visits.',
        '<b>Medical equipment:</b> CPAP humidifiers use distilled water; home dialysis uses a lot. Ask the care team how much to keep on hand.',
        '<b>Cloth diapers, reusable pads, incontinence:</b> add laundry loads above, or a soak bucket.',
        '<b>Animals</b> drink more in heat and while nursing; keep bowls in shade and topped up.']) +
      '</div></details>' +
      '<div class="wa2-tbl"><table class="wa2-cards"><caption class="sr-only">Water per task, per day</caption><thead><tr><th scope="col">Task</th><th scope="col">How clean</th><th scope="col">How</th><th scope="col">Who</th><th scope="col" class="num">Gal / day</th></tr></thead><tbody>' + rows + '</tbody>' +
      '<tfoot><tr><td class="first" colspan="4">Your household, per day</td><td class="num" data-l="Total" data-w2-n="total"></td></tr></tfoot></table></div>' +
      '<p class="wa-legend">♻ = reuses water from another job (see ' + a('use/reuse', 'Reuse') + '). Amounts are rounded estimates; change the “how” to match your home.</p>' +
      '<div class="wa2-res">' +
      '<div class="wa2-r main"><span class="eyebrow">Your household</span><b data-w2-n="totalD"></b><span data-w2-n="pp"></span></div>' +
      '<div class="wa2-r"><span class="eyebrow">Fresh water needed</span><b data-w2-n="fresh"></b><span data-w2-n="reused"></span></div>' +
      '<div class="wa2-r"><span class="eyebrow">Grade 1 · drinking-clean</span><b data-w2-n="g1"></b><span>drink, cook, teeth, food, animals’ bowls</span></div>' +
      '<div class="wa2-r"><span class="eyebrow">Grade 2 · clean</span><b data-w2-n="g2"></b><span>bodies, dishes, laundry, cleaning, veggies</span></div>' +
      '<div class="wa2-r"><span class="eyebrow">Grade 3 · gray is fine</span><b data-w2-n="g3"></b><span>flushing, houseplants</span></div></div>' +
      '<div class="wa2-cmp" role="group" aria-label="Fresh water per person, compared">' +
      '<div class="wa2-cmp-row"><span>Short-term minimum</span><span class="wa2-bar"><i style="width:1.25%"></i></span><span>1 gal</span></div>' +
      '<div class="wa2-cmp-row"><span>Humanitarian baseline</span><span class="wa2-bar"><i style="width:5%"></i></span><span>4 gal</span></div>' +
      '<div class="wa2-cmp-row you"><span>Your household, per person</span><span class="wa2-bar"><i data-w2-bar="pp"></i></span><span data-w2-n="ppn"></span></div>' +
      '<div class="wa2-cmp-row"><span>Typical US home</span><span class="wa2-bar"><i style="width:100%"></i></span><span>80 gal</span></div></div>';
  }
  function htmlFood() {
    return '<p>About <b>20%</b> of the water a body takes in usually comes from food. Fresh produce is mostly water:</p>' +
      table(['Food', 'Water'], [['Cucumber, lettuce', 'about 96%'], ['Celery, zucchini, tomatoes', 'about 94–95%'], ['Watermelon, strawberries', 'about 91%'], ['Oranges, peaches', 'about 87–89%'], ['Apples, pears', 'about 84–86%'], ['Cooked rice, pasta, beans', 'about 60–70%'], ['Bread', 'about 35%'], ['Crackers, chips, nuts', 'under 5%']]) +
      '<p>A large cucumber holds about 1¼ cups of water. A day built around fresh fruit, vegetables, soups and stews can bring food’s share toward a third; a day of bread, crackers and salty snacks brings it down and adds thirst. Pick your kind of day in the Drinking row of the calculator to see the difference.</p>' +
      home('A bowl of cut watermelon or cucumber on a hot afternoon counts as water, and kids often take it more happily than a glass.');
  }
  function htmlReuse() {
    return '<p>Water can do more than one job before it goes back to the soil. Each pass moves it one grade down the ladder, so start with the cleanest job and hand it on.</p>' +
      ul(['<b>Shower warm-up</b> (the cold water while it heats) is still clean: catch it in a bucket for plants, mopping or the next flush.',
        '<b>Veggie-rinse water</b> from a bowl in the sink → houseplants or mopping.',
        '<b>Unsalted cooking water</b> (potatoes, steamed veg, unsalted pasta), cooled → plants. Salted water harms soil; starchy water sours, so use it within a day.',
        '<b>Bath and sink water</b> → flushing, or mulch around trees (' + a('use/gray', 'Gray water') + ').',
        '<b>Laundry water</b> → laundry-to-landscape, to fruit trees and mulch basins.',
        '<b>Reverse osmosis reject water</b> → mopping, flushing, plants (' + a('purify/everyday', 'Everyday filtering') + ').',
        '<b>Animals’ leftover bowl water</b> and <b>old stored water</b> → the garden (' + a('containers/fresh', 'Keeping it fresh') + ').']) +
      '<p>Pick a ♻ option for flushing, cleaning or houseplants in the calculator and <b>fresh water needed</b> drops.</p>' +
      '<div class="wa-note"><b>Earthships: one drop, four jobs</b><p>Earthships, the off-grid homes designed by architect Michael Reynolds around Taos, New Mexico, use each drop of rain up to four times: roof → cistern → filtered for drinking, sinks and showers → indoor planters that clean the gray water while growing food → toilet flushing → outdoor planters that take what’s left. You don’t need an earthship to borrow the idea: any home can use water twice.</p></div>' +
      old('When every drop was carried, every drop had a job: washing water went to the garden, dishwater to the animals’ trough or the fruit trees.');
  }

  /* ---------- Step 3: Sources ---------- */
  /* k: 1 right now, 2 a system, 3 land you tend · pk: price key from the price list · ease/hl/hd: 1–5, more is better for you · g: grade as it comes */
  var SRC = [
    { id: 'bottles', n: 'Store bottles', k: 1, up: 0, pk: 'case', ease: 5, hl: 2, hd: 1, g: 1, amt: 'buy', hv: ['the store', 'microplastics; still being studied', 'gone when they run out'], more: '<p><b>Requires</b>money each week, a store you can reach, a way to carry it.</p><p><b>Where the money goes</b>Some big brands are filtered city tap water. A later version breaks a dollar into source, bottler, shipping, store and parent company, so you can choose who you pay.</p>' },
    { id: 'refill', n: 'Refill station or water store', k: 1, up: 0, pk: 'refill', ease: 4, hl: 4, hd: 2, g: 1, amt: 'buy', hv: ['bring your own jugs', 'filtered; ask how often filters change', 'open hours'], more: '<p><b>Requires</b>clean jugs (' + a('containers/kinds', 'Containers') + '), a way to carry them. A gallon weighs about 8.3 lb.</p><p><b>Where the money goes</b>Often a local small business.</p>' },
    { id: 'public', n: 'Library, park and café water', k: 1, tags: ['point'], up: 0, ease: 2, hl: 4, hd: 1, g: 1, amt: 'carry', hv: ['walking and carrying', 'treated public water; old building pipes can add lead', 'open hours'], more: '<p>Libraries, parks, community and rec centers and transit stations have fountains; cafés and fast-food counters will often fill a bottle when asked. Day centers and shelters often have water, showers and laundry. Refill maps and apps show more.</p><p><b>Point someone here</b>Worth knowing by heart for anyone between homes, or anyone asking.</p>' },
    { id: '211', n: 'Call or text 211', k: 1, tags: ['point'], up: 0, ease: 3, hl: 4, hd: 1, g: 1, amt: 'carry', hv: ['one call', 'points to treated water', 'depends on local services'], more: '<p>Finds local water, showers, laundry and food.</p><p><b>Point someone here</b>The quickest thing to pass on.</p>' },
    { id: 'deliv', n: 'Delivered 5-gallon jugs', k: 2, up: 0, pk: 'deliv', ease: 5, hl: 3, hd: 1, g: 1, amt: 'buy', hv: ['to your door', 'plastic jugs, reused', 'the company’s schedule'], more: '<p><b>Requires</b>a dispenser or pump, and space for jugs.</p>' },
    { id: 'tap', n: 'Tap water', k: 2, up: 0, pk: 'tap', ease: 5, hl: 4, hd: 2, g: 1, amt: 'buy', hv: ['turn it on', 'treated and tested; read the yearly report', 'the utility holds the tap'], more: '<p><b>Requires</b>a home with a tap. Every public system publishes a yearly water quality report (' + a('test/report', 'Water reports') + ').</p><p><b>Where the money goes</b>Your water utility, usually public.</p>' },
    { id: 'ro', n: 'Tap + countertop reverse osmosis', k: 2, up: 250, pk: 'tap', yr: 90, ease: 4, hl: 5, hd: 3, g: 1, amt: 'buy', hv: ['fill a tank, change filters', 'removes most lead, nitrate, PFAS (look for NSF 58)', 'the utility still supplies it'], more: '<p><b>Requires</b>a tap, counter space, about $250 once (for example an AquaTru), or a friend’s to share. Optional trace-mineral drops (~$40) last a long time.</p><p><b>If</b> renting or moving often → portable, no drilling. <b>If</b> you own and stay → an under-sink unit is the same idea, out of sight.</p>' },
    { id: 'gray', n: 'Gray water from your own home', k: 2, up: 50, ease: 3, hl: 3, hd: 5, g: 3, amt: 'gray', hv: ['a bucket, or a laundry-to-landscape line', 'for soil and flushing only', 'yours'], more: '<p>Catch the shower warm-up in a bucket; run laundry water to mulch basins. Use within a day (' + a('use/gray', 'Gray water') + ').</p><p><b>Rules</b>In California, a simple laundry-to-landscape system needs no permit if it follows the plumbing code; anything bigger does.</p>' },
    { id: 'dehum', n: 'Dehumidifier or AC drip', k: 2, up: 0, ease: 4, hl: 2, hd: 4, g: 3, amt: 'dehum', hv: ['empty the tank', 'metals and germs from the coils', 'only on humid days'], more: '<p>Plants only: never for drinking, pets or washing food.</p>' },
    { id: 'spout', n: 'Rain from one downspout', k: 2, up: 120, ease: 4, hl: 3, hd: 4, g: 2, amt: 'spout', hv: ['a barrel, a first-flush diverter, a spigot', 'birds visit roofs: treat before drinking', 'depends on the weather'], more: '<p>Water the soil, not the leaves, on food plants. Boiling kills germs but doesn’t remove roof chemicals (' + a('sources/rain', 'Catching rain') + ').</p><p><b>Rules</b>California lets homes catch roof rain without a water right (2012), and many agencies offer rebates or free barrels. Elsewhere, search “<i>your state</i> rainwater collection law”; some states limit barrel size.</p>' },
    { id: 'cistern', n: 'Rain from the whole roof, into a cistern', k: 3, up: 6000, yr: 20, ease: 3, hl: 3, hd: 5, g: 2, amt: 'roof', hv: ['build once, clean gutters', 'treat before drinking', 'yours, within rainfall'], more: '<p>Gutters → first flush → screened, dark tank → filter and disinfect for drinking (' + a('purify/permanent', 'Permanent systems') + ').</p><p><b>Rules</b>Large tanks often need a building permit; check with the county.</p>' },
    { id: 'fog', n: 'Fog net', k: 3, tags: ['quest'], up: 100, ease: 2, hl: 3, hd: 4, g: 2, amt: 'fog', hv: ['mesh, two posts, a gutter, a bucket', 'treat before drinking', 'only in fog belts'], more: '<p>Fine shade-cloth mesh strung between posts; drops gather and run into a gutter. Used for real on foggy coasts in Chile and Morocco. Needs fog that rolls in often.</p><p><b>Requires</b>two posts, and something to drive them: a hammer, or a heavy rock. The same skill pitches a tent in the rain.</p>' },
    { id: 'dew', n: 'Dew catcher', k: 3, tags: ['quest'], up: 20, ease: 3, hl: 3, hd: 4, g: 2, amt: 'dew', hv: ['a cool, smooth surface at night', 'treat before drinking', 'clear, still nights'], more: '<p>Glass, sheet metal and metal roofs cool fast at night and gather dew; no plastic tarp needed. A lovely experiment, not a supply.</p>' },
    { id: 'spring', n: 'A spring', k: 3, up: 0, ease: 2, hl: 3, hd: 3, g: 2, amt: 'varies', hv: ['walking and carrying, or a spring box', 'often clean, but test it', 'shared; ask who’s upstream'], more: '<p><b>Rules</b>Springs can come with water rights and access limits; ask the county and whoever cares for the land (' + a('sources/wells', 'Wells and springs') + ').</p>' },
    { id: 'well', n: 'A well you tend', k: 3, up: 20000, yr: 150, ease: 4, hl: 4, hd: 5, g: 1, amt: 'well', hv: ['drilling once, then a pump', 'test yearly: arsenic, nitrate, bacteria', 'yours, shared with the aquifer'], more: '<p><b>Rules</b>Wells need a county permit. Drilling costs vary widely with depth.</p><p><b>Ally</b> County environmental health offices often have free or cheap well test kits.</p>' },
    { id: 'wild', n: 'Rivers and lakes', k: 3, up: 0, ease: 1, hl: 2, hd: 3, g: 2, amt: 'carry', hv: ['hauling', 'always purify; ask who’s upstream', 'shared'], more: '<p>Running over still, but towns, farms, roads and mines drain somewhere. Skip water with scum, sheen, foam or dead fish (' + a('sources/wild', 'Wild water') + ').</p>' }
  ];
  var KIND = { 1: ['Right now', 'now'], 2: ['A system', 'sys'], 3: ['Land you tend', 'land'] };
  var sortCol = 0, sortDir = 1;
  function climate() { var c = String(S.place.climate).split('|'); return { inch: +c[0], dry: +c[1] }; }
  function catchYr(area) { return Math.max(0, area) * climate().inch * 0.623 * 0.8; }
  function srcAmt(s, U) {
    switch (s.amt) {
      case 'buy': return { v: 1e6, t: 'as much as you pay for' };
      case 'carry': return { v: 2, t: 'what you can carry (a gallon weighs about 8.3 lb)' };
      case 'gray': return { v: U.made.g, t: 'about ' + r1(U.made.g) + ' gal/day from your showers, sinks and laundry' };
      case 'dehum': return { v: 1, t: 'a few gallons on humid days' };
      case 'spout': var y = catchYr(S.place.spout); return { v: y / 365, t: 'about ' + r1(y) + ' gal a year, mostly in the wet months' };
      case 'roof': var z = catchYr(S.place.roof); return { v: z / 365, t: 'about ' + r1(z) + ' gal a year' };
      case 'fog': return { v: 1, t: 'roughly ½–2 gal per square meter of mesh on a foggy day' };
      case 'dew': return { v: 0.1, t: 'a cup or two per square meter on a good night' };
      case 'well': return { v: 5000, t: 'often 5 or more gal a minute' };
      default: return { v: 3, t: 'a trickle to gallons a minute' };
    }
  }
  function srcCost(s, U, pg) { return (s.pk ? pg[s.pk] : 0) * U.g1 * 365 + (s.yr || 0); }
  function pips(n, label) { var x = ''; for (var i = 1; i <= 5; i++) x += '<i' + (i <= n ? ' class="on"' : '') + '></i>'; return '<span class="wa2-pips" role="img" aria-label="' + label + ': ' + n + ' of 5">' + x + '</span>'; }
  function srcRows(U) {
    var pg = perGallon(), rows = SRC.map(function (s) { return { s: s, a: srcAmt(s, U), c: srcCost(s, U, pg) }; });
    function key(r) { return [r.s.k, 0, r.s.up, r.c, r.s.ease, r.s.hl, r.s.hd, -r.s.g, r.a.v][sortCol]; }
    rows.sort(function (x, y) { return (key(x) - key(y)) * sortDir || SRC.indexOf(x.s) - SRC.indexOf(y.s); });
    return rows.map(function (r) {
      var s = r.s, tags = '<span class="wa2-tag ' + KIND[s.k][1] + '">' + KIND[s.k][0] + '</span>' + (s.tags || []).map(function (t) { return t === 'point' ? '<span class="wa2-tag point">Point someone here</span>' : '<span class="wa2-tag quest">Side quest</span>'; }).join('');
      return '<tr><td class="first"><details><summary>' + s.n + '</summary><div class="wa2-more">' + s.more + '</div></details>' + tags + '</td>' +
        '<td data-l="In my plan"><input type="checkbox" data-w2-plan="' + s.id + '" aria-label="Add ' + s.n + ' to my plan"' + (S.plan[s.id] ? ' checked' : '') + '></td>' +
        '<td class="num" data-l="Upfront">' + usd(s.up) + '</td>' +
        '<td class="num" data-l="Drinking water / yr">' + (s.pk || s.yr ? usd(r.c) : '$0') + '</td>' +
        '<td data-l="Ease"><span>' + pips(s.ease, 'Ease') + '<span class="wa2-pv">' + s.hv[0] + '</span></span></td>' +
        '<td data-l="Long-term health"><span>' + pips(s.hl, 'Long-term health') + '<span class="wa2-pv">' + s.hv[1] + '</span></span></td>' +
        '<td data-l="In your hands"><span>' + pips(s.hd, 'In your hands') + '<span class="wa2-pv">' + s.hv[2] + '</span></span></td>' +
        '<td data-l="As it comes">' + gchip(s.g) + '</td>' +
        '<td data-l="How much"><span>' + r.a.t + '</span></td></tr>';
    }).join('');
  }
  function htmlSrcTable() {
    var heads = [['Source', 0], ['In my plan'], ['Upfront', 2, 1], ['Drinking water / yr', 3, 1], ['Ease', 4], ['Long-term health', 5], ['In your hands', 6], ['As it comes', 7], ['How much', 8]];
    var c = String(S.place.climate);
    function o(v, t) { return '<option value="' + v + '"' + (c === v ? ' selected' : '') + '>' + t + '</option>'; }
    return '<p>From water you can get today, to water from a tap, to water from land you tend. Sort by whatever matters most right now. Squares: more is easier, healthier over the long run, or more in your hands. Open a source’s name for notes, rules and where the money goes.</p>' +
      '<p class="wa2-carry" data-w2-n="carrySrc"></p>' +
      '<div class="wa2-ctrl"><label>Your climate<select data-w2-place="climate">' + o('40|4', 'Rainy (about 40 in a year; ~4 dry months)') + o('18|7', 'Mediterranean, like much of California (about 18 in; ~7 dry months)') + o('50|1', 'Humid, rain all year (about 50 in)') + o('8|9', 'Desert (about 8 in; ~9 dry months)') + '</select></label>' +
      '<label>Roof area into one downspout (sq ft)<input type="number" min="0" step="50" inputmode="numeric" data-w2-place="spout" value="' + S.place.spout + '"></label>' +
      '<label>Whole roof (sq ft)<input type="number" min="0" step="100" inputmode="numeric" data-w2-place="roof" value="' + S.place.roof + '"></label></div>' +
      '<div class="wa2-sortbar"><label>Sort by <select data-w2-sortsel>' + heads.filter(function (h) { return h[1] != null; }).map(function (h) { return '<option value="' + h[1] + '">' + h[0] + '</option>'; }).join('') + '</select></label></div>' +
      '<div class="wa2-tbl wa2-wide"><table class="wa2-cards" id="wa2-src"><caption class="sr-only">Water sources, sortable</caption><thead><tr>' +
      heads.map(function (h) { return '<th scope="col"' + (h[2] ? ' class="num"' : '') + (h[1] != null ? ' data-c="' + h[1] + '" aria-sort="none"><button type="button" class="wa2-sort" data-w2-sort="' + h[1] + '">' + h[0] + '</button>' : '>' + h[0]) + '</th>'; }).join('') +
      '</tr></thead><tbody></tbody></table></div>' +
      '<p class="wa-legend">“Drinking water / yr” prices your drinking-clean water from ' + a('use/calc', 'Use') + ' at that source, plus upkeep. Rain is roof area × rainfall × 0.62 gal × 80% caught. Fog and dew vary a lot by site.</p>' +
      '<p class="wa2-carry" data-w2-n="payback"></p>' +
      '<p class="wa2-ally"><b>Ally</b> Call or text <b>211</b> for local water, showers, laundry and food. Good to know for yourself, and to pass on.</p>';
  }
  function htmlPrices() {
    var zip = prof().address;
    return '<p>The same gallon can cost a fraction of a cent or several dollars depending on how it reaches you. Enter prices you actually see' + (zip ? ' around <b>' + esc(zip) + '</b>' : '') + '; the examples are placeholders. They feed the sources table and your plan.</p>' +
      '<div class="wa-tool"><b class="wa-tool-t">Price per gallon</b><div class="wa-prices">' +
      priceRow('tap', 'Tap water', 'per billing unit (748 gal)', saved.tap != null ? saved.tap : 15, 'Find “per unit” or “per CCF” on your bill; add the sewer rate if it’s charged per unit too.') +
      priceRow('case', 'Case of bottles', 'per case of 24 × 16.9 oz', saved.case != null ? saved.case : 6) +
      priceRow('jug', 'Gallon jug', 'per gallon jug', saved.jug != null ? saved.jug : 1.75) +
      priceRow('refill', 'Refill machine', 'per gallon, your own jug', saved.refill != null ? saved.refill : 0.5) +
      priceRow('deliv', 'Delivered 5-gallon jug', 'per jug', saved.deliv != null ? saved.deliv : 10) +
      '</div><div class="wa-out" id="wa-price-out" aria-live="polite"></div>' +
      '<p class="wa-legend">Local price lookups by ZIP code are planned. Until then, these stay as you type them, on this device.</p></div>';
  }
  function htmlFair() { return OLD('costs', 'poverty')() + '<h3 class="wa2-h3">Sharing the cost</h3>' + OLD('costs', 'sharing')(); }

  /* ---------- Step 4: Containers ---------- */
  function keepCalc(U) {
    var cl = climate(), days = +S.keep.days, keep = U.g1 * days, jugs = Math.ceil(keep / 7);
    var daily = S.keep.rain === 'none' ? 0 : U.by.beds + (S.keep.rain === 'gardenflush' ? U.by.flush : 0);
    var need = daily * cl.dry * 30;
    return { days: days, keep: keep, jugs: jugs, need: need, barrels: Math.ceil(need / 55), roof: catchYr(S.place.roof), spout: catchYr(S.place.spout), dry: cl.dry };
  }
  function htmlKeep() {
    function o(v, t, cur) { return '<option value="' + v + '"' + (String(cur) === v ? ' selected' : '') + '>' + t + '</option>'; }
    return '<p>A short-term bare minimum is about <b>1 gallon per person per day</b>; your own drinking-clean number from ' + a('use/calc', 'Use') + ' is below. Three days is a start; two weeks gives real ease. There’s no rush: a few jugs a month adds up.</p>' +
      '<div class="wa2-ctrl"><label>Drinking-clean water on hand for<select data-w2-keep="days">' + o('3', '3 days', S.keep.days) + o('14', '2 weeks', S.keep.days) + o('30', '1 month', S.keep.days) + '</select></label>' +
      '<label>Rain stored for the dry months covers<select data-w2-keep="rain">' + o('garden', 'Veggie beds', S.keep.rain) + o('gardenflush', 'Veggie beds + flushing', S.keep.rain) + o('none', 'Nothing yet', S.keep.rain) + '</select></label>' +
      '<label class="wa2-chk"><input type="checkbox" data-w2-keep="second"' + (S.keep.second ? ' checked' : '') + '> Jugs found secondhand (free)</label></div>' +
      '<div class="wa2-res"><div class="wa2-r main"><span class="eyebrow">Drinking-clean on hand</span><b data-w2-n="k-keep"></b><span data-w2-n="k-jugs"></span></div>' +
      '<div class="wa2-r"><span class="eyebrow">Rain to bridge the dry months</span><b data-w2-n="k-need"></b><span data-w2-n="k-needn"></span></div>' +
      '<div class="wa2-r"><span class="eyebrow">Your roof catches in a year</span><b data-w2-n="k-roof"></b><span data-w2-n="k-roofn"></span></div></div>' +
      '<p class="wa2-carry" data-w2-n="carryCont"></p>' + links('<a href="#lens-emergency-prep">Emergency prep</a>');
  }
  var MAT = [
    ['Food-grade HDPE (#2)', 'water jugs, blue barrels', '1–55 gal', [1, 'drinking'], 'Opaque blue blocks light', '10+ years out of sun', 'Sun breaks it down. Secondhand barrels are often free from bakeries and juice bottlers: ask what was in them.'],
    ['PET (#1) bottles', 'store-bought water', '½ L–1 gal', [1, 'short-term'], 'Clear: keep in the dark', 'Sealed: to the date', 'Made for one use. Heat speeds up what leaches out.'],
    ['Milk jugs', '', '1 gal', [3, 'plants'], 'Translucent', 'Months', 'Thin and hard to clean. Plant water only.'],
    ['Glass', '', 'jars to 5 gal', [1, 'drinking'], 'Clear: keep in the dark', 'For good', 'Heavy, breaks. Never anything that held chemicals.'],
    ['Stainless steel', '', 'bottles to tanks', [1, 'drinking'], 'Blocks light', 'Decades', 'Costs more upfront; often secondhand.'],
    ['Glazed ceramic', 'crocks, dispensers', '1–5 gal', [1, 'drinking'], 'Blocks light', 'For good', 'Lead-free glaze only; older or unknown glazes can leach lead.'],
    ['Unglazed clay', 'water pots, ollas', '1–5 gal', [1, 'day to day'], 'Blocks light', 'Years, if it doesn’t freeze', 'Keeps water cool by sweating. Refill daily; not for long storage. Buried ollas water roots slowly.'],
    ['Copper', 'cups, pitchers', 'small', [1, 'overnight'], 'Blocks light', 'For good', 'Short holds only, and never acidic drinks: copper builds up in the water.'],
    ['Galvanized steel', 'troughs, older tanks', '10–1,000s gal', [2, 'rain, garden, animals'], 'Blocks light if lidded', 'Decades', 'Zinc coating; old ones may have lead solder. Not for long-term drinking storage.'],
    ['IBC totes', '', '275–330 gal', [2, 'rain, garden'], 'Translucent: cover or paint', 'Years, shaded', 'Only ones that held food; for drinking, food-grade and covered from light.'],
    ['Concrete or ferrocement', 'cisterns', '1,000s gal', [2, 'rain; drinking with treatment'], 'Dark and cool', 'Decades', 'New concrete raises pH: rinse and cure first. Often needs a permit.']
  ];
  function htmlKinds() {
    return '<div class="wa2-tbl"><table class="wa2-cards"><caption class="sr-only">Container materials</caption><thead><tr><th scope="col">Material</th><th scope="col">Sizes</th><th scope="col">Good for</th><th scope="col">Light &amp; algae</th><th scope="col">Lasts</th><th scope="col">Watch for</th></tr></thead><tbody>' +
      MAT.map(function (m) { return '<tr><td class="first"><b>' + m[0] + '</b>' + (m[1] ? '<span class="wa2-pv">' + m[1] + '</span>' : '') + '</td><td data-l="Sizes"><span>' + m[2] + '</span></td><td data-l="Good for"><span class="wa2-grade wa2-g' + m[3][0] + '"><i>' + m[3][0] + '</i>' + m[3][1] + '</span></td><td data-l="Light &amp; algae"><span>' + m[4] + '</span></td><td data-l="Lasts"><span>' + m[5] + '</span></td><td data-l="Watch for"><span>' + m[6] + '</span></td></tr>'; }).join('') +
      '</tbody></table></div>' + OLD('storage', 'containers')();
  }

  /* ---------- Step 5: Purify ---------- */
  var ADV = {
    bottles: 'Ready to drink. Keep sealed bottles cool and out of the sun.', refill: 'Ready to drink, in clean jugs.', public: 'Ready to drink. In old buildings, let the fountain run a few seconds first.', '211': 'Ready to drink.', deliv: 'Ready to drink.',
    tap: 'Usually ready to drink. Older pipes, or something above a health goal in your report? A filter matched to it (below).', ro: 'Already purified. Minerals back in are optional, for taste.',
    gray: 'Not for drinking, washing food or bodies. Soil and flushing only, within a day.', dehum: 'Plants only.',
    spout: 'Garden and washing: as it comes. Drinking: first flush → sediment → carbon → boil or UV.', cistern: 'Garden and washing: as it comes. Drinking: floating intake → sediment → carbon → UV, then test.',
    fog: 'Strain, then boil or filter before drinking.', dew: 'Strain, then boil before drinking.', spring: 'Treat for germs (boil or filter) until tested; test for chemicals.', well: 'Treat whatever the yearly test finds: sediment, carbon, UV.', wild: 'Always settle, strain and purify. Chemicals need another source.'
  };
  var PUR = [
    { id: 'pitcher', n: 'Carbon pitcher certified NSF 53', up: 30, yr: 60, f: 'taste, lead (if certified), some PFAS' },
    { id: 'gravity', n: 'Gravity ceramic + carbon', up: 150, yr: 50, f: 'germs (bacteria, parasites), taste; some models lead' },
    { id: 'squeeze', n: 'Hollow-fiber squeeze filter', up: 30, yr: 0, f: 'bacteria and parasites, on the go' },
    { id: 'uv', n: 'UV light for a well or cistern', up: 400, yr: 80, f: 'germs in clear water' },
    { id: 'sand', n: 'Slow sand or biosand filter (DIY)', up: 60, yr: 0, f: 'most germs and cloudiness, no power' },
    { id: 'bleach', n: 'Plain bleach and a dropper, for crises', up: 5, yr: 5, f: 'most bacteria and viruses in clear water' }
  ];
  function planList(adv) {
    var ids = SRC.filter(function (s) { return S.plan[s.id]; });
    if (!ids.length) return '<p>Add sources to your plan in ' + a('sources/table', 'Sources') + ' and they’ll show here.</p>';
    return '<ul class="wa2-plist">' + ids.map(function (s) { return '<li><b>' + s.n + '</b> ' + gchip(s.g) + '<span>' + adv[s.id] + '</span></li>'; }).join('') + '</ul>';
  }
  function optList(list, key, label) {
    return '<fieldset class="wa2-opts"><legend>' + label + '</legend>' + list.map(function (o) {
      return '<label><input type="checkbox" data-w2-' + key + '="' + o.id + '"' + (S[key][o.id] ? ' checked' : '') + '><span><b>' + o.n + '</b><small>' + (o.f ? o.f + ' · ' : '') + usd(o.up) + ' once' + (o.yr ? ', ~' + usd(o.yr) + ' a year' : '') + (o.split ? ', split between households' : '') + '</small></span></label>';
    }).join('') + '</fieldset>';
  }
  function htmlPurYours() {
    return '<p>Match each source to the grade each job needs (' + a('use/grades', 'Four grades') + '). Here’s what your plan’s sources need before they’re drinking-clean:</p>' + planList(ADV) +
      optList(PUR, 'pur', 'Add purifying to my plan') + '<p class="wa-legend">Example prices. Secondhand bodies with new cartridges cost much less (' + a('purify/everyday', 'Everyday filtering') + ').</p>';
  }

  /* ---------- Step 6: Test ---------- */
  var TADV = {
    tap: 'Read the yearly water quality report (free). Older building? A first-draw lead test.', ro: 'A cheap TDS meter shows when the membrane is tiring.', public: 'Treated and tested by the system; old building pipes are the unknown.',
    bottles: 'Tested by the bottler; reports are often on their website.', refill: 'Ask how often filters are changed and tested.', deliv: 'Ask the company for its latest test.', '211': 'Points to tested water.',
    gray: 'No testing needed: soil and flushing only.', dehum: 'Plants only.', spout: 'Test for bacteria before anyone drinks it.', cistern: 'Test for bacteria before trusting it, and after big storms.',
    fog: 'Test for bacteria before regular drinking.', dew: 'Treat it as untested; boil before drinking.', spring: 'Bacteria and nitrate before trusting it; again after heavy rain.', well: 'Coliform bacteria and nitrate every year; arsenic, uranium and others every few years; again after floods or repairs.', wild: 'Treat as unsafe: test kits can’t clear it for drinking.'
  };
  var TST = [
    { id: 'report', n: 'Read the water quality report', up: 0, yr: 0, f: 'what the utility found' },
    { id: 'tds', n: 'TDS meter', up: 15, yr: 0, f: 'checks an RO filter; can’t see germs or lead' },
    { id: 'strips', n: 'Test strips', up: 0, yr: 20, f: 'hardness, pH, chlorine, nitrate: rough reads' },
    { id: 'lead', n: 'First-draw lead test (lab)', up: 40, yr: 0, f: 'the last stretch of pipe', split: 1 },
    { id: 'bact', n: 'Bacteria test (lab)', up: 0, yr: 50, f: 'rain, springs, cisterns', split: 1 },
    { id: 'panel', n: 'Well panel (lab)', up: 0, yr: 150, f: 'yearly coliform + nitrate, bigger panel every few years', split: 1 }
  ];
  function htmlTestYours() {
    return '<p>What to test depends on where your water comes from. For your plan’s sources:</p>' + planList(TADV) +
      '<div class="wa2-who"><fieldset><legend>Sharing tests</legend>' + stp('homes', 'Households splitting lab tests', 'neighbors on the same pipes or well', 1) + '</fieldset></div>' +
      optList(TST, 'test', 'Add testing to my plan') + '<p class="wa-legend">Ask your water provider or county first: many offer free or discounted kits. Look for labs accredited by the state’s ELAP program.</p>';
  }

  /* ---------- Plan totals ---------- */
  function planTotals(U) {
    var pg = perGallon(), up = 0, yr = 0, K = keepCalc(U);
    var drink = SRC.filter(function (s) { return S.plan[s.id] && s.g === 1 && s.pk; });
    SRC.forEach(function (s) { if (S.plan[s.id]) { up += s.up; yr += s.yr || 0; } });
    if (drink.length) yr += drink.reduce(function (t, s) { return t + pg[s.pk]; }, 0) / drink.length * U.g1 * 365;
    if (!S.keep.second) up += K.jugs * 15;
    if (S.plan.spout && !S.plan.cistern && K.need) up += K.barrels * 90;
    PUR.forEach(function (o) { if (S.pur[o.id]) { up += o.up; yr += o.yr; } });
    var h = Math.max(1, S.q.homes);
    TST.forEach(function (o) { if (S.test[o.id]) { up += o.split ? o.up / h : o.up; yr += o.split ? o.yr / h : o.yr; } });
    return { up: up, yr: yr, bottles: pg.case * U.g1 * 365 };
  }

  /* ---------- Steps ---------- */
  var _steps = null;
  function steps() { return _steps || (_steps = buildSteps()); }
  function buildSteps() {
    return [
      { id: 'use', num: 1, word: 'Use', sub: 'How much, how clean', title: 'Use: how much, how clean', ability: 'Can size a household’s water, use by use, and match each use to the water it needs',
        lede: 'Not every job needs drinking water. Knowing what each use really needs is the base of every system after this, and the easiest way to need less.',
        take: OLDTAKE('uses'),
        secs: [{ id: 'calc', short: 'Calculator', title: 'How much water, use by use', html: htmlCalc }, { id: 'food', short: 'Water in food', title: 'Water from food', html: htmlFood },
          { id: 'grades', short: 'Grades', title: 'Four grades of water', html: OLD('uses', 'grades') }, { id: 'gray', short: 'Gray water', title: 'Gray water', html: OLD('uses', 'gray') },
          { id: 'reuse', short: 'Reuse', title: 'Using water more than once', html: htmlReuse }, { id: 'drink', short: 'Drinking', title: 'How much to drink', html: OLD('uses', 'drink') },
          { id: 'less', short: 'Use less', title: 'Small ways to use less', html: OLD('uses', 'less') }, { id: 'day', short: 'A day of water', title: 'A day of water', html: OLD('uses', 'needs') }] },
      { id: 'sources', num: 2, word: 'Sources', sub: 'Where it can come from', title: 'Sources: where it can come from', ability: 'Can find water anywhere, and point someone else to it',
        lede: 'Water reaches us from the sky, the ground, or a pipe. Each source carries its own likely problems, which tells you what containers, purifying and testing it needs.',
        take: OLDTAKE('sources'),
        secs: [{ id: 'table', short: 'Compare', title: 'Compare sources', html: htmlSrcTable }, { id: 'prices', short: 'Your prices', title: 'Your prices', html: htmlPrices },
          { id: 'know', short: 'Know them', title: 'Know your sources', html: OLD('sources', 'know') }, { id: 'taps', short: 'Taps &amp; refills', title: 'Taps and free refills', html: OLD('sources', 'taps') },
          { id: 'rain', short: 'Rain', title: 'Catching rain', html: OLD('sources', 'rain') }, { id: 'wells', short: 'Wells &amp; springs', title: 'Wells and springs', html: OLD('sources', 'wells') },
          { id: 'wild', short: 'Wild water', title: 'Rivers, lakes and the wild', html: OLD('sources', 'wild') }, { id: 'place', short: 'Where to live', title: 'Choosing where to live', html: OLD('sources', 'place') },
          { id: 'fair', short: 'Fair costs', title: 'It’s expensive being poor', html: htmlFair }] },
      { id: 'containers', num: 3, word: 'Containers', sub: 'What holds it, and how much', title: 'Containers: what holds it, and how much', ability: 'Can choose, fill and keep water containers',
        lede: 'Stored water stays good with a clean food-grade container, darkness and coolness. Then a date on the lid, and a reminder to refresh it.',
        secs: [{ id: 'keep', short: 'How much', title: 'How much to keep', html: htmlKeep }, { id: 'kinds', short: 'Kinds', title: 'Kinds of containers', html: htmlKinds },
          { id: 'where', short: 'Where', title: 'Where to keep it', html: OLD('storage', 'where') }, { id: 'algae', short: 'Algae', title: 'Beware green in the sun', html: OLD('storage', 'algae') },
          { id: 'fresh', short: 'Fresh', title: 'Keeping it fresh', html: OLD('storage', 'fresh') }] },
      { id: 'purify', num: 4, word: 'Purify', sub: 'Clean enough for the job', title: 'Purify: clean enough for the job', ability: 'Can make water clean enough for each job',
        lede: 'No single method does everything, and the priciest one isn’t automatically right. Start with what’s in your water and what the job needs, then choose the simplest thing that handles it.',
        secs: [{ id: 'yours', short: 'Your sources', title: 'Your sources, made safe', html: htmlPurYours }, { id: 'match', short: 'Match', title: 'Match the method to the problem', html: OLD('purify', 'match') },
          { id: 'everyday', short: 'Everyday', title: 'Everyday filtering', html: OLD('purify', 'everyday') }, { id: 'permanent', short: 'Permanent', title: 'Permanent systems', html: OLD('purify', 'permanent') },
          { id: 'crisis', short: 'Crisis', title: 'Crisis: boil, bleach, sun', html: OLD('purify', 'crisis') }, { id: 'nohome', short: 'No fixed home', title: 'With no fixed home', html: OLD('purify', 'nohome') }] },
      { id: 'test', num: 5, word: 'Test', sub: 'Knowing it’s safe', title: 'Test: knowing it’s safe', ability: 'Can tell whether water is safe, and find out when unsure',
        lede: 'Your senses and surroundings catch a lot; the serious problems are often invisible. Testing turns worry into a clear picture, and much of it is free.',
        secs: [{ id: 'yours', short: 'Your sources', title: 'Testing your sources', html: htmlTestYours }, { id: 'safe', short: 'Safe', title: 'What “safe” means', html: OLD('testing', 'safe') },
          { id: 'signs', short: 'Signs', title: 'Reading the signs around you', html: OLD('testing', 'signs') }, { id: 'report', short: 'Reports &amp; maps', title: 'Water reports and maps', html: OLD('testing', 'report') },
          { id: 'kits', short: 'Kits &amp; labs', title: 'Kits and labs', html: OLD('testing', 'kits') }, { id: 'outdoors', short: 'Outdoors', title: 'Swimming and bathing outdoors', html: OLD('testing', 'outdoors') }] }
    ];
  }
  function htmlFive() {
    return '<ol class="wa2-five">' + steps().map(function (u) { return '<li class="wk' + u.num + '"><a href="' + BASE + '/' + u.id + '"><span>' + u.num + '</span><b>' + u.word + '</b><small>' + u.sub + '</small></a></li>'; }).join('') + '</ol>' +
      '<p>Your numbers carry from one unit to the next: how much you use decides which sources can cover it, which decides the containers, the purifying, and the testing. The total builds in your plan at the bottom of the page.</p>';
  }

  function resolve(path) {
    var seg = (path || '').split('/'), u = seg[0];
    if (ALIAS[u] != null) { var al = ALIAS[u].split('/'); u = al[0]; if (al[1]) seg[1] = al[1]; }
    var p = u + (seg[1] ? '/' + seg[1] : '');
    if (SUBALIAS[p]) p = SUBALIAS[p];
    if (p === 'sources' && seg[0] === 'costs' && !seg[1]) p = 'sources/table';
    return p.replace(/^\//, '');
  }
  function titleFor(path) {
    var p = resolve(path).split('/'), st = steps().filter(function (x) { return x.id === p[0]; })[0];
    if (!st) return p[0] === 'abilities' ? 'Your abilities' : null;
    var sc = p[1] && st.secs.filter(function (x) { return x.id === p[1]; })[0];
    return st.word + (sc ? ' · ' + sc.short.replace(/&amp;/g, '&') : '');
  }

  /* ---------- Abilities ---------- */
  var LV = ['Know how', 'Done it', 'Shared it'];
  var RECALL = {
    think: { q: 'The five units', items: [['Use', 'use|uses|using|need|needs'], ['Source', 'source|sources'], ['Container', 'container|containers|storage|store|storing'], ['Purify', 'purify|purification|purifying|filter|treat|clean'], ['Test', 'test|testing|tests|check']] },
    use: { q: 'The four grades of water, cleanest first', items: [['Drinking', 'drinking|drink|potable|drinkable'], ['Clean', 'clean|washing|wash'], ['Gray', 'gray|grey|graywater|greywater'], ['Black', 'black|blackwater|sewage']] },
    sources: { q: 'Water reaches us from the ___, the ___ or a ___', items: [['Sky', 'sky|rain|air'], ['Ground', 'ground|groundwater|earth|well|spring'], ['Pipe', 'pipe|tap|pipes']] },
    containers: { q: 'Four ways to keep stored water good', items: [['Food-grade', 'foodgrade|foodsafe|food'], ['Dark', 'dark|shade|shaded|cool|nolight'], ['Dated', 'dated|date|label|labeled|labelled'], ['Spread out', 'spreadout|spread|spreaditout']] },
    purify: { q: 'Crisis water, in order', items: [['Settle', 'settle|settling|sit'], ['Strain', 'strain|filter|straining'], ['Boil', 'boil|boiling']] },
    test: { q: 'Three kinds of water problems', items: [['Germs', 'germs|germ|microbes|bacteria|pathogens'], ['Chemicals', 'chemicals|chemical|metals|chemicalsandmetals'], ['Nuisances', 'nuisances|nuisance|taste|smell']] }
  };
  var ALSO = {
    think: 'A friend’s new apartment, a camping trip, a power outage, a move.', use: 'Planning storage, choosing a filter size, a drought, a tiny home.',
    sources: 'Road trips, a friend between homes, outages, choosing where to live.', containers: 'Storms, wildfire season, a burst main, camping.',
    purify: 'Backpacking, boil-water notices, a well, a cabin.', test: 'Buying or renting a home, a new baby, a well, a swim spot.'
  };
  function lvls(id, label) {
    var cur = S.badges[id];
    return '<div class="wa2-lvls" role="group" aria-label="' + label + '">' + LV.map(function (l, i) { return '<button type="button" data-w2-badge="' + id + '" data-l="' + i + '" aria-pressed="' + (cur != null && i <= cur ? 'true' : 'false') + '">' + l + '</button>'; }).join('') + '</div>';
  }
  function recall(id) {
    var R = RECALL[id];
    return '<div class="wa2-recall"><p class="wa2-q">' + R.q + '</p><div class="wa2-rc-row">' + R.items.map(function (it, i) {
      return '<div class="wa2-rc"><label for="wa2-rc-' + id + i + '">' + (i + 1) + '</label><div class="wa2-rc-box"><input id="wa2-rc-' + id + i + '" autocomplete="off" autocapitalize="words" spellcheck="false" data-a="' + it[1] + '" data-w="' + it[0] + '">' +
        '<button type="button" class="wa2-hint" data-w2-hint aria-label="Hint for ' + (i + 1) + ': first letter">Hint</button></div></div>';
    }).join('') + '</div><div class="wa2-row"><button type="button" class="btn" data-w2-check="' + id + '">Check</button><button type="button" class="btn ghost" data-w2-reset="' + id + '">Start again</button><span class="wa-legend" data-w2-last="' + id + '">' + (S.last[id] ? 'Last refreshed ' + new Date(S.last[id]).toLocaleDateString() : '') + '</span></div>' +
      '<p class="wa-legend" aria-live="polite" data-w2-msg="' + id + '"></p></div>';
  }
  function viewAbilities() {
    var ST = steps();
    return '<article class="wa-unit wk1"><header class="wa-unit-hero"><span class="eyebrow">Water</span><h1 tabindex="-1">Your water abilities</h1>' +
      '<p class="wa-lede">Tap a level when it’s true: <b>Know how</b> once you’ve read the unit, <b>Done it</b> once you’ve done it, and <b>Shared it</b> once you’ve helped someone else do it. Saved only on this device. Refresh any one from memory now and then: a hint fills in the first letter.</p></header>' +
      '<section class="wa-sub wa2-ab" id="wa-ab-think"><div class="wa-sub-top"><h2>The five units</h2></div><p>Every water situation, from a dry campsite to a city apartment to a farm, comes down to the same five units.</p>' + recall('think') + '</section>' +
      ST.map(function (s) {
        return '<section class="wa-sub wa2-ab" id="wa-ab-' + s.id + '"><div class="wa-sub-top"><span class="wa-sub-n">' + s.num + '</span><h2>' + s.title + '</h2></div>' +
          '<p class="wa2-ability">Ability: <b>' + s.ability + '</b></p>' + lvls(s.id, s.ability) +
          '<p class="wa2-also"><b>Also useful for</b> ' + ALSO[s.id] + ' <a href="' + BASE + '/' + s.id + '">Go to unit ' + s.num + ' →</a></p>' +
          '<details class="wa-acc"><summary><span class="wa-who">Refresh</span><span class="wa-acc-t">Refresh from memory</span></summary><div class="wa-in">' + recall(s.id) + '</div></details></section>';
      }).join('') +
      '<section class="wa-sub"><div class="wa-sub-top"><h2>Clear what’s saved</h2></div><p>Your abilities, calculator numbers and plan live only in this browser.</p>' +
      '<div class="wa2-row"><button type="button" class="btn ghost" data-w2-clear>Clear my water abilities and plan on this device</button></div></section></article>';
  }

  /* ---------- Layout ---------- */
  function sidebarV2(ST, cur) {
    var wide = window.matchMedia && window.matchMedia('(min-width: 900px)').matches;
    return '<nav class="wa-nav" aria-label="Water lens"><details class="wa-nav-wrap"' + (wide ? ' open' : '') + '><summary class="wa-nav-head"><span class="eyebrow">Units</span><b>Water</b></summary>' +
      '<a class="wa-nav-over" href="' + BASE + '"' + (!cur ? ' aria-current="page"' : '') + '>Overview</a><ol class="wa-vt">' +
      ST.map(function (u) {
        var on = cur === u.id, href = BASE + '/' + u.id;
        return '<li class="wa-vt-unit wk' + u.num + (on ? ' cur' : '') + '"><a class="wa-vt-head" href="' + href + '"' + (on ? ' aria-current="page"' : '') + '><span class="wa-vt-dot">' + u.num + '</span><span><b>' + u.word + '</b><small>' + u.sub + '</small></span></a>' +
          '<ul class="wa-vt-subs">' + u.secs.map(function (s) { return '<li><a href="' + BASE + '/' + u.id + '/' + s.id + '">' + s.title + '</a></li>'; }).join('') + '</ul></li>';
      }).join('') + '</ol><a class="wa-nav-over wa2-nav-ab" href="' + BASE + '/abilities"' + (cur === 'abilities' ? ' aria-current="page"' : '') + '>Your abilities</a></details></nav>';
  }
  function tray() {
    return '<div class="wa2-tray" role="region" aria-label="Your water plan"><div class="wa2-tray-in" aria-live="polite">' +
      '<span><small>Use</small><b data-w2-n="t-use"></b></span><span><small>Fresh needed</small><b data-w2-n="t-fresh"></b></span><span><small>Drinking-clean</small><b data-w2-n="t-g1"></b></span>' +
      '<span><small>Upfront</small><b data-w2-n="t-up"></b></span><span><small>Each year</small><b data-w2-n="t-yr"></b></span></div></div>';
  }
  function layoutV2(ST, cur, main) {
    return mn().header('home') + '<div class="wa-layout">' + sidebarV2(ST, cur) + '<main class="wa-main wa2-main">' + panel() + main + '</main></div>' + tray() + mn().footer();
  }
  function secHtml(u, s) {
    return '<section class="wa-sub" id="wa-' + u.id + '-' + s.id + '"><div class="wa-sub-top"><span class="wa-sub-n">' + u.num + '.' + (u.secs.indexOf(s) + 1) + '</span><h2>' + s.title + '</h2></div>' + s.html() + '</section>';
  }
  function pager(ST, u) {
    var i = ST.indexOf(u), prev = ST[i - 1], next = ST[i + 1];
    return '<nav class="wa-pager" aria-label="Units">' +
      (prev ? '<a href="' + BASE + '/' + prev.id + '"><small>← Previous</small><b>' + prev.num + ' · ' + prev.word + '</b></a>' : '<a href="' + BASE + '"><small>← Back to</small><b>Overview</b></a>') +
      (next ? '<a class="next" href="' + BASE + '/' + next.id + '"><small>Next unit →</small><b>' + next.num + ' · ' + next.word + '</b></a>' : '<a class="next" href="' + BASE + '"><small>Back to →</small><b>Water overview</b></a>') + '</nav>';
  }
  function viewOverview(ST) {
    var first = ST[0];
    return '<article class="wa-unit wk1"><header class="wa-unit-hero"><span class="wa-lens-pill">Tier 2 · Roots · Lens</span><h1 tabindex="-1">Water</h1>' +
      '<p class="wa-lede">Every body needs water, and so does every plant and animal sharing the land. Five short units on how much you use and how clean it needs to be, where it can come from, what holds it, how to make it clean, and how to know it’s safe, at every scale: a studio, a farm, a car, a sidewalk.</p></header>' +
      '<section class="wa-sub" id="wa-think-steps"><div class="wa-sub-top"><h2>Five units</h2></div>' + htmlFive() + '</section>' +
      '<section class="wa-sub" id="wa-think-loop"><div class="wa-sub-top"><h2>Your water loop</h2></div>' + OLD('uses', 'system')() + '</section>' +
      '<aside class="wa-funfact"><span class="eyebrow">Fun fact</span><p>This lens leans on three kinds of knowing, checked against each other: old practice that kept people alive for thousands of years, international guidance (the World Health Organization’s drinking-water guidelines and the Sphere humanitarian handbook), and what you can see, smell, and test yourself. Legal limits come from politics as well as science, and they change, so we use them as one input, not the last word. Laws mentioned are California’s; water itself is the same everywhere. Thank you to everyone who keeps this knowledge free.</p></aside>' +
      '</article><nav class="wa-pager" aria-label="Units"><span></span><a class="next" href="' + BASE + '/' + first.id + '"><small>Start →</small><b>' + first.num + ' · ' + first.word + '</b></a></nav>';
  }
  function viewStep(ST, u) {
    var hero = '<header class="wa-unit-hero"><span class="eyebrow">Unit ' + u.num + ' of ' + ST.length + '</span><h1 tabindex="-1">' + u.word + '</h1><p class="wa2-sub">' + u.sub + '</p><p class="wa-lede">' + u.lede + '</p>';
    hero += '<ul class="wa-jumps">' + u.secs.map(function (s, j) { return '<li><a href="' + BASE + '/' + u.id + '/' + s.id + '"><span>' + u.num + '.' + (j + 1) + '</span>' + s.short + '</a></li>'; }).join('') + '</ul></header>';
    return '<article class="wa-unit wk' + u.num + '">' + hero + u.secs.map(function (s) { return secHtml(u, s); }).join('') +
      (u.take ? '<section class="wa-sub wa-take" id="wa-' + u.id + '-take">' + u.take() + '</section>' : '') + '</article>' + pager(ST, u);
  }

  /* ---------- Live numbers ---------- */
  function setN(k, v) { document.querySelectorAll('[data-w2-n="' + k + '"]').forEach(function (e) { e.innerHTML = v; }); }
  function refresh(full) {
    var U = computeUse();
    Object.keys(S.q).forEach(function (k) { document.querySelectorAll('[data-w2-o="' + k + '"]').forEach(function (o) { o.textContent = S.q[k]; }); });
    TASKS.forEach(function (t) { var e = document.querySelector('[data-w2-v="' + t.id + '"]'); if (e) e.textContent = r1(U.by[t.id]); });
    var pp = U.people ? U.fresh / U.people : 0;
    setN('total', r1(U.total)); setN('totalD', r1(U.total) + ' gal/day'); setN('pp', U.people ? 'about ' + r1(U.total / U.people) + ' gal per person' : 'add people above');
    setN('fresh', r1(U.fresh) + ' gal/day'); setN('reused', U.reused > 0.05 ? '♻ ' + r1(U.reused) + ' gal/day reused' : 'pick ♻ options to reuse water');
    setN('g1', r1(U.g1) + ' gal'); setN('g2', r1(U.g2) + ' gal'); setN('g3', r1(U.g3) + ' gal'); setN('ppn', r1(pp) + ' gal');
    var b = document.querySelector('[data-w2-bar="pp"]'); if (b) b.style.width = Math.min(100, pp / 80 * 100) + '%';
    setN('carrySrc', '<b class="k">From Use</b>You need about <b>' + r1(U.g1) + ' gal/day drinking-clean</b>, ' + r1(U.g2) + ' clean and ' + r1(U.g3) + ' where gray is fine. Your showers, sinks and laundry make about <b>' + r1(U.made.g) + ' gal/day of gray water</b>, ' + (U.made.g >= U.g3 ? 'enough for everything gray can do.' : 'enough for about ' + Math.round(U.made.g / Math.max(U.g3, 0.01) * 100) + '% of your gray-fine uses.'));
    var tb = document.querySelector('#wa2-src tbody');
    if (tb && full) {
      tb.innerHTML = srcRows(U);
      document.querySelectorAll('#wa2-src th[data-c]').forEach(function (th) { th.setAttribute('aria-sort', +th.dataset.c === sortCol ? (sortDir > 0 ? 'ascending' : 'descending') : 'none'); });
      var ss = document.querySelector('[data-w2-sortsel]'); if (ss) ss.value = String(sortCol);
    }
    var K = keepCalc(U), T2 = planTotals(U);
    setN('k-keep', r1(K.keep) + ' gal'); setN('k-jugs', K.jugs ? 'about ' + K.jugs + ' × 7-gal jugs' + (S.keep.second ? ', found secondhand' : ' (~' + usd(K.jugs * 15) + ')') : '');
    setN('k-need', r1(K.need) + ' gal');
    setN('k-needn', K.need ? K.dry + ' dry months · about ' + K.barrels + ' × 55-gal barrels' + (K.need > 1000 ? ', or a ' + (Math.ceil(K.need / 500) * 500).toLocaleString('en-US') + '-gal cistern' : '') : 'add veggie beds in Use, or pick what rain covers');
    setN('k-roof', r1(K.roof) + ' gal'); setN('k-roofn', 'one downspout: about ' + r1(K.spout) + ' gal · climate and roof from Sources');
    var cover = K.need ? Math.min(100, Math.round(K.roof / K.need * 100)) : 0;
    setN('carryCont', '<b class="k">Back to Sources</b>' + (K.need ? 'To get through ' + K.dry + ' dry months you’d store about <b>' + r1(K.need) + ' gal</b>. Your whole roof catches about ' + r1(K.roof) + ' gal a year, ' + (cover >= 100 ? 'enough to fill it, if you have room to store it.' : 'about ' + cover + '% of it; gray water or the tap can cover the rest.') : 'Pick something for stored rain to cover, and this shows whether your roof can fill it.') + (K.jugs ? ' Your ' + K.days + '-day store of drinking water fits in about ' + K.jugs + ' food-grade 7-gal jugs.' : ''));
    var save = T2.bottles - T2.yr;
    setN('payback', '<b class="k">Your plan</b>' + (save > 0 && T2.up > 0 ? 'Compared with store bottles for your drinking water, your plan saves about <b>' + usd(save) + ' a year</b> and pays back its upfront cost in about <b>' + Math.max(1, Math.ceil(T2.up / (save / 12))) + ' months</b>.' : save > 0 ? 'Compared with store bottles for your drinking water, your plan saves about <b>' + usd(save) + ' a year</b>.' : 'Tick sources to add them to your plan; the totals show at the bottom of the page.'));
    setN('t-use', r1(U.total) + ' gal/day'); setN('t-fresh', r1(U.fresh) + ' gal/day'); setN('t-g1', r1(U.g1) + ' gal/day'); setN('t-up', usd(T2.up)); setN('t-yr', usd(T2.yr));
  }
  function live(msg) { var l = document.getElementById('wa2-live'); if (l) l.textContent = msg; }

  /* ---------- Events (bound once; pages re-render inside #app) ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target : null; if (!t) return;
    var b = t.closest('[data-w2-step]');
    if (b) { var k = b.getAttribute('data-w2-step'), min = +(b.getAttribute('data-min') || 0); S.q[k] = Math.max(min, Math.min(60, S.q[k] + (+b.getAttribute('data-d')))); saveS(); refresh(true); live(k + ': ' + S.q[k]); return; }
    var srt = t.closest('[data-w2-sort]');
    if (srt) { var c = +srt.getAttribute('data-w2-sort'); if (c === sortCol) sortDir = -sortDir; else { sortCol = c; sortDir = c >= 4 ? -1 : 1; } refresh(true); return; }
    var bd = t.closest('[data-w2-badge]');
    if (bd) {
      var id = bd.getAttribute('data-w2-badge'), l = +bd.getAttribute('data-l');
      if (S.badges[id] === l) { if (l > 0) S.badges[id] = l - 1; else delete S.badges[id]; } else S.badges[id] = l;
      saveS();
      bd.parentNode.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', S.badges[id] != null && +x.getAttribute('data-l') <= S.badges[id] ? 'true' : 'false'); });
      live(bd.parentNode.getAttribute('aria-label') + ': ' + (S.badges[id] != null ? LV[S.badges[id]] : 'not yet')); return;
    }
    var h = t.closest('[data-w2-hint]');
    if (h) { var inp = h.previousElementSibling; inp.value = inp.getAttribute('data-w').charAt(0); inp.focus(); try { inp.setSelectionRange(1, 1); } catch (x) { /* ignore */ } return; }
    var ch = t.closest('[data-w2-check]');
    if (ch) {
      var rid = ch.getAttribute('data-w2-check'), box = ch.closest('.wa2-recall'), miss = [];
      box.querySelectorAll('input').forEach(function (i, n) {
        var v = i.value.toLowerCase().replace(/[^a-z]/g, ''), ok = i.getAttribute('data-a').split('|').indexOf(v) !== -1;
        i.classList.toggle('ok', ok); i.classList.toggle('look', !ok); if (!ok) miss.push((n + 1) + ': ' + i.getAttribute('data-w'));
      });
      box.querySelector('[data-w2-msg]').textContent = miss.length ? 'Here’s the rest: ' + miss.join(' · ') + '.' : 'All of them, from memory.';
      S.last[rid] = Date.now(); saveS(); box.querySelector('[data-w2-last]').textContent = 'Last refreshed ' + new Date(S.last[rid]).toLocaleDateString(); return;
    }
    var rs = t.closest('[data-w2-reset]');
    if (rs) { var bx = rs.closest('.wa2-recall'); bx.querySelectorAll('input').forEach(function (i) { i.value = ''; i.className = ''; }); bx.querySelector('[data-w2-msg]').textContent = ''; bx.querySelector('input').focus(); return; }
    if (t.closest('[data-w2-clear]')) {
      S = {}; defaults(); saveS(); try { localStorage.removeItem(SKEY); } catch (x) { /* ignore */ }
      if (mn().toast) mn().toast('Cleared on this device'); window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  });
  function onField(e) {
    var t = e.target; if (!t || !t.getAttribute) return;
    var v;
    if ((v = t.getAttribute('data-w2-how')) != null) { S.how[v] = +t.value; saveS(); refresh(true); return; }
    if ((v = t.getAttribute('data-w2-flag')) != null) { S.flags[v] = t.checked; saveS(); refresh(true); return; }
    if ((v = t.getAttribute('data-w2-place')) != null) { S.place[v] = v === 'climate' ? t.value : Math.max(0, +t.value || 0); saveS(); refresh(true); return; }
    if ((v = t.getAttribute('data-w2-keep')) != null) { S.keep[v] = v === 'second' ? (t.checked ? 1 : 0) : t.value; saveS(); refresh(false); return; }
    if ((v = t.getAttribute('data-w2-plan')) != null) { if (t.checked) S.plan[v] = 1; else delete S.plan[v]; saveS(); refresh(false); return; }
    if ((v = t.getAttribute('data-w2-pur')) != null) { if (t.checked) S.pur[v] = 1; else delete S.pur[v]; saveS(); refresh(false); return; }
    if ((v = t.getAttribute('data-w2-test')) != null) { if (t.checked) S.test[v] = 1; else delete S.test[v]; saveS(); refresh(false); return; }
    if (t.hasAttribute('data-w2-sortsel')) { sortCol = +t.value; sortDir = sortCol >= 4 ? -1 : 1; refresh(true); return; }
    if (t.closest && t.closest('[data-wa]')) refresh(true); /* typed prices feed the sources table */
  }
  document.addEventListener('change', onField);
  document.addEventListener('input', function (e) { var t = e.target; if (t && t.getAttribute && (t.getAttribute('data-w2-place') != null || (t.closest && t.closest('[data-wa]')))) onField(e); });

  /* ---------- Register ---------- */
  window.MN_LENS_VIEWS = window.MN_LENS_VIEWS || {};
  window.MN_LENS_VIEWS.water = function (sub) {
    T = tags();
    var ST = steps(), path = resolve(sub), seg = path.split('/'), html, title;
    if (seg[0] === 'abilities') { html = layoutV2(ST, 'abilities', viewAbilities()); title = 'Your abilities · Water · Kinship'; }
    else {
      var u = ST.filter(function (x) { return x.id === seg[0]; })[0];
      if (u) { html = layoutV2(ST, u.id, viewStep(ST, u)); title = u.word + ' · Water · Kinship'; }
      else { seg[0] = 'think'; html = layoutV2(ST, null, viewOverview(ST)); title = 'Water · Kinship'; }
    }
    setTimeout(function () {
      runTools(); refresh(true);
      var id = seg[1] && document.getElementById('wa-' + seg[0] + '-' + seg[1]);
      if (id) { if (seg[1] === 'take') id.querySelectorAll('details').forEach(function (d) { d.open = true; }); id.scrollIntoView({ block: 'start' }); }
    }, 0);
    return { title: title, html: html + '<p class="sr-only" aria-live="polite" id="wa2-live"></p>' };
  };
})();
