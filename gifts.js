/* Local gifts (Beta): a sub-site of Kinship for neighbors meeting each other's needs. Bright yellow, prefix lg-.
   Needs are universal (food, learning, warmth); a post is a strategy, one specific thing that would help ("a whisk",
   "2 people for 4 hours to help me move"), tagged with up to 3 needs it meets. A post is a request or an offer, public
   (on the Board, never with profile details) or private (only the matchmaker reads it).
   Spreadsheets: the Board (public posts, sortable, with select boxes, a money toggle, and a compact/comfortable
   density), My posts (your requests and offers with timestamps; open ones, then "Successes" once met, plus a
   capacity meter that caps all your offers' hours from the top), and the Inbox (possible matches, with when each came in).
   No map: places are a neighborhood centre plus a fixed nudge, shown as a distance in 0.1-mile steps, never a pin.
   Money is free, money OK, or money only; amounts (lowest, ideal, up to, sliding scale) stay private to the matchmaker.
   Safety: a first-pass screen here blocks coded sex ads and listings of people; companionship is always free and never
   has photos; anything involving children stays private and is matched only with trusted helpers.
   Routes: #gifts (overview), /board, /post[/<id>], /mine, /inbox, /needs, /skills, /repair, /stats, /sustain, /how
   (old /give opens /mine and old /matches opens /inbox).
   Saves only on this device: localStorage 'meeting-needs.gifts.v1' (Copy, Restore, and Clear on How it works).
   Reads the universal needs from rel-data.js (window.MN_REL.NEEDS), loaded with this file. Registers window.MN_GIFTS. */
(function () {
  function mn() { return window.MN; }
  function esc(s) { return mn().esc(String(s == null ? '' : s)); }
  var KEY = 'meeting-needs.gifts.v1';
  var EXPIRE_DAYS = 60;

  var PAGES = [
    { id: '', name: 'Overview' },
    { id: 'board', name: 'Board' },
    { id: 'post', name: 'Post' },
    { id: 'mine', name: 'My posts' },
    { id: 'inbox', name: 'Inbox' },
    { id: 'needs', name: 'My needs' },
    { id: 'skills', name: 'Skills' },
    { id: 'repair', name: 'Repair' },
    { id: 'stats', name: 'Statistics' },
    { id: 'sustain', name: 'Keep it running' },
    { id: 'how', name: 'How it works' }
  ];
  var ALIAS = { give: 'mine', matches: 'inbox' };
  var FOR = [['me', 'Me'], ['household', 'My household'], ['animal', 'An animal in my care'], ['plant', 'A plant or garden']];
  var LEVEL = [['someday', 'Someday'], ['soon', 'Soon'], ['now', 'Right now']];
  var TYPE = [['request', 'Request'], ['offer', 'Offer']];
  var URGENCY = [['today', 'Today'], ['week', 'This week'], ['whenever', 'Not urgent'], ['always', 'Always'], ['custom', 'Other']];
  var STRICT = [['prefer', 'Preferred'], ['only', 'Only then']];
  var PRIORITY = [['nice', 'Nice to have'], ['important', 'Important'], ['essential', 'Essential']];
  var RECUR = [['once', 'Once'], ['weekly', 'Weekly'], ['monthly', 'Monthly'], ['asneeded', 'As needed'], ['custom', 'Other']];
  var TIME = [['none', 'None, just a pickup'], ['limit', 'Up to a set time'], ['always', 'Always available']];
  var VIS = [['public', 'Public on the Board'], ['private', 'Private, matchmaker only']];
  var MONEY = [['free', 'Free only'], ['open', 'Money is OK'], ['only', 'Money only']];
  var MONEY_SHORT = { free: 'Free', open: 'Money OK', only: 'Money only' };
  var PHOTO = [['public', 'On the Board'], ['request', 'On request'], ['match', 'Only with a match'], ['ai', 'Matchmaker only']];
  var MODE = [['open', 'Open'], ['pinch', 'Busy: in a pinch only'], ['paused', 'Paused']];
  var ROLE = [['learn', 'Learn it'], ['teach', 'Teach it'], ['both', 'Both']];
  var FLUENCY = [['well', 'Speak it well'], ['some', 'Know some'], ['want', 'Want to learn']];
  var SHOWN = [['area', 'My neighborhood'], ['band', 'Only how far away'], ['hidden', 'Nothing: matchmaker only']];
  var TRAVEL = [['walk', 'Walk', 3], ['bike', 'Bike or scooter', 9], ['transit', 'Bus or train', 7], ['car', 'Car', 14]];
  var TIMEV = [['tight', 'Tight: short trips only', 1.5], ['normal', 'Usual', 1], ['plenty', 'I have time', 0.7]];
  var DENSITY = [['comfy', 'Comfortable'], ['compact', 'Compact']];
  /* Rough centres, rounded. Posts sit at a neighborhood centre plus a fixed nudge, never at an address. SF first. */
  var AREAS = [
    ['Bayview', 37.729, -122.392], ['Bernal Heights', 37.739, -122.416], ['Castro', 37.761, -122.435], ['Chinatown', 37.794, -122.408],
    ['Dogpatch', 37.758, -122.388], ['Excelsior', 37.724, -122.427], ['Financial District', 37.795, -122.400], ['Glen Park', 37.734, -122.433],
    ['Haight-Ashbury', 37.769, -122.448], ['Hayes Valley', 37.776, -122.425], ['Ingleside', 37.720, -122.457], ['Inner Richmond', 37.780, -122.465],
    ['Inner Sunset', 37.760, -122.468], ['Marina', 37.803, -122.437], ['Mission', 37.760, -122.415], ['Nob Hill', 37.793, -122.416],
    ['Noe Valley', 37.750, -122.434], ['North Beach', 37.806, -122.410], ['Outer Richmond', 37.778, -122.494], ['Outer Sunset', 37.755, -122.494],
    ['Pacific Heights', 37.793, -122.438], ['Parkside', 37.740, -122.490], ['Portola', 37.727, -122.407], ['Potrero Hill', 37.761, -122.401],
    ['SoMa', 37.779, -122.406], ['Tenderloin', 37.785, -122.414], ['Twin Peaks', 37.752, -122.447], ['Visitacion Valley', 37.713, -122.404],
    ['Western Addition', 37.781, -122.433],
    ['Alameda', 37.765, -122.242, 1], ['Berkeley', 37.872, -122.273, 1], ['Daly City', 37.688, -122.470, 1], ['Emeryville', 37.831, -122.285, 1],
    ['Fruitvale', 37.775, -122.224, 1], ['Oakland, Downtown', 37.804, -122.271, 1], ['Richmond (city)', 37.936, -122.348, 1], ['Temescal', 37.834, -122.263, 1],
    ['West Oakland', 37.813, -122.295, 1]
  ];
  /* Craigslist sites across California, for search links. */
  var CL = [['sfbay', 'SF Bay Area'], ['sacramento', 'Sacramento'], ['losangeles', 'Los Angeles'], ['orangecounty', 'Orange County'], ['sandiego', 'San Diego'],
    ['inlandempire', 'Inland Empire'], ['fresno', 'Fresno'], ['bakersfield', 'Bakersfield'], ['modesto', 'Modesto'], ['stockton', 'Stockton'], ['monterey', 'Monterey Bay'],
    ['santabarbara', 'Santa Barbara'], ['slo', 'San Luis Obispo'], ['ventura', 'Ventura'], ['chico', 'Chico'], ['redding', 'Redding'], ['humboldt', 'Humboldt'], ['mendocino', 'Mendocino'], ['goldcountry', 'Gold Country']];
  var CANDO_IDEAS = ['Gardening', 'Sewing', 'Woodworking', 'Cooking', 'Moving boxes', 'Dog walking', 'Bike repair', 'Spreadsheets', 'Listening'];

  /* Shown on the Board until a circle is running, so it's clear what posts will look like. Always labelled Example.
     Their private fields (amounts) are what the matchmaker would see; the Board never shows them. */
  var EXAMPLES = [
    { id: 'x1', type: 'request', title: 'Just moved to town, SOS: carrying boxes up two flights', needs: ['support', 'ease'], area: 'Inner Sunset', urgency: 'week', strict: 'prefer', priority: 'important', recur: 'once', time: 'limit', timeMax: 4, crews: [{ p: 2, h: 2 }, { p: 4, h: 1 }], money: 'open', notes: 'About 20 boxes and a mattress. Third-floor walk-up, no elevator. Snacks and cold drinks for everyone.', value: 200 },
    { id: 'x2', type: 'request', title: 'Dog walker needed one time, while I’m sick', needs: ['care', 'movement'], area: 'Mission', urgency: 'today', strict: 'only', priority: 'essential', recur: 'once', time: 'limit', timeMax: 1, crews: [{ p: 1, h: 1 }], money: 'free', notes: 'One friendly older dog, about 40 pounds, good on a leash. Just around the block twice.' },
    { id: 'x3', type: 'request', title: 'A whisk, any kind', needs: ['food', 'autonomy'], area: 'Noe Valley', urgency: 'whenever', strict: 'prefer', priority: 'nice', recur: 'once', time: 'none', money: 'free', value: 5 },
    { id: 'x4', type: 'request', title: 'Something to insulate a cold back room', needs: ['warmth', 'health'], area: 'Excelsior', urgency: 'week', strict: 'prefer', priority: 'important', recur: 'once', time: 'none', money: 'open', notes: 'A drafty 10 × 12 room with one old window. Open to anything that holds heat: curtains, blankets, foam, rugs.', value: 60 },
    { id: 'x5', type: 'request', title: 'A folding table at a height that’s kind to my back', needs: ['health', 'ease'], area: 'Hayes Valley', urgency: 'whenever', strict: 'prefer', priority: 'nice', recur: 'once', time: 'none', money: 'open', value: 40 },
    { id: 'x6', type: 'offer', title: 'Fresh-cut rosemary, 4 garbage bags', needs: ['food', 'beauty'], area: 'Bernal Heights', urgency: 'week', strict: 'only', recur: 'once', time: 'none', money: 'free', amount: '4 garbage bags', serves: 12, split: true, notes: 'Pruned a huge hedge. Bring a bag; take as much as you’ll use. Dries well for tea and cooking.', value: 30 },
    { id: 'x7', type: 'offer', title: 'Jade plant cuttings', needs: ['beauty', 'growth'], area: 'Castro', urgency: 'always', strict: 'prefer', recur: 'asneeded', time: 'always', money: 'free', serves: 20, split: true, notes: 'There’s always more. Roots in a glass of water in a few weeks.' },
    { id: 'x8', type: 'offer', title: 'Wooden pallets, 6', needs: ['creativity', 'food'], area: 'Dogpatch', urgency: 'week', strict: 'prefer', recur: 'once', time: 'none', money: 'free', amount: '6 standard pallets', serves: 3, split: true, notes: 'Heat-treated (stamped HT), not chemically treated. Good for a raised vegetable box or a compost bin.', value: 60 },
    { id: 'x9', type: 'offer', title: 'Wool moving blankets', needs: ['warmth'], area: 'Portola', urgency: 'whenever', strict: 'prefer', recur: 'once', time: 'none', money: 'free', amount: '5 blankets', serves: 2, split: true, value: 50 },
    { id: 'x10', type: 'offer', title: 'Dog walks, 30 minutes or an hour', needs: ['care', 'movement'], area: 'Mission', urgency: 'week', strict: 'prefer', recur: 'weekly', time: 'limit', timeMax: 1, money: 'open', sliding: true, min: 10, max: 25, also: 'shelter', alsoNote: 'Rent is due Nov 1' },
    { id: 'x11', type: 'offer', title: 'Two strong arms for moving day', needs: ['support'], area: 'Bayview', urgency: 'week', strict: 'prefer', recur: 'asneeded', time: 'limit', timeMax: 4, money: 'only', min: 25, also: 'security', alsoNote: 'Between jobs' },
    { id: 'x12', type: 'offer', title: 'Tea and a walk with a neighbor', needs: ['companionship', 'connection'], area: 'Noe Valley', urgency: 'whenever', strict: 'prefer', recur: 'asneeded', time: 'limit', timeMax: 1.5, money: 'free', notes: 'I love gardening, birds, and slow mornings. Happy to meet at a café or a park bench.' },
    { id: 'x13', type: 'offer', title: 'Show how a countertop water filter works', needs: ['learning', 'clarity'], area: 'Mission', urgency: 'whenever', strict: 'prefer', recur: 'asneeded', time: 'limit', timeMax: 1, money: 'free', notes: 'A short demo: how it filters, what it removes, and what the filters cost each year.' }
  ];

  /* ---------- saved state (this device only) ---------- */
  function blankPlace() { return { area: '', lat: null, lng: null, zip: '', cl: 'sfbay', travel: 'walk', time: 'normal', shown: 'area' }; }
  function blank() {
    return { v: 1, updated: '', needs: [], items: [], cando: [], budget: { hours: '', mode: 'open' }, skills: [], langs: [], found: [], inbox: [],
      saved: [], hidden: [], ui: { density: 'comfy' }, place: blankPlace() };
  }
  var S = load();
  function load() {
    try { var s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && s.v === 1) return norm(s); } catch (e) {}
    return blank();
  }
  function arr(x) { return Array.isArray(x) ? x.filter(function (y) { return y && typeof y === 'object'; }) : []; }
  function strs(x, n) { return Array.isArray(x) ? x.filter(function (y) { return typeof y === 'string'; }).slice(0, n || 200) : []; }
  function norm(s) {
    var b = blank();
    if (s.place && typeof s.place === 'object') {
      var p = s.place, q = b.place;
      q.area = areaOf(p.area) ? p.area : '';
      if (typeof p.lat === 'number' && typeof p.lng === 'number' && isFinite(p.lat) && isFinite(p.lng)) { q.lat = round2(p.lat); q.lng = round2(p.lng); }
      q.zip = /^\d{5}$/.test(p.zip || '') ? p.zip : '';
      ['cl', 'travel', 'time', 'shown'].forEach(function (k) { var L = { cl: CL, travel: TRAVEL, time: TIMEV, shown: SHOWN }[k]; if (label(L, p[k])) q[k] = p[k]; });
    }
    ['needs', 'skills', 'langs', 'found', 'inbox'].forEach(function (k) { b[k] = arr(s[k]); });
    b.found = b.found.filter(function (f) { return f.made && (Date.now() - new Date(f.made).getTime()) < 14 * 864e5; });   /* free things go fast */
    b.items = arr(s.items).map(cleanItem);
    /* Older saves kept requests in posts and offers in gives: fold them into items once. */
    arr(s.posts).forEach(function (p) { b.items.push(cleanItem(fromOldPost(p))); });
    arr(s.gives).forEach(function (g) { b.items.push(cleanItem(fromOldGive(g))); });
    b.cando = strs(s.cando, 60);
    b.saved = strs(s.saved); b.hidden = strs(s.hidden);
    if (s.ui && label(DENSITY, s.ui.density)) b.ui.density = s.ui.density;
    if (s.budget && typeof s.budget === 'object') b.budget = { hours: String(s.budget.hours || '').slice(0, 4), mode: label(MODE, s.budget.mode) ? s.budget.mode : 'open' };
    b.updated = typeof s.updated === 'string' ? s.updated : '';
    return b;
  }
  function fromOldPost(p) {
    return { id: p.id, type: 'request', title: p.title, needs: p.need ? [p.need] : [], area: p.area, urgency: p.urgency === 'month' ? 'whenever' : p.urgency, strict: 'prefer',
      priority: p.priority, recur: 'once', time: p.people && p.hours ? 'limit' : 'none', timeMax: p.hours || 1, crews: p.people ? [{ p: p.people, h: p.hours || 1 }] : [],
      money: !p.canPay || p.canPay === 'none' ? 'free' : 'open', max: p.payMax || 0, sliding: p.canPay === 'sliding', value: p.value, vis: p.vis, made: p.made };
  }
  function fromOldGive(g) {
    var m = { gift: 'free', tips: 'open', sliding: 'open', paid: 'only', trade: 'open' }[g.terms] || 'free';
    return { id: g.id, type: 'offer', title: g.what || g.title, needs: g.need ? [g.need] : [], area: g.area, urgency: 'whenever', strict: 'prefer',
      recur: { once: 'once', weekly: 'weekly', sometimes: 'asneeded', pinch: 'asneeded' }[g.often] || 'asneeded',
      time: g.kind === 'time' ? 'limit' : 'none', timeMax: 1, money: m, sliding: g.terms === 'sliding', min: g.min, max: g.max,
      moneyNotes: g.terms === 'trade' ? 'Open to a trade.' : '', also: g.also, alsoNote: g.alsoNote, vis: g.vis, made: g.made };
  }
  function n0(x, max) { var n = parseFloat(x); return isFinite(n) && n > 0 ? Math.min(n, max) : 0; }
  function pick(list, v, d) { return label(list, v) ? v : d; }
  function cleanItem(it) {
    var o = {
      id: typeof it.id === 'string' && it.id ? it.id : uid(),
      type: pick(TYPE, it.type, 'request'),
      title: String(it.title || '').slice(0, 100),
      needs: strs(it.needs, 3).map(function (n) { return n.slice(0, 30); }),
      area: areaOf(it.area) ? it.area : '',
      urgency: pick(URGENCY, it.urgency, 'week'), urgencyCustom: String(it.urgencyCustom || '').slice(0, 40), strict: pick(STRICT, it.strict, 'prefer'),
      priority: pick(PRIORITY, it.priority, 'important'),
      recur: pick(RECUR, it.recur, 'once'), recurCustom: String(it.recurCustom || '').slice(0, 40),
      time: pick(TIME, it.time, 'none'), timeMax: n0(it.timeMax, 12) || 1,
      notes: String(it.notes || '').slice(0, 1200),
      photos: strs(it.photos, 3).filter(function (u) { return /^data:image\/(jpeg|png|webp);base64,/.test(u); }),
      photoShare: pick(PHOTO, it.photoShare, 'match'), noPeople: !!it.noPeople,
      vis: pick(VIS, it.vis, 'public'), address: String(it.address || '').slice(0, 120),
      money: pick(MONEY, it.money, 'free'), moneyHidden: !!it.moneyHidden, min: n0(it.min, 10000), ideal: n0(it.ideal, 10000), max: n0(it.max, 10000),
      sliding: !!it.sliding, moneyNotes: String(it.moneyNotes || '').slice(0, 1200),
      crews: arr(it.crews).map(function (c) { return { p: Math.round(n0(c.p, 50)), h: n0(c.h, 24) }; }).filter(function (c) { return c.p; }).slice(0, 3),
      amount: String(it.amount || '').slice(0, 80), serves: Math.round(n0(it.serves, 1000)), split: !!it.split, value: n0(it.value, 100000),
      also: String(it.also || '').slice(0, 30), alsoNote: String(it.alsoNote || '').slice(0, 60), dating: !!it.dating,
      status: it.status === 'met' ? 'met' : 'open', made: typeof it.made === 'string' && it.made ? it.made : new Date().toISOString(),
      metAt: typeof it.metAt === 'string' ? it.metAt : '', order: typeof it.order === 'number' ? it.order : 0
    };
    if (o.urgency !== 'custom') o.urgencyCustom = '';
    if (o.recur !== 'custom') o.recurCustom = '';
    return applyRules(o).item;
  }
  function save(msg) {
    S.updated = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(S)); }
    catch (e) { mn().toast('This browser is out of room. Try fewer or smaller photos.'); return false; }
    if (msg) mn().toast(msg);
    return true;
  }
  function uid() { return Math.random().toString(36).slice(2, 9); }
  function label(list, id) { for (var i = 0; i < list.length; i++) if (list[i][0] === id) return list[i][1]; return ''; }
  function rank(list, id) { for (var i = 0; i < list.length; i++) if (list[i][0] === id) return i; return list.length; }
  function third(list, id) { for (var i = 0; i < list.length; i++) if (list[i][0] === id) return list[i][2]; return list[0][2]; }
  function when(iso) {
    if (!iso) return '';
    var d = new Date(iso); if (isNaN(d)) return esc(iso);
    return d.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  }
  function money(n) { return '$' + (Math.round(n) === n ? n : n.toFixed(2)); }

  /* ---------- safety: a first pass on this device; the matchmaker reads every post again before it goes anywhere ---------- */
  var BLOCK = [
    /\b(escorts?|escorting|incall|outcall|gfe|pse|full[- ]?service|sugar ?(daddy|daddies|baby|babies|mommy|mama)|hook ?ups?|nsfw|happy endings?|erotic|sensual (massage|time)|body ?rubs?|onlyfans|fansly|no limits|discreet (fun|encounters?|meetings?)|generous (gentlem[ae]n|m[ae]n)|roses? (per|an?) (hour|hr)|(per|an?) hour donation|car date|bbbj)\b/i,
    /\b\d{2}\s*(yo|y\/o|y\.o\.)\b/i,
    /\b(girls?|ladies|women|boys|young (girls?|boys?|wom[ae]n|m[ae]n|lad(y|ies)))\b[^.]{0,30}\b(available|for (fun|company|rent|hire|you|sale))\b/i,
    /\b(new (girl|face)s? in town|fresh (girls?|faces?))\b/i
  ];
  var KIDS = /\b(babysit\w*|baby[- ]sit\w*|nann(y|ies)|child ?care|day ?care|kids?|kiddos?|children|child|toddlers?|infants?|newborns?|preschool\w*|tweens?|teens?|teenagers?|minors?|my (son|daughter)|girl scouts?|boy scouts?)\b/i;
  var COMPANION_TXT = /\b(compan\w*|friend(s|ship)?|tea\b|coffee|hang ?out|walk with|chat|dat(e|es|ing)|cuddl\w*|lonely|someone to talk)\b/i;
  var COMPANION_NEEDS = ['companionship', 'closeness', 'touch', 'connection', 'belonging'];
  function textOf(it) { return [it.title, it.notes, it.amount, it.moneyNotes, it.urgencyCustom, it.recurCustom, (it.needs || []).join(' ')].join(' '); }
  function isKids(it) { return KIDS.test(textOf(it)); }
  function isCompanion(it) { return (it.needs || []).some(function (n) { return COMPANION_NEEDS.indexOf(n) > -1; }) || COMPANION_TXT.test(it.title + ' ' + (it.notes || '')); }
  /* Returns the item with the rules applied, any reason to refuse it, and what changed, in plain words. */
  function applyRules(it) {
    var t = textOf(it), changed = [];
    for (var i = 0; i < BLOCK.length; i++) if (BLOCK[i].test(t)) return { item: it, blocked: true, changed: changed };
    if (isKids(it)) {
      if (it.vis !== 'private') { it.vis = 'private'; changed.push('Anything involving children stays private.'); }
      if (it.photos.length) { it.photos = []; changed.push('Photos are never kept on posts involving children.'); }
      it.kids = true;
    } else it.kids = false;
    if (isCompanion(it)) {
      if (it.money !== 'free') { it.money = 'free'; it.min = it.ideal = it.max = 0; it.sliding = false; changed.push('Companionship is always free here, so it can’t become a paid date.'); }
      if (it.photos.length) { it.photos = []; changed.push('Companionship posts don’t carry photos.'); }
      it.companion = true;
    } else { it.companion = false; it.dating = false; }
    if (it.photos.length && !it.noPeople) { it.photos = []; changed.push('Photos were left off: tick “No people in these photos” to keep them.'); }
    return { item: it, blocked: false, changed: changed };
  }
  var HOTLINE = 'If someone is being forced, tricked, or sold for sex or work, the National Human Trafficking Hotline is 1-888-373-7888, or text 233733. In an emergency, call 911.';

  /* ---------- place and distance (no map, ever) ---------- */
  function round2(x) { return Math.round(x * 100) / 100; }   /* 0.01° is about 1 km: close enough to plan a trip, too coarse to find a door */
  function areaOf(name) { for (var i = 0; i < AREAS.length; i++) if (AREAS[i][0] === name) return AREAS[i]; return null; }
  function here() {
    var p = S.place;
    if (p.lat != null && p.lng != null) return { lat: p.lat, lng: p.lng };
    var a = areaOf(p.area); return a ? { lat: a[1], lng: a[2] } : null;
  }
  function hash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  /* A post's spot: its neighborhood's centre plus a fixed nudge of up to ~0.3 miles, the same every time. */
  function spot(it) {
    var a = areaOf(it.area), c = a ? { lat: a[1], lng: a[2] } : (it.mine ? here() : null);
    if (!c) return null;
    var h = hash(it.id || it.title), ang = (h % 360) * Math.PI / 180, dist = 0.08 + ((h >>> 9) % 100) / 100 * 0.22;
    return { lat: c.lat + Math.cos(ang) * dist / 69, lng: c.lng + Math.sin(ang) * dist / (69 * Math.cos(c.lat * Math.PI / 180)) };
  }
  function miles(a, b) {
    var R = 3958.8, r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
    var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  function distOf(it) { var h = here(), s = spot(it); return h && s ? miles(h, s) : null; }
  /* Shown in 0.1-mile steps; anything closer than that reads "~2 blocks". */
  function distText(d) { return d == null ? '' : d < 0.1 ? '~2 blocks' : '~' + (d < 10 ? d.toFixed(1) : Math.round(d)) + ' mi'; }
  function valueOf(it) {
    if (it.value > 0) return it.value;
    var c = (it.crews || [])[0]; if (c && c.p) return c.p * (c.h || 1) * 25;
    if (it.time === 'limit') return (it.timeMax || 1) * 25;
    return 10;
  }
  var U_MULT = { today: 1.5, week: 1.2, whenever: 0.8, always: 0.8, custom: 1 }, P_MULT = { nice: 0.6, important: 1, essential: 1.8 }, L_MULT = { someday: 0.6, soon: 1, now: 1.8 };
  /* How many minutes, each way, this is worth to you: grows with the square root of its value, with how soon and how
     much it matters (for offers, how pressing your own matching need is), and shrinks when your time is tight. */
  function reachMin(it) {
    var u = 1, p = 0.8;
    if (it.type === 'offer' || it.type === 'found') {
      var mine = S.needs.filter(function (n) { return (it.needs || [it.need]).indexOf(n.need) > -1; })[0];
      if (mine) p = L_MULT[mine.level] || 1;
    } else { u = U_MULT[it.urgency] || 1; p = P_MULT[it.priority] || 1; }
    var m = 5 * Math.sqrt(1 + valueOf(it) / 5) * u * p / third(TIMEV, S.place.time);
    return Math.max(2, Math.min(90, m));
  }
  function speed() { return third(TRAVEL, S.place.travel); }
  function reachMi(it) { return reachMin(it) * speed() / 60; }
  function verdict(it) {
    var d = distOf(it); if (d == null) return null;
    var r = reachMi(it);
    return { d: d, r: r, min: reachMin(it), k: d <= r ? 'go' : d <= r * 1.6 ? 'stretch' : 'far' };
  }
  var VERDICT = { go: 'Worth the trip', stretch: 'A stretch', far: 'Probably too far' };
  function mins(m) { m = Math.round(m); return m < 60 ? m + ' min' : (Math.round(m / 15) / 4) + ' h'; }
  function travelWord() { return { walk: 'on foot', bike: 'by bike', transit: 'by bus or train', car: 'by car' }[S.place.travel]; }
  function clUrl(cat, query, it) {
    var p = S.place, q = ['query=' + encodeURIComponent(query || '')];
    if (p.zip) { q.push('postal=' + p.zip); q.push('search_distance=' + Math.max(1, Math.round(it ? reachMi(it) : 5))); }
    return 'https://' + (label(CL, p.cl) ? p.cl : 'sfbay') + '.craigslist.org/search/' + cat + '?' + q.join('&');
  }
  function ext(url, text) { return '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + text + '<span class="sr-only"> (opens Craigslist in a new tab)</span></a>'; }

  /* ---------- universal needs, from Emotions (rel-data.js) ---------- */
  function NEEDS() { return (window.MN_REL && window.MN_REL.NEEDS) || []; }
  function needDef(n) { var d = window.MN_REL && window.MN_REL.NEED_DEF; return (d && d[n]) || ''; }
  function groupOf(n) { var g = NEEDS().filter(function (g) { return g.items.indexOf(n) > -1; })[0]; return g ? g.name : 'Other'; }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- small builders ---------- */
  function opts(list, cur) { return list.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === cur ? ' selected' : '') + '>' + o[1] + '</option>'; }).join(''); }
  function seg(name, list, cur, legend, attr) {
    return '<fieldset class="lg-seg"><legend>' + legend + '</legend><div>' + list.map(function (o) {
      return '<label><input type="radio" name="' + name + '" value="' + o[0] + '"' + (o[0] === cur ? ' checked' : '') + (attr || '') + '><span>' + o[1] + '</span></label>';
    }).join('') + '</div></fieldset>';
  }
  function sec(id, title, body, n) {
    return '<section class="lg-sec" id="lg-' + id + '" aria-labelledby="lg-' + id + '-h"><div class="lg-sec-head">' + (n ? '<span class="lg-n">' + n + '</span>' : '') +
      '<h2 id="lg-' + id + '-h">' + title + '</h2></div>' + body + '</section>';
  }
  function note(tag, html) { return '<p class="lg-note"><span>' + tag + '</span> ' + html + '</p>'; }
  function delBtn(list, id, name) { return '<button type="button" class="lg-x" data-lg="del" data-list="' + list + '" data-id="' + id + '">Remove<span class="sr-only"> ' + esc(name) + '</span></button>'; }
  function hrs(h) { return h === 1 ? '1 h' : h + ' h'; }
  function crewText(it) {
    return (it.crews || []).map(function (c) { return (c.p === 1 ? '1 person' : c.p + ' people') + ' × ' + hrs(c.h || 1); }).join(' or ');
  }
  function tabs(cur) {
    return '<nav class="lg-tabs" aria-label="Local gifts">' + PAGES.map(function (p) {
      var c = count(p.id);
      return '<a href="#gifts' + (p.id ? '/' + p.id : '') + '"' + (p.id === cur ? ' aria-current="page"' : '') + '>' + p.name +
        (c ? ' <span class="lg-count">' + c + '<span class="sr-only"> ' + (p.id === 'inbox' ? 'new' : 'open') + '</span></span>' : '') + '</a>';
    }).join('') + '</nav>';
  }
  function count(id) {
    if (id === 'mine') return S.items.filter(function (i) { return i.status === 'open'; }).length;
    if (id === 'inbox') return S.inbox.filter(function (m) { return m.status === 'new'; }).length;
    if (id === 'needs') return S.needs.length;
    if (id === 'skills') return S.skills.length + S.langs.length + S.cando.length;
    return 0;
  }
  function hero(title, lede) {
    return '<div class="lg-hero"><span class="lg-pill">Beta · Local gifts</span><h1 tabindex="-1">' + title + '</h1><p class="lg-lede">' + lede + '</p></div>';
  }
  function beta(extra) {
    return '<p class="lg-beta" role="note"><b>Beta.</b> ' + (extra || 'Your gift profile is saved only on this device, and matching isn’t running yet. Fill it in now and it’s ready when your circle starts.') + '</p>';
  }

  /* ---------- spreadsheet pieces ---------- */
  /* Selected rows, per table, kept until you leave the page. */
  var SEL = { board: {}, mine: {}, inbox: {} };
  function selCount(t) { return Object.keys(SEL[t]).filter(function (k) { return SEL[t][k]; }).length; }
  function selBox(t, id, name) {
    return '<td class="lg-c-sel"><input type="checkbox" data-lg-sel="' + t + '" value="' + esc(id) + '"' + (SEL[t][id] ? ' checked' : '') + ' aria-label="Select ' + esc(name) + '"></td>';
  }
  function selAll(t, ids) {
    var n = ids.filter(function (id) { return SEL[t][id]; }).length;
    return '<th scope="col" class="lg-c-sel"><input type="checkbox" data-lg-selall="' + t + '" data-ids="' + esc(ids.join(' ')) + '"' + (n && n === ids.length ? ' checked' : '') +
      (n && n < ids.length ? ' data-mixed="1"' : '') + ' aria-label="Select all rows"></th>';
  }
  /* Sortable column header: a button inside the th, with aria-sort on the th. */
  var SORT = { board: { k: '', dir: 1 }, mine: { k: 'made', dir: -1 }, inbox: { k: 'received', dir: -1 } };
  function th(t, k, text, cls) {
    var s = SORT[t], on = s.k === k;
    return '<th scope="col"' + (cls ? ' class="' + cls + '"' : '') + (on ? ' aria-sort="' + (s.dir > 0 ? 'ascending' : 'descending') + '"' : '') + '>' +
      (k ? '<button type="button" class="lg-sort" data-lg-sort="' + t + '" data-k="' + k + '">' + text + '<span aria-hidden="true">' + (on ? (s.dir > 0 ? ' ▲' : ' ▼') : ' ↕') + '</span></button>' : text) + '</th>';
  }
  function sortRows(t, rows, keyFn) {
    var s = SORT[t]; if (!s.k) return rows;
    return rows.slice().sort(function (a, b) {
      var x = keyFn(a, s.k), y = keyFn(b, s.k);
      if (x == null) x = Infinity; if (y == null) y = Infinity;
      return (x < y ? -1 : x > y ? 1 : 0) * s.dir;
    });
  }
  function densityCtl() { return seg('lg-density', DENSITY, S.ui.density, 'Density', ' data-lg-density="1"'); }
  function tableWrap(label_, inner) {
    return '<div class="lg-sheet' + (S.ui.density === 'compact' ? ' is-compact' : '') + '" role="region" aria-label="' + esc(label_) + ', scrolls sideways" tabindex="0"><table class="lg-tbl">' + inner + '</table></div>';
  }
  /* "…" with the rest on hover, focus, or tap, without leaving the page. The full text is also in the cell for screen readers. */
  function more(title, html, plain) {
    if (!html) return '';
    return '<span class="lg-more"><button type="button" class="lg-dots" data-lg="pop" aria-label="More about ' + esc(title) + '">…</button>' +
      '<template>' + html + '</template></span>' + (plain ? '<span class="sr-only"> ' + esc(plain) + '</span>' : '');
  }
  function snippet(s, n) { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n).replace(/\s\S*$/, '') : s; }
  function urgText(it) { return (it.urgency === 'custom' ? esc(it.urgencyCustom || 'Other') : label(URGENCY, it.urgency)) + (it.urgency !== 'always' ? ' <small>' + (it.strict === 'only' ? 'only' : 'preferred') + '</small>' : ''); }
  function recurText(it) { return it.recur === 'custom' ? esc(it.recurCustom || 'Other') : label(RECUR, it.recur); }
  function timeText(it) {
    if (it.time === 'always') return 'Always available';
    if (it.time === 'limit') return 'Up to ' + hrs(it.timeMax) + (crewText(it) ? '<br><small>' + crewText(it) + '</small>' : '');
    return 'None' + (it.type === 'offer' ? ' (pickup)' : '');
  }
  function needsText(it) { return (it.needs || []).map(function (n) { return '<span class="lg-need">' + esc(n) + '</span>'; }).join(' ') || '<span class="lg-opt">—</span>'; }
  function moneyCell(it, mine) {
    if (it.moneyHidden && !mine) return '<span class="lg-opt">—</span><span class="sr-only">Not shown</span>';
    var m = '<span class="lg-money m-' + it.money + '">' + MONEY_SHORT[it.money] + '</span>';
    if (!mine || it.money === 'free') return m;
    var parts = [];
    if (it.min) parts.push('lowest ' + money(it.min));
    if (it.ideal) parts.push('ideal ' + money(it.ideal));
    if (it.max) parts.push('up to ' + money(it.max));
    if (it.sliding) parts.push('sliding scale');
    return m + (parts.length ? '<br><small>' + parts.join(' · ') + '</small>' : '') + (it.moneyHidden ? '<br><small>hidden on the Board</small>' : '');
  }
  /* The notes pop-up: the long note, how big it is, photos the poster made public, and what it also meets. */
  function popHtml(it, mine) {
    var bits = [];
    if (it.notes) bits.push('<p>' + esc(it.notes) + '</p>');
    var mag = [crewText(it), it.amount, it.serves ? 'Enough for up to ' + it.serves + (it.serves === 1 ? ' person' : ' people') + (it.split ? ', can be split' : '') : ''].filter(Boolean);
    if (mag.length) bits.push('<p><b>How big:</b> ' + esc(mag.join(' · ')) + '</p>');
    if (it.priority && it.type === 'request') bits.push('<p><b>How much it matters:</b> ' + label(PRIORITY, it.priority) + '</p>');
    if (it.also) bits.push('<p><b>Also meets ' + (mine ? 'your' : 'their') + ' need:</b> ' + esc(it.also) + (it.alsoNote ? '. ' + esc(it.alsoNote) : '') + '</p>');
    var ph = it.photos || [];
    if (ph.length && (mine || it.photoShare === 'public')) bits.push('<div class="lg-pop-ph">' + ph.map(function (u, i) { return '<img src="' + u + '" alt="Photo ' + (i + 1) + ' of ' + esc(it.title) + '">'; }).join('') + '</div>');
    else if (it.photoShare === 'request' && ph.length) bits.push('<p><b>Photo:</b> on request</p>');
    else if (it.photoShare === 'match' && ph.length) bits.push('<p><b>Photo:</b> shared once you’re matched</p>');
    if (mine && it.address) bits.push('<p><b>Address (private):</b> ' + esc(it.address) + '</p>');
    if (mine && it.moneyNotes) bits.push('<p><b>Money, in your words (private):</b> ' + esc(it.moneyNotes) + '</p>');
    return bits.join('');
  }

  /* ---------- the Board ---------- */
  function boardItems() {
    var a = [];
    S.items.forEach(function (p) { if (p.vis === 'public' && p.status === 'open') a.push({ it: Object.assign({ mine: true }, p), who: 'yours' }); });
    S.found.forEach(function (f) { a.push({ it: Object.assign({ type: 'found', mine: true, needs: f.need ? [f.need] : [], urgency: 'whenever', recur: 'once', time: 'none', money: 'free' }, f), who: 'found' }); });
    EXAMPLES.forEach(function (x) { a.push({ it: cleanItem(Object.assign({}, x)), who: 'example' }); });
    a.forEach(function (x) { x.d = distOf(x.it); x.v = verdict(x.it); });
    return a;
  }
  var F = { money: true, type: '', q: '', areas: [], within: 0, urgency: '', saved: false, showHidden: false };
  function filtered() {
    var q = F.q.toLowerCase();
    return boardItems().filter(function (x) {
      var p = x.it;
      if (!F.money && p.money !== 'free') return false;
      if (F.type && p.type !== F.type) return false;
      if (F.urgency && p.urgency !== F.urgency) return false;
      if (F.areas.length && F.areas.indexOf(p.area) < 0) return false;
      if (F.within && (x.d == null || x.d > F.within)) return false;
      if (F.saved && S.saved.indexOf(p.id) < 0) return false;
      if (!F.showHidden && S.hidden.indexOf(p.id) > -1) return false;
      if (q && (p.title + ' ' + (p.needs || []).join(' ') + ' ' + (p.notes || '')).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
  }
  function boardKey(x, k) {
    var p = x.it;
    return { money: rank(MONEY, p.money), type: p.type, title: p.title.toLowerCase(), needs: (p.needs[0] || '~'), area: x.d,
      urgency: rank(URGENCY, p.urgency), recur: rank(RECUR, p.recur), time: p.time === 'none' ? 0 : p.time === 'limit' ? p.timeMax : 99 }[k];
  }
  function pBoard() {
    var rows = filtered();
    rows = SORT.board.k ? sortRows('board', rows, boardKey) : rows.sort(function (a, b) {
      return (rank(URGENCY, a.it.urgency) - rank(URGENCY, b.it.urgency)) || ((a.d == null ? 99 : a.d) - (b.d == null ? 99 : b.d));
    });
    var ids = rows.map(function (x) { return x.it.id; }), nSel = selCount('board');
    var head = '<thead><tr>' + selAll('board', ids) +
      '<th scope="col" class="lg-c-money"' + (SORT.board.k === 'money' ? ' aria-sort="' + (SORT.board.dir > 0 ? 'ascending' : 'descending') + '"' : '') + '><label class="lg-th-check"><input type="checkbox" data-lg-filter="money"' + (F.money ? ' checked' : '') + '> Money</label>' +
        '<button type="button" class="lg-sort lg-sort-mini" data-lg-sort="board" data-k="money" aria-label="Sort by money"><span aria-hidden="true">↕</span></button></th>' +
      th('board', 'type', 'Type') + th('board', 'title', 'Summary', 'lg-c-sum') + th('board', 'needs', 'Needs it meets') + th('board', 'area', 'Where') +
      th('board', 'urgency', 'Urgency') + th('board', 'recur', 'Repeats') + th('board', 'time', 'Time') + '<th scope="col" class="lg-c-notes">Notes</th></tr></thead>';
    var body = rows.map(function (x) {
      var p = x.it, saved = S.saved.indexOf(p.id) > -1, hidden = S.hidden.indexOf(p.id) > -1;
      var badge = x.who === 'example' ? '<span class="lg-ex">Example</span>' : x.who === 'found' ? '<span class="lg-ex">Your find</span>' : '<span class="lg-ex">Yours</span>';
      var where = (p.mine && S.place.shown === 'hidden') ? '' : (p.mine && S.place.shown === 'band') ? '' : esc(p.area);
      var dist = x.d != null ? distText(x.d) : '';
      var pop = popHtml(p, x.who !== 'example');
      return '<tr class="t-' + p.type + (hidden ? ' is-hidden' : '') + (x.v ? ' v-' + x.v.k : '') + '">' + selBox('board', p.id, p.title) +
        '<td>' + moneyCell(p, false) + '</td>' +
        '<td><span class="lg-type">' + (p.type === 'found' ? 'Found' : label(TYPE, p.type)) + '</span></td>' +
        '<th scope="row" class="lg-c-sum">' + (saved ? '<span class="lg-star" aria-label="Starred">★</span> ' : '') + esc(p.title) + ' ' + badge +
          (p.type === 'found' && p.link ? '<br><small>' + ext(p.link, 'Open the listing') + '</small>' : '') + (hidden ? ' <small>(hidden)</small>' : '') + '</th>' +
        '<td>' + needsText(p) + '</td>' +
        '<td>' + (where || dist ? (where ? where + '<br>' : '') + '<small>' + (dist || '') + (x.v ? ' · ' + VERDICT[x.v.k].toLowerCase() : '') + '</small>' : '<span class="lg-opt">—</span>') + '</td>' +
        '<td>' + urgText(p) + '</td><td>' + recurText(p) + '</td><td>' + timeText(p) + '</td>' +
        '<td class="lg-c-notes">' + (pop ? '<span class="lg-snip">' + esc(snippet(p.notes || p.amount || 'Details', 28)) + '</span>' + more(p.title, pop, p.notes) : '<span class="lg-opt">—</span>') + '</td></tr>';
    }).join('');
    var areaBoxes = function (east) {
      return AREAS.filter(function (a) { return !!a[3] === east; }).map(function (a) {
        return '<label class="lg-check"><input type="checkbox" data-lg-area="' + esc(a[0]) + '"' + (F.areas.indexOf(a[0]) > -1 ? ' checked' : '') + '><span>' + esc(a[0]) + '</span></label>';
      }).join('');
    };
    return hero('Board', 'Public requests and offers near you, as a spreadsheet. Sort any column, tick rows to star or hide them, and hover or tap the … for the full note and photos. Never a map, never a name.') +
      beta('The Board shows your own public posts, your Craigslist finds (both on this device), and labelled examples. Posts from your circle appear once the pilot starts.') +
      placePanel() +
      '<form class="lg-filters" aria-label="Filter the Board" onsubmit="return false">' +
        '<label class="lg-grow">Search<input type="search" data-lg-filter="q" value="' + esc(F.q) + '" placeholder="whisk, moving, warmth…"></label>' +
        '<label>Show<select data-lg-filter="type"><option value="">Requests and offers</option>' + opts(TYPE.concat([['found', 'My finds']]), F.type) + '</select></label>' +
        '<label>Urgency<select data-lg-filter="urgency"><option value="">Any</option>' + opts(URGENCY.slice(0, 4), F.urgency) + '</select></label>' +
        '<label>Within<span class="lg-range"><input type="range" min="0" max="10" step="0.1" value="' + F.within + '" data-lg-filter="within" aria-valuetext="' + (F.within ? F.within + ' miles' : 'Any distance') + '"><output>' + (F.within ? '~' + F.within.toFixed(1) + ' mi' : 'Any distance') + '</output></span></label>' +
        '<details class="lg-areas"' + (F.areas.length ? ' open' : '') + '><summary>Neighborhoods' + (F.areas.length ? ' (' + F.areas.length + ')' : ': all') + '</summary>' +
          '<fieldset><legend>San Francisco</legend><div>' + areaBoxes(false) + '</div></fieldset><fieldset><legend>Nearby</legend><div>' + areaBoxes(true) + '</div></fieldset>' +
          (F.areas.length ? '<button type="button" class="lg-btn lg-quiet" data-lg="areas-clear">Clear neighborhoods</button>' : '') + '</details>' +
        '<label class="lg-check"><input type="checkbox" data-lg-filter="saved"' + (F.saved ? ' checked' : '') + '><span>Starred only</span></label>' +
        '<label class="lg-check"><input type="checkbox" data-lg-filter="showHidden"' + (F.showHidden ? ' checked' : '') + '><span>Show hidden rows</span></label>' +
      '</form>' +
      '<div class="lg-sheet-bar">' + densityCtl() +
        '<div class="lg-bulk" role="group" aria-label="With selected rows"><span class="lg-showing" role="status">' + rows.length + (rows.length === 1 ? ' post' : ' posts') + (nSel ? ' · ' + nSel + ' selected' : '') + '</span>' +
          '<button type="button" class="lg-btn lg-quiet" data-lg="bulk" data-t="board" data-do="star"' + (nSel ? '' : ' disabled') + '>★ Star</button>' +
          '<button type="button" class="lg-btn lg-quiet" data-lg="bulk" data-t="board" data-do="unstar"' + (nSel ? '' : ' disabled') + '>Unstar</button>' +
          '<button type="button" class="lg-btn lg-quiet" data-lg="bulk" data-t="board" data-do="hide"' + (nSel ? '' : ' disabled') + '>Hide</button>' +
          '<button type="button" class="lg-btn lg-quiet" data-lg="bulk" data-t="board" data-do="unhide"' + (nSel ? '' : ' disabled') + '>Unhide</button>' +
          '<button type="button" class="lg-btn" disabled>I can help</button><span class="lg-opt">Responding opens with the pilot circle.</span></div></div>' +
      (rows.length ? tableWrap('Board', head + '<tbody>' + body + '</tbody>') : '<p class="lg-empty">Nothing matches these filters.</p>') +
      note('Money', 'Untick Money in the first column to see only free posts. Prices are never on the Board, so nothing turns into a bidding war; amounts stay between each poster and the matchmaker.') +
      note('Fair shares', 'Once the circle runs, posts from people who’ve had the least help so far rise to the top, so everyone gets some help before anyone gets all of it.') +
      sec('cl', 'Free on Craigslist too',
        '<p>Search Craigslist’s free section without leaving your need behind. Kinship opens the search for you instead of scanning Craigslist, because Craigslist’s terms don’t allow automated scanning. With a ZIP set, the search distance is how far the thing is worth going.</p>' +
        '<form class="lg-form lg-inline" action="https://' + (label(CL, S.place.cl) ? S.place.cl : 'sfbay') + '.craigslist.org/search/zip" method="get" target="_blank" rel="noopener">' +
          '<label class="lg-wide">Look for<input type="text" name="query" maxlength="80" placeholder="e.g. whisk, watering tank, moving boxes"></label>' +
          (S.place.zip ? '<input type="hidden" name="postal" value="' + esc(S.place.zip) + '"><label>Within, miles<input type="number" name="search_distance" min="1" max="60" value="' + Math.max(1, Math.round(5 * speed() / 9)) + '" inputmode="numeric"></label>' : '') +
          '<button class="lg-btn" type="submit">Search Craigslist free<span class="sr-only"> (opens in a new tab)</span></button>' +
        '</form>' +
        '<h3>Found something? Add it to your Board</h3>' +
        '<p>Jot down a listing in your own words to weigh it next to everything else. It’s a note for you: it stays on this device, is never shown to anyone, and fades after two weeks.</p>' +
        '<form class="lg-form" data-lg-form="found">' +
          '<label class="lg-wide">What it is, in your words<input type="text" name="title" maxlength="100" required placeholder="e.g. steel garden tank, big"></label>' +
          '<div class="lg-row"><label>Where<select name="area"><option value="">Not sure</option>' + AREAS.map(function (a) { return '<option>' + esc(a[0]) + '</option>'; }).join('') + '</select></label>' +
          '<label>Worth, about $<input type="number" name="value" min="0" max="100000" step="1" inputmode="numeric" placeholder="e.g. 200"></label>' +
          '<label>Meets<select name="need"><option value="">Not sure</option>' + needOptions('') + '</select></label></div>' +
          '<label class="lg-wide">Link <span class="lg-opt">(optional)</span><input type="url" name="link" maxlength="300" placeholder="https://…craigslist.org/…"></label>' +
          '<button class="lg-btn" type="submit">Add to my Board</button>' +
        '</form>') +
      '<p class="lg-row"><a class="lg-btn lg-link" href="#gifts/post">Post a request or offer</a></p>';
  }
  function needOptions(cur) { var o = ''; NEEDS().forEach(function (g) { o += '<optgroup label="' + esc(g.name) + '">' + g.items.map(function (n) { return '<option value="' + esc(n) + '"' + (n === cur ? ' selected' : '') + '>' + esc(cap(n)) + '</option>'; }).join('') + '</optgroup>'; }); return o; }

  var placeOpen = false;
  function placePanel() {
    var p = S.place, set = !!here();
    var areaOpts = '<option value="">Choose a neighborhood</option>' + AREAS.map(function (a) { return '<option' + (a[0] === p.area ? ' selected' : '') + '>' + esc(a[0]) + '</option>'; }).join('');
    return '<details class="lg-place"' + (set && !placeOpen ? '' : ' open') + '><summary><b>Your place and privacy</b> <span>' +
      (set ? esc(p.lat != null ? 'Near you, rounded to about 1 km' : p.area) + ' · ' + label(TRAVEL, p.travel) + ' · others see ' + label(SHOWN, p.shown).toLowerCase() : 'Not set yet: add it to see distances') + '</span></summary>' +
      '<div class="lg-place-in">' +
        '<div class="lg-row"><label>Neighborhood<select data-lg-place="area">' + areaOpts + '</select></label>' +
        '<button type="button" class="lg-btn lg-quiet" data-lg="locate">Use my location, rounded</button>' +
        (p.lat != null ? '<button type="button" class="lg-btn lg-quiet" data-lg="unlocate">Forget my location</button>' : '') + '</div>' +
        '<p class="lg-opt">Your location is rounded to about a kilometre (0.01°) before it’s saved, and only on this device. Distances show in 0.1-mile steps from that rounded spot. There’s no map, so nobody’s door can be picked out.</p>' +
        seg('pl-travel', TRAVEL, p.travel, 'How you usually get around') +
        seg('pl-time', TIMEV, p.time, 'How much time trips can take right now') +
        seg('pl-shown', SHOWN, p.shown, 'On your public posts, others see') +
        '<div class="lg-row"><label>ZIP code <span class="lg-opt">(optional, for Craigslist searches)</span><input type="text" inputmode="numeric" maxlength="5" pattern="[0-9]{5}" data-lg-place="zip" value="' + esc(p.zip) + '"></label>' +
        '<label>Craigslist site<select data-lg-place="cl">' + opts(CL, p.cl) + '</select></label></div>' +
      '</div></details>';
  }

  /* ---------- Post: one form for requests and offers ---------- */
  var draftPhotos = [];
  var editingId = '';
  function blankItem() { return cleanItem({ type: 'request', area: S.place.area, vis: 'public', money: 'free', photoShare: 'match' }); }
  function pPost(sub) {
    var it = (sub && S.items.filter(function (x) { return x.id === sub; })[0]) || null;
    if ((it ? it.id : '') !== editingId) { draftPhotos = it ? it.photos.slice() : []; editingId = it ? it.id : ''; }
    it = it || blankItem();
    var needBoxes = NEEDS().map(function (g) {
      return '<fieldset class="lg-ng"><legend>' + esc(g.name) + '</legend><div>' + g.items.map(function (n) {
        return '<label class="lg-nb"><input type="checkbox" name="needs" value="' + esc(n) + '"' + (it.needs.indexOf(n) > -1 ? ' checked' : '') + '><span>' + esc(cap(n)) + '</span></label>';
      }).join('') + '</div></fieldset>';
    }).join('');
    var known = {}; NEEDS().forEach(function (g) { g.items.forEach(function (n) { known[n] = 1; }); });
    var custom = it.needs.filter(function (n) { return !known[n]; }).join(', ');
    var crews = [0, 1, 2].map(function (i) {
      var c = it.crews[i] || { p: '', h: '' };
      return '<div class="lg-crew-row"><label>People<input type="number" name="crewP' + i + '" min="0" max="50" step="1" inputmode="numeric" value="' + (c.p || '') + '"></label>' +
        '<span aria-hidden="true">×</span><label>Hours each<input type="number" name="crewH' + i + '" min="0" max="24" step="0.25" inputmode="decimal" value="' + (c.h || '') + '"></label></div>';
    }).join('');
    return hero(editingId ? 'Edit post' : 'Post', 'One request or one offer at a time, bite-sized. The top half is what the Board can show; the bottom half stays between you and the matchmaker.') + beta() +
      '<form class="lg-form lg-postform" data-lg-form="item" novalidate>' +
        '<div class="lg-alert" role="alert" id="lg-alert" hidden></div>' +
        sec('pub', 'What the Board can show',
          seg('type', TYPE, it.type, 'This is a') +
          '<label class="lg-wide">Summary<input type="text" name="title" maxlength="100" required value="' + esc(it.title) + '" placeholder="e.g. whisk, dog walker one time, 2 people to carry a couch"></label>' +
          '<details class="lg-needpick" open><summary>Needs it meets <span class="lg-opt">(up to 3)</span> <output class="lg-ncount">' + it.needs.length + ' of 3</output></summary>' + needBoxes +
            '<label class="lg-wide">Your own words <span class="lg-opt">(optional; separate with commas, counts toward the 3)</span><input type="text" name="needCustom" maxlength="80" value="' + esc(custom) + '" placeholder="e.g. food sovereignty"></label></details>' +
          '<label>Neighborhood <span class="lg-opt">(never an address)</span><select name="area"><option value="">Leave it off</option>' + AREAS.map(function (a) { return '<option' + (a[0] === it.area ? ' selected' : '') + '>' + esc(a[0]) + '</option>'; }).join('') + '</select></label>' +
          seg('urgency', URGENCY, it.urgency, 'Urgency') +
          '<label class="lg-ifcustom-u">Say when<input type="text" name="urgencyCustom" maxlength="40" value="' + esc(it.urgencyCustom) + '" placeholder="e.g. before Nov 15, weekends"></label>' +
          seg('strict', STRICT, it.strict, 'Is that timing') +
          '<div class="lg-ifreq">' + seg('priority', PRIORITY, it.priority, 'How much it matters') + '</div>' +
          seg('recur', RECUR, it.recur, 'Repeats') +
          '<label class="lg-ifcustom-r">Say how often<input type="text" name="recurCustom" maxlength="40" value="' + esc(it.recurCustom) + '" placeholder="e.g. every other Sunday"></label>' +
          seg('time', TIME, it.time, 'Time it takes') +
          '<label class="lg-iflimit">No more than<span class="lg-range"><input type="range" name="timeMax" min="0.25" max="12" step="0.25" value="' + it.timeMax + '"><output>' + hrs(it.timeMax) + '</output></span></label>' +
          '<label class="lg-wide">Notes <span class="lg-opt">(the … on the Board)</span><textarea name="notes" maxlength="1200" rows="4" placeholder="Size, condition, stairs, what to bring, your interests…">' + esc(it.notes) + '</textarea></label>' +
          '<fieldset class="lg-seg"><legend>Photos <span class="lg-opt">(up to 3; shrunk to save space)</span></legend>' +
            '<div class="lg-photos" id="lg-photos">' + photosHtml() + '</div>' +
            '<label class="lg-file"><span class="lg-btn lg-quiet">Add photos</span><input type="file" accept="image/*" multiple data-lg-photos="1" class="sr-only"></label>' +
            '<label class="lg-check"><input type="checkbox" name="noPeople"' + (it.noPeople ? ' checked' : '') + '><span><b>No people in these photos.</b> Local gifts never lists people, and photos of yourself aren’t the safest thing to post.</span></label>' +
          '</fieldset>', '1') +
        sec('priv', 'Private: only you and the matchmaker',
          seg('vis', VIS, it.vis, 'Who sees the post') +
          seg('photoShare', PHOTO, it.photoShare, 'Who sees the photos') +
          '<p class="lg-opt">“Matchmaker only” lets it spot reuse ideas without anyone else seeing: one person’s pallet is another’s vegetable box.</p>' +
          '<label class="lg-wide">Address <span class="lg-opt">(optional; shared only after both people say yes)</span><input type="text" name="address" maxlength="120" value="' + esc(it.address) + '" autocomplete="street-address"></label>' +
          seg('money', MONEY, it.money, 'Money') +
          '<p class="lg-opt lg-ifreq">For a request: free only, happy to pay, or you’d rather pay someone.</p><p class="lg-opt lg-ifoff">For an offer: a gift, a gift or pay, or paid work only.</p>' +
          '<div class="lg-ifmoney">' +
            '<label class="lg-check"><input type="checkbox" name="moneyHidden"' + (it.moneyHidden ? ' checked' : '') + '><span>Hide this on the Board (shows “—”)</span></label>' +
            '<div class="lg-row"><label>Lowest, $<input type="number" name="min" min="0" max="10000" step="1" inputmode="numeric" value="' + (it.min || '') + '"></label>' +
            '<label>Ideal, $<input type="number" name="ideal" min="0" max="10000" step="1" inputmode="numeric" value="' + (it.ideal || '') + '"></label>' +
            '<label>Up to, $<input type="number" name="max" min="0" max="10000" step="1" inputmode="numeric" value="' + (it.max || '') + '"></label></div>' +
            '<label class="lg-check"><input type="checkbox" name="sliding"' + (it.sliding ? ' checked' : '') + '><span>Sliding scale: anywhere in that range is fine</span></label>' +
            '<label class="lg-wide">Ideal money, in your own words <span class="lg-opt">(optional)</span><textarea name="moneyNotes" maxlength="1200" rows="3" placeholder="e.g. $20 is ideal; less is fine for someone short this month; I’d trade for produce">' + esc(it.moneyNotes) + '</textarea></label>' +
          '</div>' +
          '<p class="lg-opt">Amounts are never on the Board. The matchmaker uses them to pair people whose ranges fit, so there’s no bidding.</p>' +
          '<fieldset class="lg-seg"><legend>How big is it?</legend>' +
            '<p class="lg-opt">People and hours, as many ways as work: 4 people for 1 hour, or 2 for 2.</p>' + crews +
            '<label class="lg-wide">How much stuff <span class="lg-opt">(optional)</span><input type="text" name="amount" maxlength="80" value="' + esc(it.amount) + '" placeholder="e.g. 20 boxes and a mattress; 4 garbage bags"></label>' +
            '<div class="lg-ifoff lg-row"><label>Could meet the needs of up to<input type="number" name="serves" min="0" max="1000" step="1" inputmode="numeric" value="' + (it.serves || '') + '"></label>' +
              '<label class="lg-check"><input type="checkbox" name="split"' + (it.split ? ' checked' : '') + '><span>Can be split up</span></label></div>' +
            '<label>Worth about, $ <span class="lg-opt">(optional; sizes how far it’s worth going)</span><input type="number" name="value" min="0" max="100000" step="1" inputmode="numeric" value="' + (it.value || '') + '"></label>' +
          '</fieldset>' +
          '<fieldset class="lg-seg lg-ifoff"><legend>Does this also meet a need of yours? <span class="lg-opt">(optional)</span></legend><div class="lg-row">' +
            '<label>My need<select name="also"><option value="">Rather not say</option>' + needOptions(it.also) + '</select></label>' +
            '<label>Short note<input type="text" name="alsoNote" maxlength="60" value="' + esc(it.alsoNote) + '" placeholder="e.g. rent is due"></label></div></fieldset>' +
          '<label class="lg-check lg-ifcomp"><input type="checkbox" name="dating"' + (it.dating ? ' checked' : '') + '><span><b>Open to dating too.</b> Private. Used only if the other person said the same, and never shown to anyone.</span></label>', '2') +
        sec('rules', 'Safety rules for every post',
          '<ul class="lg-ul">' +
            '<li><b>People are never listed.</b> Posts are for things, time, skills, and space. Posts that read like ads for people, or for sex, aren’t saved, and the matchmaker checks every post again before it goes anywhere.</li>' +
            '<li><b>Companionship is welcome and always free.</b> Tea, a walk, a hello. It can’t be paid and doesn’t carry photos, so it can’t turn into a paid date. Sharing your interests in the note helps the right neighbor find you.</li>' +
            '<li><b>Children stay private.</b> Anything involving kids, like babysitting or a garden lesson, is never on the Board and never has photos. Parents post, never kids, and it’s matched only with helpers who have at least 3 gifts confirmed by the other person, one of them confirmed by a parent.</li>' +
          '</ul>', '3') +
        '<div class="lg-row"><button class="lg-btn" type="submit">' + (editingId ? 'Save changes' : 'Post it') + '</button>' +
        (editingId ? '<a class="lg-btn lg-quiet lg-link" href="#gifts/mine">Cancel</a>' : '') + '</div>' +
      '</form>';
  }
  function photosHtml() {
    return draftPhotos.map(function (u, i) {
      return '<span class="lg-ph"><img src="' + u + '" alt="Photo ' + (i + 1) + '"><button type="button" data-lg="ph-del" data-i="' + i + '" aria-label="Remove photo ' + (i + 1) + '">×</button></span>';
    }).join('') || '<span class="lg-opt">No photos yet.</span>';
  }
  /* Shrinks a photo to 800px on its long side as a JPEG, so a few fit on the device. */
  function shrink(file, done) {
    var r = new FileReader();
    r.onload = function () {
      var img = new Image();
      img.onload = function () {
        var k = Math.min(1, 800 / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        done(c.toDataURL('image/jpeg', 0.72));
      };
      img.onerror = function () { done(''); };
      img.src = r.result;
    };
    r.onerror = function () { done(''); };
    r.readAsDataURL(file);
  }
  function readItemForm(f) {
    var v = function (name) { var el = f.elements[name]; if (!el) return ''; if (el.type === 'checkbox') return el.checked; return String(el.value || '').trim(); };
    var needs = Array.prototype.slice.call(f.querySelectorAll('input[name="needs"]:checked')).map(function (x) { return x.value; });
    v('needCustom').split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean).forEach(function (s) { if (needs.indexOf(s) < 0) needs.push(s); });
    var crews = [0, 1, 2].map(function (i) { return { p: v('crewP' + i), h: v('crewH' + i) }; });
    var rv = function (name) { var c = f.querySelector('input[name="' + name + '"]:checked'); return c ? c.value : ''; };
    return {
      type: rv('type'), title: v('title'), needs: needs.slice(0, 3), area: v('area'), urgency: rv('urgency'), urgencyCustom: v('urgencyCustom'), strict: rv('strict'),
      priority: rv('priority'), recur: rv('recur'), recurCustom: v('recurCustom'), time: rv('time'), timeMax: v('timeMax'), notes: v('notes'),
      photos: draftPhotos.slice(), photoShare: rv('photoShare'), noPeople: v('noPeople'), vis: rv('vis'), address: v('address'),
      money: rv('money'), moneyHidden: v('moneyHidden'), min: v('min'), ideal: v('ideal'), max: v('max'), sliding: v('sliding'), moneyNotes: v('moneyNotes'),
      crews: crews, amount: v('amount'), serves: v('serves'), split: v('split'), value: v('value'), also: v('also'), alsoNote: v('alsoNote'), dating: v('dating'), _needCount: needs.length
    };
  }

  /* ---------- My posts: your requests and offers, the capacity meter, and successes ---------- */
  var MULT = { once: 1, weekly: 4.3, monthly: 1, asneeded: 1, custom: 1 };
  function monthly(it) { return it.type === 'offer' && it.status === 'open' && it.time === 'limit' ? Math.round(it.timeMax * (MULT[it.recur] || 1) * 10) / 10 : 0; }
  /* Offers in your order; once the running total passes your cap, the rest pause (nobody is asked for them). */
  function capacity() {
    var cap_ = parseFloat(S.budget.hours) || 0, used = 0, fit = {}, paused = 0, total = 0;
    offersInOrder().forEach(function (o) {
      var h = monthly(o); total += h;
      if (!h) { fit[o.id] = true; return; }
      if (S.budget.mode === 'paused' || (cap_ && used + h > cap_)) { fit[o.id] = false; paused++; }
      else { fit[o.id] = true; used += h; }
    });
    return { cap: cap_, used: Math.round(used * 10) / 10, total: Math.round(total * 10) / 10, fit: fit, paused: paused };
  }
  function offersInOrder() { return S.items.filter(function (i) { return i.type === 'offer' && i.status === 'open'; }).sort(function (a, b) { return a.order - b.order; }); }
  function meterHtml() {
    var c = capacity(), pct = c.cap ? Math.min(100, c.used / c.cap * 100) : 0, over = c.cap && c.total > c.cap;
    return '<div class="lg-meter" id="lg-meter">' +
      '<div class="lg-meter-bar" aria-hidden="true"><i style="width:' + pct.toFixed(1) + '%"></i>' + (over ? '<b style="left:100%"></b>' : '') + '</div>' +
      '<p class="lg-meter-t" role="status"><b>' + (c.cap ? c.used + ' of ' + c.cap + ' hours a month' : c.total + ' hours a month, no cap set') + '</b>' +
        (S.budget.mode === 'paused' ? ' · everything paused' : c.paused ? ' · ' + c.paused + (c.paused === 1 ? ' offer paused' : ' offers paused') + ' over the cap (' + c.total + ' h listed)' : c.cap ? ' · everything fits' : '') + '</p></div>';
  }
  var VIEW = { mine: 'open', inbox: 'active' };
  function mineKey(it, k) {
    return { made: it.made, type: it.type, title: it.title.toLowerCase(), needs: it.needs[0] || '~', vis: it.vis, money: rank(MONEY, it.money), hours: monthly(it), status: it.status + (it.metAt || '') }[k];
  }
  function pMine() {
    var c = capacity(), view = VIEW.mine;
    var rows = S.items.filter(function (i) { return view === 'all' || (view === 'met' ? i.status === 'met' : i.status === 'open'); });
    rows = sortRows('mine', rows, mineKey);
    var ids = rows.map(function (i) { return i.id; }), nSel = selCount('mine'), order = offersInOrder().map(function (o) { return o.id; });
    var head = '<thead><tr>' + selAll('mine', ids) + th('mine', 'made', 'Posted') + th('mine', 'type', 'Type') + th('mine', 'title', 'Summary', 'lg-c-sum') + th('mine', 'needs', 'Needs') +
      th('mine', 'vis', 'Who sees') + th('mine', 'money', 'Money (private)') + th('mine', 'hours', 'Hours a month') + th('mine', 'status', 'Status') + '<th scope="col">Actions</th></tr></thead>';
    var body = rows.map(function (it) {
      var st = it.status === 'met' ? '<span class="lg-st st-met">✓ Met</span><br><small>' + when(it.metAt) + '</small>' :
        it.kids ? '<span class="lg-st st-kids">Open · trusted helpers only</span>' :
        it.type === 'offer' && c.fit[it.id] === false ? '<span class="lg-st st-paused">Paused: over your cap</span>' : '<span class="lg-st st-open">Open</span>';
      var oi = order.indexOf(it.id), pop = popHtml(it, true);
      return '<tr class="t-' + it.type + (it.status === 'met' ? ' is-met' : '') + '">' + selBox('mine', it.id, it.title) +
        '<td><time datetime="' + esc(it.made) + '">' + when(it.made) + '</time></td>' +
        '<td><span class="lg-type">' + label(TYPE, it.type) + '</span></td>' +
        '<th scope="row" class="lg-c-sum">' + esc(it.title) + (pop ? ' ' + more(it.title, pop, it.notes) : '') + (it.companion ? '<br><small>Companionship: free, no photos</small>' : '') + '</th>' +
        '<td>' + needsText(it) + '</td>' +
        '<td>' + (it.vis === 'public' ? 'Public' : 'Private') + (it.photos.length ? '<br><small>' + it.photos.length + ' photo' + (it.photos.length > 1 ? 's' : '') + ': ' + label(PHOTO, it.photoShare).toLowerCase() + '</small>' : '') + '</td>' +
        '<td>' + moneyCell(it, true) + '</td>' +
        '<td>' + (it.type === 'offer' ? (monthly(it) ? monthly(it) + ' h' : '<span class="lg-opt">—</span>') : '<span class="lg-opt">—</span>') + '</td>' +
        '<td>' + st + '</td>' +
        '<td class="lg-acts"><a class="lg-x" href="#gifts/post/' + esc(it.id) + '">Edit<span class="sr-only"> ' + esc(it.title) + '</span></a>' +
          (it.status === 'open' ? '<button type="button" class="lg-x" data-lg="met" data-id="' + esc(it.id) + '">Mark met<span class="sr-only"> ' + esc(it.title) + '</span></button>' :
            '<button type="button" class="lg-x" data-lg="reopen" data-id="' + esc(it.id) + '">Reopen<span class="sr-only"> ' + esc(it.title) + '</span></button>') +
          (oi > -1 ? '<button type="button" class="lg-x" data-lg="up" data-id="' + esc(it.id) + '"' + (oi === 0 ? ' disabled' : '') + ' aria-label="Move ' + esc(it.title) + ' up in your offers">↑</button>' +
            '<button type="button" class="lg-x" data-lg="down" data-id="' + esc(it.id) + '"' + (oi === order.length - 1 ? ' disabled' : '') + ' aria-label="Move ' + esc(it.title) + ' down in your offers">↓</button>' : '') +
        '</td></tr>';
    }).join('');
    var nOpen = S.items.filter(function (i) { return i.status === 'open'; }).length, nMet = S.items.length - nOpen;
    return hero('My posts', 'Every request and offer you’ve made, with when you posted it. Open ones are live; once a need is met it moves to Successes.') + beta() +
      sec('cap', 'Capacity: all your offers, capped from the top',
        '<p>Set one ceiling for every hour you offer in a month. Offers fill it in the order below (use ↑ and ↓ to choose what comes first); anything past the ceiling pauses until there’s room, and nobody is asked for it.</p>' +
        '<div class="lg-row"><label>Most hours a month, in all<span class="lg-range"><input type="range" min="0" max="40" step="0.5" value="' + (parseFloat(S.budget.hours) || 0) + '" data-lg-budget="hours" aria-valuetext="' + (S.budget.hours ? S.budget.hours + ' hours' : 'No cap') + '"><output>' + (S.budget.hours ? S.budget.hours + ' h' : 'No cap') + '</output></span></label>' +
        '<label>Right now I’m<select data-lg-budget="mode">' + opts(MODE, S.budget.mode) + '</select></label></div>' +
        meterHtml() +
        note('Example', 'Four hours a month could be helping one person move one week, or walking two dogs when a fosterer gets sick. It never means five hours of gardening and five of sewing and five of woodworking.'), '1') +
      sec('table', 'Requests and offers',
        '<div class="lg-sheet-bar">' + seg('lg-view-mine', [['open', 'Open (' + nOpen + ')'], ['met', 'Successes (' + nMet + ')'], ['all', 'All']], view, 'Show', ' data-lg-view="mine"') + densityCtl() + '</div>' +
        '<div class="lg-bulk" role="group" aria-label="With selected rows"><span class="lg-showing" role="status">' + (nSel ? nSel + ' selected' : 'Tick rows to act on several at once') + '</span>' +
          ['met:Mark met', 'reopen:Reopen', 'private:Make private', 'public:Make public', 'remove:Remove'].map(function (s) { var p = s.split(':'); return '<button type="button" class="lg-btn lg-quiet" data-lg="bulk" data-t="mine" data-do="' + p[0] + '"' + (nSel ? '' : ' disabled') + '>' + p[1] + '</button>'; }).join('') + '</div>' +
        (rows.length ? tableWrap('My posts', head + '<tbody>' + body + '</tbody>') : '<p class="lg-empty">' + (view === 'met' ? 'No successes yet. When a need is met, mark it, and it lands here.' : 'Nothing here yet.') + '</p>') +
        '<p class="lg-row"><a class="lg-btn lg-link" href="#gifts/post">Post a request or offer</a></p>', '2');
  }

  /* ---------- Inbox: possible matches (in Beta, between your posts and the examples) ---------- */
  var INB = [['new', 'New'], ['yes', 'Interested'], ['notnow', 'Not now'], ['met', 'Met']];
  function moneyFits(a, b) { return !((a.money === 'free' && b.money === 'only') || (a.money === 'only' && b.money === 'free')); }
  function overlap(a, b) {
    var shared = a.needs.filter(function (n) { return b.needs.indexOf(n) > -1; });
    return shared.length ? { needs: shared, why: 'Both meet ' + shared.join(' and ') } : null;
  }
  function refreshInbox() {
    var added = 0, mineIds = {};
    S.items.forEach(function (it) {
      mineIds[it.id] = 1;
      if (it.status !== 'open' || it.kids) return;
      EXAMPLES.forEach(function (x0) {
        var x = cleanItem(Object.assign({}, x0));
        if (x.type === it.type || !moneyFits(it, x) || !overlap(it, x)) return;
        if (S.inbox.some(function (m) { return m.mine === it.id && m.theirs === x.id; })) return;
        S.inbox.push({ id: uid(), mine: it.id, theirs: x.id, received: new Date().toISOString(), status: 'new' }); added++;
      });
    });
    var before = S.inbox.length;
    S.inbox = S.inbox.filter(function (m) { return mineIds[m.mine]; });
    if (added || before !== S.inbox.length) save();
  }
  function exById(id) { var x = EXAMPLES.filter(function (e) { return e.id === id; })[0]; return x ? cleanItem(Object.assign({}, x)) : null; }
  function inboxKey(r, k) {
    return { received: r.m.received, mine: r.mine.title.toLowerCase(), theirs: r.x.title.toLowerCase(), type: r.x.type, dist: r.d, money: rank(MONEY, r.x.money), status: rank(INB, r.m.status) }[k];
  }
  function pInbox() {
    refreshInbox();
    var view = VIEW.inbox;
    var rows = S.inbox.map(function (m) {
      var mine = S.items.filter(function (i) { return i.id === m.mine; })[0], x = exById(m.theirs);
      return mine && x ? { m: m, mine: mine, x: x, d: distOf(x), o: overlap(mine, x) || { needs: [], why: '' } } : null;
    }).filter(Boolean).filter(function (r) { return view === 'all' || (view === 'met' ? r.m.status === 'met' : r.m.status !== 'met'); });
    rows = sortRows('inbox', rows, inboxKey);
    var ids = rows.map(function (r) { return r.m.id; }), nSel = selCount('inbox');
    var head = '<thead><tr>' + selAll('inbox', ids) + th('inbox', 'received', 'Received') + th('inbox', 'mine', 'Your post') + th('inbox', 'theirs', 'Possible match', 'lg-c-sum') +
      th('inbox', 'type', 'Type') + '<th scope="col">Why</th>' + th('inbox', 'dist', 'Distance') + th('inbox', 'money', 'Money') + th('inbox', 'status', 'Status') + '</tr></thead>';
    var body = rows.map(function (r) {
      var pop = popHtml(r.x, false);
      return '<tr class="s-' + r.m.status + '">' + selBox('inbox', r.m.id, r.x.title) +
        '<td><time datetime="' + esc(r.m.received) + '">' + when(r.m.received) + '</time></td>' +
        '<td>' + esc(r.mine.title) + '<br><small>' + label(TYPE, r.mine.type) + '</small></td>' +
        '<th scope="row" class="lg-c-sum">' + esc(r.x.title) + ' <span class="lg-ex">Example</span>' + (pop ? ' ' + more(r.x.title, pop, r.x.notes) : '') + '</th>' +
        '<td>' + label(TYPE, r.x.type) + '</td>' +
        '<td>' + esc(r.o.why) + (r.x.also ? '<br><small>Also meets their ' + esc(r.x.also) + '</small>' : '') + '</td>' +
        '<td>' + (r.d != null ? distText(r.d) : '<span class="lg-opt">Set your place on the Board</span>') + '</td>' +
        '<td>' + moneyCell(r.x, false) + '</td>' +
        '<td><label class="sr-only" for="lg-st-' + r.m.id + '">Status for ' + esc(r.x.title) + '</label><select id="lg-st-' + r.m.id + '" data-lg-inbox="' + r.m.id + '">' + opts(INB, r.m.status) + '</select>' +
          (r.m.metAt ? '<br><small>' + when(r.m.metAt) + '</small>' : '') + '</td></tr>';
    }).join('');
    var nAct = S.inbox.filter(function (m) { return m.status !== 'met'; }).length, nMet = S.inbox.length - nAct;
    return hero('Inbox', 'Possible matches for your posts, privately, with when each one came in. You decide each one, and “Not now” needs no reason.') +
      beta('In Beta, the Inbox matches your posts against the example posts, so you can see how it works. Real matches come from your circle once the pilot starts.') +
      sec('table', 'Possible matches',
        '<div class="lg-sheet-bar">' + seg('lg-view-inbox', [['active', 'Open (' + nAct + ')'], ['met', 'Successes (' + nMet + ')'], ['all', 'All']], view, 'Show', ' data-lg-view="inbox"') + densityCtl() + '</div>' +
        '<div class="lg-bulk" role="group" aria-label="With selected rows"><span class="lg-showing" role="status">' + (nSel ? nSel + ' selected' : 'Tick rows to act on several at once') + '</span>' +
          ['yes:Interested', 'notnow:Not now', 'met:Mark met'].map(function (s) { var p = s.split(':'); return '<button type="button" class="lg-btn lg-quiet" data-lg="bulk" data-t="inbox" data-do="' + p[0] + '"' + (nSel ? '' : ' disabled') + '>' + p[1] + '</button>'; }).join('') + '</div>' +
        (rows.length ? tableWrap('Inbox', head + '<tbody>' + body + '</tbody>') : '<p class="lg-empty">' + (S.items.length ? 'No possible matches here yet.' : 'Post a request or offer, and possible matches land here.') + '</p>'), '1') +
      sec('rules', 'How introductions work',
        '<ul class="lg-ul">' +
          '<li>Each person sees a possible match on their own. Names, photos shared “only with a match”, and addresses are shared only after both say yes.</li>' +
          '<li>“Not now” needs no reason and doesn’t count against you.</li>' +
          '<li>Money ranges are matched privately: a free-only post is never matched with a money-only one, and nobody sees the other’s numbers.</li>' +
          '<li>Marking a match met moves it, and your post, to Successes.</li>' +
          '<li>For anything in a home, a first meeting somewhere public is always an option. If something goes wrong, it opens <a href="#gifts/repair">Repair</a>.</li>' +
        '</ul>', '2');
  }

  /* ---------- other pages ---------- */
  function pOverview() {
    var stale = S.updated && (Date.now() - new Date(S.updated).getTime()) > EXPIRE_DAYS * 864e5;
    var nOpen = S.items.filter(function (i) { return i.status === 'open'; }).length, nMet = S.items.length - nOpen, nNew = count('inbox');
    var cards = [
      ['board', 'Board', 'Public requests and offers, as a spreadsheet'],
      ['post', 'Post', 'A request or an offer, bite-sized'],
      ['mine', 'My posts', S.items.length ? nOpen + ' open · ' + nMet + ' successes' : 'Your posts, your capacity, and your successes'],
      ['inbox', 'Inbox', nNew ? nNew + ' new possible matches' : 'Possible matches, privately'],
      ['needs', 'My needs', S.needs.length ? S.needs.length + ' needs' : 'Which needs feel unmet'],
      ['skills', 'Skills', 'What you can do, teach, learn, and translate'],
      ['repair', 'Repair', 'When something goes wrong'],
      ['stats', 'Statistics', 'Open numbers on what gets matched'],
      ['sustain', 'Keep it running', 'Free for everyone; pay what you can'],
      ['how', 'How it works', 'The matchmaker, fairness, safety, and your data']
    ];
    return hero('Local gifts', 'Neighbors meeting each other’s needs, both ways. Post what would help and what you can give, as a gift, or for pay when you need it. A matchmaker suggests who might fit nearby, and introduces two people only when both say yes.') +
      beta() +
      (stale ? '<div class="lg-stale" role="status"><p>Your gift profile was last updated more than ' + EXPIRE_DAYS + ' days ago. Needs and free time change, so old entries pause until you look them over.</p><button type="button" class="lg-btn" data-lg="renew">Still true, renew it</button></div>' : '') +
      sec('steps', 'Three steps, and both people say yes',
        '<ol class="lg-steps">' +
          '<li><b>Post.</b> A request or an offer, public on the Board with no name or profile, or private, for the matchmaker only.</li>' +
          '<li><b>Get a possible match, or pick one.</b> They land in your Inbox. You can also browse the Board for a bite-sized need you’d gladly meet.</li>' +
          '<li><b>Both say yes, then meet.</b> Names, addresses, and private photos are shared only after both people say yes.</li>' +
        '</ol>') +
      '<div class="lg-cards">' + cards.map(function (c) {
        return '<a class="lg-card" href="#gifts/' + c[0] + '"><b>' + c[1] + '</b><span>' + c[2] + '</span><span class="lg-go" aria-hidden="true">→</span></a>';
      }).join('') + '</div>' +
      sec('why', 'Needs first, then strategies',
        '<p>A need is universal: food, warmth, learning, companionship. A strategy is one specific way to meet it: a whisk supports cooking for yourself (food and autonomy), a folding table at the right height supports a body without back pain (health). Many strategies can meet one need, so the matchmaker starts from the need and looks for strategies nobody thought to search for.</p>' +
        '<p>Your own needs count when you give, too. Someone who’d gladly walk your dog but has rent due next week can say money is OK and say why; when you can pay a little, that one match meets both of your needs.</p>' +
        '<p>The needs list is the one from <a href="#lens-emotions/need">Emotions → Identify the need</a>. Asking for what you’d like, without demanding it, is in <a href="#lens-relationships/request">Relationships → Request</a>.</p>');
  }

  function pNeeds() {
    var picked = {};
    S.needs.forEach(function (n) { picked[n.need] = true; });
    var groups = NEEDS().map(function (g) {
      return '<div class="lg-group"><h3>' + esc(g.name) + ' <small>' + esc(g.blurb) + '</small></h3><div class="lg-chips">' + g.items.map(function (n) {
        return '<button type="button" class="lg-chip" data-lg="need-toggle" data-need="' + esc(n) + '" aria-pressed="' + (picked[n] ? 'true' : 'false') + '">' + esc(cap(n)) + '</button>';
      }).join('') + '</div></div>';
    }).join('');
    var list = S.needs.map(function (n) {
      return '<li class="lg-item" data-id="' + n.id + '">' +
        '<div class="lg-item-head"><h3>' + esc(cap(n.need)) + ' <small>' + esc(groupOf(n.need)) + '</small></h3>' + delBtn('needs', n.id, n.need) + '</div>' +
        (needDef(n.need) ? '<p class="lg-def">' + esc(cap(needDef(n.need))) + '</p>' : '') +
        '<div class="lg-row">' +
          '<label>For <select data-lg-field="forWho">' + opts(FOR, n.forWho) + '</select></label>' +
          '<label>How pressing <select data-lg-field="level">' + opts(LEVEL, n.level) + '</select></label>' +
        '</div>' +
        '<label class="lg-check"><input type="checkbox" data-lg-field="private"' + (n.private ? ' checked' : '') + '><span><b>Extra private.</b> Met only through anonymous help, like a community fridge or a shared fund, so no one learns it was you.</span></label>' +
      '</li>';
    }).join('');
    return hero('My needs', 'The needs that feel unmet, for you or someone in your care, including animals and plants. The matchmaker reads these to find strategies you might not think to post.') + beta() +
      sec('pick', 'Which needs feel unmet?', '<p>Tap a need to add it; tap it again to take it off.</p>' + groups, '1') +
      sec('list', 'Your needs', S.needs.length ? '<ul class="lg-list">' + list + '</ul>' : '<p class="lg-empty">Nothing yet. Needs you tap above show up here.</p>', '2') +
      '<p class="lg-row"><a class="lg-btn lg-link" href="#gifts/post">Ask for something specific</a></p>';
  }

  function pSkills() {
    var skills = S.skills.map(function (k) {
      return '<li class="lg-item"><div class="lg-item-head"><h3>' + esc(k.name) + '</h3>' + delBtn('skills', k.id, k.name) + '</div>' +
        '<p class="lg-tags"><span>' + label(ROLE, k.role) + '</span>' + (k.need ? '<span>Meets ' + esc(k.need) + '</span>' : '') + '</p></li>';
    }).join('');
    var langs = S.langs.map(function (l) {
      return '<li class="lg-item"><div class="lg-item-head"><h3>' + esc(l.name) + '</h3>' + delBtn('langs', l.id, l.name) + '</div>' +
        '<p class="lg-tags"><span>' + label(FLUENCY, l.level) + '</span>' + (l.interpret ? '<span>Happy to interpret</span>' : '') + '</p></li>';
    }).join('');
    return hero('Skills', 'Everything you can do, what you’d like to learn or could teach, and the languages you speak. A skill you learn can become one you pass on.') + beta() +
      sec('cando', 'Things I can do',
        '<p>List everything you’re able to do, big or small. This isn’t a promise; your capacity in <a href="#gifts/mine">My posts</a> decides how much you’re asked. It can be good to see it all in one place.</p>' +
        '<form class="lg-form lg-inline" data-lg-form="cando"><label class="lg-wide">Something I can do<input type="text" name="name" maxlength="50" required placeholder="e.g. sewing, carrying heavy things, writing letters"></label><button class="lg-btn" type="submit">Add</button></form>' +
        '<div class="lg-ideas"><span>Ideas:</span>' + CANDO_IDEAS.map(function (i) { return '<button type="button" class="lg-idea" data-lg="cando-idea">' + i + '</button>'; }).join('') + '</div>' +
        (S.cando.length ? '<ul class="lg-chips lg-cando">' + S.cando.map(function (c, i) {
          return '<li><span>' + esc(c) + '</span><button type="button" data-lg="cando-del" data-i="' + i + '" aria-label="Remove ' + esc(c) + '">×</button></li>';
        }).join('') + '</ul>' : ''), '1') +
      sec('skills', 'Learn and teach',
        '<form class="lg-form" data-lg-form="skill">' +
          '<label class="lg-wide">Skill<input type="text" name="name" maxlength="80" required placeholder="e.g. bike repair, composting, sewing, Python"></label>' +
          seg('role', ROLE, 'learn', 'I’d like to') +
          '<label>Which need does it meet for you? <span class="lg-opt">(optional)</span><select name="need"><option value="">Not sure</option>' + needOptions('') + '</select></label>' +
          '<button class="lg-btn" type="submit">Add skill</button>' +
        '</form>' +
        (S.skills.length ? '<ul class="lg-list">' + skills + '</ul>' : '<p class="lg-empty">No skills yet.</p>'), '2') +
      sec('langs', 'Languages',
        '<form class="lg-form" data-lg-form="lang">' +
          '<label class="lg-wide">Language<input type="text" name="name" maxlength="40" required placeholder="e.g. Spanish, Cantonese, ASL"></label>' +
          seg('level', FLUENCY, 'well', 'How well') +
          '<label class="lg-check"><input type="checkbox" name="interpret"><span><b>Happy to interpret</b> between two neighbors who don’t share a language.</span></label>' +
          '<button class="lg-btn" type="submit">Add language</button>' +
        '</form>' +
        (S.langs.length ? '<ul class="lg-list">' + langs + '</ul>' : '<p class="lg-empty">No languages yet.</p>'), '3') +
      sec('chains', 'Teaching chains',
        '<div class="lg-chain" role="img" aria-label="A teacher and a learner, with an interpreter between them when they don’t share a language">' +
          '<span><b>Teacher</b><small>knows how</small></span><i aria-hidden="true">→</i><span class="mid"><b>Interpreter</b><small>if needed</small></span><i aria-hidden="true">→</i><span><b>Learner</b><small>wants to know</small></span>' +
        '</div>' +
        '<p>When a teacher and a learner don’t share a language, the matchmaker can invite a third neighbor who speaks both. Interpreting is a gift in its own right, and it gets counted that way in Statistics.</p>' +
        '<p>Once you’ve learned something, the matchmaker can suggest who you might teach next, so skills keep moving through the circle.</p>', '4');
  }

  function pRepair() {
    return hero('Repair', 'When a gift goes wrong, the aim is that nobody leaves feeling burned for good, and the next person in their shoes gets a heads-up.') +
      beta('Repair opens with the pilot circle. This page shows how it will work.') +
      sec('flag', 'Either person can flag it',
        '<p>From any match, either person can privately flag that something went wrong. Some common ones:</p>' +
        '<ul class="lg-ul"><li>Someone didn’t show up.</li><li>An item wasn’t as described, like furniture with bed bugs.</li><li>The task was much bigger than the post said.</li><li>Something felt off or unsafe.</li></ul>' +
        '<p>Flagging is never automatic punishment. Nobody is banned for one bad day.</p>', '1') +
      sec('steps', 'How repair works',
        '<ol class="lg-ol">' +
          '<li><b>Each side, privately.</b> A repair guide asks the person who flagged what happened, as gently as it can. Then it asks the other person for their side, before they meet anyone else’s needs again.</li>' +
          '<li><b>Talk it through, if both want to.</b> An optional conversation together, with the guide keeping it calm and on track. Nobody is made to join.</li>' +
          '<li><b>Something both can live with.</b> An apology, a fix (treating the furniture before the next gift), a clearer post next time, or a heads-up for the next person.</li>' +
        '</ol>' +
        note('The repair guide', 'An AI guided by transformative justice practice: responding to harm without punishment, and changing the conditions so it doesn’t happen again. It never decides who’s right, and it hands anything serious to people in the circle.'), '2') +
      sec('heads', 'Heads-ups, not bans',
        '<div class="lg-match" aria-label="Example heads-up"><span class="lg-ex">Example</span>' +
          '<p><b>Heads-up from past helpers:</b> two people said moves for this post ran about twice as long as listed. Plan for extra time, or bring a friend.</p></div>' +
        '<ul class="lg-ul">' +
          '<li>A heads-up shows only to the next person in the same role, like the next helper on a move.</li>' +
          '<li>It appears when there’s a pattern, or when the person it’s about agrees it’s fair.</li>' +
          '<li>The person it’s about can add their side, and it fades after a year with no repeats.</li>' +
          '<li>A pause can be narrow: furniture gifts pause until bed bugs are treated, while everything else carries on.</li>' +
        '</ul>', '3') +
      sec('serious', 'When it’s more than a misunderstanding',
        '<p>If someone was hurt or threatened, matches pause for both people, and the guide hands it to people in the circle right away. Anything involving a child goes straight to people, never only to the guide. ' + HOTLINE + ' Everyday safety, from noticing warning signs to getting away, is in <a href="#lens-self-defense">Self-defense</a>.</p>', '4');
  }

  function pStats() {
    var byGroup = {};
    S.needs.forEach(function (n) { var g = groupOf(n.need); byGroup[g] = (byGroup[g] || 0) + 1; });
    var max = 0; Object.keys(byGroup).forEach(function (k) { max = Math.max(max, byGroup[k]); });
    var bars = NEEDS().filter(function (g) { return byGroup[g.name]; }).map(function (g) {
      var v = byGroup[g.name];
      return '<li><span class="lg-bar-name">' + esc(g.name) + '</span><span class="lg-bar" aria-hidden="true"><i style="width:' + Math.round(v / max * 100) + '%"></i></span><b>' + v + '</b></li>';
    }).join('');
    var c = capacity(), teach = S.skills.filter(function (k) { return k.role !== 'learn'; }).length, learn = S.skills.filter(function (k) { return k.role !== 'teach'; }).length;
    var it = S.items, open = it.filter(function (i) { return i.status === 'open'; });
    var mine = [
      ['Open requests', open.filter(function (i) { return i.type === 'request'; }).length], ['Open offers', open.filter(function (i) { return i.type === 'offer'; }).length],
      ['Successes', it.length - open.length], ['Public posts', open.filter(function (i) { return i.vis === 'public'; }).length],
      ['Possible matches', S.inbox.length], ['Hours offered a month', c.cap ? c.used + ' of ' + c.cap : c.total],
      ['Things I can do', S.cando.length], ['Skills to teach', teach], ['Skills to learn', learn], ['Languages', S.langs.length]
    ];
    var circle = ['People with some help', 'People with every post met', 'Suggestions made', 'Both said yes', 'Met up', 'Needs met, by group', 'Free and paid', 'Two-way matches: both people’s needs met', 'Typical distance', 'Teaching chains with an interpreter', 'Days from post to meeting', 'Posts stopped by the safety screen', 'Repairs opened and settled'];
    return hero('Statistics', 'Open numbers, so the matchmaker isn’t a black box. Circle numbers are counts only; they never show who needed what.') + beta() +
      sec('mine', 'Your gift profile', '<dl class="lg-stats">' + mine.map(function (m) { return '<div><dt>' + m[0] + '</dt><dd>' + m[1] + '</dd></div>'; }).join('') + '</dl>' +
        (bars ? '<h3>Your needs, by group</h3><ul class="lg-bars">' + bars + '</ul>' : '<p class="lg-empty">Add needs to see them by group.</p>'), '1') +
      sec('circle', 'Your circle', '<p>These fill in once matching starts. The first two show whether help is spread fairly. Groups smaller than 5 people are left out, so no one can be picked out from the numbers.</p>' +
        '<dl class="lg-stats lg-later">' + circle.map(function (x) { return '<div><dt>' + x + '</dt><dd><span aria-hidden="true">—</span><span class="sr-only">Not yet</span></dd></div>'; }).join('') + '</dl>', '2');
  }

  function pSustain() {
    var AMTS = [['0', '$0'], ['1', '$1'], ['3', '$3 · suggested'], ['5', '$5'], ['10', '$10']];
    var MODELS = [
      ['Totally free', 'Never shut out.', 'Rests on one or two people paying out of pocket, or on grants. Often ends when they can’t.'],
      ['$3 a month after a 3-month trial', 'Shut out the day the trial ends, often in the same week rent is due.', 'Steady and simple to plan around.'],
      ['Donations only', 'Never shut out.', 'Usually a small share of people give, and what comes in swings month to month.'],
      ['Pay what you can, $3 suggested', 'Never shut out. $0 is a full membership.', 'A clear amount gives people who can pay something easy to say yes to, and the open books show when it’s enough.']
    ];
    return hero('Keep it running', 'Local gifts is free to use, for everyone, always. Running it isn’t free, so people who can chip in keep it going for people who can’t.') +
      beta('Nothing can be paid yet. Pay what you can opens with the pilot circle.') +
      sec('pwyc', 'Pay what you can',
        '<p>Choose an amount when you join, and change it any time. Every amount, including $0, gets exactly the same Local gifts.</p>' +
        '<fieldset class="lg-seg lg-amts"><legend>Each month</legend><div>' + AMTS.map(function (a) {
          return '<label><input type="radio" name="amt" value="' + a[0] + '"' + (a[0] === '3' ? ' checked' : '') + ' disabled><span>' + a[1] + '</span></label>';
        }).join('') + '</div></fieldset>' +
        '<p class="lg-opt">Or $36 once a year, which loses much less to card fees (below).</p>' +
        '<div class="lg-row"><button type="button" class="lg-btn" disabled>Chip in</button><span class="lg-opt">Opens with the pilot circle.</span></div>' +
        note('Fair shares hold', 'Paying never moves anyone up. Matches follow need and fair shares, the same for someone giving $10 a month and someone giving nothing.'), '1') +
      sec('books', 'Open books',
        '<p>Each month, once the pilot starts, this page shows what came in and where every dollar went.</p>' +
        '<dl class="lg-stats lg-later">' + ['Server and storage', 'The matchmaker (AI, per suggestion)', 'Card fees', 'Pay for the people who run it', 'Came in from members', 'Left over'].map(function (c) {
          return '<div><dt>' + c + '</dt><dd><span aria-hidden="true">—</span><span class="sr-only">Not yet</span></dd></div>';
        }).join('') + '</dl>' +
        '<p>Running it includes people: reading suggestions during the pilot, repair, and answering questions. That work is paid, and shown here like everything else.</p>', '2') +
      sec('why', 'Why pay what you can',
        '<div class="lg-table" role="table" aria-label="Ways to fund Local gifts">' +
          '<div role="row" class="lg-tr lg-th"><span role="columnheader">Way</span><span role="columnheader">For someone who’s broke</span><span role="columnheader">For keeping it alive</span></div>' +
          MODELS.map(function (m, i) { return '<div role="row" class="lg-tr' + (i === 3 ? ' is-pick' : '') + '"><span role="cell"><b>' + m[0] + '</b></span><span role="cell">' + m[1] + '</span><span role="cell">' + m[2] + '</span></div>'; }).join('') +
        '</div>' +
        '<p>A paywall would shut out exactly the people Local gifts is for. Pay what you can keeps everyone in and still asks plainly for what it costs.</p>', '3') +
      sec('fees', 'Small amounts and card fees',
        '<p>Card processors commonly charge 2.9% plus 30¢ for each payment. On $3 a month that’s about 39¢ each time, nearly 13%. On $36 once a year it’s about $1.34, under 4%. Recurring billing can add about 0.7% more.</p>' +
        '<p class="lg-src">Source: NerdWallet, “Stripe Fees: Pricing and Calculator” (updated July 17, 2026), on Stripe’s standard US online card rate and Stripe Billing.</p>', '4') +
      sec('time', 'Give time instead',
        '<p>Helping run your circle counts as much as money: reading suggestions during the pilot, helping with repair, interpreting, or showing a neighbor how the Board works. <a href="#gifts/post">Post it as an offer</a>.</p>', '5');
  }

  function pHow() {
    return hero('How it works', 'How the matchmaker decides, how it keeps things fair and safe, what it keeps, and what comes next.') +
      sec('match', 'The matchmaker',
        '<p>The matchmaker is an AI that reads the needs, requests, and offers in one circle and suggests pairs: a gift for a need, or a teacher for a learner. When a teacher and learner don’t share a language, it suggests a group of three with an interpreter. Each suggestion comes with a one-line reason you can read.</p>' +
        '<p>It starts from needs, not keywords. Someone giving away wool moving blankets and someone with a cold back room both touch warmth, so they can be matched even though neither wrote the other’s words. Photos marked “Matchmaker only” help it spot reuse, like pallets for a vegetable box.</p>' +
        note('Same for everyone', 'Every profile is read by the same matchmaker with the same instructions. In Anthropic’s marketplace tests, people whose agents ran on a weaker model got worse deals and didn’t notice; one shared matchmaker avoids that gap.') +
        '<p class="lg-src">Sources: Anthropic, “Project Deal” (April 2026); Anthropic, “Project Swap” (September 2026), where most lost value came from agents misreading what people wanted, which is why the needs come first here.</p>', '1') +
      sec('fair', 'Fair shares',
        '<ul class="lg-ul">' +
          '<li><b>Some for everyone first.</b> The matchmaker aims for everyone’s needs to be partly met before anyone’s are fully met. Someone with no help yet goes ahead of someone on their fifth gift.</li>' +
          '<li><b>Unless it helps everyone.</b> When meeting one person’s need lets them give a lot more (a ride that lets a mover help three families), it can go first, and the reason is shown.</li>' +
          '<li><b>Capacity holds.</b> Nobody is asked for more hours than their cap, so the people who can do everything don’t end up doing everything.</li>' +
          '<li><b>No bidding.</b> Prices are never public. The matchmaker pairs ranges that fit, privately.</li>' +
        '</ul>', '2') +
      sec('safety', 'Safety',
        '<ul class="lg-ul">' +
          '<li><b>People are never listed.</b> A first-pass screen on your device refuses posts that read like ads for sex or for people, and the matchmaker reads every post again before it reaches anyone. ' + HOTLINE + '</li>' +
          '<li><b>Companionship is real, and free.</b> Tea with a neighbor meets real needs. It’s always free and never carries photos, so it can’t be used as cover for a paid date. Being open to dating is a private note, used only when both people said so.</li>' +
          '<li><b>Children are protected first.</b> Anything involving kids stays private, never has photos, is posted by a parent or guardian, and is matched only with helpers who have at least 3 gifts confirmed by the other person, including one confirmed by a parent. Background checks for childcare are worth asking about too.</li>' +
          '<li><b>No photos of people.</b> Every photo needs a “no people in these photos” tick.</li>' +
        '</ul>', '3') +
      sec('trip', 'Worth the trip',
        '<p>How far something is worth going depends on what it is. A $200 steel garden tank can be worth crossing town for; one extra can of corn a block away usually isn’t, unless food is what you need right now. So every post gets its own reach:</p>' +
        '<ul class="lg-ul">' +
          '<li><b>What it’s worth.</b> What it would cost to buy, or the hours of help at $25 an hour. Reach grows with the square root, so a $200 tank is worth about six times the trip of a $5 whisk, not forty times.</li>' +
          '<li><b>How soon and how much it matters.</b> “Today” and “Essential” stretch the reach; “Not urgent” and “Nice to have” shrink it. For offers, it’s how pressing your own matching need is.</li>' +
          '<li><b>Your time and your wheels.</b> Minutes become miles by how you get around (walking about 3 miles an hour, a bike about 9, a bus or train about 7 with waits, a car about 14 in town), and a tight week shrinks every reach.</li>' +
        '</ul>' +
        '<p>The Board’s Where column says whether each post is worth the trip, a stretch, or probably too far, beside its distance.</p>', '4') +
      sec('cl', 'Craigslist and other free listings',
        '<p>Craigslist’s free section is often the fastest way to find a thing. Its terms don’t allow automated scanning, so Kinship opens the search for you with your words, your ZIP, and a distance sized to the need. Anything worth a look, you can jot onto your own Board in your own words, where it fades after two weeks. Those notes stay on your device; Kinship never copies listings or shares them with the circle.</p>' +
        '<p class="lg-src">Source: craigslist, <a href="https://www.craigslist.org/about/terms.of.use" target="_blank" rel="noopener noreferrer">Terms of Use</a>.</p>', '5') +
      sec('trust', 'Privacy and trust',
        '<ul class="lg-ul">' +
          '<li><b>Both say yes.</b> No one learns who you are until you both agree to meet.</li>' +
          '<li><b>Public posts carry no profile.</b> Only the post’s own columns, and your area as you chose: a neighborhood, only how far away it is, or nothing.</li>' +
          '<li><b>No map.</b> Places are a neighborhood centre with a small fixed nudge, or your location rounded to about a kilometre, and show only as a distance in 0.1-mile steps.</li>' +
          '<li><b>Photos and addresses are yours to share.</b> Photos can be public, on request, only with a match, or for the matchmaker only. Addresses go only to a match, after both say yes.</li>' +
          '<li><b>Extra-private needs</b> go to anonymous help (a community fridge, a shared fund, a gift card) and never to an introduction.</li>' +
          '<li><b>Circles.</b> Matching happens inside a circle of people who can vouch for each other, like a community space, a mutual aid group, or a block.</li>' +
          '<li><b>Kept small.</b> What isn’t stored can’t be leaked or handed over. Profiles hold needs, posts, skills, and languages, not your income or ID.</li>' +
          '<li><b>Repair, not bans.</b> When something goes wrong, see <a href="#gifts/repair">Repair</a>.</li>' +
          '<li><b>Entries fade.</b> After ' + EXPIRE_DAYS + ' days without a look, a profile pauses until you renew it.</li>' +
        '</ul>', '6') +
      sec('next', 'What comes next',
        '<ol class="lg-road">' +
          '<li class="now"><b>Now · Beta</b> Fill in a gift profile on this device. Copy it below to share with a circle coordinator by hand.</li>' +
          '<li><b>Next · A pilot circle</b> 30 to 50 people in one community. The Board fills with real posts, possible matches arrive in each Inbox every week, and a person reads every suggestion before anyone is asked. Pay what you can opens (see <a href="#gifts/sustain">Keep it running</a>).</li>' +
          '<li><b>Then · Automatic matching</b> The matchmaker runs often on its own, with the same both-say-yes rule, fair shares, safety screen, and open numbers.</li>' +
        '</ol>', '7') +
      sec('build', 'For builders: the matching loop',
        '<p>For anyone running the matchmaker for a circle. Each step is small enough for one agent or one person.</p>' +
        '<ol class="lg-ol">' +
          '<li>Collect gift profiles from the circle (the format is the backup text below). Screen every post again; refuse ads for sex or people; keep anything involving children private and trusted-only.</li>' +
          '<li>Publish public posts to the Board with only their public columns: never address, amounts, private photos, or dating notes.</li>' +
          '<li>Skip paused profiles, offers over each person’s cap, and extra-private needs; route those needs to anonymous help.</li>' +
          '<li>Match by need, not keyword; suggest pairs and groups of three, each with a one-line reason.</li>' +
          '<li>Keep only matches worth the trip for both people; match money ranges privately (never free-only with money-only).</li>' +
          '<li>Order by fair shares (least helped first) and attach any heads-ups.</li>' +
          '<li>A person reviews suggestions (during the pilot), then each lands in both Inboxes with a timestamp.</li>' +
          '<li>Share names, addresses, and match-only photos only after both say yes.</li>' +
          '<li>Check in after the meeting date; move met posts to Successes; open Repair on a flag.</li>' +
          '<li>Publish counts only, leaving out any group under 5 people.</li>' +
        '</ol>', '8') +
      sec('data', 'Your gift profile on this device',
        '<p>Saved only in this browser' + (S.updated ? ', last updated ' + esc(new Date(S.updated).toLocaleDateString()) : '') + '. Nothing is sent anywhere. Photos make the backup much bigger.</p>' +
        '<label class="lg-wide" for="lg-backup">Backup text</label>' +
        '<textarea id="lg-backup" spellcheck="false" placeholder="Press Copy to fill this, or paste a backup here and press Restore"></textarea>' +
        '<div class="lg-row"><button type="button" class="lg-btn" data-lg="copy">Copy my gift profile</button>' +
        '<button type="button" class="lg-btn lg-quiet" data-lg="restore">Restore from backup</button>' +
        '<button type="button" class="lg-btn lg-quiet" data-lg="clear">Clear everything</button></div>', '9');
  }

  var VIEWS = { '': pOverview, board: pBoard, post: pPost, mine: pMine, inbox: pInbox, needs: pNeeds, skills: pSkills, repair: pRepair, stats: pStats, sustain: pSustain, how: pHow };
  var cur = '', curSub = '';
  function main() { return '<main class="lg">' + tabs(cur) + VIEWS[cur](curSub) + '</main>'; }

  /* Re-draw the page in place after a change, keeping the scroll and putting focus back where it was. */
  function redraw(focusSel) {
    var m = document.querySelector('main.lg'); if (!m) return;
    closePop();
    var y = window.scrollY, sheet = document.querySelector('.lg-sheet'), sx = sheet ? sheet.scrollLeft : 0;
    m.outerHTML = main();
    window.scrollTo(0, y);
    var s2 = document.querySelector('.lg-sheet'); if (s2) s2.scrollLeft = sx;
    var f = focusSel && document.querySelector(focusSel);
    if (f) f.focus({ preventScroll: true });
    after();
  }
  function after() {
    centerTab();
    document.querySelectorAll('main.lg [data-mixed]').forEach(function (b) { b.indeterminate = true; });
  }
  function centerTab() {
    var t = document.querySelector('.lg-tabs'), a = t && t.querySelector('[aria-current]');
    if (a && t.scrollWidth > t.clientWidth) t.scrollLeft = a.offsetLeft - (t.clientWidth - a.offsetWidth) / 2;
  }
  function num(v, max) { var n = parseFloat(v); return isFinite(n) && n > 0 ? Math.min(n, max) : 0; }
  function itemById(id) { return S.items.filter(function (i) { return i.id === id; })[0]; }
  function markMet(it) { if (it && it.status !== 'met') { it.status = 'met'; it.metAt = new Date().toISOString(); } }

  /* ---------- the "…" pop-up: one element on the page, placed beside the button ---------- */
  var popEl = null, popFor = null, popTimer = 0, popAt = 0;
  function openPop(btn) {
    clearTimeout(popTimer);
    if (!popEl) { popEl = document.createElement('div'); popEl.className = 'lg-pop'; popEl.id = 'lg-pop'; popEl.setAttribute('aria-hidden', 'true'); document.body.appendChild(popEl);
      popEl.addEventListener('mouseenter', function () { clearTimeout(popTimer); }); popEl.addEventListener('mouseleave', function () { popTimer = setTimeout(closePop, 200); }); }
    var tpl = btn.parentNode.querySelector('template'); if (!tpl) return;
    popEl.innerHTML = tpl.innerHTML; popEl.hidden = false; popAt = Date.now(); popFor = btn; btn.setAttribute('aria-expanded', 'true');
    var r = btn.getBoundingClientRect(), w = Math.min(360, window.innerWidth - 24);
    popEl.style.width = w + 'px';
    var left = Math.max(12, Math.min(r.right - w, window.innerWidth - w - 12));
    popEl.style.left = left + 'px'; popEl.style.top = '0px';
    var h = popEl.offsetHeight, top = r.bottom + 6;
    if (top + h > window.innerHeight - 8 && r.top - h - 6 > 8) top = r.top - h - 6;
    popEl.style.top = Math.max(8, top) + 'px';
  }
  function closePop() { if (popEl) popEl.hidden = true; if (popFor) popFor.setAttribute('aria-expanded', 'false'); popFor = null; }

  /* ---------- events (bound once) ---------- */
  function bind() {
    document.addEventListener('mouseover', function (e) { var b = e.target.closest && e.target.closest('main.lg .lg-dots'); if (b && b !== popFor) openPop(b); else if (b) clearTimeout(popTimer); });
    document.addEventListener('mouseout', function (e) { var b = e.target.closest && e.target.closest('main.lg .lg-dots'); if (b && !(e.relatedTarget && popEl && popEl.contains(e.relatedTarget))) popTimer = setTimeout(closePop, 200); });
    document.addEventListener('focusin', function (e) { var b = e.target.closest && e.target.closest('main.lg .lg-dots'); if (b) openPop(b); else if (popFor && !(popEl && popEl.contains(e.target))) closePop(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && popFor) { var b = popFor; closePop(); b.focus(); } });
    window.addEventListener('scroll', function () { if (popFor && Date.now() - popAt > 400) closePop(); }, true);
    window.addEventListener('hashchange', closePop);

    document.addEventListener('click', function (e) {
      if (popFor && popEl && !popEl.contains(e.target) && !(e.target.closest && e.target.closest('.lg-dots'))) closePop();
      var b = e.target.closest && e.target.closest('main.lg [data-lg]'); if (!b) return;
      var a = b.getAttribute('data-lg'), id = b.getAttribute('data-id'), it;
      if (a === 'pop') openPop(b);
      else if (a === 'need-toggle') {
        var n = b.getAttribute('data-need'), has = S.needs.filter(function (x) { return x.need === n; })[0];
        if (has) { S.needs = S.needs.filter(function (x) { return x !== has; }); save(cap(n) + ' removed'); }
        else { S.needs.push({ id: uid(), need: n, forWho: 'me', level: 'soon', private: false }); save(cap(n) + ' added'); }
        redraw('[data-lg="need-toggle"][data-need="' + n.replace(/"/g, '') + '"]');
      } else if (a === 'del') {
        var list = b.getAttribute('data-list');
        S[list] = S[list].filter(function (x) { return x.id !== id; }); save('Removed'); redraw('main.lg h1');
      } else if (a === 'met' || a === 'reopen') {
        it = itemById(id); if (!it) return;
        if (a === 'met') { markMet(it); save('Moved to Successes'); } else { it.status = 'open'; it.metAt = ''; save('Reopened'); }
        redraw('main.lg h1');
      } else if (a === 'up' || a === 'down') {
        var ord = offersInOrder(), i = ord.map(function (o) { return o.id; }).indexOf(id), j = a === 'up' ? i - 1 : i + 1;
        if (i < 0 || j < 0 || j >= ord.length) return;
        var t = ord[i]; ord[i] = ord[j]; ord[j] = t; ord.forEach(function (o, k) { o.order = k; });
        save('Order saved'); redraw('[data-lg="' + a + '"][data-id="' + id + '"]');
      } else if (a === 'bulk') {
        var tb = b.getAttribute('data-t'), what = b.getAttribute('data-do'), ids = Object.keys(SEL[tb]).filter(function (k) { return SEL[tb][k]; });
        if (!ids.length) return;
        if (tb === 'board') {
          ids.forEach(function (x) {
            var L = what === 'star' || what === 'unstar' ? 'saved' : 'hidden', on = what === 'star' || what === 'hide', at = S[L].indexOf(x);
            if (on && at < 0) S[L].push(x); if (!on && at > -1) S[L].splice(at, 1);
          });
          save({ star: 'Starred', unstar: 'Unstarred', hide: 'Hidden', unhide: 'Shown again' }[what]);
        } else if (tb === 'mine') {
          if (what === 'remove' && b.getAttribute('data-sure') !== '1') { b.setAttribute('data-sure', '1'); b.textContent = 'Press again to remove ' + ids.length; return; }
          ids.forEach(function (x) {
            var t2 = itemById(x); if (!t2) return;
            if (what === 'met') markMet(t2);
            else if (what === 'reopen') { t2.status = 'open'; t2.metAt = ''; }
            else if (what === 'private') t2.vis = 'private';
            else if (what === 'public') { t2.vis = 'public'; applyRules(t2); }
          });
          if (what === 'remove') S.items = S.items.filter(function (t3) { return ids.indexOf(t3.id) < 0; });
          save({ met: 'Moved to Successes', reopen: 'Reopened', private: 'Made private', public: 'Made public (posts with children stay private)', remove: 'Removed' }[what]);
        } else if (tb === 'inbox') {
          ids.forEach(function (x) { var m = S.inbox.filter(function (q) { return q.id === x; })[0]; if (!m) return; m.status = what; if (what === 'met') { m.metAt = new Date().toISOString(); markMet(itemById(m.mine)); } });
          save(what === 'met' ? 'Marked met; your post moved to Successes' : 'Saved');
        }
        SEL[tb] = {}; redraw('main.lg h1');
      } else if (a === 'areas-clear') { F.areas = []; redraw('.lg-areas summary'); }
      else if (a === 'ph-del') { draftPhotos.splice(+b.getAttribute('data-i'), 1); var ph = document.getElementById('lg-photos'); if (ph) ph.innerHTML = photosHtml(); }
      else if (a === 'cando-idea') {
        if (S.cando.indexOf(b.textContent) < 0) { S.cando.push(b.textContent); save(b.textContent + ' added'); redraw('[data-lg-form="cando"] input'); }
      } else if (a === 'cando-del') {
        var c = S.cando.splice(+b.getAttribute('data-i'), 1)[0]; save((c || '') + ' removed'); redraw('[data-lg-form="cando"] input');
      } else if (a === 'locate') {
        if (!navigator.geolocation) { mn().toast('This browser can’t share a location; choose a neighborhood instead'); return; }
        navigator.geolocation.getCurrentPosition(function (pos) {
          S.place.lat = round2(pos.coords.latitude); S.place.lng = round2(pos.coords.longitude); placeOpen = true;
          save('Location saved, rounded to about 1 km'); redraw('[data-lg="unlocate"]');
        }, function () { mn().toast('No location shared; a neighborhood works just as well'); }, { enableHighAccuracy: false, maximumAge: 6e5, timeout: 15000 });
      } else if (a === 'unlocate') {
        S.place.lat = null; S.place.lng = null; placeOpen = true; save('Location forgotten'); redraw('[data-lg="locate"]');
      } else if (a === 'renew') { save('Renewed'); redraw('main.lg h1'); }
      else if (a === 'copy') {
        var ta = document.getElementById('lg-backup'); ta.value = JSON.stringify(S, null, 2); ta.select();
        try { navigator.clipboard.writeText(ta.value).then(function () { mn().toast('Copied'); }, function () { mn().toast('Selected: copy it from the box'); }); } catch (err) { mn().toast('Selected: copy it from the box'); }
      } else if (a === 'restore') {
        try { var p = JSON.parse(document.getElementById('lg-backup').value); if (!p || p.v !== 1) throw 0; S = norm(p); save('Gift profile restored'); redraw('main.lg h1'); }
        catch (err) { mn().toast('That backup couldn’t be read'); }
      } else if (a === 'clear') {
        if (b.getAttribute('data-sure') !== '1') { b.setAttribute('data-sure', '1'); b.textContent = 'Press again to clear'; return; }
        S = blank(); try { localStorage.removeItem(KEY); } catch (err) {} mn().toast('Gift profile cleared'); redraw('main.lg h1');
      }
    });
    /* Sliders show their value as they move; the capacity meter updates live, without redrawing the page. */
    document.addEventListener('input', function (e) {
      var el = e.target; if (!el.closest || !el.closest('main.lg')) return;
      if (el.type === 'range') {
        var out = el.parentNode.querySelector('output'), v = parseFloat(el.value);
        if (el.name === 'timeMax' && out) out.textContent = hrs(v);
        if (el.getAttribute('data-lg-filter') === 'within' && out) out.textContent = v ? '~' + v.toFixed(1) + ' mi' : 'Any distance';
        if (el.getAttribute('data-lg-budget') === 'hours') {
          S.budget.hours = v ? String(v) : ''; if (out) out.textContent = v ? v + ' h' : 'No cap';
          el.setAttribute('aria-valuetext', v ? v + ' hours' : 'No cap');
          var m = document.getElementById('lg-meter'); if (m) m.outerHTML = meterHtml();
        }
      }
      if (el.getAttribute('data-lg-filter') === 'q') { F.q = el.value; clearTimeout(qTimer); qTimer = setTimeout(function () { redraw('[data-lg-filter="q"]'); var q = document.querySelector('[data-lg-filter="q"]'); if (q) q.setSelectionRange(q.value.length, q.value.length); }, 250); }
    });
    var qTimer = 0;
    document.addEventListener('change', function (e) {
      var el = e.target; if (!el.closest || !el.closest('main.lg')) return;
      if (el.getAttribute('data-lg-sel')) { SEL[el.getAttribute('data-lg-sel')][el.value] = el.checked; redraw('[data-lg-sel="' + el.getAttribute('data-lg-sel') + '"][value="' + el.value + '"]'); return; }
      if (el.getAttribute('data-lg-selall')) { var t = el.getAttribute('data-lg-selall'); (el.getAttribute('data-ids') || '').split(' ').filter(Boolean).forEach(function (x) { SEL[t][x] = el.checked; }); redraw('[data-lg-selall="' + t + '"]'); return; }
      if (el.getAttribute('data-lg-density')) { S.ui.density = el.value; save(); redraw('input[name="lg-density"]:checked'); return; }
      if (el.getAttribute('data-lg-view')) { var vt = el.getAttribute('data-lg-view'); VIEW[vt] = el.value; SEL[vt] = {}; redraw('input[name="lg-view-' + vt + '"]:checked'); return; }
      if (el.getAttribute('data-lg-inbox')) {
        var m = S.inbox.filter(function (q) { return q.id === el.getAttribute('data-lg-inbox'); })[0]; if (!m) return;
        m.status = el.value; m.metAt = el.value === 'met' ? new Date().toISOString() : '';
        if (el.value === 'met') markMet(itemById(m.mine));
        save(el.value === 'met' ? 'Marked met; your post moved to Successes' : 'Saved'); redraw('[data-lg-inbox="' + m.id + '"]'); return;
      }
      if (el.getAttribute('data-lg-area')) { var nm = el.getAttribute('data-lg-area'), at = F.areas.indexOf(nm); if (el.checked && at < 0) F.areas.push(nm); if (!el.checked && at > -1) F.areas.splice(at, 1); redraw('[data-lg-area="' + nm.replace(/"/g, '') + '"]'); return; }
      if (el.getAttribute('data-lg-photos')) {
        var files = Array.prototype.slice.call(el.files || []).slice(0, Math.max(0, 3 - draftPhotos.length));
        if (!files.length) { mn().toast('Up to 3 photos'); return; }
        var left = files.length;
        files.forEach(function (fl) { shrink(fl, function (u) { if (u) draftPhotos.push(u); if (--left === 0) { var ph = document.getElementById('lg-photos'); if (ph) ph.innerHTML = photosHtml(); mn().toast('Photo added: tick “No people” to keep it'); } }); });
        el.value = ''; return;
      }
      if (el.name === 'needs' && el.closest('form')) {
        var form = el.closest('form'), n = form.querySelectorAll('input[name="needs"]:checked').length + form.elements.needCustom.value.split(',').filter(function (s) { return s.trim(); }).length;
        if (n > 3 && el.checked) { el.checked = false; n--; mn().toast('Up to 3 needs; untick one first'); }
        var o = form.querySelector('.lg-ncount'); if (o) o.textContent = n + ' of 3';
        return;
      }
      var flt = el.getAttribute('data-lg-filter');
      if (flt && flt !== 'q') { F[flt] = el.type === 'checkbox' ? el.checked : el.type === 'range' ? parseFloat(el.value) || 0 : el.value; redraw('[data-lg-filter="' + flt + '"]'); return; }
      var pl = el.getAttribute('data-lg-place') || (el.name && el.name.indexOf('pl-') === 0 && el.closest('.lg-place') ? el.name.slice(3) : '');
      if (pl) {
        var val = el.value;
        if (pl === 'zip') { val = String(val).replace(/\D/g, '').slice(0, 5); if (val && val.length !== 5) { mn().toast('A ZIP code has five digits'); return; } }
        if (pl === 'area' && val) { S.place.lat = null; S.place.lng = null; }
        S.place[pl] = val; placeOpen = true; save('Saved on this device');
        redraw(el.getAttribute('data-lg-place') ? '[data-lg-place="' + pl + '"]' : 'input[name="pl-' + pl + '"]:checked');
        return;
      }
      var bud = el.getAttribute('data-lg-budget');
      if (bud) { S.budget[bud] = bud === 'hours' ? String(num(el.value, 200) || '') : el.value; save('Saved'); redraw('[data-lg-budget="' + bud + '"]'); return; }
      var field = el.getAttribute('data-lg-field'); if (!field) return;
      var li = el.closest('.lg-item'), nd = li && S.needs.filter(function (x) { return x.id === li.getAttribute('data-id'); })[0]; if (!nd) return;
      nd[field] = el.type === 'checkbox' ? el.checked : el.value;
      save('Saved');
    });
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('main.lg [data-lg-sort]'); if (!b) return;
      var t = b.getAttribute('data-lg-sort'), k = b.getAttribute('data-k'), s = SORT[t];
      if (s.k === k) s.dir = -s.dir; else { s.k = k; s.dir = 1; }
      redraw('[data-lg-sort="' + t + '"][data-k="' + k + '"]');
    });
    document.addEventListener('submit', function (e) {
      var f = e.target, kind = f.getAttribute && f.getAttribute('data-lg-form'); if (!kind) return;
      e.preventDefault();
      var v = function (name) { var el = f.elements[name]; return el ? (el.type === 'checkbox' ? el.checked : String(el.value || '').trim()) : ''; };
      if (kind === 'item') {
        var raw = readItemForm(f), alert_ = document.getElementById('lg-alert');
        function stop(msg) { alert_.innerHTML = msg; alert_.hidden = false; alert_.scrollIntoView({ block: 'center' }); }
        if (!raw.title) { stop('Add a short summary first.'); f.elements.title.focus(); return; }
        if (raw._needCount > 3) { stop('Up to 3 needs, please. Untick one, or shorten your own words.'); return; }
        var old = editingId ? itemById(editingId) : null;
        var item = cleanItem(Object.assign({}, raw, { id: old ? old.id : uid(), status: old ? old.status : 'open', metAt: old ? old.metAt : '', made: old ? old.made : new Date().toISOString(),
          order: old ? old.order : S.items.reduce(function (m, x) { return Math.max(m, x.order + 1); }, 0) }));
        var res = applyRules(Object.assign({}, item, { photos: raw.photos.slice(), noPeople: raw.noPeople, money: pick(MONEY, raw.money, 'free'), vis: pick(VIS, raw.vis, 'public') }));
        if (res.blocked) { stop('<b>This post can’t go up.</b> Local gifts never lists people, and it isn’t for dates or sex. If that’s not what you meant, try other words. ' + HOTLINE); return; }
        var fresh = res.item;
        if (old) S.items = S.items.map(function (x) { return x.id === old.id ? fresh : x; }); else S.items.push(fresh);
        if (!save()) return;
        draftPhotos = []; editingId = '';
        mn().toast((old ? 'Saved' : fresh.vis === 'public' ? 'Posted to the Board' : 'Posted privately') + (res.changed.length ? '. ' + res.changed.join(' ') : ''));
        location.hash = '#gifts/mine';
        return;
      }
      if (kind === 'found' && v('title')) {
        var link = /^https:\/\//i.test(v('link')) ? v('link').slice(0, 300) : '';
        S.found.push({ id: uid(), title: v('title').slice(0, 100), area: areaOf(v('area')) ? v('area') : '', value: num(v('value'), 100000), need: v('need'), link: link, made: new Date().toISOString() });
        save('Added to your Board');
      }
      else if (kind === 'cando' && v('name')) { if (S.cando.indexOf(v('name')) < 0) S.cando.push(v('name').slice(0, 50)); save('Added'); }
      else if (kind === 'skill' && v('name')) { S.skills.push({ id: uid(), name: v('name').slice(0, 80), role: v('role') || 'learn', need: v('need') }); save('Skill added'); }
      else if (kind === 'lang' && v('name')) { S.langs.push({ id: uid(), name: v('name').slice(0, 40), level: v('level') || 'well', interpret: !!v('interpret') }); save('Language added'); }
      else return;
      redraw('form[data-lg-form="' + kind + '"] input[type="text"]');
    });
  }
  bind();

  window.MN_GIFTS = function (sub) {
    var parts = (sub || '').split(/[\/?]/), s = ALIAS[parts[0]] || parts[0];
    cur = VIEWS.hasOwnProperty(s) ? s : '';
    curSub = parts[1] || '';
    placeOpen = false; SEL.board = {}; SEL.mine = {}; SEL.inbox = {};
    if (cur !== 'post') { draftPhotos = []; editingId = ''; }
    S = load();
    var name = (PAGES.filter(function (p) { return p.id === cur; })[0] || PAGES[0]).name;
    setTimeout(after, 0);
    return { title: (cur ? name + ' · ' : '') + 'Local gifts · Kinship', html: mn().header('gifts') + main() + mn().footer() };
  };
})();
