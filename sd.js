/* Self-defense lens (tier 3 Protect, in progress), kept plain like Body care (FOUNDATION §6): everyday safety. Big events (fire, quakes, floods) are Emergency prep.
   Each ready unit is its own screen, with all seven units in order at the top and a big “Next · Unit” card at the end.
   Unit 1 Safety (#lens-self-defense): 1.1 Safety is a need, 1.2 Where safety lives, 1.3 What we’re getting ready for, 1.4 Trust and vulnerability, 1.5 Warning signs close to home, 1.6 When the threat is power, 1.7 Safety is a web of people.
   Unit 2 Noticing (/noticing): 2.1 Trust the early feeling, 2.2 Read the place, 2.3 Read the person, 2.4 Leave early.
   Unit 3 De-escalation (/de-escalation): 3.1 Calm yourself first, 3.2 Space and position, 3.3 Words that lower the heat, 3.4 Someone in crisis, 3.5 Scared animals.
   Unit 4 Getting away (/away): 4.1 Your voice, 4.2 Breaking free, 4.3 Run to people, 4.4 Afterward.
   Unit 5 Home (/home): 5.1 Doors and locks, 5.2 Light and a lived-in look, 5.3 Who comes to the door, 5.4 A safe room and a household plan, 5.5 Neighbors who check in.
   Unit 6 Everyday cybersecurity (/digital): 6.1 Make a security plan, 6.2 Accounts and passwords, 6.3 Phones and trackers, 6.4 Scams and human hacking, 6.5 Kids and screens (from EFF’s Surveillance Self-Defense).
   Unit 7 Animal safety (/animals): 7.1 Animals notice first, 7.2 Everyday care that keeps them safe, 7.3 A plan if you can’t be there, 7.4 Animals and harm at home.
   Registers window.MN_LENS_VIEWS['self-defense']. Deep links: #lens-self-defense/6-3 opens unit 6 at 6.3. */
(function () {
  function mn() { return window.MN; }
  function ext(url, label) { return '<a href="' + url + '" target="_blank" rel="noopener">' + label + '<span class="sr-only"> (opens in a new tab)</span></a>'; }
  function ul(items) { return '<ul>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
  function sec(n, title, body) {
    return '<article class="sd-sec" id="sd-' + n.replace('.', '-') + '"><div class="sd-sec-head"><span class="sd-n">' + n + '</span><h2>' + title + '</h2></div>' + body + '</article>';
  }
  function card(title, text) { return '<div><h3>' + title + '</h3><p>' + text + '</p></div>'; }
  /* A place or a kind of risk: name, a tag (which lens or unit holds it), what it is, then where to go. */
  function kind(name, tag, text, go) {
    return '<div class="sd-kind"><div class="sd-kind-head"><h3>' + name + '</h3><span class="sd-tag">' + tag + '</span></div><p>' + text + '</p>' + (go ? '<p class="sd-go">' + go + '</p>' : '') + '</div>';
  }
  /* Numbered steps or signals: a bold word, then a line. */
  function steps(cls, items) { return '<' + (cls === 'steps' ? 'ol' : 'ul') + ' class="sd-' + cls + '">' + items.map(function (s) { return '<li><b>' + s[0] + '</b><span>' + s[1] + '</span></li>'; }).join('') + '</' + (cls === 'steps' ? 'ol' : 'ul') + '>'; }
  function note(cls, label, html) { return '<p class="sd-' + cls + '"><span>' + label + '</span> ' + html + '</p>'; }
  function src(t) { return '<p class="sd-src">Sources: ' + t + '</p>'; }

  var UNITS = [
    { id: 'safety', name: 'Safety', href: '#lens-self-defense', jumps: [['1.1', 'A need'], ['1.2', 'Where it lives'], ['1.3', 'Getting ready for'], ['1.4', 'Trust'], ['1.5', 'Close to home'], ['1.6', 'Power'], ['1.7', 'A web of people']] },
    { id: 'noticing', name: 'Noticing', href: '#lens-self-defense/noticing', jumps: [['2.1', 'The early feeling'], ['2.2', 'The place'], ['2.3', 'The person'], ['2.4', 'Leave early']] },
    { id: 'deescalation', name: 'De-escalation', href: '#lens-self-defense/de-escalation', jumps: [['3.1', 'Calm yourself'], ['3.2', 'Space'], ['3.3', 'Words'], ['3.4', 'Crisis'], ['3.5', 'Animals']] },
    { id: 'away', name: 'Getting away', href: '#lens-self-defense/away', jumps: [['4.1', 'Your voice'], ['4.2', 'Breaking free'], ['4.3', 'Run to people'], ['4.4', 'Afterward']] },
    { id: 'home', name: 'Home', href: '#lens-self-defense/home', jumps: [['5.1', 'Doors'], ['5.2', 'Light'], ['5.3', 'The door'], ['5.4', 'A plan'], ['5.5', 'Neighbors']] },
    { id: 'digital', name: 'Everyday cybersecurity', href: '#lens-self-defense/digital', jumps: [['6.1', 'A plan'], ['6.2', 'Passwords'], ['6.3', 'Phones'], ['6.4', 'Scams'], ['6.5', 'Kids']] },
    { id: 'animals', name: 'Animal safety', href: '#lens-self-defense/animals', jumps: [['7.1', 'Noticers'], ['7.2', 'Everyday care'], ['7.3', 'A plan'], ['7.4', 'Harm at home']] }
  ];
  var LADDER = [
    ['Notice', 'the early feeling that something is off', 2],
    ['Distance', 'more space, a wall or a counter between you, a door in view', 3],
    ['Words', 'a calm voice, a clear no, a way out offered to the other person', 3],
    ['Leave', 'early, before it’s needed, without needing a reason', 4],
    ['Call others in', 'a shout, a phone, a nearby shop, a friend', 4],
    ['Break free', 'only to get away, then go', 4]
  ];

  function hero(cur) {
    var u = UNITS.filter(function (x) { return x.id === cur; })[0], n = UNITS.indexOf(u) + 1;
    return '<div class="sd-hero"><span class="sd-pill">Tier 3 · Protect · In progress</span><h1 tabindex="-1">Self-defense</h1>' +
      '<p class="sd-lede">Self-defense starts long before anyone raises a hand: knowing what safety means to you, who you trust and why, and who has your back. It’s for everyday life; the big events that upend a whole town live in <a href="#lens-emergency-prep">Emergency prep</a>.</p>' +
      '<nav aria-label="Units"><ul class="sd-units">' + UNITS.map(function (x, i) {
        var label = (i + 1) + ' · ' + x.name;
        if (!x.href) return '<li class="later">' + label + ' <span>Planned</span></li>';
        return '<li><a href="' + x.href + '"' + (x.id === cur ? ' class="now" aria-current="page"' : '') + '>' + label + '</a></li>';
      }).join('') + '</ul></nav></div>' +
      '<div class="sd-unit-head"><span class="sd-n">Unit ' + n + ' of 7</span><h2>' + u.name + '</h2></div>' +
      '<nav class="sd-jump" aria-label="On this page">' + u.jumps.map(function (j) { return '<a href="#sd-' + j[0].replace('.', '-') + '">' + j[0] + ' ' + j[1] + '</a>'; }).join('') + '</nav>';
  }
  /* A big link to the next unit, so phones don't scroll back up. */
  function nextCard(i) {
    var u = UNITS[i];
    return u && u.href ? '<a class="sd-next" href="' + u.href + '"><span>Next · Unit ' + (i + 1) + '</span><b>' + u.name + '</b></a>' : '';
  }

  /* ---------- Unit 1 · Safety ---------- */
  function safety() {
    return hero('safety') +

      sec('1.1', 'Safety is a need',
        '<p>Safety is one of the needs every living thing shares (<a href="#lens-emotions/need">Emotions → Identify the need</a>). It means your body is unharmed, and also that you can rest, guess what comes next, and move freely. When that need is unmet, fear shows up as a messenger (<a href="#lens-emotions/feel">Emotions → Feel</a>), and self-defense is everything we do to meet it again.</p>' +
        '<div class="sd-points">' +
          card('Felt and real', 'Feeling safe and being safe don’t always match. A dark street can feel scarier than a familiar living room, yet about 8 in 10 sexual assaults are by someone the person already knows.</p><p>Both count: the feeling is information, and so are the facts.') +
          card('Every body', 'These tools fit any body: kids, elders, wheelchair users, and people who are blind or Deaf. Voice, position, a phone, and people nearby do more than strength.') +
          card('Protective, not punishing', 'Protective force keeps someone safe and then stops. The aim is always getting away, never winning or hurting back.') +
        '</div>' +
        '<h3>The safety ladder</h3>' +
        '<p>Like Cleaning’s gentle ladder, start at rung 1. Each rung is easier, safer, and works more often than the one after it, and most situations end on the first three.</p>' +
        '<ol class="sd-ladder">' + LADDER.map(function (r) { return '<li><b>' + r[0] + '</b><span>' + r[1] + '</span><small><a href="' + UNITS[r[2] - 1].href + '">Unit ' + r[2] + '</a></small></li>'; }).join('') + '</ol>' +
        note('care', 'Not your fault', 'Harm is the choice of the person who causes it. Everything here is a tool you can pick up, never a rule you’re judged by, and no one is to blame for what someone else did to them.') +
        src('RAINN, “Perpetrators of Sexual Violence: Statistics” (from the US Bureau of Justice Statistics, National Crime Victimization Survey).')) +

      sec('1.2', 'Where safety lives',
        '<p>Safety lives in three places, and they hold each other up. When one is thin, the other two carry more.</p>' +
        '<div class="sd-kinds">' +
          kind('Out and about', 'On the move', 'Walking, buses and trains, a car, a shift that ends late, a trip somewhere new. Here safety is attention, routes, light, and someone knowing where you are.', '<a href="#lens-self-defense/noticing">Units 2–4 · Noticing to Getting away</a>') +
          kind('At home', 'Where you rest', 'Wherever you sleep: a house, an apartment, a room, a car, or a tent. Here safety is doors, light, a plan, and the people and animals inside.', '<a href="#lens-self-defense/home">Unit 5 · Home</a>, with <a href="#lens-emergency-prep">Emergency prep</a>') +
          kind('In your network', 'Who has your back', 'People who’d notice if you didn’t come home, a neighbor with a key, a friend who answers at 2 a.m. This is the layer that carries you when the other two give way.', '<a href="#sd-1-7">1.7 A web of people</a>') +
        '</div>' +
        note('tip', 'Without a steady home', 'Safety leans harder on people and public places: libraries, 24-hour businesses, and neighbors who know your spot. More in <a href="#lens-relationships/special/distress">Relationships → People in distress</a> and the Shelter lens (soon).')) +

      sec('1.3', 'What we’re getting ready for',
        '<p>This lens is for daily life: the walk home, the people we live with, the phone in our pocket, the dog at our side. That includes the rare day someone brings violence into an ordinary moment, like a fight on a bus or a stranger with a knife, which is why the ladder starts with noticing. The big events that upend everyone at once are <a href="#lens-emergency-prep">Emergency prep</a>.</p>' +
        '<div class="sd-kinds">' +
          kind('From people', 'This lens', 'Harassment, being followed, threats, a robbery, a fight starting nearby, harm from someone close, someone in a mental health crisis, or power used against you.', '1.4–1.6 here, then <a href="#lens-self-defense/noticing">units 2–5</a>') +
          kind('From screens', 'Unit 6', 'Scams, stolen accounts, someone tracking a phone or a car, and shared locations that outlive a relationship.', '<a href="#lens-self-defense/digital">Unit 6 · Everyday cybersecurity</a>') +
          kind('For and from animals', 'Unit 7', 'Keeping companions safe, letting them help us notice, and meeting a loose or frightened dog or a startled wild neighbor with calm and distance.', '<a href="#lens-self-defense/animals">Unit 7 · Animal safety</a>') +
          kind('From the place', 'Emergency prep', 'Wildfire, earthquakes, heat, floods, and power outages: getting ready for these is its own lens, in progress.', '<a href="#lens-emergency-prep">Emergency prep → What to prep for</a>') +
          kind('From the body', 'First aid', 'Injuries, sudden illness, an allergic reaction, or an overdose.', 'First aid lens, later') +
        '</div>') +

      sec('1.4', 'Trust and vulnerability',
        '<p>Being vulnerable means being open to being affected, and it’s how love, friendship, and help happen at all. Nobody can be safe by closing off from everyone. The skill is choosing who gets in, and how far.</p>' +
        '<div class="sd-points">' +
          card('Trust is a prediction', 'Trust is a guess about how someone will act, built from how they’ve acted. It grows when words and actions match over time, and it can be partial: you might trust someone with a ride but not with money or your kids.') +
          card('Access, not strangers', 'Most harm comes from people who’ve been let in. Someone who means harm rarely breaks a lock; they earn a key. That’s why the hardest danger is so often a partner, a relative, a coach, or a friend.') +
          card('Human hacking', 'Scammers and people who groom others use the same few moves: they fill a need (attention, money, love), build trust fast, ask for secrecy, and slowly cut someone off from the people who’d notice. Seeing the pattern is protection.') +
        '</div>' +
        '<h3>Pressure that’s worth noticing</h3>' +
        steps('signals', [
          ['Too much, too fast', 'intense closeness, gifts, or big promises early on'],
          ['“We”', 'a stranger acting like you’re already a team (“we’d better hurry”)'],
          ['Unasked-for help', 'help that leaves you owing something'],
          ['Too many details', 'a story that tries extra hard to be believed'],
          ['Ignoring a no', 'the clearest sign of all: someone who doesn’t hear no on small things won’t on big ones'],
          ['Secrecy and hurry', '“don’t tell anyone”, “you have to decide now”']
        ]) +
        '<p>None of these means someone is dangerous. They mean slowing down, checking with someone you already trust, and letting time show you who a person is.</p>' +
        src('Gavin de Becker, <i>The Gift of Fear</i> (1997), survival signals; Kenneth V. Lanning, <i>Child Molesters: A Behavioral Analysis</i> (National Center for Missing &amp; Exploited Children, 2010), on grooming.')) +

      sec('1.5', 'Warning signs close to home',
        '<p>Harm from someone close rarely starts with a hit. It usually starts with control, and grows. People who cause harm have often been harmed themselves, and they can change; your safety still comes first while they do.</p>' +
        '<div class="sd-lists">' +
          '<div><h4>Signs of control</h4>' + ul(['Checking your phone, messages, or location, or asking for your passwords', 'Controlling money, work, school, or what you wear', 'Pulling you away from friends and family', 'Jealousy described as love', 'Moving very fast: moving in, commitment, a baby', 'Blaming you for their feelings and actions', 'Threats to leave, or to hurt themselves, the kids, or the animals', 'Breaking things, punching walls, or driving scary when angry']) + '</div>' +
          '<div class="sd-warn"><h4>Signs it’s getting more dangerous</h4>' + ul(['Any choking or strangling, even once, even “not hard”: it makes a later killing about 7 times more likely', 'Threats to kill', 'A gun in the home', 'Stalking or tracking', 'Separation, or a recent breakup', 'Pregnancy or a new baby', 'Violence getting worse or more often']) + '</div>' +
        '</div>' +
        note('ally', 'Free, confidential help', 'The National Domestic Violence Hotline is open all day and night: call <a href="tel:18007997233">1-800-799-7233</a> or text START to <a href="sms:88788">88788</a>. Advocates help make a safety plan that fits your life, whether you stay or go, and can walk through a Danger Assessment with you. For a child, or an adult worried about one, Childhelp answers at <a href="tel:18004224453">1-800-422-4453</a>. For an elder or a disabled adult, call your county’s Adult Protective Services (211 connects you).') +
        note('tip', 'Leaving a trace', 'Browsers keep history. A private window leaves less behind, and a library computer leaves nothing on yours. Checking a phone for trackers is in <a href="#lens-self-defense/6-3">6.3 Phones and trackers</a>.') +
        src('Glass et al., “Non-fatal strangulation is an important risk factor for homicide of women,” <i>Journal of Emergency Medicine</i> (2008); Jacquelyn C. Campbell, Danger Assessment (dangerassessment.org), and Campbell et al., “Risk factors for femicide in abusive relationships,” <i>American Journal of Public Health</i> (2003); The National Domestic Violence Hotline (thehotline.org); Childhelp (childhelp.org); California Department of Social Services, Adult Protective Services.')) +

      sec('1.6', 'When the threat is power',
        '<p>Sometimes the danger comes from people with power: police, immigration agents, a landlord, a boss, or a government that treats some people as targets for who they are or what they say. It’s a different shape from harm at home. It often runs through rules and records, it can reach many people at once, and it’s met best by knowing your rights and by being many.</p>' +
        '<div class="sd-points">' +
          card('Know your rights', 'You can stay silent. You don’t have to open your door unless agents show a warrant signed by a judge; ask them to slide it under the door or hold it to a window. Police generally need a warrant to search your phone (<i>Riley v. California</i>, 2014).') +
          card('California’s limits', 'Local police and sheriffs mostly can’t help with federal immigration enforcement (SB 54, the California Values Act, 2017), and state and local agencies need a warrant for your digital records (CalECPA, SB 178, 2015).') +
          card('Be many', 'Many California counties have rapid response hotlines where volunteers come to witness and record. Save yours in your phone now, along with a lawyer’s number and who picks up the kids.') +
          card('Phones at protests', 'A passcode protects more than a face or fingerprint unlock, which can be forced more easily. Turn biometrics off before you go. More in <a href="#lens-self-defense/digital">Unit 6</a>.') +
        '</div>' +
        '<p>The laws themselves, and how to change them, are in <a href="#lens-governance/5.1">Governance → Rights you have by existing</a>.</p>' +
        src('US Supreme Court, <i>Riley v. California</i> (2014); California SB 54, California Values Act (2017); California Electronic Communications Privacy Act, SB 178 (2015); Immigrant Legal Resource Center, “Know Your Rights” red cards (ilrc.org); EFF Surveillance Self-Defense, “Attending a Protest” (ssd.eff.org). Information, not legal advice; free help: legal aid and the California Courts Self-Help Guide.')) +

      sec('1.7', 'Safety is a web of people',
        '<p>How connected someone is shapes how they come through hard times, often more than money or gear. In Chicago’s 1995 heat wave, people living alone and cut off died at far higher rates, and neighborhoods where people knew each other and checked in did better. After disasters from Kobe to Tōhoku, neighborhood ties predicted recovery better than wealth did.</p>' +
        '<div class="sd-points">' +
          card('Someone knows where you are', 'One or two people who know your plans when you’re out late or traveling, and who check in. Most phones can share your location with people you choose, for an hour or a day.') +
          card('Neighbors by name', 'Knowing who lives around you (who has a ladder, who uses a wheelchair, who lives alone) turns a street into a team.') +
          card('A code word', 'A word or emoji that means “call me with an excuse” or “come get me”, agreed ahead with friends or family, so asking for help takes one text. The same word can check that a panicked call is really them (<a href="#lens-self-defense/6-4">6.4</a>).') +
          card('Help beyond 911', '<b>911</b> for danger right now. <b>988</b> for a mental health or suicide crisis, by call or text; in California, counties can send a mobile crisis team, a Medi-Cal benefit since 2023. <b>211</b> for local services, including what kind of crisis response your city has.') +
        '</div>' +
        '<p>What a whole town can build together, like crisis teams and quiet ways to ask for help, is in <a href="#lens-governance/4-5">Governance → Community safety</a>.</p>' +
        note('ally', 'Try this', 'Name two people who would notice if you didn’t come home tonight. If that’s hard, that’s useful to know, and it’s a place to start: <a href="#lens-relationships/request">Relationships → Request</a>.') +
        src('Eric Klinenberg, <i>Heat Wave: A Social Autopsy of Disaster in Chicago</i> (2002); Daniel P. Aldrich, <i>Building Resilience: Social Capital in Post-Disaster Recovery</i> (2012); 988 Suicide &amp; Crisis Lifeline (988lifeline.org, since 2022); California DHCS, BHIN 23-025, Medi-Cal Mobile Crisis Services Benefit (2023).')) +

      nextCard(1);
  }

  /* ---------- Unit 2 · Noticing ---------- */
  function noticing() {
    return hero('noticing') +
      '<p class="sd-intro">Noticing is rung 1 of the ladder, and the one that does the most. Something noticed early can be walked away from; something noticed late has to be dealt with.</p>' +

      sec('2.1', 'Trust the early feeling',
        '<p>The sense that something is off is your brain matching patterns faster than you can explain them: a tone, a look, a step that doesn’t fit. It often arrives before the reason does. You’re allowed to act on it without proof.</p>' +
        '<div class="sd-points">' +
          card('Fear and worry are different', 'Fear shows up in the moment, about something here: a sudden chill, the hair on your arms. Worry is about what might happen someday. Fear is a signal to act on; worry is a feeling to care for (<a href="#lens-emotions/feel">Emotions → Feel</a>).') +
          card('Politeness isn’t owed', 'Many of us were taught to be nice even when it costs us. You can skip the elevator, decline the help, end the call, or leave the party without a reason. Being thought rude is a small price.') +
          card('Explaining it away', '“He’s probably fine.” “I don’t want to make a scene.” Talking yourself out of a feeling is common. Stepping away costs little if you were wrong, and it could cost a lot to stay if you were right.') +
        '</div>' +
        src('Gavin de Becker, <i>The Gift of Fear</i> (1997).')) +

      sec('2.2', 'Read the place',
        '<p>Relaxed awareness is a habit, not a state of alarm. You’re still enjoying the walk; you just know where you are.</p>' +
        steps('steps', [
          ['Switched off', 'Eyes on a phone, both earbuds in, lost in thought. Fine at home, and the hardest place to notice from anywhere else.'],
          ['Relaxed and aware', 'Head up, glancing around now and then. Most of daily life can happen here without feeling tense.'],
          ['Something’s off', 'You’ve noticed one thing: a person, a car, a sound. You make a small plan: “if they cross, I’ll go into the store.”'],
          ['Acting', 'You follow the plan: cross, leave, call, or go toward people.']
        ]) +
        '<h3>Small habits</h3>' +
        ul(['When you arrive somewhere new, notice the ways out.', 'Keep one earbud out, or the volume low, when walking alone.', 'On a bus or train, sit near the driver or other people, and near a door.', 'Have your keys out before you reach the door or the car.', 'Walk where it’s lit and busy, even if it’s a little longer.', 'Before getting into a rideshare, check the plate, the car, and the driver’s name, and ask “who are you here for?” instead of saying your name.']) +
        src('Jeff Cooper, the “color code” of awareness (1970s), adapted here as words instead of colors; Uber and Lyft rider safety guidance.')) +

      sec('2.3', 'Read the person',
        '<p>Most strange behavior is just people being people. A few signs, especially together, mean someone may be getting ready to cause harm:</p>' +
        steps('signals', [
          ['Closing the distance', 'moving toward you again after you’ve moved away'],
          ['Matching you', 'crossing when you cross, slowing when you slow'],
          ['Checking for witnesses', 'looking around, not at what they’re doing'],
          ['Hidden hands', 'hands kept in a pocket, a bag, or behind the back'],
          ['The interview', 'a question to get close or test you (“got the time?”, “need a hand?”) while their eyes are elsewhere'],
          ['Body getting ready', 'clenched jaw or fists, a sudden still or flushed face, a bladed stance']
        ]) +
        note('care', 'Distress isn’t danger', 'Someone talking to themselves, sleeping outside, or having a hard time in public is far more likely to be harmed than to harm anyone: people with serious mental illness are many times more likely to be victims of violent crime than the general public. Give space if you need it, and meet them as a neighbor (<a href="#lens-relationships/special/distress">Relationships → People in distress</a>).') +
        src('Linda A. Teplin et al., “Crime victimization in adults with severe mental illness,” <i>Archives of General Psychiatry</i> (2005); de Becker, <i>The Gift of Fear</i> (1997).')) +

      sec('2.4', 'Leave early',
        '<p>Leaving is the move that works most often, and it works best early, while it still feels like too much. Nobody needs to agree that it was necessary.</p>' +
        '<div class="sd-points">' +
          card('On the street', 'Cross the street, turn around, or step into a shop, café, or lobby and wait. Ask staff to call someone if you need to.') +
          card('On transit', 'Move to another car or near the driver, or get off at the next stop and wait for the next one.') +
          card('With people you know', 'Leave the party, the date, or the room. “I need to go” is a whole sentence. A code word to a friend (<a href="#lens-self-defense/1-7">1.7</a>) can bring a ride or an excuse.') +
          card('Getting home', 'If someone is following, don’t lead them to your door. Go somewhere busy, or call someone and stay on the line.') +
        '</div>' +
        note('ally', 'Try this', 'Next time you walk into a store, a café, or a friend’s home, find two ways out. After a week it starts happening on its own.')) +

      nextCard(2);
  }

  /* ---------- Unit 3 · De-escalation ---------- */
  function deescalation() {
    return hero('deescalation') +
      '<p class="sd-intro">De-escalation lowers the heat so nobody has to get hurt. It’s rungs 2 and 3 of the ladder, and it works on people, on scared animals, and on our own bodies.</p>' +

      sec('3.1', 'Calm yourself first',
        '<p>When fear hits, adrenaline floods the body. That’s the body getting ready, and it changes how you work:</p>' +
        ul(['Tunnel vision and muffled hearing', 'Shaky hands, and fingers that fumble with keys or a phone', 'Time feeling slow or fast', 'A racing heart and short, high breaths']) +
        '<p>All of it is normal. Slow breathing with a long breath out (in for about 4, out for about 6) is the fastest way to bring it down, and a calm body helps calm the person in front of you. More tools are in <a href="#lens-emotions/feel">Emotions → Feel</a>.</p>' +
        src('Dave Grossman and Loren W. Christensen, <i>On Combat</i> (2004), on the body under stress; research on slow breathing and heart rate variability.')) +

      sec('3.2', 'Space and position',
        '<div class="sd-points">' +
          card('Distance', 'Keep at least two arm’s lengths, more if you can. Distance gives you time, and time gives you choices. Put a table, a counter, or a car between you.') +
          card('Stand side-on', 'Turn slightly, one foot ahead of the other. It’s steadier, it looks less like a challenge, and it protects the front of your body.') +
          card('Open hands up', 'Hands up in front of your chest, palms out, as if saying “easy.” It reads as calm, and your hands are already between you.') +
          card('Everyone has a way out', 'Keep a path to the door for yourself, and never block theirs. People who feel trapped fight harder.') +
        '</div>' +
        src('Crisis Prevention Institute, Verbal Intervention training; Tony Blauer, “the fence.”')) +

      sec('3.3', 'Words that lower the heat',
        '<p>The same four steps from Emotions and Relationships work here, faster and simpler: notice what they’re feeling, name it, and guess the need under it.</p>' +
        '<div class="sd-lists">' +
          '<div class="sd-yes"><h4>Lowers it</h4>' + ul(['A low, slow voice and short sentences', 'Naming the feeling: “You’re really angry about this”', 'Guessing the need: “You need this fixed today”', 'Agreeing with what you honestly can', 'Offering choices: “We can talk here, or I can get the manager”', 'A way out that saves face for them', '“Sorry, my mistake” when it costs nothing real']) + '</div>' +
          '<div class="sd-warn"><h4>Raises it</h4>' + ul(['“Calm down” or “relax”', 'Arguing about facts in the moment', 'Pointing, touching, or stepping closer', 'Laughing, eye-rolling, or an audience', 'Threats or ultimatums', 'Talking fast or loud to win']) + '</div>' +
        '</div>' +
        '<p>A clear boundary is part of de-escalation too: “I’m going to leave now,” said calmly, and then leaving.</p>' +
        note('tip', 'If they want your things', 'Hand them over. A phone, a wallet, or a car can be replaced, and you can’t. Toss it a little away from you, toward one side, and go the other way.') +
        src('Marshall B. Rosenberg, <i>Nonviolent Communication</i>; Crisis Prevention Institute, de-escalation tips.')) +

      sec('3.4', 'Someone in crisis',
        '<p>Someone in a mental health crisis, very high, or very drunk may not be able to follow words the usual way. What helps is less of everything: fewer words, more space, slower moves, and one person talking.</p>' +
        ul(['Introduce yourself and ask their name.', 'Ask simple questions one at a time, and wait.', 'Don’t crowd, touch, or rush them.', 'Ask what would help right now, and listen.', 'If there’s no weapon, call 988 rather than 911, and ask for a mobile crisis team (<a href="#lens-self-defense/1-7">1.7</a>).']) +
        src('NAMI, “Navigating a Mental Health Crisis” (2018); 988 Suicide &amp; Crisis Lifeline.')) +

      sec('3.5', 'Scared animals',
        '<p>Animals who threaten are almost always afraid: guarding food, young, or a place, or startled. The goal is the same as with people: calm, space, and a way out for them.</p>' +
        '<div class="sd-kinds">' +
          kind('A loose dog', 'Calm, side-on', 'Stop, stand side-on, look past them, and keep your hands still. Speak low (“go home”). Back away slowly; running starts a chase. Put a bag, jacket, or bike between you. If knocked down, curl up and cover your neck and ears.', '') +
          kind('A coyote', 'Big and loud', 'Coyotes are usually shy. Stand tall, wave your arms, and make noise until they leave. Pick up small dogs and kids. Never run or turn your back. Remove food and water left outside so they don’t learn to come close.', '') +
          kind('A mountain lion', 'Face them', 'Very rare. Don’t run. Face them, pick up children, look as big as you can, and back away slowly. If one attacks, stay on your feet and fight to get away, as California Fish and Wildlife advises.', '') +
          kind('A bear or a rattlesnake', 'Back away', 'Black bears: talk calmly, back away, and leave them a path; store food and trash where they can’t reach it. Rattlesnakes: step back slowly and give them several feet; they strike only when they feel cornered.', '') +
        '</div>' +
        '<p>Living alongside wild neighbors is in <a href="#lens-relationships/special/wild">Relationships → Wild animals</a>, and companion animals are <a href="#lens-self-defense/animals">Unit 7</a>.</p>' +
        src('American Veterinary Medical Association, dog bite prevention; California Department of Fish and Wildlife, Keep Me Wild: coyotes, mountain lions, and black bears; Project Coyote, coyote hazing.')) +

      nextCard(3);
  }

  /* ---------- Unit 4 · Getting away ---------- */
  function away() {
    return hero('away') +
      '<p class="sd-intro">When noticing and words aren’t enough, the goal is still the same: make a gap, and go. Getting away is rungs 4 to 6 of the ladder, and none of it needs strength.</p>' +

      sec('4.1', 'Your voice',
        '<p>A loud voice is the tool almost everyone has. It startles, it tells people around you that something is wrong, and it tells the other person they’ve been seen.</p>' +
        '<div class="sd-points">' +
          card('Low and loud', 'Shout from the belly, not the throat: short, deep, and clear. “Back off!” “Stop!” “Get away from me!”') +
          card('Name the helper', 'In a crowd, everyone waits for someone else. Pick one person: “You in the red jacket, call 911!” A specific ask gets help much faster.') +
          card('Practice out loud', 'Most people freeze the first time they try to yell. Practicing in a car, a class, or a pillow makes the voice ready when you need it.') +
        '</div>' +
        src('John Darley and Bibb Latané, “Bystander intervention in emergencies,” <i>Journal of Personality and Social Psychology</i> (1968).')) +

      sec('4.2', 'Breaking free',
        '<p>These moves are for getting loose so you can leave, not for winning. Each one uses angles and body weight, so they work for small bodies, older bodies, and seated bodies.</p>' +
        steps('steps', [
          ['Wrist grab', 'Turn your wrist toward their thumb, the weakest part of a grip, and pull back sharply toward your body. Then go.'],
          ['Grab from behind', 'Drop your weight, bend your knees, and widen your stance, so you’re harder to lift or move. Turn toward their thumb side and twist out.'],
          ['Hair or clothes', 'Press their hand against you so it can’t pull, then step toward them and turn out.'],
          ['On the ground', 'Keep your feet toward them, kick at the knees, and get up when you can, hands first, eyes on them.'],
          ['When there’s no other way', 'The eyes, nose, throat, groin, and knees are where a small strike makes a big gap. Strike once or twice, then run.']
        ]) +
        '<p>Wheelchair users can use their chair to keep distance and to push or roll away; canes, bags, and umbrellas can hold someone off. An empowerment self-defense class teaches all of this hands-on, with practice partners, and adapts it to your body.</p>' +
        note('ally', 'It works', 'In a study of over 800 Canadian university women, a 12-hour empowerment self-defense program cut rape by nearly half over the next year.') +
        src('Charlene Y. Senn et al., “Efficacy of a sexual assault resistance program for university women,” <i>New England Journal of Medicine</i> (2015); IMPACT and Empowerment Self-Defense Alliance class guidance.')) +

      sec('4.3', 'Run to people',
        '<div class="sd-points">' +
          card('Toward light and people', 'A store, a gas station, a restaurant, a bus, any lit and busy place. Back the way you came is often closer than ahead.') +
          card('Never to a second place', 'If someone tries to move you into a car, a room, or out of sight, that’s the moment to resist with everything, loudly. Wherever they want to take you is worse than here.') +
          card('In a car', 'Lock the doors and drive somewhere busy, or to a fire or police station. Lay on the horn if someone approaches. Don’t drive home if someone is following.') +
          card('Call', 'Call 911, or text 911 in most of California if you can’t speak. Say where you are first, then what’s happening.') +
        '</div>' +
        src('California Governor’s Office of Emergency Services, Text-to-911; National Crime Prevention Council.')) +

      sec('4.4', 'Afterward',
        '<p>After danger, the body crashes: shaking, crying, laughing, numbness, or wanting to sleep. All of it is the body coming down. Get somewhere safe, call someone, and drink water.</p>' +
        ul(['Get checked, even if you feel fine: adrenaline hides injuries, and choking can cause swelling hours later.', 'After a sexual assault, a medical forensic exam is free, and you don’t have to report to the police to get one. RAINN can find one near you: <a href="tel:18006564673">1-800-656-4673</a>.', 'Reporting is your choice. Writing down what happened, while it’s fresh, keeps that choice open.', 'Shock, fear, anger, or grief can come in waves for weeks. That’s normal, and there’s help: <a href="#lens-emotions/feel">Emotions → Feel</a>, and 988 any time.']) +
        note('care', 'However it went', 'Freezing, going along, or fighting back are all things bodies do to survive. Whatever you did, you got through it, and it wasn’t your fault.') +
        src('RAINN, National Sexual Assault Hotline (rainn.org); Violence Against Women Act (2005, reauthorized 2022), free forensic exams without a police report.')) +

      nextCard(4);
  }

  /* ---------- Unit 5 · Home ---------- */
  function home() {
    return hero('home') +
      '<p class="sd-intro">Home is the place you rest, so its safety is mostly quiet: good locks, light, people who know you, and a plan nobody has to think about until they need it. Fires, earthquakes, and floods are <a href="#lens-emergency-prep">Emergency prep</a>.</p>' +

      sec('5.1', 'Doors and locks',
        '<div class="sd-points">' +
          card('The strike plate', 'Most kicked-in doors fail at the frame, not the lock. Swapping the short screws in the strike plate and hinges for 3-inch screws that reach the wall stud costs a few dollars and makes a door much harder to force.') +
          card('A deadbolt', 'A deadbolt with a bolt that goes at least an inch into the frame. Lock it when you’re home, too.') +
          card('Sliding doors and windows', 'A dowel or broom handle cut to fit the track keeps a slider shut. Window pins or stops let windows open a few inches for air but no further.') +
          card('Renters', 'California landlords must provide a deadbolt on main entry doors and locks on windows (Civil Code §1941.3). A tenant with a protective order can have the locks changed within 24 hours of asking (§1941.5–1941.6).') +
        '</div>' +
        src('California Civil Code §1941.3, §1941.5, and §1941.6; Consumer Reports and InterNACHI on door reinforcement.')) +

      sec('5.2', 'Light and a lived-in look',
        '<p>About 3 in 4 break-ins happen when nobody’s home, many in the daytime, and most people who break in look for an empty, easy home and leave when they find someone there. So the goal is a home that looks lived in and is hard to get into unseen.</p>' +
        ul(['Motion lights at doors and dark corners, and a porch light at night', 'Shrubs trimmed below windows, so nobody can hide there', 'Lights and a radio on timers when you’re away', 'A neighbor who picks up packages and mail', 'Trip photos posted after you’re home, not during']) +
        src('US Bureau of Justice Statistics, “Victimization During Household Burglary” (2010); Kuhns et al., burglar survey, UNC Charlotte (2012).')) +

      sec('5.3', 'Who comes to the door',
        '<p>You don’t have to open your door to anyone. You can talk through it, or not answer at all.</p>' +
        ul(['Workers and utility staff can be checked by calling the company on a number you look up yourself, not one they give you.', 'Police and immigration agents need a warrant signed by a judge to come in without your consent; ask them to slide it under the door (<a href="#lens-self-defense/1-6">1.6</a>).', 'Kids can learn a household rule: they don’t open the door, they get a grown-up, and that’s never rude.', 'A video doorbell or peephole lets you see first. Cloud cameras share video with companies and sometimes police, so read the settings.']) +
        src('EFF, on doorbell cameras and police access; Immigrant Legal Resource Center, “Know Your Rights.”')) +

      sec('5.4', 'A safe room and a household plan',
        '<div class="sd-points">' +
          card('A room to go to', 'A room with a door that locks, a phone or charger kept there, and ideally a window as a second way out.') +
          card('A plan everyone knows', 'A code word for “get out” or “call for help,” a place outside to meet, and who calls whom. Practice it like a fire drill, lightly.') +
          card('Kids can call', 'Even young kids can learn to call 911 and say their address. Write it by the phone.') +
          card('If danger is inside', 'In harm at home, plan around rooms without weapons and with exits, away from the kitchen and bathroom. Keep a bag with ID, keys, money, medicine, and papers at a friend’s. An advocate can help (<a href="#lens-self-defense/1-5">1.5</a>).') +
        '</div>' +
        note('tip', 'Weapons in the house', 'A gun at home raises the risk of suicide about three times for everyone who lives there. If there is one, keep it locked and unloaded, with ammunition stored apart. California requires guns to be stored away from children and anyone not allowed to have one, and a Gun Violence Restraining Order lets family or household members ask a court to remove guns for a time from someone in crisis.') +
        '<p>Plans for fires, earthquakes, and evacuations are in <a href="#lens-emergency-prep">Emergency prep → Plans &amp; people</a>.</p>' +
        src('Anglemyer, Horvath, and Rutherford, “The accessibility of firearms and risk for suicide and homicide victimization among household members,” <i>Annals of Internal Medicine</i> (2014); California Penal Code §25100 (criminal storage) and §18100 and following (Gun Violence Restraining Orders, since 2016); The National Domestic Violence Hotline, safety planning.')) +

      sec('5.5', 'Neighbors who check in',
        '<p>The strongest lock is a street where people know each other. Neighbors notice a strange car, a door left open, a porch light that didn’t go off, or mail piling up.</p>' +
        ul(['Learn the names of the people on either side of you, and swap numbers.', 'Start a small group chat for your building or block.', 'Agree on a signal with someone who lives alone, like a curtain opened every morning.', 'Hold keys for each other, and know who has animals inside (<a href="#lens-self-defense/7-3">7.3</a>).']) +
        note('ally', 'Try this', 'Knock on one neighbor’s door this week, with a hello and your number. That’s the whole first step (<a href="#lens-self-defense/1-7">1.7</a>).')) +

      nextCard(5);
  }

  /* ---------- Unit 6 · Everyday cybersecurity ---------- */
  function digital() {
    return hero('digital') +
      '<p class="sd-intro">Nobody can protect everything online all the time, and trying is exhausting. Everyday cybersecurity is a few habits that close the doors people actually use. The bigger picture of life online is the Digital world lens (later).</p>' +

      sec('6.1', 'Make a security plan',
        '<p>Security people call this threat modeling: instead of worrying about the whole internet, you decide what matters and focus there. Six questions do it:</p>' +
        steps('steps', [
          ['What do I want to protect?', 'Be specific: your messages, your location, a kid’s chats in one game, your bank account.'],
          ['Who do I want to protect it from?', 'Ad and data companies, scammers, bullies, an ex, strangers, or a government.'],
          ['How bad would it be if it failed?', 'Losing $20 in a game is different from a stranger learning where a child lives.'],
          ['How likely is it?', 'What might happen and what probably will happen are different questions.'],
          ['How much trouble will I go to?', 'There’s no perfect option, only trade-offs you choose.'],
          ['Who are my allies?', 'A partner, a friend who’s good with tech, other parents, a library.']
        ]) +
        '<p>Answers change as life does (a new phone, a breakup, a kid turning 13), so come back to them now and then.</p>' +
        src('Electronic Frontier Foundation, Surveillance Self-Defense, “Your Security Plan” and “Online Privacy for Parents and Youth” (reviewed Oct 21, 2026).')) +

      sec('6.2', 'Accounts and passwords',
        '<p>Companies get breached all the time, and the passwords leak. If one password opens many accounts, one leak opens them all.</p>' +
        '<div class="sd-points">' +
          card('A password manager', 'An app that makes a long, different password for every account and remembers them, so you only remember one. Families can share logins for things like streaming in one place.') +
          card('Two-step login', 'Turn on two-factor login for email, bank, and phone accounts: a code from an app or a security key, not just a password. An app is safer than a text message, which can be redirected.') +
          card('Passkeys', 'Many sites now offer a passkey, which logs you in with your phone’s lock instead of a password, so there’s nothing to steal or phish.') +
          card('Email first', 'Your email resets every other password, so it gets the strongest password and two-step login first.') +
        '</div>' +
        src('EFF Surveillance Self-Defense, “Creating Strong Passwords” and “How to: Enable Two-factor Authentication”; FIDO Alliance, passkeys.')) +

      sec('6.3', 'Phones and trackers',
        '<div class="sd-points">' +
          card('Update', 'Updates fix holes people are already using. Turn on automatic updates for the phone and apps.') +
          card('Permissions', 'Apps ask for your photos, camera, microphone, contacts, and location. Say no when it seems like too much, especially location, which most apps don’t need.') +
          card('Ad tracking', 'Phones carry an ad ID that lets companies follow you across apps. Turn it off: on iPhone, ask apps not to track; on Android, delete the advertising ID. On computers, EFF’s free Privacy Badger blocks hidden trackers.') +
          card('Location sharing', 'Check who can see where you are: in Find My, Google Maps, Life360, and Snapchat. Sharing set up in a good time can outlive the relationship.') +
        '</div>' +
        '<h3>If someone might be tracking you</h3>' +
        ul(['iPhones and Android phones warn you about an unknown AirTag or other tracker moving with you, and Android can also scan for one on demand.', 'Look for apps you didn’t install, a phone that’s hot or draining fast for no reason, or someone knowing things they shouldn’t.', 'Stalkerware is an app hidden on a phone to watch it. Removing it can alert the person who installed it, so talk to an advocate first if you’re in danger (<a href="#lens-self-defense/1-5">1.5</a>).', 'A cheap new phone with a new account, kept apart from the old one, is often the safest step.']) +
        src('EFF Surveillance Self-Defense, “Online Privacy for Parents and Youth” and “Mobile Phones: Location Tracking”; Coalition Against Stalkerware (stopstalkerware.org); Apple and Google, unknown tracker alerts.')) +

      sec('6.4', 'Scams and human hacking',
        '<p>Most scams don’t break into anything. They talk someone into opening the door, using the same pressure from <a href="#lens-self-defense/1-4">1.4</a>: a trusted name, fear or excitement, a rush, and a request to keep it quiet. Americans reported $16.6 billion in internet crime losses in 2024, and people over 60 lost the most.</p>' +
        '<div class="sd-lists">' +
          '<div class="sd-warn"><h4>Common scripts</h4>' + ul(['“Your account is locked, click here”', 'A bank, the IRS, or the police on the phone, needing money now', 'A grandchild or friend in trouble, sometimes in a cloned voice', 'Gift cards, wire transfers, crypto, or cash by courier', 'A new online friend or love who needs help with money', 'A job or investment that pays too well']) + '</div>' +
          '<div class="sd-yes"><h4>What protects</h4>' + ul(['Hang up and call back on a number you look up yourself', 'No real agency asks for gift cards or crypto', 'A family code word for “is this really you?” (<a href="#lens-self-defense/1-7">1.7</a>)', 'Wait a day: real deadlines survive a night’s sleep', 'Tell someone, even if you’ve been asked not to']) + '</div>' +
        '</div>' +
        note('ally', 'If it happened', 'Call your bank right away, change passwords starting with email, and report it at ' + ext('https://www.ic3.gov', 'ic3.gov') + ' and ' + ext('https://reportfraud.ftc.gov', 'ReportFraud.ftc.gov') + '. Scams work on smart people; they’re built to.') +
        src('FBI Internet Crime Complaint Center, <i>2024 Internet Crime Report</i>; Federal Trade Commission, consumer alerts on impostor and voice-cloning scams.')) +

      sec('6.5', 'Kids and screens',
        '<p>No tool can stand in for learning together how the internet works. Families decide when and how; the same six questions from <a href="#sd-6-1">6.1</a> help, asked again as a kid grows.</p>' +
        '<div class="sd-points">' +
          card('Conversations first', 'Play their game with them, share a scam text you got and why you didn’t answer, or ask: What makes a place online feel safe? How can you tell someone isn’t who they say? Who would you tell if something felt wrong?') +
          card('Controls start conversations', 'Parental controls work at the router, the device, and each app or game, and kids are good at getting around all three. When a kid hits a limit, it’s a chance to talk about what they need, not just a no.') +
          card('Privacy grows with them', 'Reading every message can backfire as kids grow. Young people who feel supported, not watched, are more likely to speak up when something goes wrong. If you share their location, say why, and when it will stop.') +
          card('School devices', 'A school laptop often runs monitoring software. Treat it as watched, and keep personal accounts off it. You can ask the school what it uses, or file a public records request.') +
        '</div>' +
        '<h3>Quick fixes that help everyone</h3>' +
        ul(['Turn off autoplay on video apps', 'Set notifications to rest at bedtime', 'Turn off in-app purchases, and talk about why', 'Review a device’s AI settings', 'Install Privacy Badger in the browser']) +
        src('EFF Surveillance Self-Defense, “Online Privacy for Parents and Youth” (reviewed Oct 21, 2026), which also links setup guides for each device, game, and streaming service: ' + ext('https://ssd.eff.org', 'ssd.eff.org') + '.')) +

      nextCard(6);
  }

  /* ---------- Unit 7 · Animal safety ---------- */
  function animals() {
    return hero('animals') +
      '<p class="sd-intro">Animals help keep us safe, and we keep them safe, and the same habits do both. Who they are and what they need lives in <a href="#lens-relationships/special/family">Relationships → Family animals</a>.</p>' +

      sec('7.1', 'Animals notice first',
        '<p>Animals read bodies, smells, and sounds we miss. A dog who stiffens at one visitor and wags at another, or a cat who leaves the room when a certain person arrives, is giving you information worth weighing.</p>' +
        '<div class="sd-points">' +
          card('Dogs', 'Dogs bark at what’s new, and a barking dog is one of the things burglars say turns them away. Walking with a dog means company and a second set of senses, and many dogs will step between their people and a threat.') +
          card('Cats', 'Cats are quiet noticers: ears forward, freezing, hiding, or staring at a door. Their alarm is usually silent, so it’s worth looking where they look.') +
          card('Not their job', 'A dog who bites to protect gets hurt and frightened, and in California can be declared dangerous, even put down. So we lean on their noticing, not their teeth: no attack training, and their alarm is our cue to act, not theirs to finish.') +
        '</div>' +
        note('tip', 'Meeting a scared dog', 'Stand side-on, keep your hands still, look away, and back off slowly; running can start a chase. Kids can “be a tree”: feet still, hands folded, eyes on their feet. Most bites to children are from dogs they know, so let sleeping and eating dogs be.') +
        src('Kuhns, Blevins, Bouffard, and Wright, burglar survey, UNC Charlotte (2012); American Veterinary Medical Association, dog bite prevention; California Food and Agricultural Code §31601 and following (potentially dangerous and vicious dogs).')) +

      sec('7.2', 'Everyday care that keeps them safe',
        '<div class="sd-points">' +
          card('Found again', 'A collar tag with your phone number, and a microchip registered to you (a chip with old details won’t bring anyone home). Update both when you move.') +
          card('Roads and doors', 'Leashes near traffic, screens on windows, and a gate or an extra door between the front door and a cat who bolts. Fireworks nights are the busiest for lost dogs, so keep everyone inside.') +
          card('Heat and cars', 'A car heats up fast even with the windows cracked. California law forbids leaving an animal in one in dangerous heat or cold, and lets bystanders rescue them in an emergency. Pavement too hot for your palm is too hot for paws. More in <a href="#lens-air/smoke/companions">Air</a>.') +
          card('No poisons', 'Xylitol, grapes, onions, lilies for cats, rodent baits, antifreeze, and many cleaners and essential oils can kill. The full list, by species, is in <a href="#lens-toxins/exposures/companions">Poisons → Companion animals</a>, and what they eat in <a href="#lens-food/companions">Food → Companions</a>.') +
        '</div>' +
        note('ally', 'If they ate something', 'ASPCA Animal Poison Control: <a href="tel:18884264435">1-888-426-4435</a>, open all day and night (a fee may apply).') +
        src('California Penal Code §597.7 (animals in vehicles); ASPCA Animal Poison Control Center; American Veterinary Medical Association, microchipping.')) +

      sec('7.3', 'A plan if you can’t be there',
        '<p>The most common danger to a companion isn’t a stranger. It’s their person suddenly not coming home: a fall, a hospital stay, an arrest, or a death. Animals left alone can go hungry behind a closed door. This matters most for people who live alone, and for elders.</p>' +
        steps('steps', [
          ['A wallet card', '“Animals at home”, with how many, who they are, and who to call, kept beside your ID.'],
          ['Two people with a key', 'Who agree to check in, feed, and take them if needed, and who know their food, medicines, and vet.'],
          ['A sign by the door', 'A window sticker listing the animals inside tells neighbors and responders to look for them.'],
          ['Food on hand', 'Two weeks extra, not two days, so a missed trip or a short stay away isn’t an emergency.'],
          ['For the long term', 'Name a caregiver in your will, or set up a pet trust, which California law allows, with money set aside for their care. Many sanctuaries and shelters run lifetime-care programs.']
        ]) +
        note('ally', 'Elders and neighbors', 'Some Meals on Wheels programs deliver pet food too, and many food banks keep it. If a neighbor who lives alone has animals, knowing their names and having a number to call is the whole safety net.') +
        src('California Probate Code §15212 (trusts for the care of animals); Meals on Wheels America, Pet Assistance Program; ASPCA and Humane Society of the United States, pet care planning.')) +

      sec('7.4', 'Animals and harm at home',
        '<p>Animals are often part of harm at home: threatened or hurt to frighten and control the people who love them. Many people delay leaving because they won’t leave an animal behind, so planning for them is planning for everyone.</p>' +
        '<div class="sd-points">' +
          card('In the order', 'California domestic violence restraining orders can include animals: who keeps them, and an order to stay away from them (Family Code §6320).') +
          card('Shelter for them too', 'More shelters take animals now, and programs foster them while a person gets safe. The hotline in <a href="#lens-self-defense/1-5">1.5</a> can find one near you, and the Animal Welfare Institute keeps a directory.') +
          card('Their papers', 'Vet records, adoption papers, and licenses in your name help show who they live with. Keep copies with your own important papers.') +
        '</div>' +
        note('care', 'A warning sign', 'Hurting or threatening an animal is one of the signs that harm toward people may be coming (<a href="#lens-self-defense/1-5">1.5</a>), and it’s worth taking seriously wherever you see it.') +
        src('Frank R. Ascione et al., “Battered pets and domestic violence,” <i>Violence Against Women</i> (2007); California Family Code §6320; Animal Welfare Institute, Safe Havens for Pets directory (awionline.org); RedRover Relief, domestic violence programs.'));
  }

  function page(name, html, unit) {
    var c = unit === 6 ? mn().credits('self-defense') : [];
    if (c.length) html += mn().deeper('People whose work shaped this unit, and where to go for more.', c);
    return { title: name + ' · Self-defense · Kinship', html: mn().header('home') + '<div><a class="back" href="#">← Education</a></div><main class="sd sd-u' + unit + '">' + html + '</main>' + mn().footer() };
  }

  window.MN_LENS_VIEWS = window.MN_LENS_VIEWS || {};
  /* #lens-self-defense is unit 1; /noticing, /de-escalation, /away, /home, /digital and /animals are units 2–7. A sub-unit link like #lens-self-defense/6-3 opens that unit there. */
  var VIEWS = [['Safety', safety], ['Noticing', noticing], ['De-escalation', deescalation], ['Getting away', away], ['Home', home], ['Everyday cybersecurity', digital], ['Animal safety', animals]];
  window.MN_LENS_VIEWS['self-defense'] = function (sub) {
    var seg = (sub || '').split('/')[0], m = /^([1-7])-\d$/.exec(seg);
    var unit = m ? +m[1] : ({ noticing: 2, 'de-escalation': 3, away: 4, home: 5, digital: 6, animals: 7 })[seg] || 1;
    var v = page(VIEWS[unit - 1][0], VIEWS[unit - 1][1](), unit);
    if (m) v.jump = 'sd-' + seg;
    return v;
  };
})();
