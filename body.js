/* Body care lens (tier 3 Protect, Beta): unit 1 Mouth (1.1 Why teeth decay, 1.2 Solutions, 1.3 Make mouthwashes & mints).
   Units 2–5 are planned. Kept plain on purpose (FOUNDATION §6, Only build what helps). Registers window.MN_LENS_VIEWS['body-care']. */
(function () {
  function mn() { return window.MN; }
  function ul(items) { return '<ul>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
  function sec(n, title, body) {
    return '<article class="bc-sec" id="bc-' + n.replace('.', '-') + '"><div class="bc-sec-head"><span class="bc-n">' + n + '</span><h2>' + title + '</h2></div>' + body + '</article>';
  }
  function card(title, text) { return '<div><h3>' + title + '</h3><p>' + text + '</p></div>'; }
  var PLANNED = ['Skin &amp; hair', 'Sleep &amp; rest', 'Bodies through time', 'Animal bodies'];

  function view() {
    var html =
      '<div class="bc-hero"><span class="bc-pill">Tier 3 · Protect</span><h1 tabindex="-1">Body care</h1>' +
        '<p class="bc-lede">Bodies are always repairing themselves. Body care is mostly about giving that repair what it needs. We start with the mouth.</p>' +
        '<ul class="bc-units" aria-label="Units"><li class="now">1 · Mouth</li>' + PLANNED.map(function (u, i) { return '<li class="later">' + (i + 2) + ' · ' + u + ' <span>Planned</span></li>'; }).join('') + '</ul></div>' +

      sec('1.1', 'Why teeth decay',
        '<p>Hundreds of kinds of bacteria live in every mouth, and most of them help. Trouble starts when conditions favor the few that make acid, mainly <i>Streptococcus mutans</i>. Plaque is bacteria, leftover food particles, and saliva.</p>' +
        '<div class="bc-points">' +
          card('Acid and dryness are the problems', 'Acid pulls minerals out of enamel.</p><p>Saliva neutralizes acid, so a dry mouth leaves teeth unprotected (from mouth-breathing, medicines or not drinking enough water).</p><p>After each sip or snack, saliva takes about 30 minutes to bring the mouth back to neutral. How often you eat or drink matters more than how much.') +
          card('Teeth need minerals', 'Enamel is mostly calcium and phosphate. Between meals, saliva puts minerals back.</p><p>A cavity is where losing has outpaced rebuilding for a long time. Before that, early damage can reverse.') +
          card('Sugar feeds acid-making bacteria', 'Sugar doesn’t harm teeth by itself. Acid-producing bacteria eat sugar, along with starches that linger (potatoes, crackers, chips), and give off acid.</p><p>Regardless of sugar, some drinks are acidic, like soda (diet too), coffee, citrus drinks (incl. lemon water), kombucha, and sports drinks.') +
        '</div>' +
        '<p class="bc-src">Sources: W.D. Miller, <i>The Micro-Organisms of the Human Mouth</i> (1890); Featherstone, “Dental caries: a dynamic disease process,” <i>Australian Dental Journal</i> (2008); Reddy et al., “The pH of beverages in the United States,” <i>JADA</i> (2016).</p>') +

      sec('1.2', 'Solutions',
        '<p>Decay comes from too much acid for too long. So we solve it four ways: clear out the bacteria, neutralize the acid, slow the bacteria that make it, and give enamel the minerals to rebuild.</p>' +
        '<div class="bc-points">' +
          card('Dislodge and remove bacteria', 'Floss once a day to dislodge bacteria and food between teeth and under the gumline, where a toothbrush can’t reach. A tongue scraper clears the bacteria that collect on the back of the tongue. Bacteria that don’t sit can’t make as much acid, nor stinky breath.') +
          card('Neutralize the acid', 'Saliva is the mouth’s own acid buffer, so keep it flowing with water, chewing and fewer sips between meals. Baking soda neutralizes acid too, which is why it’s in the rinse in 1.3.') +
          card('Slow the acid-makers', 'Acid-making bacteria take in xylitol as if it were sugar, but can’t use it, so they grow more slowly and make less acid. Its sweet taste also gets saliva flowing. Dr. Ellie Phillips suggests 6–10 g a day, in 3–5 small doses after eating. It works through steady daily use.') +
          card('Rebuild the enamel', 'Fluoride or nano-hydroxyapatite toothpaste helps the surface rebuild harder. Leaving it on the teeth (spit, don’t rinse) gives it time to work.') +
        '</div>' +
        '<h3>Game plan</h3>' +
        ul(['<b>Every morning:</b> brush along the gumline with fluoride or nano-hydroxyapatite paste (I recommend NOBS). Spit without rinsing, and ideally have only water afterward.',
          '<b>After eating or drinking:</b> ideally swish with mouthwash (homemade or store-bought, see 1.3) to neutralize acid, then have a xylitol mint. After something acidic, wait 30–60 minutes before brushing because acid briefly softens enamel and scrubbing it wears it down.',
          '<b>Between meals:</b> drink water. Have acidic or sweet drinks with a meal rather than sipping them for hours.',
          '<b>Every night:</b> floss, scrape your tongue and brush.']) +
        '<p class="bc-joy"><span>Morning joys</span> If you drink coffee or tea, brushing beforehand leaves a fluoride layer on your teeth that helps protect them. Don’t brush right after coffee, tea, or anything acidic, when your enamel is weakest.</p>' +
        '<p class="bc-ally"><span>Allies</span> A dentist can catch and treat what home care can’t, like deep cavities, cracked teeth, infections, gum disease and pain. Dental school clinics and community health centers often cost less. In California, Medi-Cal Dental covers many people. Call 211 to find care nearby.</p>' +
        '<p class="bc-src">Sources: Mäkinen &amp; Scheinin, Turku sugar studies (1970s); Riley et al., Cochrane review of xylitol (2015).</p>') +

      sec('1.3', 'Make mouthwashes &amp; mints',
        '<p>Simple and free of dyes and alcohol.</p>' +
        '<div class="bc-recipes">' +
          '<div><h4>Rinse powder</h4>' + ul(['½ cup baking soda', '¼ cup xylitol', '15–20 drops peppermint oil', '5–8 drops clove oil']) +
            '<p>Mix the oils into the dry powder until no damp spots are left, and store it in a glass jar. Stir ¾ tsp into ¼–½ cup of warm water, swish, and spit. It keeps for months, and the scent fades after 2–3 months.</p></div>' +
          '<div><h4>Xylitol mints</h4>' + ul(['½ cup xylitol (about 100 mints)', '6–10 drops peppermint oil (start with 6, then taste)', 'Optional: ¼ tsp pure vanilla extract, for vanilla mints']) +
            '<p>Melt the xylitol on low heat until clear. Cool it briefly, stir in the peppermint (and vanilla, if using), and drop ¼ tsp amounts into tiny silicone molds. Let them set at room temperature, then store airtight. Each mint is about 1 g, dependent on size.</p></div>' +
        '</div>' +
        '<p>Mix essential oils into the dry powder first, because a drop of pure oil can burn your gums. Tea tree, cinnamon and wintergreen are best left out.</p>' +
        '<p class="bc-care"><span>Take care</span> Xylitol is very toxic to dogs, even in small amounts. Keep jars, gum and mints out of reach.</p>' +
        '<h3>Store-bought</h3>' +
        '<p>I’d recommend Auromere. Dr. Ellie Phillips uses unflavored Closys (stabilized chlorine dioxide), original Listerine (for menthol, thymol, and eucalyptus oil, though beware its acidity), and ACT (0.05% sodium fluoride). Anything with those active ingredients does the same job. I’d avoid dyes, alcohol, and unknown chemicals.</p>' +
        '<p class="bc-src">Source: ASPCA Animal Poison Control, xylitol.</p>') +

      mn().deeper('People whose work shaped this course, and where to go for more.', mn().credits('body-care'));
    return { title: 'Body care · Kinship', html: mn().header('home') + '<div><a class="back" href="#">← Education</a></div><main class="bc">' + html + '</main>' + mn().footer() };
  }

  window.MN_LENS_VIEWS = window.MN_LENS_VIEWS || {};
  window.MN_LENS_VIEWS['body-care'] = function () { return view(); };
})();
