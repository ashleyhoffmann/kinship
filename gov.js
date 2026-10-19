/* California governance lens (tier 1 Choices, Beta): a lens on what stops people, legally, from meeting basic needs, who decides over shared needs,
   and how to advocate in the systems we have (and outside them) for better ones. Starts with California water and criminalization;
   housing (who owns homes, including private equity) is next. Registers window.MN_LENS_VIEWS.governance. */
(function () {
  function mn() { return window.MN; }
  function ul(items) { return '<ul>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
  function sec(n, title, short, body) {
    return '<section class="gv-sec" id="gv-' + n + '"><div class="gv-sec-head"><span class="gv-n">' + n + '</span><div><h2>' + title + '</h2><p>' + short + '</p></div></div>' + body + '</section>';
  }

  var WHO = [
    ['Water rights and drinking-water rules', 'State Water Resources Control Board', 'Appointed by the Governor, confirmed by the state Senate', 'Public meetings with public comment; written comments on proposals'],
    ['State Water Project: aqueducts from the north to farms and Southern California', 'California Department of Water Resources', 'State agency under the Governor', 'The Governor, your state Assemblymember and Senator'],
    ['Central Valley Project: the federal dams and canals', 'US Bureau of Reclamation', 'Federal agency', 'Your members of Congress'],
    ['California’s share of the Colorado River', 'Negotiated among seven states and the federal government; local districts hold the shares', 'Mixed: federal, state and district boards', 'Members of Congress; district board meetings'],
    ['Your tap', 'Your city utility or water district (in San Francisco, the Public Utilities Commission)', 'An elected board, or a commission appointed by the city', 'Regular public meetings, usually monthly'],
    ['Groundwater', 'Local Groundwater Sustainability Agencies (since the 2014 groundwater law)', 'Boards drawn from local agencies', 'Their public meetings and plans'],
    ['Rates at private water companies', 'California Public Utilities Commission', 'Appointed by the Governor', 'Public participation hearings and comments'],
    ['Laws, budgets and water bonds', 'The Legislature, the Governor and voters', 'Elected', 'Your representatives; ballot measures']
  ];
  var STAIRS = [
    ['Notice and learn', 'Read your water report and the maps. Find the name of your water system, its board, and when it meets.', '#lens-water/testing/report', 'Water reports and maps'],
    ['Talk and make', 'Tell neighbors what you found. Art travels further than charts: a mural, a zine, a song, a photo of the dry well or the canal.', '#lens-relationships/neighbors', 'Neighbors'],
    ['Show up', 'Local boards must post agendas 72 hours before regular meetings (the Brown Act) and take public comment. Two minutes at a microphone is on the record.', '', ''],
    ['Ask in writing', 'Request records under the California Public Records Act: test results, contracts, who voted how. Write to whoever holds the decision (the table above).', '', ''],
    ['Reach representatives', 'State Assemblymember and Senator for water law; county supervisors for wells and land use; your water board; members of Congress for federal projects and the Colorado River.', '', ''],
    ['Organize together', 'Join or start a group. A building, a block or a valley asking together carries more weight than one person, and shares the work.', '#lens-relationships/dialogue', 'Dialogue'],
    ['Vote, run, and protest', 'Water board seats are elected, often with few votes cast. Ballot measures decide water bonds. Protest makes a need visible when other doors stay shut.', '#lens-relationships', 'Relationships']
  ];

  /* Lovernance (envisioned alternatives): two models to build toward. Each law row starts with a word (Helps, In the way, County by county, Federal, Not yet law), never colour alone. */
  function law(rows) {
    return '<ul class="gv-law">' + rows.map(function (r) { return '<li><span class="gv-tag">' + r[0] + '</span> ' + r[1] + '</li>'; }).join('') + '</ul>';
  }
  function vision(n, name, short, lead, needs, rows) {
    return '<article class="gv-vision" aria-labelledby="gv-v' + n + '"><span class="eyebrow">Vision ' + n + '</span><h3 id="gv-v' + n + '">' + name + '</h3>' +
      '<p class="gv-vshort">' + short + '</p><p>' + lead + '</p>' +
      '<h4>How needs get met</h4>' + ul(needs) +
      '<h4>California today</h4>' + law(rows) + '</article>';
  }
  var COMMONS = vision(1, 'The Commons', 'Land shared and tended together.',
    'A front door anyone can walk through, especially people with nowhere else to go. It isn’t a separate place for poor people; it’s a commons open to all, the same way everyone sees the same table of water sources.',
    ['<b>Day one:</b> a bed, water and food. Rest comes first, and nobody is asked to work at the door.',
     '<b>The land</b> is held by a community land trust, which pays the land fee for everyone. Members give time instead of money.',
     '<b>The people who use the land make its rules.</b> Problems get small responses first, and conflicts are worked through close to home, with <a href="#lens-relationships/dialogue">Dialogue</a>. These come from Elinor Ostrom’s design principles for commons.',
     '<b>Worker co-ops</b> meet what’s hard to make alone: natural-fiber clothing, repair and tool libraries, tools, solar, internet and seed.',
     '<b>Anyone can leave,</b> and they leave with their skills and credit for what they gave.'],
    [['Helps', '<i>City of Santa Barbara v. Adamson</i> (California Supreme Court, 1980): the state constitution’s right to privacy struck down a city rule capping how many unrelated people could share a house.'],
     ['Helps', 'County assessors must consider a land trust’s resale limits when they value its homes, which keeps property tax lower (Revenue and Taxation Code §402.1).'],
     ['Helps', 'The Williamson Act (1965): farmland under a rolling 10-year contract is taxed on its value as a farm, not its market price. Not every county still signs new contracts.'],
     ['Helps', 'The Rainwater Capture Act of 2012: rain caught from a roof can be used without a water right.'],
     ['County by county', 'Class K (Title 25 of the California Code of Regulations, limited-density owner-built rural dwellings) lets people build simpler homes for themselves on rural land, but only in counties that have adopted it. Shelter, safe-parking and camping rules change by county and city too.'],
     ['In the way', 'Zoning that limits homes on rural land, building codes written for contractors, land prices, and, since <i>Grants Pass</i> (2024), citations for people sleeping outside while they look for a place.']])
  var LOVE = vision(2, 'Private lovernance', 'Land you hold yourself, governed by care instead of profit.',
    'You’re safe on your land for as long as you live there and look after it, and it can pass to your kin. What it can’t be is held empty to sell high later.',
    ['<b>One land fee,</b> charged on the value of the land, not the home on it, so building or fixing a home never raises the bill. This is Henry George’s land value tax.',
     '<b>Pay it in money or in time.</b> An hour volunteering at your child’s school, on a road crew or on fire watch counts the same as anyone else’s hour, like Edgar Cahn’s time banks.',
     '<b>Rentals become housing co-ops.</b> Residents own the building together on land-trust land. The monthly charge is the real cost (upkeep, the land fee, savings for repairs) with no profit on top, and resale prices are capped so homes stay affordable.',
     '<b>Landlords’ needs count too.</b> Underneath the rent is a need for safety and predictability, and often purpose. The co-op can pay a former landlord a lifetime income from monthly charges, they can keep a home in the building for life, or take a paid role caring for it.',
     '<b>Safety without hoarding.</b> Hoarding is one strategy for feeling safe. When health care, food and a home are reliably shared, it has less and less to do.'],
    [['In the way', 'Prop 13 (1978) caps property tax at 1% of a property’s value when it was last bought, with increases of no more than 2% a year. It taxes the land and the home together, and the longer someone holds, the less they pay. A land-value fee would need voters to change the state constitution.'],
     ['Helps', 'SB 1079 (2020): after a foreclosure auction of a home with 1 to 4 units, tenants, nonprofits, land trusts, limited-equity co-ops and public agencies get a window to make a matching offer.'],
     ['Helps', 'San Francisco’s Community Opportunity to Purchase Act (2019) gives qualified nonprofits the first chance to buy many rental buildings when they’re sold.'],
     ['Helps', 'The California Worker Cooperative Act (2015) made it simpler to form and fund worker-owned co-ops.'],
     ['Federal', 'A landlord who sells over time instead of all at once can spread the tax on the gain across those years (installment sales, 26 U.S.C. §453).'],
     ['Not yet law', 'Paying a land fee in time. Nothing in California does this yet, so it’s a door for advocacy (see Stairs for change below).']])

  function view() {
    var html =
      '<section class="gv-hero"><span class="gv-pill">Tier 1 · Choices · Beta</span><h1 tabindex="-1">California governance</h1>' +
      '<p class="gv-lede">California governance is one more lens on meeting needs: what helps or stops people, legally, from meeting their basic needs, and how to advocate for yourself in the systems we have while building better ones. Every shared need (water, air, land, a place to sleep) is governed by someone, often far from the people it touches. Some paths run through law; plenty don’t, like asking your church, a co-op or your block to meet a need directly. It starts with two visions of governance we can build, then gets into what the law currently is: the rights you hold just by existing, California water, and criminalization.</p>' +
      '<p class="gv-note"><b>California first.</b> State law comes first, federal law where it applies everywhere, and county or city rules are named when they change things, like shelters, camping and owner-built homes. Laws are explained here, not advised on: for your own situation, free legal aid and the California Courts Self-Help Guide (selfhelp.courts.ca.gov) can help.</p></section>' +

      sec(1, 'Lovernance', 'Envisioned alternatives: governance we can build, so the old way becomes obsolete.',
        '<p>A line often credited to Buckminster Fuller: “To change something, build a new model that makes the existing model obsolete.” Lovernance is governance rooted in love and kinship, and here are two models of it to build toward. Both start in the same place: the minimum isn’t what rent costs, it’s what it costs to meet needs directly. Rain caught on a tarp, seeds from a seed library and cuttings from a neighbor cost close to nothing (<a href="#lens-water/sources">Water: Sources</a>). The one thing that takes money is land, so that’s where governance comes in.</p>' +
        '<p>Both are built on kinship. Nobody charges their sister rent: what we give flows from relationship and need, and care reaches outward, from our household to neighbors and strangers, animals and plants included.</p>' +
        '<div class="gv-visions">' + COMMONS + LOVE + '</div>' +
        '<p class="gv-src">Sources: <i>City of Santa Barbara v. Adamson</i>, 27 Cal.3d 123 (1980); Cal. Rev. &amp; Tax. Code §402.1; California Land Conservation Act of 1965 (Williamson Act); Rainwater Capture Act of 2012; Cal. Code Regs. tit. 25, Limited Density Owner-Built Rural Dwellings; Cal. Const. art. XIII A (Prop 13); SB 1079 (2020); San Francisco Administrative Code ch. 41B (COPA); AB 816, California Worker Cooperative Act (2015); 26 U.S.C. §453; Elinor Ostrom, <i>Governing the Commons</i> (1990); Henry George, <i>Progress and Poverty</i> (1879); Edgar S. Cahn, <i>No More Throw-Away People</i> (2000).</p>') +

      '<div class="gv-turn"><span class="eyebrow">Back to today</span><h2>What the law currently is</h2>' +
      '<p>The rights, rules and decision-makers we live under now, and how to move them.</p></div>' +

      sec(2, 'Rights you have by existing', 'Technically, what you’re entitled to just by being a person here.',
        '<p>Both constitutions mostly protect people from the government, rather than promising what people need. Neither names a right to food, water or a home.</p>' +
        ul(['<b>US Constitution:</b> speech, religion, assembly and petitioning the government (1st Amendment); no unreasonable searches (4th); due process and equal protection of the laws (5th and 14th); no cruel and unusual punishment (8th). Most of these protect every person in the US, not only citizens.',
          '<b>California Constitution, Article I:</b> “All people are by nature free and independent and have inalienable rights. Among these are enjoying and defending life and liberty, acquiring, possessing, and protecting property, and pursuing and obtaining safety, happiness, and privacy.” It also protects speech, assembly, and your right to see government meetings and records (§3).',
          '<b>Water:</b> Article X, §2 of the state constitution says water must be put to reasonable, beneficial use, not wasted.']) +
        '<p class="gv-note"><b>Animals and land:</b> neither constitution gives rights to animals, rivers or land; in law they’re mostly property. California protects animals from cruelty (Penal Code §597) and some farm animals from the smallest cages (Prop 12, 2018). Ecuador’s constitution (2008) recognizes rights of nature.</p>' +
        '<p class="gv-src">Sources: US Constitution, Amendments 1, 4, 5, 8 and 14; California Constitution, art. I §§1–3 and art. X §2; Cal. Penal Code §597; Proposition 12 (2018); Constitution of Ecuador (2008), arts. 71–74.</p>') +

      sec(3, 'Two views, the same needs', 'Strategies differ by place; the needs underneath are shared.',
        '<div class="gv-views">' +
        '<div class="gv-view"><span class="eyebrow">In a big city</span><p>“I’d prefer to buy tap water than lug it out of some river myself. I wish it were healthier and cheaper, but I’ll happily pay for the convenience. I’m open to collecting rainwater for my plants.”</p><small>Needs: ease, health, time, accessibility</small></div>' +
        '<div class="gv-view"><span class="eyebrow">In rural California</span><p>“Why does big agriculture get water rights to supposedly provide for the collective, in a way that doesn’t allow me to provide for myself in my home, to grow my own food? The irrational red tape is frustrating.”</p><small>Needs: fairness, autonomy, food, empowerment</small></div>' +
        '</div><p>Both are reasonable. Conflicts live between strategies, never between needs, so good governance starts by asking what everyone needs and who is at the table.</p>') +

      sec(4, 'Who controls California’s water', 'Each decision has a holder, a way they’re chosen, and a door to knock on.',
        '<div class="gv-tbl"><table><thead><tr><th>Decision</th><th>Who holds it</th><th>How they’re chosen</th><th>How to reach them</th></tr></thead><tbody>' +
        WHO.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') +
        '</tbody></table></div>' +
        '<p class="gv-note"><b>Worth knowing:</b> some agricultural water districts give votes by land owned rather than one person, one vote, a system the US Supreme Court upheld in 1973. The biggest landowners can hold the most votes.</p>') +

      sec(5, 'Where the water goes', 'In an average year, across the whole state.',
        '<div class="gv-split"><div style="--w:50%"><b>About 50%</b><span>Environment: rivers, wetlands, the Delta</span></div><div style="--w:40%"><b>About 40%</b><span>Farms</span></div><div style="--w:10%"><b>About 10%</b><span>Cities and homes</span></div></div>' +
        '<p>Of farm water, about 27% grows feed for animals: alfalfa, irrigated pasture and silage corn. Wet years and dry years shift these numbers a lot; in droughts, rivers lose the most.</p>' +
        '<p class="gv-src">Source: Public Policy Institute of California. Water per pound of each food is in <a href="#lens-water/sources/take">the end of Water: Sources</a>.</p>') +

      '<aside class="gv-fun"><span class="eyebrow">Fun fact</span><p>California law (2012) recognizes a human right to safe, clean, affordable water. Rights on paper become rights in practice when people keep asking.</p></aside>' +

      sec(6, 'Criminalization and incarceration', 'When meeting a need becomes a crime.',
        '<p>Sleeping, sitting, camping, parking overnight, washing up: these are ways people meet the needs for rest, shelter and cleanliness. In many cities they’re against the law in public, which falls hardest on people who have nowhere private to do them.</p>' +
        ul(['<b>Since <i>City of Grants Pass v. Johnson</i></b> (US Supreme Court, 2024), cities can enforce bans on sleeping and camping outside even when there are no shelter beds. That July, California’s Governor ordered state agencies to clear encampments and urged cities to do the same.',
          '<b>Fines grow.</b> A ticket someone can’t pay can become a warrant, a suspended license or jail time, and a record makes housing and work harder to find, which makes the next ticket more likely.',
          '<b>Incarceration at scale.</b> The US holds about 1.9 million people in prisons, jails and detention, one of the highest rates in the world. California’s state prisons hold about 90,000.',
          '<b>Voters have moved both ways.</b> Prop 47 (2014) reduced some drug and theft felonies to misdemeanors; Prop 36 (2024) raised penalties for some of them again. Prop 6 (2024), which would have ended forced labor as a punishment in the state constitution, did not pass.',
          '<b>Other strategies being tried:</b> diversion to treatment instead of jail, restorative justice circles, and crisis teams of medics and counselors instead of police for mental health calls (CAHOOTS in Eugene, Oregon, since 1989; San Francisco’s Street Crisis Response Team).']) +
        '<p class="gv-note"><b>Two questions for any rule like this:</b> What need was the person meeting? Does the rule offer another way to meet it?</p>' +
        '<p>More in <a href="#lens-relationships/special/distress">Relationships: People in distress</a> and <a href="#lens-relationships/special/power">Power &amp; peace</a>.</p>' +
        '<p class="gv-src">Sources: <i>City of Grants Pass v. Johnson</i>, 603 U.S. (2024); California Executive Order N-1-24 (2024); Prison Policy Initiative, <i>Mass Incarceration: The Whole Pie</i> (2024); California Department of Corrections and Rehabilitation population reports; California Secretary of State, statements of vote (2014, 2024).</p>') +

      sec(7, 'Stairs for change', 'Start on the first step. Each one makes the next easier.',
        '<ol class="gv-stairs">' + STAIRS.map(function (s, i) {
          return '<li style="--i:' + i + '"><b>' + s[0] + '</b><p>' + s[1] + '</p>' + (s[2] ? '<a href="' + s[2] + '">' + s[3] + ' →</a>' : '') + '</li>';
        }).join('') + '</ol>' +
        '<p class="gv-src">Find your state representatives at findyourrep.legislature.ca.gov.</p>') +

      sec(8, 'Paths outside law', 'Not every change waits on a vote.',
        '<p>Advocating for yourself can mean asking the people and places already around you to meet a need directly, and leaving law out of it.</p>' +
        ul(['<b>Your church, temple, mosque or synagogue:</b> a parking lot opened for safe overnight parking, showers or a kitchen shared, land offered for homes. Since 2024, California lets faith groups build affordable housing on land they own without a rezoning fight (SB 4).',
          '<b>Your building or block:</b> a tenants’ association, a shared tool shelf, a meal train.',
          '<b>Co-ops and land trusts:</b> homes and workplaces owned by the people who use them (<a href="#lens-relationships/special/coops">Cooperatives</a>).',
          '<b>Mutual aid:</b> neighbors meeting neighbors’ needs directly, no application required.']) +
        '<p class="gv-src">Sources: California SB 4, Affordable Housing on Faith and Higher Education Lands Act of 2023.</p>') +

      sec(9, 'A transparency checklist', 'Questions to ask about any decision over a shared need.',
        ul(['Who made this decision, and who could have?', 'Who benefits, and who pays?', 'Who was at the table, and who wasn’t?', 'Where is the data, and can anyone read it?', 'When is the next chance to weigh in?'])) +

      '<p class="gv-note"><b>Coming next · Housing:</b> who owns homes, including private equity firms that buy houses to rent out, and the paths from rentals to co-ops.</p>';
    return { title: 'California governance · Kinship', html: mn().header('home') + '<div><a class="back" href="#">← Education</a></div><main class="gv">' + html + '</main>' + mn().footer() };
  }

  window.MN_LENS_VIEWS = window.MN_LENS_VIEWS || {};
  window.MN_LENS_VIEWS.governance = function () { return view(); };
})();
