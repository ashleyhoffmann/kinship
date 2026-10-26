/* Emergency prep lens (tier 5, in progress): course content, profile tailoring, My prep list and a hazard tool.
   Registers window.MN_LENS_VIEWS['emergency-prep'].
   Routes: #lens-emergency-prep (overview) · #lens-emergency-prep/list · #lens-emergency-prep/<unit>[/<sub>].
   Unit 1 (What kind of emergency: stay or go, how big, how long) and unit 2 (Your hazards) are written; later units are planned and shown dashed. Units are blues, darkest (1) to lightest.
   Air, water and food during events link back to their Roots courses rather than repeating them. Laws mentioned are California’s. */
(function () {
  var BASE = '#lens-emergency-prep', LKEY = 'meeting-needs.em.v1';
  function mn() { return window.MN; }
  function esc(s) { return mn().esc(s); }
  function prof() { return (mn().profile && mn().profile()) || {}; }
  function $(id) { return document.getElementById(id); }

  function tags() {
    var p = prof(), t = {}, pets = p.pets || '';
    if (p.shape === 'Nothing: it all has to be portable' || p.shape === 'Small, removable things' || p.shape === 'Bigger changes, with an owner who’s on board') t.rent = 1;
    if (p.home === 'Vehicle or boat' || p.home === 'Shelter or no fixed place' || p.stay === 'No fixed place right now') t.mobile = 1;
    if (Number(p.kids) > 0 || (p.consider || []).some(function (c) { return /Pregnancy|Babies/.test(c); })) t.kids = 1;
    if ((p.consider || []).some(function (c) { return /Limited mobility|Chronic illness|Asthma/.test(c); })) t.access = 1;
    if (pets && !/^\s*(0|none|no)\s*$/i.test(pets)) t.animals = 1;
    if ((p.space || []).indexOf('Acreage or farmland') !== -1) t.land = 1;
    if (p.cold === 'Fridge and freezer' || p.cold === 'A small or shared fridge') t.fridge = 1;
    return t;
  }
  var T = {};

  var CUR = { u: '', s: '' };
  function acc(forTags, who, title, body) {
    var hit = forTags.split(' ').some(function (k) { return T[k]; });
    return '<details class="em-acc' + (hit ? ' match' : '') + '"' + (hit ? ' open' : '') + '><summary><span class="em-who">' + who + '</span><span class="em-acc-t">' + title + '</span><span class="em-foryou">For you</span></summary><div class="em-in">' + body + '</div></details>';
  }
  function accs() { return '<div class="em-accs">' + Array.prototype.join.call(arguments, '') + '</div>'; }
  function box(kind, html) { return '<p class="em-box em-' + kind + '">' + html + '</p>'; }
  function ca(h) { return box('ca', h); }
  function care(h) { return box('danger', h); }
  function kin(h) { return box('kin', h); }
  function links(h) { return '<p class="em-links">' + h + '</p>'; }
  function src(h) { return '<p class="em-src">' + h + '</p>'; }
  function legend(h) { return '<p class="em-legend">' + h + '</p>'; }
  function ul(items) { return '<ul>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
  function table(head, rows) {
    return '<div class="em-tbl"><table><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c) { var m = /^\[(y|p|n)\](.*)$/.exec(c); return m ? '<td class="' + m[1] + '">' + m[2] + '</td>' : '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  function does(list) { return '<div class="em-does">' + list.map(function (d) { return '<div><b>' + d[0] + (d[2] ? ' <i>' + d[2] + '</i>' : '') + '</b><p>' + d[1] + '</p></div>'; }).join('') + '</div>'; }
  function note(label, html) { return '<p class="em-box em-note"><b class="em-nl">' + label + ' · </b>' + html + '</p>'; }
  /* stack(): a table that becomes one card per row on phones */
  function stack(head, rows) {
    return '<div class="em-tbl em-stack"><table><thead><tr>' + head.map(function (h) { return '<th scope="col">' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return (i ? '<td data-l="' + head[i] + '">' : '<th scope="row">') + c + (i ? '</td>' : '</th>'); }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  function to(hash, text) { return '<a href="' + hash + '">' + text + '</a>'; }

  var MODE = { before: 'Before', during: 'During', after: 'After', together: 'Together' };
  var COST = ['Free', '$', '$$'];
  function mode(k, label) { return '<span class="em-mode em-m-' + k + '">' + (label || MODE[k]) + '</span>'; }
  /* ready({ cost, c, steps: [[label, text]], add: [title], note }) — every hazard ends with Before · During · After */
  function ready(o) {
    var data = 'before:Before|during:During|after:After';
    var adds = (o.add || []).map(function (t, i) {
      var label = i ? 'Add this too' : 'Add to my prep list';
      return '<button type="button" class="em-add" data-em="add" data-title="' + esc(t) + '" data-label="' + label + '" data-u="' + CUR.u + '" data-s="' + CUR.s + '" data-c="' + (o.c || 0) + '" data-m="' + data + '">' + label + '</button>';
    }).join('');
    return '<div class="em-fix"><div class="em-fix-top"><b>Get ready</b>' + mode('before') + mode('during') + mode('after') + '<span class="em-cost">' + o.cost + '</span></div>' +
      '<ol class="em-steps">' + o.steps.map(function (s) { return '<li><small>' + s[0] + '</small>' + s[1] + '</li>'; }).join('') + '</ol>' +
      ((adds || o.note) ? '<div class="em-fix-foot">' + adds + (o.note ? '<span>' + o.note + '</span>' : '') + '</div>' : '') + '</div>';
  }
  var NUM = {};
  function r(u, s, text) { return '<a href="' + BASE + '/' + u + (s ? '/' + s : '') + '">' + (text || NUM[u + '/' + s] || NUM[u] || '') + '</a>'; }
  var AIR = {
    disasters: to('#lens-air/what/disasters', 'Air: Natural disasters and the air'),
    reading: to('#lens-air/what/reading', 'Air: Reading the air around events'),
    clean: to('#lens-air/ventilation/outside', 'Air: the clean room'),
    filters: to('#lens-air/ventilation/filters', 'Air: Filters'),
    heat: to('#lens-air/sun/heat', 'Air: Hot air and heat waves'),
    cold: to('#lens-air/sun/cold', 'Air: Cold air'),
    gas: to('#lens-air/smoke/gas', 'Air: carbon monoxide')
  };
  var WATER = to('#lens-water/storage', 'Water: Storage'), FOOD = to('#lens-food/store', 'Food: Store'), MOLD = to('#lens-toxins/living/mold', 'Poisons: Mold in the house'), ASH = to('#lens-toxins/neighbors/fire', 'Poisons: After a fire');
  var ANIMALS = to('#lens-relationships/special/captive', 'Relationships: Captive animals'), NEIGH = to('#lens-relationships/special/neighbors', 'Relationships: Neighbors');

  /* ---------- course content ---------- */
  function units() {
    return [
      { id: 'anticipate', num: 1, word: 'What kind of emergency', sub: 'Stay or go, how big, how long',
        lede: 'Every plan starts by naming what it’s for. A blackout, an earthquake, a tsunami warning, and a pandemic each ask for something different: some ask you to stay put with a stocked pantry, others ask you to leave in minutes with a bag. Self-defense covers everyday life; this lens is for the times a whole place changes at once.',
        subs: [
          { id: 'name', short: 'Name it', title: 'Name it first', html: function () { return '<p>Three questions sort almost any emergency, and the answers point to which plan to use.</p>' +
            does([['Stay or go?', 'Is home the safest place, or is leaving safer? This picks the kit: a stocked home, or a bag by the door and in the car.'], ['How big?', 'Just your home, your street, your town, the region, or everywhere at once. The bigger it is, the longer outside help takes, and the more neighbors matter.'], ['How long?', 'Hours, days, or weeks. Most guides aim for at least three days on your own, and two weeks for a big California earthquake.']]) +
            stack(['Event', 'Usually', 'How big', 'How long'], [
              ['Power outage or shutoff', 'Stay', 'Street to region', 'Hours to days'],
              ['Earthquake', 'Stay (go if the building is damaged)', 'Region', 'Days to weeks'],
              ['Wildfire', 'Go, early', 'Town', 'Days to weeks away'],
              ['Wildfire smoke', 'Stay, in a clean room', 'Region', 'Days'],
              ['Tsunami', 'Go, on foot, to high ground', 'Coast', 'Hours'],
              ['Flood or debris flow', 'Go, early', 'Town', 'Days'],
              ['Extreme heat', 'Stay cool, or go to a cool place', 'Region', 'Days'],
              ['Pandemic', 'Stay', 'Everywhere', 'Weeks to months'],
              ['Chemical spill or nuclear fallout', 'Stay inside, sealed', 'Town to region', 'Hours to days'],
              ['Phones and internet down', 'Stay, and meet as planned', 'Town to everywhere', 'Hours to days']]) +
            legend('Officials have the final word: an evacuation order means go, and a shelter-in-place order means stay.') +
            src('Ready.gov, <i>Make a Plan</i>; Earthquake Country Alliance, <i>Seven Steps to Earthquake Safety</i>; Cal OES.'); } },
          { id: 'stay-go', short: 'Stay or go', title: 'Two kits: the pantry and the go-bag', html: function () { return '<p>Almost every plan comes down to two kits. Neither has to be fancy, and most of what goes in them is already in the house.</p>' +
            does([['The pantry <i>Stay</i>', 'Water, food that keeps without power, medicines, light, and a way to hear the news: enough for two weeks at home. Unit 3 builds it.'], ['The go-bag <i>Go</i>', 'One bag per person and per animal: water, snacks, medicines, copies of documents, a charger, and a change of clothes. Light enough to carry. Unit 4 builds it.'], ['The car kit <i>Go</i>', 'A smaller kit that lives in the car: water, a blanket, a charger, shoes you can walk in, and a paper map. Just as useful stuck on a freeway as leaving town.']]) +
            '<p>In California, most households need both. Earthquakes and outages mostly ask you to stay; fire, floods, and tsunamis ask you to leave, often fast. The kits overlap, so the go-bag can sit on the pantry shelf and grab from it on the way out.</p>' +
            note('Without a steady home', 'Living in a vehicle or without a fixed place, the go-bag and the car kit are the whole home, and staying put isn’t always possible. The same lists still help; unit 4 keeps them small and portable.') +
            ready({ cost: 'Free', steps: [['Before · today', 'Name your two or three likely events and mark each one Stay or Go.'], ['Before', 'Pick one spot near the door for go-bags and one shelf for the pantry.'], ['Together', 'Show everyone at home where both are.']], add: ['Our events marked Stay or Go; a spot for go-bags and the pantry'] }) +
            src('Ready.gov, <i>Build a Kit</i>; Cal OES, <i>Listos California</i>.'); } },
          { id: 'small', short: 'Small and often', title: 'Small and often: blackouts', html: function () { return '<p>The most common emergency is small: the power goes out for an evening, or for a few days during a Public Safety Power Shutoff. Small ones are practice for big ones, and they mostly ask for charge, light, cold, and news.</p>' +
            ul(['<b>Charge:</b> a power bank for each phone, kept full (a 10,000 mAh bank charges most phones about twice), and a car charger. Top them up whenever a storm or shutoff is forecast.', '<b>Light:</b> a headlamp for each person keeps hands free; candles start home fires.', '<b>Cold:</b> keep the fridge and freezer shut. A full freezer stays cold about two days.', '<b>News:</b> a battery or hand-crank radio works when phones and Wi-Fi don’t.']) +
            note('Learning from neighbors', 'For people living outside or in vehicles, every day is a bit like a blackout seen from a house, and many already know where to charge a phone (libraries, transit stations), find water, keep food without a fridge, and stay warm or cool. Libraries and 211 are worth knowing by heart, for yourself and to pass on.') +
            '<p>Lights, charging, solar, and safe heating and cooling get a fuller home in the Energy &amp; light lens (planned). The outage plan for your place is in ' + r('prepare', 'power', 'Power outages') + '.</p>' +
            ready({ cost: '$', c: 1, steps: [['Before', 'A charged power bank for each phone and a headlamp for each person.'], ['During', 'Phones on low-power mode, the fridge shut, and a check on neighbors who rely on power.'], ['After', 'Recharge everything before putting it away.']], add: ['A power bank for each phone, a headlamp for each person'] }) +
            links(to('#lens-relationships/special/distress', 'Relationships: People in distress') + ' · ' + FOOD) +
            src('USDA, food safety during power outages; CPUC, Public Safety Power Shutoffs; US Fire Administration, candle safety.'); } },
          { id: 'big', short: 'Big and rare', title: 'Big and rare: when the worst happens', html: function () { return '<p>Some emergencies are rare but huge, the kind that stay in the news for years. They’re frightening to think about, and thinking them through once, calmly, makes them less so. Most use the same two kits, plus a few extra pieces.</p>' +
            does([['Phones and internet down <i>Stay</i>', 'When the network is down for days, plans that live online disappear. Keep a paper list of numbers and addresses, a paper map, some cash in small bills, and offline maps on your phone, and agree on a meeting place and time ahead. Texts often get through when calls don’t, and FRS walkie-talkies need no license.'], ['A pandemic <i>Stay</i>', 'Weeks at home, not days: food and medicine for two weeks, masks, and a plan for who brings groceries to whom.'], ['A nuclear emergency <i>Stay inside</i>', 'Get inside, stay inside, stay tuned. Go to a basement or the middle of a sturdy building, away from windows, for at least 24 hours unless officials say otherwise. Fallout is most dangerous in the first hours and weakens quickly, and brick or concrete walls block much of it. If you were outside, take off your outer layer and wash.'], ['When power turns on people <i>Stay or go</i>', 'When a government or institution harms the people it’s meant to serve, the preparations are people and paper: know your rights, keep copies of documents, write down a legal aid number, and join a rapid response network.']]) +
            '<p>The details for that last one live in ' + to('#lens-self-defense/1-6', 'Self-defense 1.6 When the threat is power') + ' and ' + to('#lens-governance/5.1', 'Governance 5.1 Rights you have by existing') + '.</p>' +
            ready({ cost: 'Free → $', c: 1, steps: [['Before · today', 'Write the ten phone numbers you’d need on paper, and download offline maps of your area.'], ['Before', 'Some cash in small bills; a meeting place and time for when phones are down.'], ['Together', 'Pick one out-of-area contact everyone texts.']], add: ['Paper contacts, offline maps, cash, and a meeting place and time'] }) +
            src('Ready.gov and CDC, <i>Get Inside, Stay Inside, Stay Tuned</i>; FCC, Family Radio Service; Ready.gov, pandemic.'); } },
          { id: 'first', short: 'First 15 minutes', title: 'The first 15 minutes: is it real?', html: function () { return '<p>Big news rarely arrives clear. An alert buzzes, a rumor spreads, the sky turns orange, and the first stretch goes to wondering whether it’s real. That pause is normal: brains look for proof before acting. A plan made ahead turns it into a few quick steps.</p>' +
            does([['1 · Check two sources', 'Official ones: a Wireless Emergency Alert, county alerts, local radio or TV, NOAA Weather Radio, or the agency’s own site. Not one post.'], ['2 · Do the cheap safe thing now', 'If it costs little (get inside, put on shoes, fill the tub, load the go-bags), do it while you check. Being wrong costs a little; waiting can cost a lot.'], ['3 · Follow your triggers', 'Decided ahead: “At an evacuation warning, we leave.” “Long or strong shaking by the coast, we walk uphill.” With triggers, there’s nothing to debate.'], ['4 · Tell your people', 'One text to your household and your out-of-area contact: where you are and what you’re doing.']]) +
            '<p>In January 2018, a false ballistic missile alert reached phones across Hawaii, and the correction came 38 minutes later. People spent those minutes in many ways: sheltering, searching for news, calling family. Sheltering cost little once the alert turned out to be false, which is the point of step 2.</p>' +
            care('Natural warnings come before official ones. Near the coast, long or strong shaking, a roar, or the sea pulling back means walk to high ground right away, without waiting for an alert.') +
            ready({ cost: 'Free', steps: [['Before · today', 'Write your triggers: what makes you stay, and what makes you go.'], ['Before', 'Turn on emergency alerts on every phone and sign up for county alerts.'], ['Together', 'Read the triggers aloud with your household once.']], add: ['Our triggers written down; alerts on every phone'] }) +
            src('FCC, report on the January 13, 2018 Hawaii false ballistic missile alert; NOAA and California Geological Survey, tsunami natural warnings; FEMA, Wireless Emergency Alerts.'); } },
          { id: 'together', short: 'In it together', title: 'We’re in it together', html: function () { return '<p>The bigger an emergency is, the more it becomes a community event. On 9/11, boats of every kind carried about half a million people off Lower Manhattan in one day. In 2020, mutual aid groups formed on block after block to bring groceries and medicine to neighbors. Disaster research finds the same pattern again and again: people mostly help each other, and the places with the strongest ties recover fastest.</p>' +
            does([['Neighbors first', 'In the first hours, most help comes from people already nearby. Knowing two neighbors and what each of you needs is a real preparation.'], ['Ties save lives', 'In Chicago’s 1995 heat wave, people living alone and cut off were most at risk, and neighborhoods where people checked on each other lost far fewer.'], ['Offer what you have', 'A spare room, a ladder, a car, a second language, first aid, or a calm voice: every household has something to offer.']]) +
            ready({ cost: 'Free', steps: [['Before', 'Swap numbers with two neighbors and ask what each of you would need.'], ['During', 'Check on the people you agreed to, then on whoever lives alone.'], ['After', 'Share what’s left over: food, water, chargers, and time.']], add: ['Two neighbors: numbers swapped, needs known'] }) +
            links(NEIGH + ' · ' + to('#lens-self-defense/1-7', 'Self-defense 1.7 Safety is a web of people')) +
            src('Rebecca Solnit, <i>A Paradise Built in Hell</i> (2009); Eric Klinenberg, <i>Heat Wave</i> (2002); Daniel P. Aldrich, <i>Building Resilience</i> (2012); James Kendra and Tricia Wachtendorf, <i>American Dunkirk</i> (2016).'); } }
        ] },
      { id: 'prepare', num: 2, word: 'Your hazards', sub: 'The events your place asks you to plan around',
        lede: 'Preparing is a calm, practical kind of care: deciding ahead of time, while things are easy, so that when something happens there are fewer decisions left. Most places have two or three events worth planning for. This unit helps you find yours, and for each one shows what to do before, during, and after.',
        subs: [
          { id: 'hazards', short: 'Your hazards', title: 'Know your hazards', html: function () { return '<p>Start with the place, not the fear. A free lookup of your address shows which events actually reach you, and it’s usually a shorter list than the news suggests.</p>' +
            does([['MyHazards.CA.gov <i>California</i>', 'Earthquake, flood, fire and tsunami risk for an address, with steps for each.'], ['FEMA National Risk Index <i>US</i>', 'Every county’s risk for 18 hazards, side by side.'], ['County alerts <i>Local</i>', 'Most counties send emergency alerts by text; sign up once and it covers every event.'], ['Evacuation zones <i>Local</i>', 'Many California counties use Genasys Protect: find your zone name now, while it’s calm.']]) +
            '<p>Three things carry over to every event: a way to <b>hear</b> about it (alerts), a <b>place</b> to go and a way to get there, and <b>people</b> you’ll check on and who’ll check on you. Later units build these out.</p>' +
            ready({ cost: 'Free', steps: [['Before · today', 'Look up your address on MyHazards and write down your top two or three events.'], ['Before', 'Sign up for county alerts and find your evacuation zone name.'], ['Together', 'Swap numbers with two neighbors and agree to check on each other.']], add: ['Look up our hazards; county alerts; evacuation zone name'] }) +
            src('Cal OES, MyHazards; FEMA, National Risk Index; Ready.gov.'); } },
          { id: 'planner', tool: true, short: 'What to prep for', title: 'What to prep for', html: function () { return '<p class="em-legend">Tick what’s true for your place and household. It ranks the sections below by how much they’re likely to matter for you.</p><div class="em-chks" id="em-hz"></div><div class="em-out" id="em-hz-out"></div>'; } },
          { id: 'fire', short: 'Wildfire', title: 'Wildfire and smoke', html: function () { return '<p>Wildfire has two reaches. The fire itself reaches homes near grass, brush and forest, often pushed by wind faster than people expect. The <b>smoke</b> reaches much farther, sometimes hundreds of miles, for days at a time. Many more people plan for smoke than for flames, and both are worth a plan.</p>' +
            table(['Alert', 'Means', 'Do'], [['Evacuation warning', '[p]Danger is possible soon', 'Pack the car, gather companions, leave early if anyone needs more time.'], ['Evacuation order', '[n]Leave now', 'Go by the route officials name. Don’t wait to see flames.'], ['Shelter in place', '[p]Leaving is more dangerous', 'Stay inside, windows shut, in the most protected room.']]) +
            ca('Homes in fire hazard areas need defensible space: 100 feet of managed vegetation, with the first 5 feet (Zone 0) kept free of anything that burns, since most homes ignite from embers rather than flames (Public Resources Code §4291). CAL FIRE’s <i>Ready, Set, Go!</i> walks through it.') +
            ready({ cost: 'Free → $', c: 1, steps: [['Before', 'A go-bag by the door during fire season, N95s, and a filter ready for a clean room. Clear Zone 0.'], ['During', 'Leave at the warning if you can. In smoke, the clean room and a filter.'], ['After', 'Ash holds metals and asbestos: gloves, N95, and wet cleanup, never a leaf blower or dry sweeping.']], add: ['Fire season: go-bag by the door, N95s, clean-room filter, Zone 0 clear'] }) +
            links(AIR.disasters + ' · ' + AIR.clean + ' · ' + ASH) +
            src('CAL FIRE, <i>Ready, Set, Go!</i> and defensible space; US EPA, <i>Wildfire Smoke Guide</i>; Board of Forestry Zone 0 rulemaking.'); } },
          { id: 'quake', short: 'Earthquakes', title: 'Earthquakes', html: function () { return '<p>Earthquakes come without warning, which makes the “before” the most important part. Most injuries come from things falling and breaking, not from buildings collapsing, so securing what’s heavy and knowing one simple move go a long way.</p>' +
            does([['Drop, Cover, Hold On <i>During</i>', 'Down on hands and knees, under a sturdy table or against an inside wall with your arms over your head and neck, until the shaking stops.'], ['MyShake <i>Seconds of warning</i>', 'California’s free ShakeAlert app can give a few seconds’ notice, enough to drop and cover.'], ['Secure it <i>Before</i>', 'Strap the water heater, anchor tall furniture and shelves, latch cabinets, move heavy things down low.'], ['Shoes by the bed <i>After</i>', 'Broken glass is the most common injury afterward.']]) +
            care('After shaking: smell gas or hear hissing? Leave, and turn the gas off at the meter only if you know how. Near the coast, long or strong shaking means move to high ground right away, before any alert.') +
            ca('Water heaters must be strapped in California (Health &amp; Safety Code §19211). Many cities run free or low-cost retrofit programs for older homes (Earthquake Brace + Bolt).') +
            ready({ cost: 'Free → $', c: 1, steps: [['Before', 'Download MyShake; strap the water heater; anchor the tallest furniture; shoes and a flashlight by each bed.'], ['During', 'Drop, Cover, Hold On. In bed, stay there and cover your head with a pillow.'], ['After', 'Check people, then gas and water; expect aftershocks; N95 for dusty cleanup.']], add: ['MyShake, water heater strap, tall furniture anchored, shoes by the bed'] }) +
            links(AIR.disasters) +
            src('Earthquake Country Alliance; USGS ShakeAlert; Cal OES MyShake; California Earthquake Authority, Brace + Bolt.'); } },
          { id: 'tsunami', short: 'Tsunamis', title: 'Tsunamis', html: function () { return '<p>California’s coast gets tsunamis from two directions. From far away, after a big earthquake across the Pacific, there are hours of warning. From close by, after a big local earthquake, there may be only minutes. In 1964, a tsunami from an Alaska earthquake killed 11 people in Crescent City, and in 2011, waves from Japan wrecked harbors in Crescent City and Santa Cruz.</p>' +
            does([['Long or strong, get gone <i>Natural warning</i>', 'Shaking that makes it hard to stand or lasts 20 seconds or more, a loud roar, or the sea pulling back: walk to high ground or inland right away.'], ['Know your zone <i>Before</i>', 'Tsunami hazard areas are mapped along the whole coast, and MyHazards shows yours. Blue signs mark the routes out.'], ['On foot <i>During</i>', 'Walk, don’t drive; roads jam fast. Aim for 100 feet up or a mile inland, and stay until officials say it’s over: the first wave is often not the biggest.']]) +
            ready({ cost: 'Free', steps: [['Before', 'Check whether home, work, or school is in a tsunami zone, and walk the route uphill once.'], ['During', 'Long or strong shaking by the coast: go on foot, right away.'], ['After', 'Stay away from the shore until officials give the all-clear, often a day or more.']], add: ['Tsunami zone checked; walking route to high ground'] }) +
            links(r('anticipate', 'first', '1.5 The first 15 minutes')) +
            src('California Geological Survey, tsunami hazard area maps; NOAA, <i>Tsunami Safety</i>; Cal OES, MyHazards; USGS, 1964 Alaska earthquake.'); } },
          { id: 'heat', short: 'Extreme heat', title: 'Extreme heat', html: function () { return '<p>Heat waves are the deadliest weather event in the US, and the quietest. They harm most where homes hold heat, nights stay warm, power fails, or someone lives alone. The full guide to cooling bodies and rooms is in ' + AIR.heat + '; here is the plan around it.</p>' +
            ul(['<b>Know the forecast:</b> the National Weather Service issues heat advisories and warnings, often days ahead.', '<b>Know your cool place:</b> the coolest room at home, and the nearest cooling center or library (211 lists them).', '<b>Medicines:</b> some (for blood pressure, mood, allergies) change how the body handles heat; a pharmacist can say which. Insulin and some others need cool storage.', '<b>Check-ins:</b> elders, people living alone and anyone working outside, twice a day.']) +
            ready({ cost: 'Free', steps: [['Before', 'A cool-room plan, shades on sunny windows, and the nearest cooling center saved.'], ['During', 'Cool showers, wet cloths, water often; the hottest hours inside or in shade.'], ['After', 'Bodies stay tired after a heat wave; keep drinking and resting a day or two.']], add: ['Heat plan: cool room, cooling center saved, check-in list'] }) +
            links(AIR.heat + ' · ' + to('#lens-air/sun/shade', 'Air: Shade')) +
            src('National Weather Service, HeatRisk and heat safety; CDC, <i>Heat and Health</i>; Cal OES, extreme heat.'); } },
          { id: 'water', short: 'Floods &amp; storms', title: 'Floods, storms and landslides', html: function () { return '<p>In California, most floods come with atmospheric rivers: long, warm winter storms that drop weeks of rain in days. Hillsides below recent burn scars can send mud and debris flows with little warning, and creeks rise fast.</p>' +
            care('Turn around at flooded roads. Six inches of moving water can knock a person down, and about a foot can carry a car.') +
            ul(['<b>Before:</b> clean gutters and drains, move valuables and chemicals up off the floor, know whether your area floods (standard home and renter insurance doesn’t cover flooding).', '<b>During:</b> leave early if told; move to higher floors, not the attic; stay off flooded roads and away from downed lines.', '<b>After:</b> floodwater carries sewage and chemicals: boots and gloves. Anything porous that stayed wet more than a day or two grows mold; dry it out fast or let it go.']) +
            ready({ cost: 'Free → $', c: 0, steps: [['Before', 'Gutters clear, things up off the floor, a route to higher ground.'], ['During', 'Leave at the warning; never drive through water.'], ['After', 'Dry within 48 hours; mold and cleanup in Poisons.']], add: ['Storm season: gutters clear, valuables up, route to high ground'] }) +
            links(MOLD + ' · ' + to('#lens-water/purify', 'Water: Purify (if the tap is unsafe)')) +
            src('National Weather Service, <i>Turn Around Don’t Drown</i>; USGS, post-fire debris flows; FEMA, National Flood Insurance Program; CDC, flood cleanup.'); } },
          { id: 'power', short: 'Power outages', title: 'Power outages', html: function () { return '<p>Outages come with storms, heat, earthquakes and, in California, planned Public Safety Power Shutoffs (PSPS) on windy fire days. Most last hours; some last days. The plan is about light, cold food, water, medical devices and safe warmth or cooling.</p>' +
            does([['Light', 'Flashlights and headlamps rather than candles, which start home fires.', 'Safe'], ['Food', 'A closed fridge keeps food cold about 4 hours; a full freezer about 48. Keep the doors shut.', 'Cold'], ['Medical devices', 'Utilities run medical baseline programs with early outage notice; a backup battery for oxygen or CPAP.', 'Power'], ['Phones', 'A charged power bank and a car charger; a battery or hand-crank radio.', 'News']]) +
            care('Generators, grills and camp stoves stay outdoors, at least 20 feet from windows and doors. Carbon monoxide from them indoors or in a garage is one of the most common ways people are hurt after disasters.') +
            ready({ cost: '$', c: 1, steps: [['Before', 'Headlamps, a power bank, a battery radio; sign up for utility outage and PSPS alerts.'], ['During', 'Fridge and freezer shut; unplug electronics; check on neighbors with medical needs.'], ['After', 'When in doubt about food, let it go; check the temperature before eating from the fridge.']], add: ['Outage kit: headlamps, power bank, battery radio, PSPS alerts'] }) +
            links(FOOD + ' · ' + WATER + ' · ' + AIR.gas + ' · ' + AIR.cold) +
            src('USDA, food safety during power outages; CPUC and utilities, Public Safety Power Shutoffs and medical baseline; CDC, carbon monoxide after disasters.'); } },
          { id: 'animals', short: 'Animals', title: 'Animals in emergencies', html: function () { return '<p>Animals are family, and including them in the plan is part of everyone’s safety: people delay leaving, or go back, when companions are left behind. Emergency shelters are required to plan for companion animals (the federal PETS Act, 2006), and many counties shelter larger animals too.</p>' +
            does([['Companions', 'A carrier or leash for each, ID tags and microchips with current numbers, two weeks of food, water and medicines, and a photo of you together.'], ['Birds and small animals', 'Small travel cages ready; birds are very sensitive to smoke, so they leave early.'], ['Horses, goats, hens and other farmed animals', 'Trailers and a destination arranged ahead, early evacuation, and names on halters or bands. County animal services and sanctuaries coordinate evacuations.'], ['Wild neighbors', 'Shallow water dishes in smoke and heat; gates left open for animals fleeing fire when it’s safe to do so.']]) +
            kin('Animals hide when frightened. Carriers left out as everyday beds, and a treat routine for getting in, make the hurried moment calmer for everyone.') +
            ready({ cost: 'Free → $', c: 1, steps: [['Before', 'A carrier per animal, ID up to date, two weeks of food and medicine packed, a friend outside the area who can take them.'], ['During', 'Leave early with everyone; animals in carriers before the car is packed.'], ['After', 'Keep companions inside or leashed: smells and landmarks change, and ash and debris hurt paws.']], add: ['Animal go-kit: carriers, ID, two weeks of food and medicine'] }) +
            accs(acc('land', 'Land and farmed animals', 'Moving many animals at once', '<p>Larger evacuations take hours. A written list of who lives there, how many trips it takes, and neighbors with trailers who’ll help, made in calm weather, is the whole difference.</p>')) +
            links(ANIMALS + ' · ' + to('#lens-air/smoke/companions', 'Air: Smoke, scent and companions')) +
            src('Ready.gov, <i>Prepare Your Pets for Disasters</i>; Pets Evacuation and Transportation Standards (PETS) Act, 2006; CAL FIRE, animal evacuation; American Veterinary Medical Association.'); } }
        ] },
      { id: 'supplies', num: 3, word: 'Staying put', sub: 'The pantry: two weeks on hand', planned: ['Water: a gallon per person a day, two weeks if you can', 'Food that keeps without power', 'Medicines, glasses, and the things that are hard to replace', 'A clean room for smoke, and sealing a room for fallout or chemicals'] },
      { id: 'gobag', num: 4, word: 'Going', sub: 'Go-bags and car kits, ready by the door', planned: ['One bag per person and per animal', 'The car kit, and kits for work and school', 'Documents, photos, and cash, kept safe', 'Kept small for living on the move'] },
      { id: 'plans', num: 5, word: 'Plans &amp; people', sub: 'Who, where, how we reach each other', planned: ['A meeting place and an out-of-area contact', 'Neighbors, check-ins and mutual aid', 'Kids, elders and access needs'] },
      { id: 'home', num: 6, word: 'Securing your home', sub: 'Doors, windows, and calm', planned: ['Locks, lights and simple reinforcements', 'Shutting off gas, water and power', 'Renters and shared buildings', 'A safe room and a household plan', 'Noticing, de-escalation and getting away live in <a href="#lens-self-defense">Self-defense</a>'] }
    ];
  }

  /* ---------- My prep list ---------- */
  var list = (function () { try { var a = JSON.parse(localStorage.getItem(LKEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } })();
  function saveList() { try { localStorage.setItem(LKEY, JSON.stringify(list)); } catch (e) { mn().toast('Couldn’t save: this browser is blocking site storage'); } }
  function has(t) { return list.some(function (x) { return x.title === t; }); }
  function addItem(it) { if (has(it.title)) return false; it.s = 'next'; list.push(it); return true; }
  function openCount() { return list.filter(function (x) { return x.s !== 'done'; }).length; }
  var LABEL = { next: 'Next', doing: 'Doing', done: 'Done' }, NEXT = { next: 'doing', doing: 'done', done: 'next' };
  function syncUi() {
    document.querySelectorAll('.em-add[data-title]').forEach(function (b) {
      var on = has(b.getAttribute('data-title'));
      b.classList.toggle('on', on); b.textContent = on ? 'On my prep list' : b.getAttribute('data-label'); b.setAttribute('aria-pressed', String(on));
    });
    var c = $('em-cnt'); if (c) c.textContent = openCount();
    var el = $('em-lst'); if (!el) return;
    $('em-empty').hidden = list.length > 0;
    el.innerHTML = list.map(function (x, i) {
      var n = NUM[x.u + '/' + x.sub];
      return '<li class="ek1' + (x.s === 'done' ? ' done' : '') + '"><span class="em-num">' + (i + 1) + '</span><span class="em-lt"><b>' + esc(x.title) + '</b><span><span class="em-cost">' + COST[x.c || 0] + '</span>' +
        (n ? '<small><a href="' + BASE + '/' + x.u + '/' + x.sub + '">' + n + '</a></small>' : '') + '</span></span>' +
        '<span class="em-lctl"><button type="button" class="em-st" data-em="st" data-i="' + i + '" data-s="' + x.s + '">' + LABEL[x.s] + '</button>' +
        '<span class="em-mv"><button type="button" data-em="up" data-i="' + i + '" aria-label="Move up">▲</button><button type="button" data-em="down" data-i="' + i + '" aria-label="Move down">▼</button></span></span></li>';
    }).join('');
    var done = list.length - openCount();
    $('em-bar').style.width = list.length ? (done / list.length * 100) + '%' : '0';
    $('em-sum').textContent = list.length ? done + ' of ' + list.length + ' ready' : '';
  }

  /* ---------- Tool: What to prep for ---------- */
  // [id, label, sections it raises (sub id: weight)]
  var HZ = [
    ['wild', 'Near grass, brush or forest', { fire: 3 }], ['ca', 'In California (or anywhere near a fault)', { quake: 3, fire: 1, power: 1 }],
    ['low', 'Low-lying, or near a creek or river', { water: 3 }], ['coast', 'Near the coast or a bay', { tsunami: 3, quake: 1 }], ['hill', 'On or below a hillside, or below a recent burn scar', { water: 2, fire: 1 }],
    ['hot', 'Summers over 95°F, or no cooling at home', { heat: 3, power: 1 }], ['psps', 'Windy fire days with power shutoffs, or power lines through brush', { power: 3, fire: 1 }],
    ['med', 'Someone relies on power or cold for medicine or devices', { power: 3, heat: 1 }], ['pets', 'Companion or farmed animals', { animals: 3 }],
    ['care', 'Kids, elders or someone who needs more time to leave', { fire: 1, heat: 1, water: 1 }]
  ];
  var hzOn = null;
  function runHz() {
    var box = $('em-hz'); if (!box) return;
    if (!hzOn) { hzOn = {}; if (T.animals || T.land) hzOn.pets = 1; if (T.kids || T.access) hzOn.care = 1; }
    if (!box.innerHTML) box.innerHTML = HZ.map(function (h) { return '<label class="em-chk2"><input type="checkbox" data-hz="' + h[0] + '"' + (hzOn[h[0]] ? ' checked' : '') + '> ' + esc(h[1]) + '</label>'; }).join('');
    var score = {};
    HZ.forEach(function (h) { if (hzOn[h[0]]) Object.keys(h[2]).forEach(function (k) { score[k] = (score[k] || 0) + h[2][k]; }); });
    var ids = Object.keys(score).sort(function (a, b) { return score[b] - score[a]; });
    var out = $('em-hz-out');
    if (!ids.length) { out.innerHTML = '<small>Tick what fits to see where to start.</small>'; return; }
    var U = UIDX.prepare;
    out.innerHTML = '<strong>Start with ' + (ids.length > 2 ? 'these' : 'this') + '</strong><ol>' + ids.slice(0, 3).map(function (k) {
      var s = U.subs.filter(function (x) { return x.id === k; })[0];
      return '<li><a href="' + BASE + '/prepare/' + k + '">' + NUM['prepare/' + k] + ' ' + s.title + '</a></li>';
    }).join('') + '</ol>' + (ids.length > 3 ? '<small>Then: ' + ids.slice(3).map(function (k) { return U.subs.filter(function (x) { return x.id === k; })[0].title; }).join(' · ') + '</small>' : '') +
      '<small>Every section stays open; this only suggests an order.</small>';
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-em]'); if (!b) return;
    var a = b.getAttribute('data-em'), i = +b.getAttribute('data-i');
    if (a === 'add') {
      var t = b.getAttribute('data-title');
      if (has(t)) { list = list.filter(function (x) { return x.title !== t; }); mn().toast('Taken off your prep list'); }
      else { addItem({ title: t, u: b.getAttribute('data-u'), sub: b.getAttribute('data-s'), c: +b.getAttribute('data-c') || 0 }); mn().toast('Added to your prep list · ' + openCount()); }
    } else if (a === 'st') { list[i].s = NEXT[list[i].s]; if (list[i].s === 'done') mn().toast('Ready. One less thing to decide later.'); }
    else if (a === 'up' && i > 0) list.splice(i - 1, 0, list.splice(i, 1)[0]);
    else if (a === 'down' && i < list.length - 1) list.splice(i + 1, 0, list.splice(i, 1)[0]);
    else if (a === 'clear') list = list.filter(function (x) { return x.s !== 'done'; });
    else return;
    saveList(); syncUi();
  });
  document.addEventListener('change', function (e) {
    var t = e.target; if (t.hasAttribute && t.hasAttribute('data-hz')) { hzOn[t.getAttribute('data-hz')] = t.checked ? 1 : 0; runHz(); }
  });

  /* ---------- layout ---------- */
  var UIDX = {};
  function index(U) {
    U.forEach(function (u) {
      UIDX[u.id] = u; NUM[u.id] = String(u.num); var n = 0;
      (u.subs || []).forEach(function (s) { if (!s.tool) { n++; NUM[u.id + '/' + s.id] = u.num + '.' + n; } else NUM[u.id + '/' + s.id] = 'Tool'; });
    });
  }
  function sidebar(U, cur) {
    var wide = window.matchMedia && window.matchMedia('(min-width: 900px)').matches;
    return '<nav class="em-nav" aria-label="Emergency prep lens"><details class="em-nav-wrap"' + (wide ? ' open' : '') + '><summary class="em-nav-head"><span class="eyebrow">Units</span><b>Emergency prep</b></summary>' +
      '<a class="em-nav-over" href="' + BASE + '"' + (!cur ? ' aria-current="page"' : '') + '>Overview</a>' +
      '<a class="em-nav-over" href="' + BASE + '/list"' + (cur === 'list' ? ' aria-current="page"' : '') + '>My prep list <span class="em-cnt" id="em-cnt">' + openCount() + '</span></a><ol class="em-vt">' +
      U.map(function (u) {
        var on = cur === u.id;
        if (u.planned) return '<li class="em-vt-unit ek' + u.num + ' is-planned"><span class="em-vt-head"><span class="em-vt-dot">' + u.num + '</span><span><b>' + u.word + '</b><small>Planned</small></span></span></li>';
        return '<li class="em-vt-unit ek' + u.num + (on ? ' cur' : '') + '"><a class="em-vt-head" href="' + BASE + '/' + u.id + '"' + (on ? ' aria-current="page"' : '') + '><span class="em-vt-dot">' + u.num + '</span><span><b>' + u.word + '</b><small>' + u.sub + '</small></span></a>' +
          '<ul class="em-vt-subs">' + u.subs.map(function (s) { return '<li><a' + (s.tool ? ' class="is-tool"' : '') + ' href="' + BASE + '/' + u.id + '/' + s.id + '">' + (s.tool ? 'Tool: ' : '') + s.title + '</a></li>'; }).join('') + '</ul></li>';
      }).join('') + '</ol></details></nav>';
  }
  function layout(U, cur, main) { return mn().header('home') + '<div class="em-layout">' + sidebar(U, cur) + '<main class="em-main">' + main + '</main></div>' + mn().footer(); }
  function viewOverview(U) {
    return '<section class="em-hero"><span class="em-lens-pill">Tier 5 · Resilience · In progress</span><h1 tabindex="-1">Emergency prep</h1>' +
      '<p class="em-lede">Plan ahead so you can stay calm when it counts. Preparing is care done early: for yourself, the people and animals you live with, and your neighbors. It starts by naming the kind of emergency (stay or go, how big, how long), then the events your place asks you to plan for, then the pantry, the go-bag, your people, and your home. Everyday safety lives in <a href="#lens-self-defense">Self-defense</a>; this lens is for when a whole place changes at once.</p></section>' +
      '<ol class="em-ucards">' + U.map(function (u) {
        if (u.planned) return '<li><div class="em-ucard ek' + u.num + ' is-planned"><i class="em-band"></i><span class="em-n">0' + u.num + ' · Planned</span><b>' + u.word + '</b><span>' + u.sub + '</span><ol>' + u.planned.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ol></div></li>';
        return '<li><a class="em-ucard ek' + u.num + '" href="' + BASE + '/' + u.id + '"><i class="em-band"></i><span class="em-n">0' + u.num + '</span><b>' + u.word + '</b><span>' + u.sub + '</span><ol>' + u.subs.filter(function (s) { return !s.tool; }).map(function (s) { return '<li>' + s.title + '</li>'; }).join('') + '</ol></a></li>';
      }).join('') + '</ol>' +
      '<aside class="em-funfact"><span class="eyebrow">Fun fact</span><p>After disasters, most rescues in the first hours are made by neighbors, not professionals. Knowing two people on your street, and what each of you needs, is one of the strongest preparations there is.</p>' +
      '<p>Guidance comes from Cal OES, CAL FIRE, FEMA and Ready.gov, the National Weather Service, USGS and the CDC, cited in each section. Laws mentioned are California’s.</p>' + links(NEIGH) + '</aside>';
  }
  function viewList() {
    setTimeout(syncUi, 0);
    return '<article class="em-unit ek2"><header class="em-unit-hero"><span class="eyebrow">Your list</span><h1 tabindex="-1">My prep list</h1><p class="em-unit-sub">One thing ready at a time</p>' +
      '<p class="em-lede">Every “Get ready” you add lands here. Order them by what your place needs first. A list worked on a little each month is a list that’s ready when it counts.</p>' +
      '<div class="em-progress" aria-hidden="true"><i id="em-bar"></i></div><p class="em-legend" id="em-sum"></p></header>' +
      '<ol class="em-lst" id="em-lst"></ol><div class="em-empty" id="em-empty">Nothing here yet. Start with ' + r('prepare', 'planner', 'What to prep for') + '.</div>' +
      '<div class="em-btns"><button type="button" class="btn" data-em="clear">Clear done</button></div>' + legend('Saved only in this browser.') + '</article>';
  }
  function viewUnit(U, u, subId) {
    var html = '<article class="em-unit ek' + u.num + '"><header class="em-unit-hero"><span class="eyebrow">Unit ' + u.num + ' of ' + U.length + '</span><h1 tabindex="-1">' + u.word + '</h1><p class="em-unit-sub">' + u.sub + '</p><p class="em-lede">' + u.lede + '</p>' +
      '<ul class="em-jumps">' + u.subs.map(function (s) { return '<li><a href="' + BASE + '/' + u.id + '/' + s.id + '"><span>' + NUM[u.id + '/' + s.id] + '</span>' + s.short + '</a></li>'; }).join('') + '</ul></header>' +
      u.subs.map(function (s) {
        CUR = { u: u.id, s: s.id };
        if (s.tool) return '<section class="em-tool" id="em-' + u.id + '-' + s.id + '"><span class="eyebrow">Tool</span><b class="em-tool-t">' + s.title + '</b>' + s.html() + '</section>';
        return '<section class="em-sub" id="em-' + u.id + '-' + s.id + '"><div class="em-sub-top"><span class="em-sub-n">' + NUM[u.id + '/' + s.id] + '</span><h2>' + s.title + '</h2></div>' + s.html() + '</section>';
      }).join('') + '</article>';
    var nx = U.filter(function (x) { return x.num === u.num + 1 && !x.planned; })[0];
    html += '<nav class="em-pager" aria-label="Units"><a href="' + BASE + '"><small>← Back to</small><b>Overview</b></a>' + (nx ? '<a class="next ek' + nx.num + '" href="' + BASE + '/' + nx.id + '"><small>Next · Unit ' + nx.num + ' →</small><b>' + nx.word + '</b></a>' : '<a class="next" href="' + BASE + '/list"><small>Your list →</small><b>My prep list</b></a>') + '</nav>';
    setTimeout(function () { runHz(); syncUi(); var el = subId && document.getElementById('em-' + u.id + '-' + subId); if (el) el.scrollIntoView({ block: 'start' }); }, 0);
    return html;
  }

  window.MN_LENS_VIEWS = window.MN_LENS_VIEWS || {};
  window.MN_LENS_VIEWS['emergency-prep'] = function (sub) {
    T = tags();
    var U = units(); index(U);
    var seg = (sub || '').split('/'), u = UIDX[seg[0]];
    if (seg[0] === 'list') return { title: 'My prep list · Emergency prep · Kinship', html: layout(U, 'list', viewList()) };
    if (u && !u.planned) return { title: u.word.replace('&amp;', '&') + ' · Emergency prep · Kinship', html: layout(U, u.id, viewUnit(U, u, seg[1])) };
    return { title: 'Emergency prep · Kinship', html: layout(U, null, viewOverview(U)) };
  };
})();
