/* Composting & waste lens (tier 4 Nurture, Beta): unit 1 Compost (1.1 How compost works, 1.2 Ways to compost, 1.3 What goes in (broth and ferments first), 1.4 Using compost).
   Unit 2 Sewage & septic and unit 3 Sending less away are planned. Kept plain like Body care (FOUNDATION §6). Registers window.MN_LENS_VIEWS['composting-waste']. */
(function () {
  function mn() { return window.MN; }
  function ul(items) { return '<ul>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
  function sec(n, title, body) {
    return '<article class="cp-sec" id="cp-' + n.replace('.', '-') + '"><div class="cp-sec-head"><span class="cp-n">' + n + '</span><h2>' + title + '</h2></div>' + body + '</article>';
  }
  function card(title, text) { return '<div><h3>' + title + '</h3><p>' + text + '</p></div>'; }
  /* A way to compost: name, what it is, then the facts every option shares (space, time, takes, gives). */
  function way(name, tag, text, facts) {
    return '<div class="cp-way"><div class="cp-way-head"><h3>' + name + '</h3><span class="cp-tag">' + tag + '</span></div><p>' + text + '</p>' +
      '<dl>' + facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join('') + '</dl></div>';
  }
  var PLANNED = [
    ['Sewage &amp; septic', 'How sewer and septic systems work, why the grid is usually safest, and caring for a septic tank.'],
    ['Sending less away', 'Sending less of everything else away: repair, pass on, and salvage at home. How a whole town can do it is in <a href="#lens-governance/3-8">Governance → Less to throw away</a>.']
  ];

  function view(sub) {
    var html =
      '<div class="cp-hero"><span class="cp-pill">Tier 4 · Nurture</span><h1 tabindex="-1">Composting &amp; waste</h1>' +
        '<p class="cp-lede">Nothing in nature is waste: fallen leaves and scraps become food for the next thing that grows. Composting gives that cycle a place to happen. We start with compost.</p>' +
        '<ul class="cp-units" aria-label="Units"><li class="now">1 · Compost</li>' + PLANNED.map(function (u, i) { return '<li class="later">' + (i + 2) + ' · ' + u[0] + ' <span>Planned</span></li>'; }).join('') + '</ul>' +
        '<nav class="cp-jump" aria-label="On this page"><a href="#cp-1-1">1.1 How it works</a><a href="#cp-1-2">1.2 Ways to compost</a><a href="#cp-1-3">1.3 What goes in</a><a href="#cp-1-4">1.4 Using compost</a></nav></div>' +

      sec('1.1', 'How compost works',
        '<p>Compost is made by living things. Bacteria, fungi, and tiny animals eat scraps and leave behind dark, crumbly humus, the same thing that makes forest soil rich. Our job is to keep them fed, damp, and breathing.</p>' +
        '<div class="cp-points">' +
          card('Who does the work', 'Bacteria start first and do most of the eating. Fungi and actinomycetes (thread-like bacteria that give soil its earthy smell) break down tough stems, wood, and paper.</p><p>Later, worms, mites, springtails, and pill bugs move in and shred what’s left.') +
          card('Greens and browns', '<b>Greens</b> are wet and rich in nitrogen: fruit and vegetable scraps, coffee grounds, fresh grass, and plant trimmings. <b>Browns</b> are dry and rich in carbon: dry leaves, straw, cardboard, and paper.</p><p>Microbes need both, roughly 2–3 parts browns to 1 part greens by volume.') +
          card('Water and air', 'Keep it as damp as a wrung-out sponge. Microbes that breathe oxygen work fast and smell earthy.</p><p>When a pile is too wet or packed, oxygen-avoiding microbes take over, and they work slowly and give off a rotten-egg smell. Add browns and fluff or turn it.') +
          card('Hot or cold', 'A big, well-fed pile (about 3 feet each way) heats itself to 130–160°F as microbes multiply. Holding 131°F for several days kills most weed seeds and germs, and it can finish in 1–3 months.</p><p>A small or unturned pile stays cool. It still works, just slowly (6–12 months), and seeds and germs survive.') +
        '</div>' +
        '<p class="cp-ally"><span>Soil life</span> Healthy garden soil holds the same crowd: a teaspoon can hold more microbes than there are people on Earth. Compost feeds them and adds more, and they in turn hand nutrients to plant roots. Tilling, bare soil, and pesticides thin them out; mulch and compost bring them back. More on caring for soil in <a href="#lens-gardening/1-3">Growing → Soil</a>.</p>' +
        '<p class="cp-src">Sources: US EPA, “Composting at Home”; Cornell Waste Management Institute, “Composting Science” (1996); US EPA 40 CFR 503, process to further reduce pathogens (131°F for 3+ days); USDA NRCS, “Soil Biology Primer”.</p>') +

      sec('1.2', 'Ways to compost',
        '<p>Pick by your space and what you throw away. Many homes mix two: a countertop or bokashi bin inside, and a green bin or pile outside.</p>' +
        '<div class="cp-ways">' +
          way('Green bin', 'No space needed', 'California cities collect food scraps and yard trimmings at the curb, by law since 2022 (SB 1383). It all goes to large compost or digester sites that run hot enough to take things a home pile can’t.',
            [['Space', 'A small kitchen pail, often free. In San Francisco, Recology gives one countertop pail per unit at no cost (email customerservice@recologysf.com), and many other cities hand them out too.'], ['Takes', 'Usually all food scraps (including bones and dairy), food-soiled paper, and yard trimmings. Rules vary by city, so check your hauler’s list.'], ['Gives', 'Nothing back directly, though many cities give finished compost away free.']]) +
          way('Lomi (countertop)', 'Electric', 'An electric bin the size of a bread maker (by Pela). It heats, grinds, and dries scraps, shrinking them to about a tenth of their volume with little smell. Its fast mode (3–5 hours) shrinks scraps for the green bin or a pile. Its slower Grow mode (up to about 18 hours) breaks them down further, for mixing into soil.',
            [['Space', 'Countertop and an outlet'], ['Takes', 'Most fruit and vegetable scraps, coffee grounds, and small amounts of paper. Lomi lists what to keep out, like big bones, hard pits, and oils.'], ['Gives', 'A dry, grounds-like material that isn’t finished compost yet. Heat and drying leave little soil life in it, so it adds organic matter more than living nutrients. It finishes breaking down in soil, a pile, or the green bin.'], ['Costs', 'Hundreds of dollars upfront, plus electricity and replacement carbon filters.']]) +
          way('Bokashi bucket', 'Indoors', 'A sealed bucket where scraps ferment instead of rotting. Sprinkling bran inoculated with lactic acid bacteria pickles them, like sauerkraut, so it barely smells. It’s fermenting for the soil, not for eating.',
            [['Space', 'Under the sink'], ['Takes', 'All food scraps, including cooked food and bones.'], ['Gives', 'Pickled scraps in about 2 weeks, which still need burying in soil or a pile for 2–4 weeks before planting there. The liquid it drains, diluted about 1:100 with water, feeds plants.']]) +
          way('Worm bin', 'Indoors or out', 'A shaded box of damp bedding (shredded paper or cardboard) where red wiggler worms eat scraps. They live best between 55°F and 77°F.',
            [['Space', 'A bin under a sink, in a closet, or on a balcony'], ['Takes', 'Raw fruit and vegetable scraps, coffee grounds, tea, and crushed eggshells. Go light on citrus, onion, garlic, and spicy food.'], ['Gives', 'Worm castings in 3–6 months, the richest compost for veggies.']]) +
          way('Pile or bin', 'Yard', 'A heap, a ring of wire, or a lidded bin on bare ground, so soil life can move in. Turning it every week or two runs it hot; leaving it runs it cold.',
            [['Space', 'About 3 × 3 feet of ground'], ['Takes', 'Greens, browns, and yard trimmings.'], ['Gives', 'Compost in 1–3 months (hot) or 6–12 months (cold).']]) +
          way('Trench or hole', 'Yard, no bin', 'Dig a hole or trench about a foot deep, drop scraps in, and cover them with the soil. They break down where the roots will be.',
            [['Space', 'A garden bed resting between plantings'], ['Takes', 'Fruit and vegetable scraps.'], ['Gives', 'Rich soil right where you’ll plant, in 1–6 months, faster in warm weather.']]) +
        '</div>' +
        '<p class="cp-ally"><span>Worms or no worms</span> A worm bin is a home for animals. They need feeding about once a week, bedding kept damp, and a spot out of sun and frost, and someone to check on them if you’re away more than 2–3 weeks. Every few months you move them aside to harvest their castings. Overfeeding brings fruit flies and smells. With a green bin, Lomi, bokashi, or a pile, nobody depends on you, and you can walk away for a month. Outdoor piles still welcome wild worms, who arrive on their own.</p>' +
        '<p class="cp-src">Sources: CalRecycle, “Mandatory Organic Waste Collection” (SB 1383); SF Environment and Recology, kitchen pails; Lomi, “How it works” and “What is Lomi end product?” (lomi.com); Cornell Waste Management Institute, vermicomposting guides; Higa, effective microorganisms and bokashi (1980s).</p>') +

      sec('1.3', 'What goes in',
        '<h3>Save some for the kitchen first</h3>' +
        '<div class="cp-points">' +
          card('Broth', 'Keep a bag or jar of washed peels and ends in the freezer: onion and garlic skins, carrot, celery, leek greens, mushroom stems, herb stems, tomato ends, fennel, and corn cobs.</p><p>When it holds about 4 cups, cover with water, simmer 45–60 minutes, and strain. Cabbage, broccoli, and kale turn broth bitter and sulfurous, beets turn it red, and anything moldy or slimy goes straight to compost.') +
          card('Ferments', 'Apple peels and cores become apple scrap vinegar. Pineapple rinds and cores become tepache, a lightly fizzy drink. Citrus peels soaked in vinegar make a scented cleaner (see <a href="#lens-cleaning">Cleaning</a>).') +
          card('Then compost', 'Strained broth scraps and spent ferments still go in the compost, softened, so they break down faster.') +
        '</div>' +
        '<h3>In or out</h3>' +
        '<p>Almost anything that was once a plant can go in a home pile. What to keep out depends on the system, because only big, hot sites reliably kill germs and break down tough things.</p>' +
        '<div class="cp-lists">' +
          '<div class="cp-yes"><h4><span aria-hidden="true">✓</span> Goes in a home pile</h4>' +
            ul(['Fruit and vegetable scraps, peels, and cores', 'Coffee grounds and paper filters, and tea leaves', 'Crushed eggshells', 'Plant trimmings, dry leaves, and straw', 'Plain cardboard, paper, and sawdust from untreated wood', 'Hair and fur', 'Droppings from plant-eaters (rabbits, guinea pigs, horses, or a <a href="#lens-relationships/special/captive">sanctuary</a> nearby)']) +
          '</div>' +
          '<div class="cp-no"><h4><span aria-hidden="true">✕</span> Keep out of a home pile</h4>' +
            ul(['Flesh, bones, dairy, and oily cooked food, which smell and draw rats, raccoons, and flies (the green bin or bokashi takes them)', 'Food-soiled paper like pizza boxes (fine in most green bins)', 'Sick plants and weeds gone to seed, which a cool pile won’t kill', 'Black walnut, whose juglone slows other plants', '“Compostable” cups, forks, and bags (see below)']) +
            ul(['Cat litter and poop, never in any compost: they carry a parasite, <i>Toxoplasma</i>, that survives composting (more on what companions’ bodies carry and can’t process in <a href="#lens-toxins/exposures/companions">Poisons → Companion animals</a>)', 'Human waste (see Sewage &amp; septic, planned, and <a href="#lens-water/uses/gray">Water → compost toilets</a>)', 'Charcoal ash, glossy or plastic-coated paper, produce stickers, and plastic', 'Anything sprayed or treated, including sawdust from pressure-treated wood (<a href="#lens-toxins/pesticides/wood">Poisons → Treated wood</a>)']) +
          '</div>' +
        '</div>' +
        '<p class="cp-tip"><span>“Compostable” isn’t banana-peel compostable</span> A banana peel rots anywhere. “Compostable” cups, forks, takeout boxes, and bags (usually labeled BPI or ASTM D6400) are made to break down in an industrial site held around 130–160°F for months. In a backyard pile they can last a year or more, and in a landfill, with no air, they barely change. Only items labeled “home compostable” are made for a backyard pile. Some green bins take “compostable” kitchenware (San Francisco does) and many don’t, so check your hauler. California doesn’t allow plastic to be labeled “biodegradable” at all, because the word promised more than it delivered.</p>' +
        '<p class="cp-care"><span>Dog poop</span> Dog poop can be composted, but in its own pile, kept apart from garden compost. Run it hot (above 131°F for several days), then let it rest a year. Use it only around trees, shrubs, and flowers, never on food plants, because roundworm eggs can survive. “Compostable” poop bags only break down in industrial heat; in a trash can or landfill they sit like any bag, so empty them into a pet pile or use paper. Most California green bins don’t take pet waste, so in an apartment, the trash is usually the right place: tie the bag tight, use a lidded bin, and take it out often so neighbors aren’t living with the smell. An in-ground pet waste digester works where there’s a patch of yard.</p>' +
        '<p class="cp-tip"><span>Weed killers</span> A few weed killers (clopyralid, aminopyralid, and picloram) survive composting and stunt tomatoes, beans, and peppers for years. They can ride in on grass clippings, hay, straw, or manure from fields that were sprayed, so ask where it came from. A pea test catches them before they reach a bed: <a href="#lens-toxins/soil/potting">Poisons → Potting mix and compost</a>.</p>' +
        '<p class="cp-src">Sources: USDA NRCS Alaska, “Composting Dog Waste” (2005); UF/IFAS Extension, “Composting dog waste”; CDC, toxoplasmosis; Biodegradable Products Institute and ASTM D6400 (industrial compostability); California Public Resources Code §42357 (no “biodegradable” plastic labels); Rathje &amp; Murphy, <i>Rubbish! The Archaeology of Garbage</i> (1992); Washington State University Extension, “Persistent herbicides in compost” (2019).</p>') +

      sec('1.4', 'Using compost',
        '<p>Finished compost is dark, crumbly, and smells like a forest floor, with no scraps left to recognize. Unfinished compost is still being eaten, and the microbes borrow nitrogen from the soil to do it, which can starve seedlings. So let it finish before it goes near roots.</p>' +
        '<h3>What went in decides where it goes</h3>' +
        '<div class="cp-use">' +
          '<div><h4>For food plants</h4><ul>' +
            '<li><b>Worm castings</b><span>Veggies, seedlings, and houseplants. Mix a little into potting soil or sprinkle around plants. The gentlest and richest.</span></li>' +
            '<li><b>Hot pile, kitchen scraps and greens</b><span>Veggie beds. Spread 1–3 inches each season and mix into the top few inches.</span></li>' +
            '<li><b>Cold pile, well aged</b><span>Veggie beds once it’s had a year, so fewer weed seeds and germs survive.</span></li>' +
            '<li><b>Bokashi</b><span>Not ready for roots yet. Bury it in an empty bed or add it to a pile, and wait 2–4 weeks before planting there.</span></li>' +
            '<li><b>Lomi, Grow mode</b><span>Mix 1 part into 10 parts soil (Lomi’s ratio) and give it a few weeks before seedlings. It adds organic matter more than living nutrients, so pair it with finished compost or castings.</span></li>' +
          '</ul></div>' +
          '<div><h4>For trees, shrubs, and flowers</h4><ul>' +
            '<li><b>Cold pile, younger</b><span>Fruit trees, shrubs, and perennials, where surviving seeds matter less.</span></li>' +
            '<li><b>Woody pile and leaf mold</b><span>Trees, shrubs, and paths. Fungi break down wood and leaves, and trees grow best in soil rich with fungi.</span></li>' +
            '<li><b>Lomi, fast mode</b><span>Best in the green bin or a pile to finish, or worked lightly into soil around established plants.</span></li>' +
            '<li><b>Dog poop compost</b><span>Ornamental trees, shrubs, and flowers only, after a year’s rest. Never on food plants.</span></li>' +
          '</ul></div>' +
        '</div>' +
        '<h3>How compost feeds veggie soil</h3>' +
        '<div class="cp-points">' +
          card('Slow food', 'Compost holds nitrogen, phosphorus, potassium, and trace minerals in forms soil life releases slowly, as plants grow. It rarely burns roots the way strong fertilizer can.') +
          card('A sponge', 'Humus holds several times its weight in water, so sandy soil stays damp longer and clay drains and breathes better.') +
          card('Living soil', 'Compost brings microbes that make nutrients available to roots, and fungi that reach water and minerals roots can’t reach alone.') +
        '</div>' +
        '<p>Heavy feeders like tomatoes, squash, corn, and leafy greens may want more than compost alone. Worm castings, bokashi liquid, or a little plant-based fertilizer can top them up. Which plants want more, and which want less, is in <a href="#lens-gardening/1-3">Growing → Soil</a>.</p>' +
        '<p class="cp-src">Sources: University of California Agriculture and Natural Resources, “Compost Use in the Home Garden”; Cornell Waste Management Institute, “Compost Quality”.</p>') +

      '<section class="cp-planned" aria-label="Planned units">' + PLANNED.map(function (u, i) { return '<div><span class="cp-n">' + (i + 2) + '</span><h2>' + u[0] + '</h2><span class="cp-soon">Planned</span><p>' + u[1] + '</p></div>'; }).join('') + '</section>';

    var c = mn().credits('composting-waste');
    if (c.length) html += mn().deeper('People whose work shaped this lens, and where to go for more.', c);
    return { title: 'Composting & waste · Kinship', html: mn().header('home') + '<div><a class="back" href="#">← Education</a></div><main class="cp">' + html + '</main>' + mn().footer() };
  }

  window.MN_LENS_VIEWS = window.MN_LENS_VIEWS || {};
  /* Deep links: #lens-composting-waste/1-4 opens the page at 1.4. */
  window.MN_LENS_VIEWS['composting-waste'] = function (sub) { var v = view(); if (/^\d-\d+$/.test(sub || '')) v.jump = 'cp-' + sub; return v; };
})();
