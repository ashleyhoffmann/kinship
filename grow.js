/* Growing lens (tier 4 Nurture, Beta), one page, kept hyper-plain (FOUNDATION §6): 1 What plants need, 2 Where plants come from (three starter
   "recipes", easiest first, then starts and how long each takes), 3 Indoors & small spaces, 4 Yard & outdoors, 5 Sharing the garden (gentle insect
   and animal care, Cat health and Dog health). Units 6–7 planned. Registers window.MN_LENS_VIEWS['gardening']. */
(function () {
  function mn() { return window.MN; }
  function ul(items) { return '<ul>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
  function unit(n, title, body) {
    return '<article class="gr-sec" id="gr-u' + n + '"><div class="gr-sec-head"><span class="gr-n">' + n + '</span><h2>' + title + '</h2></div>' + body + '</article>';
  }
  function sub(n, title, body) { return '<section class="gr-sub"><h3><span class="gr-n">' + n + '</span>' + title + '</h3>' + body + '</section>'; }
  function card(title, text) { return '<div><h4>' + title + '</h4><p>' + text + '</p></div>'; }
  /* A starter "recipe": what you need, how, then the same idea for other plants. */
  function recipe(title, need, how, same) {
    return '<div><h4>' + title + '</h4>' + ul(need) + '<p>' + how + '</p><p class="gr-same">' + same + '</p></div>';
  }
  /* How long it takes: a group of plants, each with time to first harvest. */
  function wait(label, rows) {
    return '<div class="gr-wait"><h4>' + label + '</h4><ul>' + rows.map(function (r) { return '<li><b>' + r[0] + '</b><span>' + r[1] + '</span></li>'; }).join('') + '</ul></div>';
  }
  var UNITS = ['What plants need', 'Where plants come from', 'Indoors &amp; small spaces', 'Yard &amp; outdoors', 'Sharing the garden'];
  var PLANNED = [
    ['Your year', 'Frost dates and a month-by-month plan for your space (with the Garden planner).'],
    ['Prune &amp; save seeds', 'Pruning that keeps plants young, and saving seeds for next year.']
  ];

  function view() {
    var html =
      '<div class="gr-hero"><span class="gr-pill">Tier 4 · Nurture</span><h1 tabindex="-1">Growing</h1>' +
        '<p class="gr-lede">Plants need light, water, something to root in, and the right season. Give them those, and they do the rest.</p>' +
        '<nav class="gr-jump" aria-label="Units">' + UNITS.map(function (u, i) { return '<a href="#gr-u' + (i + 1) + '">' + (i + 1) + ' · ' + u + '</a>'; }).join('') + '</nav></div>' +

      unit(1, 'What plants need',
        sub('1.1', 'The basics',
          '<div class="gr-points">' +
            card('Light', 'Leaves turn light into food. Fruiting plants (tomatoes, peppers, squash) need 6+ hours of direct sun; greens and herbs manage with about 4.') +
            card('Water', 'Damp, never soggy, because roots breathe too. Water when the top inch of soil feels dry.') +
            card('Something to root in', 'Soil that holds water and drains. Potting mix in pots; most ground soil works.') +
            card('The right season', 'Frost kills warm-season plants like basil and tomatoes. Heat makes lettuce and cilantro bolt: they flower and turn bitter.') +
          '</div>' +
          '<p>That’s it. Everything else helps them grow bigger and faster.</p>') +
        sub('1.2', 'Going further',
          ul(['<b>Compost</b> feeds the soil life that feeds roots. Mix in 1–3 inches a season (see <a href="#lens-composting-waste">Composting → Using compost</a>).',
            '<b>Mulch</b> (2–3 inches of leaves, straw, or wood chips) keeps soil damp and cool, and feeds soil life as it breaks down.',
            '<b>Fertilizer</b> tops up hungry plants like tomatoes, squash, and corn. Nitrogen grows leaves; phosphorus and potassium grow flowers and fruit. Too much burns roots, or grows leaves instead of fruit.']) +
          '<p class="gr-tip"><span>Potting mix</span> Bagged mix can carry <i>Legionella longbeachae</i>, bacteria that cause a lung infection when the dust is breathed in. Dampen it before opening it wide, keep it away from your face, wear gloves, and wash your hands after. Added fertilizers and wetting agents are listed on the bag; for food plants, OMRI-listed mixes leave out synthetic ones. More in <a href="#lens-toxins/soil">Poisons → Soil</a>.</p>') +
        sub('1.3', 'Game plan',
          ul(['<b>Before planting:</b> count your sun hours.',
            '<b>Start small:</b> one pot or bed of a few things you love to eat.',
            '<b>Every day or two:</b> push a finger into the soil, and water deeply only if the top inch is dry. Look under a few leaves.',
            '<b>Every season:</b> add compost, top up the mulch, and plant what fits the season.'])) +
        '<p class="gr-src">Sources: Taiz &amp; Zeiger, <i>Plant Physiology</i>; UC Agriculture and Natural Resources, “Vegetable Gardening Basics”; Chalker-Scott, mulch review, <i>Journal of Environmental Horticulture</i> (2007); CDC, Legionnaires’ disease and potting soil; OMRI Products List.</p>') +

      unit(2, 'Where plants come from',
        '<p>Easiest first. No yard needed: a sunny windowsill and kitchen scraps are enough to start.</p>' +
        '<div class="gr-recipes">' +
          recipe('2.1 Scallions in a glass', ['Scallion roots plus 1–2 inches of white', 'A small glass of water'],
            'Stand them roots-down in water that covers the roots but not the cut tops, on a sunny sill. Change the water every 1–2 days, so bacteria don’t rot the roots. New greens grow in about a week. Snip as needed; after 2–3 harvests, plant them in soil.',
            '<b>Same idea:</b> leeks, lemongrass, and celery bases. A garlic clove or a sprouted potato goes straight into soil instead.') +
          recipe('2.2 Herbs from cuttings', ['4–6 inch tips of basil or mint', 'A jar of water'],
            'Cut just below a node, where leaves join the stem, because that’s where roots form. Strip the lower leaves so none sit in water, and change the water every few days. Roots grow in 1–2 weeks. Pot them once roots are 1–2 inches long.',
            '<b>Same idea:</b> oregano, lemon balm, pothos, and sweet potato vines. Rosemary and lavender root slowly, better in damp potting mix, and like dry soil once grown. Dill and cilantro go slimy in water, so grow them from seed.') +
          recipe('2.3 Greens from seed', ['A pot at least 6 inches deep, with drainage holes', 'Potting mix', 'Lettuce or radish seeds'],
            'Sow seeds about ¼ inch deep and keep the soil damp until they sprout, in 4–10 days. Radishes are ready in about 4 weeks. Cut lettuce leaves an inch above the base, and they grow back for several harvests.',
            '<b>Same idea:</b> beans, peas, zucchini, dill, and cilantro. Dill and cilantro grow a long taproot and dislike being moved, so sow them where they’ll stay. A seed goes about 2–3 times as deep as it is wide.') +
        '</div>' +
        sub('2.4', 'Starts and swaps',
          '<p>Nursery seedlings (starts) skip the trickiest weeks. Neighbors often share divided mint, chives, and aloe pups, plant swaps trade cuttings, and seed libraries at many public libraries give seeds free.</p>') +
        sub('2.5', 'How long it takes',
          '<p>Leafy plants give soonest. Fruiting plants take longest, then keep giving for months. Root crops like garlic and potatoes give once.</p>' +
          '<div class="gr-waits">' +
            wait('Easiest', [['Green onions in water', 'About 1 week, then again and again'], ['Radishes from seed', 'About 4 weeks'], ['Lettuce from seed', '4–6 weeks, then weeks of picking'], ['Basil or mint cuttings', 'Roots in 1–2 weeks, a full plant in about a month']]) +
            wait('Easy', [['Beans and zucchini from seed', 'About 2 months, then picking every few days'], ['Peas from seed', '2–3 months'], ['Tomatoes from a start', '2–3 months, then fruit until the weather cools'], ['Potatoes from a sprouted potato', '3–4 months']]) +
            wait('Takes patience', [['Tomatoes or peppers from seed', '4–5 months; seedlings need warmth and strong light for 6–8 weeks before going outside'], ['Carrots from seed', '2–3 months; tiny seeds take up to 3 weeks to sprout'], ['Rosemary or lavender cuttings', '1–2 months to root, then years of harvests'], ['Garlic from a clove', '8–9 months, fall to early summer']]) +
          '</div>') +
        '<p class="gr-src">Sources: UC Master Gardener Program, “Growing Vegetables in Containers” and vegetable planting guides; Penn State Extension, “Propagating Herbs from Cuttings”.</p>') +

      unit(3, 'Indoors &amp; small spaces',
        ul(['<b>Light:</b> the brightest south- or west-facing window. Herbs, greens, and green onions do best; fruiting plants rarely get enough light indoors. An LED grow light fills in.',
          '<b>Pots:</b> anything with drainage holes, like a yogurt tub or a bucket with holes drilled, on a saucer. Bigger pots dry out more slowly.',
          '<b>Soil:</b> potting mix, because garden soil packs down hard in a pot.',
          '<b>Routine:</b> touch the soil every day or two and water when the top inch is dry. Turn pots weekly, since plants lean toward the light.'])) +

      unit(4, 'Yard &amp; outdoors',
        ul(['<b>Sun:</b> count the hours of direct sun each spot gets, and save the sunniest for fruiting plants.',
          '<b>Season:</b> much of California grows greens, peas, and garlic from fall to spring, and tomatoes and squash in summer.',
          '<b>Soil:</b> near an older house or a busy road, test for lead first (see <a href="#lens-toxins/soil">Poisons → Soil</a>), or grow in raised beds of new soil.',
          '<b>Water:</b> deeply and less often, soaking about 6 inches down, so roots grow deep. Mornings are best, and drip lines or soaker hoses save water.']) +
        '<p class="gr-ally"><span>Allies</span> UC Master Gardeners answer growing questions for free in most California counties. Community gardens rent plots, often for a small yearly fee.</p>' +
        '<p class="gr-src">Sources: UC Master Gardener Program, “Watering the Home Garden”.</p>') +

      unit(5, 'Sharing the garden',
        ul(['<b>Most visitors help.</b> Bees pollinate, and ladybugs and lacewings eat aphids. Bug sprays kill the helpers too.',
          '<b>Each one has favorites.</b> Aphids crowd soft new growth, snails love lettuce and seedlings, caterpillars love kale and broccoli, and birds love ripe berries. Knowing who loves what tells you what to cover.',
          '<b>Cover favorites.</b> Fine mesh or row covers keep insects off; bird netting stretched taut (loose netting tangles birds) keeps birds off.',
          '<b>Move, don’t kill.</b> Rinse aphids off with water, and carry snails and caterpillars to a wilder corner at dusk.',
          '<b>Grow extra.</b> Plant a little more than you need, and some flowers to feed the helpers.']) +
        '<p class="gr-care"><span>Cat health</span> All true lilies and daylilies cause kidney failure in cats, even a little pollen or vase water. Also toxic: onions, garlic, chives, and green onions; tomato leaves, stems, and green fruit; mint in large amounts; pothos; aloe; tulip and hyacinth bulbs; azalea; sago palm; oleander; and foxglove.</p>' +
        '<p class="gr-care"><span>Dog health</span> Sago palm is often fatal, every part, especially the seeds. Also toxic: grapes and raisins (pick up fallen fruit under a vine); onions, garlic, chives, and green onions; tomato leaves, stems, and green fruit; mint in large amounts; tulip and daffodil bulbs (dogs dig them up); azalea; oleander; foxglove; and cocoa bean mulch, which holds the same stimulant as chocolate.</p>' +
        '<p>The ASPCA keeps a full list of toxic and safe plants. More on wild neighbors in <a href="#lens-relationships/special/wild">Relationships → Wild animals</a>.</p>' +
        '<p class="gr-src">Sources: UC IPM, “Aphids”, “Snails and Slugs”, and “Natural Enemies Gallery”; ASPCA Animal Poison Control, toxic and non-toxic plants; FDA, “Lovely Lilies and Curious Cats”.</p>') +

      '<section class="gr-planned" aria-label="Planned units">' + PLANNED.map(function (u, i) { return '<div><span class="gr-n">' + (i + 6) + '</span><h2>' + u[0] + '</h2><span class="gr-soon">Planned</span><p>' + u[1] + '</p></div>'; }).join('') + '</section>';

    var c = mn().credits('gardening');
    if (c.length) html += mn().deeper('People whose work shaped this course, and where to go for more.', c);
    return { title: 'Growing · Kinship', html: mn().header('home') + '<div><a class="back" href="#">← Education</a></div><main class="gr">' + html + '</main>' + mn().footer() };
  }

  window.MN_LENS_VIEWS = window.MN_LENS_VIEWS || {};
  window.MN_LENS_VIEWS['gardening'] = function () { return view(); };
})();
