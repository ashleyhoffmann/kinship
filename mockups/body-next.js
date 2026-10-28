/* Body care lens (tier 3 Protect, Beta). Each ready unit is its own screen:
   unit 1 Overview (#lens-body-care; 1.1 The basics, 1.2 Sleep & rest, 1.3 Routines & blue light, 1.4 Tools),
   unit 2 What bodies need (#lens-body-care/needs; 2.1 One list for every cell, 2.2 Each part, its own way, 2.3 Symptoms are messengers, 2.4 Thinking in systems),
   unit 3 Mouth (#lens-body-care/mouth; 3.1 Why teeth decay, 3.2 Solutions, 3.3 Make mouthwashes & mints),
   unit 4 Hair care (#lens-body-care/hair; 4.1 How hair stays healthy, 4.2 Washing less, 4.3 Textured & coily hair),
   unit 5 Hair bleaching (#lens-body-care/bleach; 5.1 Bleaching, step by step, 5.2 Materials & safety, 5.3 How bleach works).
   Units 6 Bodies through time and 7 Animal bodies are planned. Kept plain on purpose (FOUNDATION §6, Only build what helps). Registers window.MN_LENS_VIEWS['body-care']. */
(function () {
  function mn() { return window.MN; }
  function ul(items) { return '<ul>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
  function sec(n, title, body) {
    return '<article class="bc-sec" id="bc-' + n.replace('.', '-') + '"><div class="bc-sec-head"><span class="bc-n">' + n + '</span><h3>' + title + '</h3></div>' + body + '</article>';
  }
  function card(title, text) { return '<div><h4>' + title + '</h4><p>' + text + '</p></div>'; }
  /* A block with a number title, a short bold subtitle (optional), and its text. */
  function step(title, sub, text) { return '<div><h4>' + title + '</h4>' + (sub ? '<p class="bc-sub">' + sub + '</p>' : '') + (text ? '<p>' + text + '</p>' : '') + '</div>'; }
  /* Body care credits split by unit: a credit whose line starts with Hair bleaching shows on unit 5 Hair bleaching, the rest on Mouth. */
  function unitCredits(bleach) { return mn().credits('body-care').filter(function (p) { return (p.shaped.indexOf('Hair bleaching') === 0) === bleach; }); }
  /* Units in order. Ready ones have a route and their own screen; planned ones show dashed. */
  var UNITS = [
    { id: 'overview', name: 'Overview', href: '#lens-body-care' },
    { id: 'needs', name: 'What bodies need', href: '#lens-body-care/needs' },
    { id: 'mouth', name: 'Mouth', href: '#lens-body-care/mouth' },
    { id: 'hair', name: 'Hair care', href: '#lens-body-care/hair' },
    { id: 'bleach', name: 'Hair bleaching', href: '#lens-body-care/bleach' },
    { id: 'time', name: 'Bodies through time' },
    { id: 'animals', name: 'Animal bodies' }
  ];
  function hero(cur) {
    return '<div class="bc-hero"><span class="bc-pill">Tier 3 · Protect</span><h1 tabindex="-1">Body care</h1>' +
      '<p class="bc-lede">Bodies are always repairing themselves. Body care is mostly about giving that repair what it needs.</p>' +
      '<nav aria-label="Units"><ul class="bc-units">' + UNITS.map(function (u, i) {
        var label = (i + 1) + ' · ' + u.name;
        if (!u.href) return '<li class="later">' + label + ' <span>Planned</span></li>';
        return '<li><a href="' + u.href + '"' + (u.id === cur ? ' class="now" aria-current="page"' : '') + '>' + label + '</a></li>';
      }).join('') + '</ul></nav></div>';
  }
  function unitHead(n, name) { return '<div class="bc-unit-head"><span class="bc-n">Unit ' + n + '</span><h2>' + name + '</h2></div>'; }

  function mouth() {
    var html = hero('mouth') + unitHead(3, 'Mouth') +

      sec('3.1', 'Why teeth decay',
        '<p>Hundreds of kinds of bacteria live in every mouth, and most of them help. Trouble starts when conditions favor the few that make acid, mainly <i>Streptococcus mutans</i>. Plaque is bacteria, leftover food particles, and saliva.</p>' +
        '<div class="bc-points">' +
          card('Acid and dryness are the problems', 'Acid pulls minerals out of enamel.</p><p>Saliva neutralizes acid, so a dry mouth leaves teeth unprotected (from mouth-breathing, medicines, or not drinking enough water).</p><p>After each sip or snack, saliva takes about 30 minutes to bring the mouth back to neutral. How often you eat or drink matters more than how much.') +
          card('Teeth need minerals', 'Enamel is mostly calcium and phosphate. Between meals, saliva puts minerals back.</p><p>A cavity is where losing has outpaced rebuilding for a long time. Before that, early damage can reverse.') +
          card('Sugar feeds acid-making bacteria', 'Sugar doesn’t harm teeth by itself. Acid-producing bacteria eat sugar, along with starches that linger (potatoes, crackers, chips), and give off acid.</p><p>Regardless of sugar, some drinks are acidic, like soda (diet too), coffee, citrus drinks (incl. lemon water), kombucha, and sports drinks.') +
        '</div>' +
        '<p class="bc-src">Sources: W.D. Miller, <i>The Micro-Organisms of the Human Mouth</i> (1890); Featherstone, “Dental caries: a dynamic disease process,” <i>Australian Dental Journal</i> (2008); Reddy et al., “The pH of beverages in the United States,” <i>JADA</i> (2016).</p>') +

      sec('3.2', 'Solutions',
        '<p>Decay comes from too much acid for too long. So we solve it four ways: clear out the bacteria, neutralize the acid, slow the bacteria that make it, and give enamel the minerals to rebuild.</p>' +
        '<div class="bc-points">' +
          card('Dislodge and remove bacteria', 'Floss once a day to dislodge bacteria and food between teeth and under the gumline, where a toothbrush can’t reach. A tongue scraper clears the bacteria that collect on the back of the tongue. Bacteria that don’t sit can’t make as much acid, nor stinky breath.') +
          card('Neutralize the acid', 'Saliva is the mouth’s own acid buffer, so keep it flowing with water, chewing, and fewer sips between meals. Baking soda neutralizes acid too, which is why it’s in the rinse in 2.3.') +
          card('Slow the acid-makers', 'Acid-making bacteria take in xylitol as if it were sugar, but can’t use it, so they grow more slowly and make less acid. Its sweet taste also gets saliva flowing. Dr. Ellie Phillips suggests 6–10 g a day, in 3–5 small doses after eating. It works through steady daily use.') +
          card('Rebuild the enamel', 'Fluoride or nano-hydroxyapatite toothpaste helps the surface rebuild harder. Leaving it on the teeth (spit, don’t rinse) gives it time to work.') +
        '</div>' +
        '<h4>Game plan</h4>' +
        ul(['<b>Every morning:</b> brush along the gumline with fluoride or nano-hydroxyapatite paste (I recommend NOBS). Spit without rinsing, and ideally have only water afterward.',
          '<b>After eating or drinking:</b> ideally swish with mouthwash (homemade or store-bought, see 2.3) to neutralize acid, then have a xylitol mint. After something acidic, wait 30–60 minutes before brushing because acid briefly softens enamel and scrubbing it wears it down.',
          '<b>Between meals:</b> drink water. Have acidic or sweet drinks with a meal rather than sipping them for hours.',
          '<b>Every night:</b> floss, scrape your tongue, and brush.']) +
        '<p class="bc-joy"><span>Morning joys</span> If you drink coffee or tea, brushing beforehand leaves a fluoride layer on your teeth that helps protect them. Don’t brush right after coffee, tea, or anything acidic, when your enamel is weakest.</p>' +
        '<p class="bc-ally"><span>Allies</span> A dentist can catch and treat what home care can’t, like deep cavities, cracked teeth, infections, gum disease, and pain. Dental school clinics and community health centers often cost less. In California, Medi-Cal Dental covers many people. Call 211 to find care nearby.</p>' +
        '<p class="bc-src">Sources: Mäkinen &amp; Scheinin, Turku sugar studies (1970s); Riley et al., Cochrane review of xylitol (2015).</p>') +

      sec('3.3', 'Make mouthwashes &amp; mints',
        '<p>Simple and free of dyes and alcohol.</p>' +
        '<div class="bc-recipes">' +
          '<div><h4>Rinse powder</h4>' + ul(['½ cup baking soda', '¼ cup xylitol', '15–20 drops peppermint oil', '5–8 drops clove oil']) +
            '<p>Mix the oils into the dry powder until no damp spots are left, and store it in a glass jar. Stir ¾ tsp into ¼–½ cup of warm water, swish, and spit. It keeps for months, and the scent fades after 2–3 months.</p></div>' +
          '<div><h4>Xylitol mints</h4>' + ul(['½ cup xylitol (about 100 mints)', '6–10 drops peppermint oil (start with 6, then taste)', 'Optional: ¼ tsp pure vanilla extract, for vanilla mints']) +
            '<p>Melt the xylitol on low heat until clear. Cool it briefly, stir in the peppermint (and vanilla, if using), and drop ¼ tsp amounts into tiny silicone molds. Let them set at room temperature, then store airtight. Each mint is about 1 g, dependent on size.</p></div>' +
        '</div>' +
        '<p>Mix essential oils into the dry powder first, because a drop of pure oil can burn your gums. Tea tree, cinnamon, and wintergreen are best left out.</p>' +
        '<p class="bc-care"><span>Dog health</span> Xylitol is very toxic to dogs (not cats, though stay cautious), even in small amounts. Keep jars, gum, and mints out of reach. More in <a href="#lens-toxins/exposures/companions">Poisons → Companion animals</a>.</p>' +
        '<p class="bc-tip"><span>For sore gums</span> Occasionally, add 3% hydrogen peroxide to this rinse for irritated gums. It’s an oxidizing antiseptic: its foam lifts gumline debris, and its oxygen kills oxygen-avoiding bacteria that inflame gums. Stir ¾ tsp powder into equal parts peroxide and warm water (⅛–¼ cup each), swish a minute, spit it all out, and rinse with water. Don’t use it undiluted (it can burn gums) or daily past a week (it irritates gums and tongue, sensitizes teeth, and kills helpful bacteria). Mix it fresh each time, since peroxide breaks down once it meets baking soda. Don’t swallow it; supervise kids under 12 or skip it. It’s the same brown bottle as <a href="#lens-cleaning">Cleaning</a>’s peroxide rung, and soft foods for a sore mouth are in <a href="#lens-food/gentle/chewing">Food → Sore mouths</a>.</p>' +
        '<h4>Store-bought</h4>' +
        '<p>I’d recommend Auromere. Dr. Ellie Phillips uses unflavored Closys (stabilized chlorine dioxide), original Listerine (for menthol, thymol, and eucalyptus oil, though beware its acidity), and ACT (0.05% sodium fluoride). Anything with those active ingredients does the same job. I’d avoid dyes, alcohol, and unknown chemicals.</p>' +
        '<p class="bc-src">Sources: ASPCA Animal Poison Control, xylitol; US over-the-counter label for 1.5% peroxide mouth rinses (use up to 7 days); Walsh, “Safety issues relating to the use of hydrogen peroxide in dentistry,” <i>Australian Dental Journal</i> (2000); Hossainian et al., review of hydrogen peroxide mouthwashes, <i>International Journal of Dental Hygiene</i> (2011).</p>') +

      nextCard(3) +
      mn().deeper('People whose work shaped this unit, and where to go for more.', unitCredits(false));
    return page('Mouth', '', html);
  }

  function bleach() {
    var html = hero('bleach') + unitHead(5, 'Hair bleaching') +
      '<p class="bc-lede">After prep, four steps: bleach, shampoo, tone, and condition. Free first: sunlight breaks down hair color too, so hair lightens over a summer outdoors, with the same dryness at a slower pace.</p>' +
      '<p class="bc-tip"><span>Heads up</span> I’m not a doctor or a cosmetologist. I’ve bleached my own hair (type 2B, medium brown) at home for five years, and this is just what I’ve learned.</p>' +

      sec('5.1', 'Bleaching, step by step',
        '<div class="bc-points bc-five">' +
          step('0. Preparation', '', 'Set up your materials, section your hair with hair clips, then mix the bleach.') +
          step('1. Bleach (on oily hair)', 'Lighten (leans orange)', 'Apply bleach paste to dry hair, typically painting thin strips from roots to tips, then cover them in tinfoil. Burning means rinse right away. It’s a race against the clock, and body heat makes roots lighten faster.</p><p>Where to bleach is an art, not a science, and depends on the style you’re going for. I’d recommend balayage (hand-painted highlights), keeping roots darker and cooler and tips lighter and warmer.') +
          step('2. Shower with shampoo', 'Thoroughly remove bleach', 'Rinse, then shampoo (even twice) to wash out every trace of bleach. Skip conditioner, because it coats the hair, and toner soaks in evenly only on clean, bare hair.') +
          step('3. Tone', 'De-orange', 'Towel-dry, mix your toner, then apply it. Toner looks clear-brown at first but leaves an indigo-leaning tint that cancels warmth: purple cancels yellow, and blue cancels orange. Leave it on for the time on the box (I’d estimate 15 minutes).') +
          step('4. Shower with conditioner', 'Rinse &amp; seal', 'Rinse out the toner and condition. Skip shampoo for now, since it would wash out fresh toner. Conditioner smooths the hair’s scales back down and stands in for the oily layer bleach removed.') +
        '</div>' +
        '<h4>Test a strand before bleach day</h4><p>Before the first time, snip a small lock from underneath, bleach it, and check every 5–10 minutes. It shows how long your hair takes, the color it stops at, and whether it stays strong.</p>' +
        '<h4>Care after</h4><p>Purple shampoo, purple conditioner, or both keep yellow away between tones.</p>' +
        '<h4>Go lighter in steps</h4><p>Dark hair often needs two or three sessions to reach pale blonde. Wait about two weeks between them, and afterward bleach only new growth, since bleach over bleach is where hair breaks.</p>') +

      sec('5.2', 'Bleaching materials &amp; safety',
        '<div class="bc-points bc-five">' +
          step('Bleach powder + bleach developer', '(I use BLONDME.)', 'Use 20 vol developer, the usual choice at home and the strongest to use on the scalp.') +
          step('Toner + toner developer', '(I use Wella T14.)', 'Wella toners mix with 20 vol developer; check the box for yours.') +
          step('Kitchen scale', 'I use 2:1 ratios and end up with about 30 g of each mix, which is more than enough.', 'Weighing in grams keeps 2 parts developer to 1 part powder (or toner) exact.') +
          step('Bowl and brush', '', 'Ceramic, plastic, or glass. Metal can react with bleach.') +
          step('Shampoo and conditioner', '', 'Any you like. (I use Ethique bars, plastic-free.) Purple ones prevent brassiness.') +
          step('Hair clips', '', '') +
          step('Old towels, bathmat, and clothes', '', 'Clothes may get stained (alternatively, go topless).') +
          step('Timer', '', 'For the first few times, it’s helpful to see how long it takes. Better yet, ask a friend (ideally with experience, in person or over the phone) to keep time for the first round! There’s enough to handle, plus they can see the back of your head in person.') +
          step('Mirrors', '', 'To see the back of your head.') +
          step('Gloves (optional)', '', '') +
        '</div>' +
        '<h4>Fresh air</h4><p>Open a window or run a fan, since bleach powder and fumes irritate lungs (see <a href="#lens-air/ventilation">Air → Ventilation</a>). If your respiratory system is extra sensitive, I’d advise a mask.</p>' +
        '<h4>Developer strength</h4><p>Developer strength is counted in “volumes.” 10 vol is 3% peroxide (the drugstore bottle), 20 vol is 6%, 30 vol is 9%, and 40 vol is 12%. Stronger developer lifts faster, and also burns skin and breaks hair faster.</p>' +
        '<h4>Oily hair protects your scalp</h4><p>Wait until your hair is oily to bleach, because scalp oil cushions the skin. Wait at least two weeks after a perm or relaxer, and until any cut, sore, or sunburn on the scalp has healed.</p>' +
        '<h4>Leftovers</h4><p>Mixed bleach keeps giving off oxygen and can burst a closed container, so it can’t be saved. Rinse leftovers down the drain with plenty of water.</p>' +
        '<p class="bc-tip"><span>For kids</span> Wash-out colors, like hair chalk and color conditioner, change hair with no peroxide and rinse out when they’re ready for something new.</p>' +
        '<p class="bc-care"><span>Cat and dog health</span> Peroxide and persulfates irritate mouths and stomachs. Keep powder and mixed bleach out of reach, and wipe up drips.</p>' +
        '<p class="bc-ally"><span>Allies</span> Beauty (cosmetology) schools color hair for much less, done by students with an instructor checking each step. If bleach gets in an eye, rinse it with water for 15 minutes and call Poison Control at <a href="tel:18002221222">1-800-222-1222</a> (free, any time). For blisters or swelling, get medical care; 211 can point you to low-cost clinics.</p>' +
        '<p class="bc-src">Sources: Cosmetic Ingredient Review, “Final report on the safety assessment of ammonium, potassium, and sodium persulfate,” <i>International Journal of Toxicology</i> (2001); America’s Poison Centers, first aid for eye exposures; Wella Color Charm toner directions.</p>') +

      sec('5.3', 'How bleach works',
        '<p>Hair gets its color from melanin, pigment packed inside each hair’s core (the cortex). There are two kinds: eumelanin (brown and black) and pheomelanin (red and yellow). Overlapping scales, the cuticle, shield the core.</p>' +
        '<div class="bc-points">' +
          step('Alkali opens the hair', '', 'Bleach is mixed to a high pH (about 10–11) with ammonia or a similar alkali. That swells each hair and lifts its scales, so peroxide can reach the pigment.') +
          step('Peroxide breaks the pigment', '', 'Hydrogen peroxide (the “developer”) oxidizes melanin into colorless pieces. Persulfate salts in bleach powder speed it up. Brown and black melanin breaks down first, and red and yellow last, so hair passes through red, orange, and yellow on its way to pale blonde. That leftover warmth is what toner cancels.') +
          step('The same reaction weakens hair', '', 'Oxidation also breaks some of the sulfur bonds that hold hair’s protein (keratin) together, and strips the oily outer layer that lets hair shed water. Bleached hair is porous: it soaks up water, tangles, and snaps more easily. Hair past the scalp isn’t alive, so it can’t repair this. Care is about losing less until it grows out.') +
        '</div>' +
        '<p>“High-lift” box dyes lighten natural hair a few shades with less damage. Dye can’t lift other dye, though; only bleach removes color that’s already there.</p>' +
        '<p class="bc-src">Sources: Robbins, <i>Chemical and Physical Behavior of Human Hair</i>, 5th ed. (Springer, 2012); Wolfram, “Human hair: a unique physicochemical composite,” <i>Journal of the American Academy of Dermatology</i> (2003).</p>') +

      mn().deeper('People whose work shaped this unit, and where to go for more.', unitCredits(true));
    return page('Hair bleaching', ' bc-u4', html);
  }

  /* Unit 1 Overview: the Roots tier at body scale, then sleep, routines and blue light, then a small kit of tools. */
  /* Unit 2 What bodies need: one list for every cell, each part its own way, symptoms as messengers, thinking in systems. */
  function loop(steps, label) {
    return '<p class="bc-loop"><span class="sr-only">' + label + ': </span>' + steps.map(function (s, i) {
      return '<span class="bc-step">' + s + '</span>' + (i < steps.length - 1 ? '<span class="bc-arrow" aria-hidden="true">→</span><span class="sr-only">, which leads to </span>' : '');
    }).join('') + '<span class="bc-arrow" aria-hidden="true">↺</span><span class="sr-only">, and around again.</span></p>';
  }
  function needs() {
    var html = hero('needs') + unitHead(2, 'What bodies need') +
      '<p class="bc-lede">A body is a system: many parts sharing one supply line. Each part takes what it needs and sends a signal when it’s running short.</p>' +
      '<p class="bc-tip"><span>Heads up</span> This is how bodies work in general, not medical advice for yours. For that, a clinician who knows you is the ally; 211 can find low-cost clinics.</p>' +

      sec('2.1', 'One list for every cell',
        '<p>Teeth, bones, and a beating heart look nothing alike, but every cell in them runs on the same short list. The parts are different strategies for meeting the same needs.</p>' +
        '<div class="bc-points">' +
          card('Air', 'Oxygen, carried by the blood, lets cells burn fuel. More in <a href="#lens-air">Air &amp; temperature</a>.') +
          card('Water', 'Every reaction in the body happens in water. Blood, saliva, and pee are mostly water. More in <a href="#lens-water">Water</a>.') +
          card('Fuel', 'Energy from carbohydrates and fats. The brain alone uses about a fifth of it.') +
          card('Building blocks', 'Protein, fats, and minerals to build and rebuild. More in <a href="#lens-food">Food</a>.') +
          card('Helpers', 'Vitamins and minerals, in small amounts, keep the body’s chemistry running.') +
          card('Steady conditions', 'Warmth, acidity (pH), and salt, each held in a narrow range. The body works around the clock to keep them steady.') +
          card('A way out', 'Lungs, kidneys, liver, gut, and skin carry waste away. Pooping and peeing easily are needs too.') +
          card('Repair time', 'Much of the mending happens during sleep and rest (<a href="#lens-body-care/1-2">1.2</a>).') +
          card('Use', 'Bones, muscles, and joints get stronger when they’re moved and loaded. Left unused, the body takes them apart to save resources.') +
          card('Signals', 'Light sets the body clock (<a href="#lens-body-care/1-3">1.3</a>). Hormones, nerves, and touch carry messages between parts.') +
          card('Partners', 'Trillions of microbes in the gut, the mouth, and on the skin help digest food, train the immune system, and crowd out germs.') +
          card('Safety and company', 'Under long stress, the body puts repair on hold to stay ready. Calm, kind company lets it get back to mending. More in <a href="#lens-relationships">Relationships</a>.') +
        '</div>') +

      sec('2.2', 'Each part, its own way',
        '<p>Each part leans on some needs more than others. Here are the big ones, with plant foods that meet them.</p>' +
        '<div class="bc-points">' +
          card('Teeth', 'Calcium and phosphate to rebuild enamel, saliva to wash acid away, and time between sips and snacks. More in <a href="#lens-body-care/mouth">unit 3</a>.') +
          card('Bones', 'Calcium (calcium-set tofu, fortified plant milk, kale, bok choy), vitamin D from sun on skin, vitamin K from leafy greens, protein, and weight-bearing movement like walking. Bones hold 99% of the body’s calcium and rebuild themselves bit by bit all through life.') +
          card('Muscles', 'Protein (beans, lentils, tofu, nuts, seeds), use, rest, and salts like potassium and magnesium from fruit, beans, and greens.') +
          card('Blood', 'Iron from beans, lentils, and greens, absorbed better with vitamin C at the same meal. Folate from greens and beans, and vitamin B12 (a supplement, if you eat only plants).') +
          card('Skin, gums, and tendons', 'Collagen holds them together. The body needs protein and vitamin C (citrus, peppers, berries) to make it.') +
          card('Brain and nerves', 'Steady fuel, oxygen, sleep, B vitamins, and omega-3 fats (ground flax, chia, walnuts, or algae oil). Play and company too.') +
          card('Gut', 'Fiber from whole plants feeds its microbes. Regular meals and moving help it keep its rhythm.') +
          card('Heart and lungs', 'Clean air, movement that leaves you a little out of breath, and potassium from fruit and vegetables.') +
          card('Kidneys and liver', 'Water, steady blood pressure, and breaks from alcohol and other poisons (<a href="#lens-toxins">Poisons</a>).') +
        '</div>' +
        '<p class="bc-tip"><span>Every body</span> Growing kids need more of almost everything for their size, sleep and play included (unit 6, planned). The animals who share your home run on the same list in their own ways (unit 7, planned).</p>') +

      sec('2.3', 'Symptoms are messengers',
        '<p>Feelings point to needs (<a href="#lens-emotions/feel">Emotions → Feel</a>), and symptoms do the same for the body. Many are the body already meeting a need.</p>' +
        '<div class="bc-points">' +
          card('Thirst', 'Asking for water.') +
          card('Hunger', 'Asking for fuel and building blocks. Feeling shaky or cranky can mean it’s been a while.') +
          card('Tiredness', 'Asking for sleep, rest, or food, or sometimes a break from stress or a screen.') +
          card('Pain', 'Asking to protect a spot while it heals. Pain can carry feelings too (<a href="#lens-emotions/feel">Emotions 2.4</a>).') +
          card('Swelling and redness', 'Inflammation: extra blood and immune cells rushing in to clean up and repair.') +
          card('Fever', 'The body turning up the heat, which helps the immune system and slows many germs. Rest and fluids help it do its job.') +
          card('Coughing, throwing up, diarrhea', 'Moving something harmful out. Replacing water and salts matters most; see <a href="#lens-food/rehydrate">Food → Rehydrate</a>.') +
          card('Itching', 'Asking you to look at the skin: dryness, a bite, a plant, or a product.') +
        '</div>' +
        '<p>There are two strategies for a symptom, and they work well together:</p>' +
        ul(['<b>Quiet the messenger.</b> Rest, a cool cloth, or medicine for pain or fever. Comfort is a need too.',
            '<b>Meet the need.</b> Water, food, sleep, movement, or care for the spot it points to.']) +
        '<p class="bc-ally"><span>Allies</span> Some messages need help right away. Call <a href="tel:911">911</a> for chest pain, trouble breathing, a face drooping or sudden weakness on one side, or someone who won’t wake up. See a doctor for a fever lasting more than three days, pain that wakes you at night, or anything that keeps getting worse. Call <a href="tel:211">211</a> to find low-cost clinics nearby.</p>') +

      sec('2.4', 'Thinking in systems',
        '<p>Systems thinking looks at how parts connect over time, not at one part alone. A few of its ideas explain a lot about bodies.</p>' +
        '<div class="bc-points">' +
          card('In and out', 'Bone, enamel, energy, and rest are like a bank account: always being spent and refilled. A cavity or thinning bones mean losing has outpaced rebuilding for a while, so both sides count: less taken out, more put back.') +
          card('Loops that steady', 'Thirsty, so you drink. Too warm, so you sweat. These loops bring the body back to balance on their own, and most symptoms are part of one.') +
          card('First things first', 'When supplies run short, the body feeds the brain and heart first and borrows from the rest, like pulling calcium out of bone to keep the blood steady. Hair, nails, and skin get what’s left, so they often show a shortage early.') +
          card('Slow changes', 'Bones, teeth, and blood vessels change over years, long before any symptom shows. Small, steady habits do more than a rescue at the end.') +
          card('A few things, many needs', 'Sleep, water, plant foods, moving, clean air, daylight, and calm company each meet many needs at once. That’s why they come first, in <a href="#lens-body-care/1-1">1.1</a>.') +
          card('Systems inside systems', 'Cells live inside a body, a body inside a household, and a household inside the land: its air, water, and soil. Care for one reaches the others, which is why this lens links to the rest.') +
        '</div>' +
        '<h4>Loops that spiral</h4>' +
        '<p>Some loops feed themselves. Breaking any one link can turn the whole loop around.</p>' +
        loop(['Pain', 'moving less', 'weaker muscles', 'more pain'], 'A loop') +
        loop(['Poor sleep', 'sugar cravings', 'energy crashes', 'poorer sleep'], 'Another loop') +
        '<p>Turned around, the same loop spirals up: a short, gentle walk, a little stronger, a little less pain, a longer walk.</p>' +
        '<p class="bc-tip"><span>Try this</span> Pick one signal your body sends this week, like a headache, a craving, or an afternoon slump. Ask what it might be asking for, try one strategy that meets the need, and notice what changes.</p>' +
        '<p class="bc-src">Sources: Donella H. Meadows, <i>Thinking in Systems: A Primer</i> (Chelsea Green, 2008); Walter B. Cannon, <i>The Wisdom of the Body</i> (1932); Randolph M. Nesse and George C. Williams, <i>Why We Get Sick</i> (1994); NIH Office of Dietary Supplements, fact sheets on calcium, vitamin D, iron, vitamin B12, and omega-3s.</p>') +

      nextCard(2);
    return page('What bodies need', '', html);
  }

  function overview() {
    var html = hero('overview') + unitHead(1, 'Overview') +
      '<p class="bc-lede">Most body care is the basics: water, food, air, and rest. With those flowing, the body handles most of its own repair.</p>' +

      sec('1.1', 'The basics',
        '<p>Tier 2, Roots, covers what every living thing runs on. Here’s what it looks like for one body, day to day.</p>' +
        '<div class="bc-points">' +
          card('Drink water', 'Thirst is a good guide for most people. Pale-yellow pee means you’re drinking enough; dark yellow means drink more. Heat, illness, nursing, and moving a lot all raise the need. How much a household needs, and where to get it, is in <a href="#lens-water">Water</a>.') +
          card('Eat well', 'Mostly plants, in lots of colors, with beans, whole grains, nuts, and seeds for protein and fiber. Regular meals keep energy and mood steady. If you eat only plants, take vitamin B12. Free and low-cost food, and soft foods for sick days, are in <a href="#lens-food">Food</a>.') +
          card('Breathe clean air', 'Open a window when the air outside is good, and run a fan while cooking. Heat, cold, and sun on skin are in <a href="#lens-air">Air &amp; temperature</a>.') +
          card('Go gentle on skin', 'Skin takes in some of what’s put on it. Fragrance-free soap and lotion, and fewer products overall, are easy swaps. More in <a href="#lens-toxins">Poisons</a>.') +
        '</div>') +

      sec('1.2', 'Sleep &amp; rest',
        '<p>Sleep is when the body does much of its repair: tissue mends, memories settle, and the immune system resets. Rest during the day counts too.</p>' +
        '<div class="bc-points">' +
          card('How much sleep', 'Most adults need 7–9 hours. Teens need 8–10, school-age kids 9–12, and little ones more, naps included.') +
          card('Rest counts too', 'Lying down, sitting quietly outside, or a nap of 20 minutes or less helps the body and mood recover between efforts. Longer or later naps can make night sleep harder.') +
          card('When sleep won’t come', 'If you’re awake for more than about 20 minutes, get up and do something calm in dim light, then try again. Worries often show up at night; <a href="#lens-emotions">Emotions</a> can help find the need underneath.') +
        '</div>' +
        '<p class="bc-ally"><span>Allies</span> Loud snoring with gasping, or tiredness that sleep doesn’t fix, is worth a doctor’s visit. Sleep apnea is common and treatable. Call 211 to find low-cost clinics nearby.</p>') +

      sec('1.3', 'Routines &amp; blue light',
        '<p>The body clock runs on light. Bright light tells it “day,” and darkness lets it make melatonin, the hormone that says “sleep.”</p>' +
        '<div class="bc-points">' +
          card('Blue light before bed', 'Screens and white LED bulbs give off a lot of blue light, the color the body clock notices most. In the evening it holds back melatonin and pushes sleep later.</p><p>Try putting screens away an hour before bed, night mode on phones, and warm, dim lamps instead of overhead lights.') +
          card('Morning light', 'Daylight soon after waking, even outside on a cloudy day, sets the clock for the night ahead.') +
          card('A steady wake time', 'Waking at about the same time every day, weekends too, steadies sleep more than an early bedtime does.') +
          card('A wind-down routine', 'The same few steps each night tell the body sleep is coming: dim lights, brush and floss (unit 3), a warm shower, a book. A cool, dark, quiet room helps. For kids: bath, book, and the same order every night.') +
        '</div>' +
        '<p class="bc-joy"><span>Morning joys</span> Caffeine lasts for hours, so coffee after about noon can still be keeping you up at bedtime. Morning coffee outside gets you daylight too.</p>' +
        '<p class="bc-src">Sources: Watson et al., adult sleep consensus, <i>Journal of Clinical Sleep Medicine</i> (2015); Paruthi et al., children’s sleep consensus, <i>JCSM</i> (2016); Chang et al., “Evening use of light-emitting eReaders negatively affects sleep,” <i>PNAS</i> (2015).</p>') +

      sec('1.4', 'Tools',
        '<p>A few small tools cover most body care. Stainless steel ones last for decades, so buy once, or borrow.</p>' +
        '<div class="bc-points bc-five">' +
          step('Nail clippers and a file', '', 'Cut toenails straight across, not curved into the corners, so they don’t grow into the skin. Soaking first softens thick nails.') +
          step('Tweezers', 'Fine-tipped', 'For splinters and ticks. For a tick, grip it close to the skin and pull straight up, slow and steady, then wash the spot.') +
          step('Comb or brush', '', 'A brush spreads scalp oil down the hair; a wide-tooth comb detangles wet or curly hair. More in unit 4.') +
          step('Toothbrush, floss, and tongue scraper', '', 'The daily mouth kit. More in unit 3.') +
          step('Handheld shower head', '', 'Rinses roots for water-only washes (unit 4) and makes bathing kids easier.') +
        '</div>' +
        '<p>Wash tools with soap and hot water, and wipe them with rubbing alcohol now and then. Razors and toothbrushes stay one per person, since they can carry blood.</p>' +
        '<p class="bc-src">Sources: CDC, tick removal; CDC, preventing bloodborne infections at home.</p>') +

      nextCard(1);
    return page('Overview', '', html);
  }

  /* Unit 3 Hair care: wash less, brush, rinse; hippie options; a short sub-unit for textured and coily hair. */
  function hairCare() {
    var html = hero('hair') + unitHead(4, 'Hair care') +
      '<p class="bc-lede">My own hair advice: skip the bleach, and brush it and wash it. Bleaching is unit 5, for when you want it.</p>' +
      '<p class="bc-tip"><span>Heads up</span> I’m not a doctor or a cosmetologist. This is what has worked for my hair; it isn’t settled science, and hair varies a lot.</p>' +

      sec('4.1', 'How hair stays healthy',
        '<p>Each hair grows from a follicle with a small oil gland beside it. That oil, sebum, coats the scalp and hair so they stay soft and shed water.</p>' +
        '<div class="bc-points">' +
          card('Know your hair type', 'Hair care advice works best when it’s for your type, so it helps to look up care for yours. A common system numbers it by shape: 1 straight, 2 wavy, 3 curly, 4 coily, with A to C from looser to tighter (mine is 2B). Thickness and how fast hair soaks up water matter too.') +
          card('Shampoo strips oil', 'Shampoo is a detergent: it loosens oil so water can rinse it away. Washing every day can leave the scalp and ends dry.') +
          card('My theory: over-oiling', 'When I washed every day, my roots were oily again by the next day. I think my scalp was making extra oil, expecting another round of industrial-grade degreaser. Once I washed less, it calmed down within a few weeks. Studies haven’t settled whether this rebound is real, but many people find the same.') +
          card('Brushing spreads oil', 'A soft brush carries oil from the roots down to the ends, and lifts out dust and shed hair. Brush straight hair dry; curly hair detangles best wet (4.3).') +
        '</div>') +

      sec('4.2', 'Washing less',
        '<div class="bc-points">' +
          step('Water-only washes', 'Most washes', 'I use a handheld shower head to send water straight into the roots, section by section, and rub my scalp with my fingertips to lift oil and flakes.') +
          step('Shampoo every other wash', '(I use Ethique bars.)', 'A solid bar, plastic-free, then conditioner on the ends. For blonde hair, I use their purple bars, which keep yellow away (more in unit 5).') +
          step('The in-between weeks', '', 'Changing routines can mean a few weeks of oilier roots while the scalp adjusts. Braids, buns, hats, and dry shampoo help.') +
        '</div>' +
        '<h4>Hippie options</h4>' +
        '<div class="bc-points">' +
          card('Apple cider vinegar rinse', 'Stir 1–2 tbsp apple cider vinegar into 1 cup of water. After washing, pour it over your hair, wait a minute, and rinse. Its mild acid smooths hair’s scales for shine and lifts hard-water buildup. Keep it out of your eyes.') +
          card('Homemade dry shampoo', 'Cornstarch or arrowroot powder, brushed into oily roots, soaks up oil between washes. For dark hair, mix in a little cocoa powder so it doesn’t show.') +
          card('Skip baking soda', 'Some “no-poo” routines wash with baking soda, but it’s strongly alkaline, which roughs up hair’s scales and can dry the scalp.') +
        '</div>' +
        '<p class="bc-tip"><span>For kids</span> Kids’ scalps make little oil until puberty, so a water rinse covers most days.</p>' +
        '<p class="bc-ally"><span>Allies</span> Flakes, itching, or redness that don’t clear up may be dandruff (seborrheic dermatitis), linked to a yeast that lives on everyone’s skin. A medicated shampoo with zinc pyrithione or ketoconazole often helps. Sudden hair loss or bald patches are worth a doctor’s visit; 211 can point you to low-cost clinics.</p>') +

      sec('4.3', 'Textured &amp; coily hair',
        '<p>Curly, coily, and kinky hair, including most Black hair, has its own needs. This is outside my expertise, so it stays short and points to people who know it best.</p>' +
        '<div class="bc-points">' +
          card('Moisture first', 'Scalp oil travels slowly down a coil, so ends tend to be dry. Many people wash every week or two, or wash with conditioner only (co-washing), then seal water in with a leave-in conditioner and an oil or butter, like jojoba oil or shea butter.') +
          card('Detangle wet', 'With conditioner in, use fingers or a wide-tooth comb, starting at the ends and working up to the roots.') +
          card('Protect at night', 'A satin bonnet, scarf, or pillowcase cuts friction and keeps moisture in.') +
          card('Easy on the edges', 'Braids, twists, and locs protect hair, but pulled tight for a long time they can thin the hairline (traction alopecia). Pain or bumps mean it’s too tight.') +
          card('Chemical straighteners', 'A large NIH study (2022) linked frequent use of relaxers and straighteners to a higher risk of uterine cancer, and some keratin treatments give off formaldehyde gas.') +
        '</div>' +
        '<p>In California, the CROWN Act (SB 188, 2019) bans discrimination against natural hair and styles like braids, locs, and twists at work and in public schools.</p>' +
        '<p class="bc-ally"><span>Allies</span> Stylists who specialize in textured hair, and the people in your life whose hair is like yours, know far more than this page.</p>' +
        '<p class="bc-src">Sources: Robbins, <i>Chemical and Physical Behavior of Human Hair</i>, 5th ed. (Springer, 2012); Chang et al., “Use of straighteners and other hair products and incident uterine cancer,” <i>Journal of the National Cancer Institute</i> (2022); California SB 188, the CROWN Act (2019).</p>') +

      nextCard(4);
    return page('Hair care', '', html);
  }

  /* A big link to the next ready unit, so phones don't have to scroll back up to the unit list. */
  function nextCard(i) {
    var u = UNITS[i];
    if (!u || !u.href) return '';
    return '<a class="bc-next" href="' + u.href + '"><span>Next · Unit ' + (i + 1) + '</span><b>' + u.name + '</b></a>';
  }

  function page(name, cls, html) {
    return { title: name + ' · Body care · Kinship', html: mn().header('home') + '<div><a class="back" href="#">← Education</a></div><main class="bc' + cls + '">' + html + '</main>' + mn().footer() };
  }

  window.MN_LENS_VIEWS = window.MN_LENS_VIEWS || {};
  /* #lens-body-care is unit 1 Overview; /needs (What bodies need), /mouth, /hair (Hair care) and /bleach (Hair bleaching) are units 2–5.
     A sub-unit link like #lens-body-care/2-2 opens that unit at that sub-unit. */
  window.MN_LENS_VIEWS['body-care'] = function (sub) {
    var seg = (sub || '').split('/')[0], m = /^([1-5])-\d+$/.exec(seg);
    var unit = m ? +m[1] : ({ needs: 2, mouth: 3, hair: 4, bleach: 5 })[seg] || 1;
    var v = [overview, needs, mouth, hairCare, bleach][unit - 1]();
    if (m) v.jump = 'bc-' + seg;
    return v;
  };
})();
