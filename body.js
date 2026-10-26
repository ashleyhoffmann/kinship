/* Body care lens (tier 3 Protect, Beta). Each ready unit is its own screen: unit 1 Mouth (#lens-body-care; 1.1 Why teeth decay, 1.2 Solutions,
   1.3 Make mouthwashes & mints) and unit 4 Hair bleaching (#lens-body-care/bleach; 4.1 Steps, 4.2 Materials & safety, 4.3 How bleach works).
   Units 2 Skin, 3 Hair, 5 Sleep & rest, 6 Bodies through time, and 7 Animal bodies are planned. Kept plain on purpose (FOUNDATION §6, Only build what helps). Registers window.MN_LENS_VIEWS['body-care']. */
(function () {
  function mn() { return window.MN; }
  function ul(items) { return '<ul>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
  function sec(n, title, body) {
    return '<article class="bc-sec" id="bc-' + n.replace('.', '-') + '"><div class="bc-sec-head"><span class="bc-n">' + n + '</span><h3>' + title + '</h3></div>' + body + '</article>';
  }
  function card(title, text) { return '<div><h4>' + title + '</h4><p>' + text + '</p></div>'; }
  function ol(items) { return '<ol>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ol>'; }
  /* Units in order. Ready ones have a route and their own screen; planned ones show dashed. */
  var UNITS = [
    { id: 'mouth', name: 'Mouth', href: '#lens-body-care' },
    { id: 'skin', name: 'Skin' },
    { id: 'hair', name: 'Hair' },
    { id: 'bleach', name: 'Hair bleaching', href: '#lens-body-care/bleach' },
    { id: 'sleep', name: 'Sleep &amp; rest' },
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
    var html = hero('mouth') + unitHead(1, 'Mouth') +

      sec('1.1', 'Why teeth decay',
        '<p>Hundreds of kinds of bacteria live in every mouth, and most of them help. Trouble starts when conditions favor the few that make acid, mainly <i>Streptococcus mutans</i>. Plaque is bacteria, leftover food particles, and saliva.</p>' +
        '<div class="bc-points">' +
          card('Acid and dryness are the problems', 'Acid pulls minerals out of enamel.</p><p>Saliva neutralizes acid, so a dry mouth leaves teeth unprotected (from mouth-breathing, medicines, or not drinking enough water).</p><p>After each sip or snack, saliva takes about 30 minutes to bring the mouth back to neutral. How often you eat or drink matters more than how much.') +
          card('Teeth need minerals', 'Enamel is mostly calcium and phosphate. Between meals, saliva puts minerals back.</p><p>A cavity is where losing has outpaced rebuilding for a long time. Before that, early damage can reverse.') +
          card('Sugar feeds acid-making bacteria', 'Sugar doesn’t harm teeth by itself. Acid-producing bacteria eat sugar, along with starches that linger (potatoes, crackers, chips), and give off acid.</p><p>Regardless of sugar, some drinks are acidic, like soda (diet too), coffee, citrus drinks (incl. lemon water), kombucha, and sports drinks.') +
        '</div>' +
        '<p class="bc-src">Sources: W.D. Miller, <i>The Micro-Organisms of the Human Mouth</i> (1890); Featherstone, “Dental caries: a dynamic disease process,” <i>Australian Dental Journal</i> (2008); Reddy et al., “The pH of beverages in the United States,” <i>JADA</i> (2016).</p>') +

      sec('1.2', 'Solutions',
        '<p>Decay comes from too much acid for too long. So we solve it four ways: clear out the bacteria, neutralize the acid, slow the bacteria that make it, and give enamel the minerals to rebuild.</p>' +
        '<div class="bc-points">' +
          card('Dislodge and remove bacteria', 'Floss once a day to dislodge bacteria and food between teeth and under the gumline, where a toothbrush can’t reach. A tongue scraper clears the bacteria that collect on the back of the tongue. Bacteria that don’t sit can’t make as much acid, nor stinky breath.') +
          card('Neutralize the acid', 'Saliva is the mouth’s own acid buffer, so keep it flowing with water, chewing, and fewer sips between meals. Baking soda neutralizes acid too, which is why it’s in the rinse in 1.3.') +
          card('Slow the acid-makers', 'Acid-making bacteria take in xylitol as if it were sugar, but can’t use it, so they grow more slowly and make less acid. Its sweet taste also gets saliva flowing. Dr. Ellie Phillips suggests 6–10 g a day, in 3–5 small doses after eating. It works through steady daily use.') +
          card('Rebuild the enamel', 'Fluoride or nano-hydroxyapatite toothpaste helps the surface rebuild harder. Leaving it on the teeth (spit, don’t rinse) gives it time to work.') +
        '</div>' +
        '<h4>Game plan</h4>' +
        ul(['<b>Every morning:</b> brush along the gumline with fluoride or nano-hydroxyapatite paste (I recommend NOBS). Spit without rinsing, and ideally have only water afterward.',
          '<b>After eating or drinking:</b> ideally swish with mouthwash (homemade or store-bought, see 1.3) to neutralize acid, then have a xylitol mint. After something acidic, wait 30–60 minutes before brushing because acid briefly softens enamel and scrubbing it wears it down.',
          '<b>Between meals:</b> drink water. Have acidic or sweet drinks with a meal rather than sipping them for hours.',
          '<b>Every night:</b> floss, scrape your tongue, and brush.']) +
        '<p class="bc-joy"><span>Morning joys</span> If you drink coffee or tea, brushing beforehand leaves a fluoride layer on your teeth that helps protect them. Don’t brush right after coffee, tea, or anything acidic, when your enamel is weakest.</p>' +
        '<p class="bc-ally"><span>Allies</span> A dentist can catch and treat what home care can’t, like deep cavities, cracked teeth, infections, gum disease, and pain. Dental school clinics and community health centers often cost less. In California, Medi-Cal Dental covers many people. Call 211 to find care nearby.</p>' +
        '<p class="bc-src">Sources: Mäkinen &amp; Scheinin, Turku sugar studies (1970s); Riley et al., Cochrane review of xylitol (2015).</p>') +

      sec('1.3', 'Make mouthwashes &amp; mints',
        '<p>Simple and free of dyes and alcohol.</p>' +
        '<div class="bc-recipes">' +
          '<div><h4>Rinse powder</h4>' + ul(['½ cup baking soda', '¼ cup xylitol', '15–20 drops peppermint oil', '5–8 drops clove oil']) +
            '<p>Mix the oils into the dry powder until no damp spots are left, and store it in a glass jar. Stir ¾ tsp into ¼–½ cup of warm water, swish, and spit. It keeps for months, and the scent fades after 2–3 months.</p></div>' +
          '<div><h4>Xylitol mints</h4>' + ul(['½ cup xylitol (about 100 mints)', '6–10 drops peppermint oil (start with 6, then taste)', 'Optional: ¼ tsp pure vanilla extract, for vanilla mints']) +
            '<p>Melt the xylitol on low heat until clear. Cool it briefly, stir in the peppermint (and vanilla, if using), and drop ¼ tsp amounts into tiny silicone molds. Let them set at room temperature, then store airtight. Each mint is about 1 g, dependent on size.</p></div>' +
        '</div>' +
        '<p>Mix essential oils into the dry powder first, because a drop of pure oil can burn your gums. Tea tree, cinnamon, and wintergreen are best left out.</p>' +
        '<p class="bc-care"><span>Dog health</span> Xylitol is very toxic to dogs (not cats, though stay cautious), even in small amounts. Keep jars, gum, and mints out of reach.</p>' +
        '<p class="bc-tip"><span>For sore gums</span> Occasionally, add 3% hydrogen peroxide to this rinse for irritated gums. It’s an oxidizing antiseptic: its foam lifts gumline debris, and its oxygen kills oxygen-avoiding bacteria that inflame gums. Stir ¾ tsp powder into equal parts peroxide and warm water (⅛–¼ cup each), swish a minute, spit it all out, and rinse with water. Don’t use it undiluted (it can burn gums) or daily past a week (it irritates gums and tongue, sensitizes teeth, and kills helpful bacteria). Mix it fresh each time, since peroxide breaks down once it meets baking soda. Don’t swallow it; supervise kids under 12 or skip it.</p>' +
        '<h4>Store-bought</h4>' +
        '<p>I’d recommend Auromere. Dr. Ellie Phillips uses unflavored Closys (stabilized chlorine dioxide), original Listerine (for menthol, thymol, and eucalyptus oil, though beware its acidity), and ACT (0.05% sodium fluoride). Anything with those active ingredients does the same job. I’d avoid dyes, alcohol, and unknown chemicals.</p>' +
        '<p class="bc-src">Sources: ASPCA Animal Poison Control, xylitol; US over-the-counter label for 1.5% peroxide mouth rinses (use up to 7 days); Walsh, “Safety issues relating to the use of hydrogen peroxide in dentistry,” <i>Australian Dental Journal</i> (2000); Hossainian et al., review of hydrogen peroxide mouthwashes, <i>International Journal of Dental Hygiene</i> (2011).</p>') +

      mn().deeper('People whose work shaped this course, and where to go for more.', mn().credits('body-care'));
    return page('Mouth', '', html);
  }

  function bleach() {
    var html = hero('bleach') + unitHead(4, 'Hair bleaching') +
      '<p class="bc-lede">Four steps: bleach, wash, tone, and condition. Free first: sunlight breaks down hair color too, so hair lightens over a summer outdoors, with the same dryness at a slower pace.</p>' +

      sec('4.1', 'Steps',
        ol(['<b>Bleach.</b> Mix only what you need, usually 1 part powder to 2 parts 20 vol developer (follow the box). On dry hair in four sections, brush it onto mid-lengths and ends first, a finger-width from the scalp, then the roots last, since body heat makes roots lighten faster. Check a strand every 10 minutes by wiping it clean with a damp towel. Stop at pale yellow or at 45 minutes, whichever comes first. Tingling is common; burning means rinse right away.',
          '<b>Shower with shampoo, no conditioner.</b> Rinse with lukewarm water, then shampoo to wash out every trace of bleach. Skip conditioner here: it coats the hair, and toner soaks in evenly only on clean, bare hair.',
          '<b>Tone.</b> Towel-dry, then apply toner to tint over leftover warmth. Opposite colors cancel: purple cancels yellow, and blue cancels orange. Leave it on for the time on the box.',
          '<b>Shower with conditioner, no shampoo.</b> Rinse out the toner and condition. Skip shampoo here, since it would wash out fresh toner. Conditioner smooths the hair’s scales back down and stands in for the oily layer bleach removed.']) +
        '<div class="bc-points">' +
          card('Care after', 'Conditioner every wash, a weekly deep conditioner or oil on the ends, cool water, a wide-tooth comb on wet hair, and low heat. Purple shampoo once a week keeps yellow away between tones.') +
          card('Go lighter in steps', 'Dark hair often needs two or three sessions to reach pale blonde. Wait about two weeks between them, and afterward bleach only new growth, since bleach over bleach is where hair breaks.') +
        '</div>' +
        '<p>Before the first time, see <a href="#bc-4-2">4.2</a> for a strand test and a skin test.</p>') +

      sec('4.2', 'Materials &amp; safety',
        '<h4>You’ll need</h4>' +
        ul(['Bleach powder and 20 vol developer', 'Toner (or purple shampoo, the gentlest start), plus 10 vol developer if the toner calls for it', 'Shampoo and conditioner', 'A plastic or glass bowl and a brush (metal can react)', 'Gloves, clips, an old towel and shirt, and a timer', 'An open window or a fan, since the powder and fumes irritate lungs (see <a href="#lens-air/ventilation">Air → Ventilation</a>)']) +
        '<div class="bc-points">' +
          card('Choose a gentle developer', 'Developer strength is counted in “volumes.” 10 vol is 3% peroxide (the drugstore bottle), 20 vol is 6%, 30 vol is 9%, and 40 vol is 12%.</p><p>20 vol is the usual choice at home and the strongest to use on the scalp. Stronger developer lifts faster, and also burns skin and breaks hair faster.') +
          card('Test a strand', 'Snip a small lock from underneath, bleach it, and check every 5–10 minutes. It shows how long your hair takes, the color it stops at, and whether it stays strong.') +
          card('Test your skin', 'Persulfates in bleach powder can cause allergies, which can build with each use. Dab a little mixed bleach behind your ear or inside your elbow for the full processing time, rinse, and watch it for 48 hours. Redness, itching, or swelling means bleach isn’t a match for your body.') +
          card('Give hair and scalp a rest', 'Skip shampoo for a day or two before, since scalp oil cushions the skin. Wait at least two weeks after a perm or relaxer, and until any cut, sore, or sunburn on the scalp has healed.</p><p>Henna with metallic salts and “progressive” dyes can heat up and smoke when they meet peroxide, so test a strand first.') +
          card('Leftovers', 'Mixed bleach keeps giving off oxygen and can burst a closed container, so it can’t be saved. Rinse leftovers down the drain with plenty of water.') +
        '</div>' +
        '<p class="bc-tip"><span>For kids</span> Wash-out colors, like hair chalk and color conditioner, change hair with no peroxide and rinse out when they’re ready for something new.</p>' +
        '<p class="bc-care"><span>Cat and dog health</span> Peroxide and persulfates irritate mouths and stomachs. Keep powder and mixed bleach out of reach, and wipe up drips, since paws carry them to tongues.</p>' +
        '<p class="bc-ally"><span>Allies</span> Beauty (cosmetology) schools color hair for much less, done by students with an instructor checking each step. If bleach gets in an eye, rinse it with water for 15 minutes and call Poison Control at <a href="tel:18002221222">1-800-222-1222</a> (free, any time). For blisters or swelling that spreads, get medical care; 211 can point you to low-cost clinics.</p>' +
        '<p class="bc-src">Sources: Cosmetic Ingredient Review, “Final report on the safety assessment of ammonium, potassium, and sodium persulfate,” <i>International Journal of Toxicology</i> (2001); US FDA, “Hair Dyes” (patch test guidance); America’s Poison Centers, first aid for eye exposures.</p>') +

      sec('4.3', 'How bleach works (for nerds)',
        '<p>Hair gets its color from melanin, pigment packed inside each hair’s core (the cortex). There are two kinds: eumelanin (brown and black) and pheomelanin (red and yellow). Overlapping scales, the cuticle, shield the core.</p>' +
        '<div class="bc-points">' +
          card('Alkali opens the hair', 'Bleach is mixed to a high pH (about 10–11) with ammonia or a similar alkali. That swells each hair and lifts its scales, so peroxide can reach the pigment.') +
          card('Peroxide breaks the pigment', 'Hydrogen peroxide (the “developer”) oxidizes melanin into colorless pieces. Persulfate salts in bleach powder speed it up.</p><p>Brown and black melanin breaks down first, and red and yellow last, so hair passes through red, orange, and yellow on its way to pale blonde. That leftover warmth is what toner cancels.') +
          card('The same reaction weakens hair', 'Oxidation also breaks some of the sulfur bonds that hold hair’s protein (keratin) together, and strips the oily outer layer that lets hair shed water.</p><p>Bleached hair is porous: it soaks up water, tangles, and snaps more easily. Hair past the scalp isn’t alive, so it can’t repair this. Care is about losing less until it grows out.') +
        '</div>' +
        '<p>“High-lift” box dyes lighten natural hair a few shades with less damage. Dye can’t lift other dye, though; only bleach removes color that’s already there.</p>' +
        '<p class="bc-src">Sources: Robbins, <i>Chemical and Physical Behavior of Human Hair</i>, 5th ed. (Springer, 2012); Wolfram, “Human hair: a unique physicochemical composite,” <i>Journal of the American Academy of Dermatology</i> (2003).</p>');
    return page('Hair bleaching', ' bc-u4', html);
  }

  function page(name, cls, html) {
    return { title: name + ' · Body care · Kinship', html: mn().header('home') + '<div><a class="back" href="#">← Education</a></div><main class="bc' + cls + '">' + html + '</main>' + mn().footer() };
  }

  window.MN_LENS_VIEWS = window.MN_LENS_VIEWS || {};
  window.MN_LENS_VIEWS['body-care'] = function (sub) { return (sub || '').split('/')[0] === 'bleach' ? bleach() : mouth(); };
})();
