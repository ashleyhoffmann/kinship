/* Kinship: the lens catalogue.
   A lens is a way of looking at your home and life: what to notice, what it costs you,
   and what you can fix yourself. Status: ready (shown as Beta) | building | soonest | next | soon | later | last.
   Each tier has one colour; every lens in it shares that colour. In a locked tier, only ready lenses are clickable. */
window.MN_TIERS = [
  {
    id: 'signals', num: 1, name: 'Choices', color: '#C2477F',
    blurb: 'Listen for signals of aliveness inside yourself and others; organize mutually-beneficial solutions.',
    lenses: [
      {
        id: 'emotions', name: 'Emotions', status: 'ready',
        blurb: 'Your rich inner world.',
        topics: ['Conscious awareness', 'Feelings', 'Needs', 'Values'],
        looks: ['Feelings as signals: what’s alive inside of you, pain included', 'The universal needs beneath every feeling and strategy', 'Who you are underneath: conscious awareness and choice, the egoic body that remembers, mind-body pain relationships, and other mental faculties']
      },
      {
        id: 'relationships', name: 'Relationships', status: 'ready',
        blurb: 'Connecting inner worlds.',
        topics: ['Dialogue', 'Judgment', 'Conflict resolution', 'Obedience'],
        looks: ['Requests instead of demands', 'Dialogue where both sets of needs count', 'Children, neighbors, animals, cooperatives and power shared instead of held over']
      },
      {
        id: 'governance', name: 'Governance', status: 'ready',
        blurb: 'Current social rules and alternative visions (“lovernance”) to meet needs. Broad concepts, but tailored to California.',
        topics: ['Lovernance', 'Rights', 'Power', 'Rules', 'Incarceration'],
        looks: ['Lovernance, Unit 1 Overview: what lovernance is, the evidence that there’s enough (one yard, one year, and proof at every size), ways in, a transition plan without law and then with law, what has to change legally, and how to ask your representatives for it', 'Unit 2 Housing: by where you live (needs-meeting commons, collective-owned homes, give-and-get, renters, shelters to sanctuaries, tribal lands, room we already have, trees and wild neighbors), with the California laws that help and stand in the way', 'Unit 3, Jobs and economy: needs-meeting businesses (four musts, including harms no animals), membership, work that needs doing, shops and spaces, public jobs, taxes and gifts, old debts and bankruptcy, less to throw away, unions, clean power', 'Unit 4, Care and safety: least able first, born into safety, health, insurance, community safety, who decides, needs met on your word, held at the end', 'Unit 5, The law today: rights you have by existing, criminalization and incarceration, stairs for change, paths outside law', 'Unit 6, Law by need (planned): an accordion per tier and per need; 6.1.1 California water law is first, the rest planned']
      }
    ]
  },
  {
    id: 'roots', num: 2, name: 'Roots', color: '#B85A14',
    blurb: 'Fundamentals supporting all healthy life.', locked: true,
    lenses: [
      {
        id: 'water', name: 'Water', status: 'ready',
        blurb: 'Five units for any water situation: use, sources, containers, purify, and test. Your numbers carry from one to the next, at every scale from a studio to a farm to a sidewalk.',
        topics: ['Uses', 'Sources', 'Containers', 'Purify', 'Test'],
        looks: ['An overview of the five units, and designing your water loop', 'How much water your household uses, task by task, and how clean each needs to be', 'Sources side by side, from bottles and 211 to rain, springs and wells', 'How much to keep, and containers that keep it good', 'Making each source clean enough for the job', 'Knowing it’s safe, and what to test for your sources']
      },
      {
        id: 'food', name: 'Food', status: 'ready',
        blurb: 'Find, cleanse, rehydrate, cook and store plant foods safely, soften them for sick days, and feed your animals.',
        topics: ['Gather', 'Cleanse', 'Rehydrate', 'Cook', 'Store', 'Gentle', 'Companions'],
        looks: ['Free, shared, bought, grown and foraged food', 'Washing produce, greens, grains and rice well', 'Soaking beans, grains and dried foods, and sprouting', 'Safe heat, little fuel, cooking with kids and a full plate', 'Cold, pantry, leftovers, preserving, and the animals who visit', 'Babies’ first foods, soft textures for sore mouths, and food as medicine', 'What companion animals eat in nature, kibble and raw, and plant-based options']
      },
      {
        id: 'air', name: 'Air & temperature', status: 'ready',
        blurb: 'What’s in the air, reading it around fires and storms, and how ventilation, vacuuming and shade clear it.',
        topics: ['Quality', 'Sunlight', 'Heat', 'Ventilation', 'Dust', 'Smoke'],
        looks: ['Particles, gases, living things, and what disasters add to the air', 'Moving air to cleanse it: windows, fans, filters and damp', 'Vacuuming and damp cleaning, new things, asbestos and lead', 'Cooking, gas, nonstick, smoke and solvents, and companions’ lungs', 'Heat waves, shade, cold, and sun on skin']
      },
      {
        id: 'toxins', name: 'Poisons', status: 'ready',
        blurb: 'See what is in the pan, the can, the couch and the ground, and swap what matters most first, one at a time.',
        topics: ['Exposures', 'Plastics', 'In the home', 'Pesticides', 'Soil', 'Living toxins', 'Neighbors'],
        looks: ['How exposures work, and what a healthy home is made of', 'Plastics, when a tarp is the safer bet, can linings, PFAS and pans', 'Cleaners, fragrance, furniture, dust and washing produce', 'Glyphosate, treated wood and drift', 'Lead and legacy metals tested once in one batch, and what’s in potting mix and compost', 'Molds, algal blooms and plants that harm companions', 'Freeways, factories, wells, fire and changing it together']
      }
    ]
  },
  {
    id: 'protect', num: 3, name: 'Protect', color: '#A87700',
    blurb: 'Keep every body and the home safe: shelter, cleaning, care and protection.',
    lenses: [
      {
        id: 'cleaning', name: 'Cleaning', status: 'ready',
        blurb: 'Water first, then a short ladder of gentle helpers for counters, stains and laundry, safe around kids and animals.',
        topics: ['Water', 'Gentle options', 'Surfaces', 'Stains', 'Laundry'],
        looks: ['Why water and a good cloth do most of the work', 'Soap, baking soda, vinegar and peroxide: what each is for, and what never mixes', 'Counters by material, boards, oven, bathroom, floors and ants', 'Which stain is which, and what lifts it', 'Laundry that is gentler on fabric, skin and water']
      },
      {
        id: 'shelter', name: 'Shelter', status: 'soon',
        blurb: 'Temporary shelter: tents, tarps, vehicles and quick fixes for staying dry, warm and safe when home isn’t steady.',
        topics: ['Tents & tarps', 'Vehicles', 'Warmth', 'Safe places'],
        looks: ['Pitching a tarp or tent that sheds rain and wind', 'Living in a car, van or RV: sleep, air, heat and parking', 'Staying warm and dry with little: layers, ground insulation and condensation', 'Shelters, safe parking programs and legal places to stay']
      },
      {
        id: 'body-care', name: 'Body care', status: 'ready',
        blurb: 'Care for every body at home: the basics, sleep and tools; why teeth decay and how xylitol and homemade mouthwash help; washing hair less; and bleaching at home with less damage.',
        topics: ['Overview', 'Mouth', 'Hair care', 'Hair bleaching', 'Bodies through time', 'Animal bodies'],
        looks: ['Overview: water, food, air and gentle skin care for one body, sleep and rest, routines and blue light, and a small kit of tools', 'Mouth: why teeth decay, xylitol, and mouthwash and mints you can make at home', 'Hair care: hair types, washing less, water-only washes and hippie options, and textured and coily hair', 'Hair bleaching at home: bleach, wash, tone, and condition', 'Bodies through time: children, pregnancy, aging and different bodies (planned)', 'The animals who share your home (planned)']
      },
      {
        id: 'self-defense', name: 'Self-defense', status: 'soon',
        blurb: 'Keep yourself, your people and your home safe: noticing early, calming things with words, and getting away.',
        topics: ['Noticing', 'De-escalation', 'Getting away', 'Home'],
        looks: ['Trusting the early feeling that something is off, and leaving early', 'De-escalation: distance, calm and words before anything else', 'Simple protective moves for breaking free and getting away', 'Home preparation: locks, lights, a safe room, a plan and neighbors who check in (with Emergency prep)']
      }
    ]
  },
  {
    id: 'nurture', num: 4, name: 'Nurture', color: '#3E7B3A',
    blurb: 'Power the home, grow and compost, salvage, know the plants and their medicine, and read the weather.',
    lenses: [
      {
        id: 'energy', name: 'Energy & light', status: 'soon',
        blurb: 'Heat, light, cook and stay warm with less: fireplaces, gas, lighting, insulation and more.',
        topics: ['Fireplaces', 'Cooking', 'Gas', 'Light', 'Insulation'],
        looks: ['Fireplaces and wood stoves that burn clean and safe', 'Gas appliances, leaks and carbon monoxide', 'Daylight, bulbs and staying lit through an outage', 'Insulation and draught-proofing that cut the bill']
      },
      {
        id: 'gardening', name: 'Growing', status: 'ready',
        blurb: 'Light, water, soil and season: start from scraps on a windowsill, grow what saves the most, and share the garden gently.',
        topics: ['What plants need', 'Soil', 'Starting plants', 'Small spaces', 'Yard', 'Harvest'],
        looks: ['What every plant needs, and soil: what it’s made of, how to feed it, and potting mix', 'Scallions in a glass, herbs from cuttings, greens from seed, and how long each takes', 'Indoors, small spaces, and the yard: water, sun, and what saves the most to grow', 'Sharing the garden with insects, birds and companions', 'Your year, then harvesting, drying beans and seeds, pruning and saving seed (planned)']
      },
      {
        id: 'composting-waste', name: 'Composting & waste', status: 'ready',
        blurb: 'Turn scraps into soil and handle waste safely, with the grid as the usual best bet and septic as an option.',
        topics: ['Microbes', 'Ways to compost', 'What goes in', 'Using compost', 'Sewage'],
        looks: ['How microbes, greens, browns, water, and air make compost', 'Green bins, Lomi, bokashi, worms, piles, and trenches, side by side', 'What to save for broth, what goes in, and what stays out (dog poop and “compostable” plastic included)', 'Which compost feeds veggies and which suits trees and flowers', 'How sewage and septic systems work, and why the grid is usually safest (planned)']
      },
      {
        id: 'salvaging', name: 'Salvaging', status: 'soon',
        blurb: 'Rescue unwanted things: curb finds, free groups, reuse centers and scrap, plus cleaning and storing what you save.',
        topics: ['Finding', 'Asking', 'Checking', 'Saving'],
        looks: ['Where unwanted things gather: curbs, free groups, reuse centers and move-out days', 'Asking for, sharing and trading what others are letting go', 'Checking finds for bedbugs, mold, lead and recalls before they come home', 'Cleaning, fixing and storing so saved things stay useful (with Repair)']
      },
      {
        id: 'identification', name: 'Identification & foraging', status: 'soon',
        blurb: 'Recognize the plants, fungi and animals around you, and forage only what you can name with certainty.',
        topics: ['Plants', 'Fungi', 'Animals', 'Foraging'],
        looks: ['The features that actually separate species', 'Edible plants and their dangerous twins', 'Foraging: clean places, rules on public and private land, and taking only a share', 'Tracks, calls and signs of who lives nearby']
      },
      {
        id: 'herbalism', name: 'Herbalism', status: 'later',
        blurb: 'Plant medicines: drying, teas, oils, salves and tinctures, with dose, evidence and interactions beside each.',
        topics: ['Preparations', 'Dosing', 'Evidence'],
        looks: ['Which plant medicines have evidence behind them, and how much', 'Drying and preparing medicinal herbs: teas, infused oils, salves and tinctures made at home', 'Doses, medicines that don’t mix, kids, pregnancy and animals (lavender and essential oils are hard on cats), and when to see a clinician']
      },
      {
        id: 'weather', name: 'Weather', status: 'soon',
        blurb: 'Read the sky: which clouds bring rain, and the seasonal patterns where you live.',
        topics: ['Clouds', 'Wind', 'Seasons'],
        looks: ['Cloud types and which ones turn to rain', 'Wind, pressure and the signs before a storm', 'Your local seasons, frost and rainfall patterns']
      }
    ]
  },
  {
    id: 'resilience', num: 5, name: 'Resilience', color: '#2F6E9E',
    blurb: 'Withstand hard times: emergencies, injuries, good tools and basic repairs.',
    lenses: [
      {
        id: 'emergency-prep', name: 'Emergency prep', status: 'building',
        blurb: 'Natural disasters, supplies, go-bags and securing your home: plan ahead so you can stay calm when it counts.',
        topics: ['What to prep for', 'Supplies', 'Go-bags', 'Plans & people', 'Securing your home'],
        looks: ['What to prep for: wildfire, earthquakes, heat, floods, outages and animals', 'Go-bags, water and supplies for earthquakes, fires and floods', 'Plans with family, neighbors and access needs', 'Simple ways to secure doors, windows and your home']
      },
      {
        id: 'first-aid', name: 'First aid', status: 'later',
        blurb: 'Cuts, burns, sprains, choking and bites: what to do in the first minutes.',
        topics: ['Wounds', 'Burns', 'Sprains', 'Emergencies'],
        looks: ['Stopping bleeding and cleaning a wound', 'Burns, breaks and sprains: what helps and what makes it worse', 'When to call emergency services, and what to do until they arrive', 'Fluids and gentle food after vomiting, diarrhea or heat (from Food → Gentle)']
      },
      {
        id: 'household-tools', name: 'Tools', status: 'soon',
        blurb: 'The toolbox: the few tools that handle most jobs, how to use them safely, and where to borrow the rest.',
        topics: ['Tools', 'Safety', 'Borrowing'],
        looks: ['The few tools that handle most jobs, and what else each one helps with', 'Using them safely, with kids beside you', 'Tool libraries, neighbors and secondhand before buying']
      },
      {
        id: 'repair', name: 'Basic repairs', status: 'later',
        blurb: 'Diagnose, open up and mend what usually gets thrown out.',
        topics: ['Tools', 'Electronics', 'Mending'],
        looks: ['Finding the actual fault before buying anything', 'Opening things that were built to stay shut', 'Fixes that keep things out of the landfill']
      }
    ]
  },
  {
    id: 'craft', num: 6, name: 'Craft', color: '#7A4FB0',
    blurb: 'Hands-on skills to make, mend and build.',
    lenses: [
      {
        id: 'sewing', name: 'Sewing', status: 'last',
        blurb: 'Patch, hem, alter and make clothes and soft things, by hand or machine.',
        topics: ['Mending', 'Patterns', 'Machines'],
        looks: ['Patches, darns and seams that last', 'Reading and adjusting a pattern', 'Hand stitching and getting along with a machine']
      },
      {
        id: 'bikes', name: 'Bikes', status: 'last',
        blurb: 'True a wheel, tune gears, fix a flat on the road.',
        topics: ['Wheels', 'Gears', 'Flats'],
        looks: ['The few tools that fix most problems', 'Gears and brakes you can adjust yourself', 'Getting home after a flat']
      },
      {
        id: 'carpentry', name: 'Carpentry', status: 'last',
        blurb: 'Read the grain, cut true angles, join without nails.',
        topics: ['Grain', 'Cuts', 'Joinery'],
        looks: ['How wood moves with the seasons', 'Measuring and cutting square', 'Joints that hold without hardware']
      },
      {
        id: 'home-building', name: 'Home-building', status: 'last',
        blurb: 'Timber and metal frames, plus cob, adobe and lime.',
        topics: ['Framing', 'Cob', 'Lime'],
        looks: ['How a frame carries its load', 'Earth and lime walls that breathe', 'Materials that are kinder to build with and live in']
      },
      {
        id: 'interior-design', name: 'Interior design', status: 'last',
        blurb: 'Sunlight, layout, and permanent stations built around your natural habits.',
        topics: ['Sunlight', 'Layout', 'Stations'],
        looks: ['Following the sun through your rooms', 'Layouts that make daily paths easy', 'Stations that sit where your habits already happen']
      },
      {
        id: 'digital', name: 'Digital world', status: 'last',
        blurb: 'Getting online for free and learning anything, with open tools and connection on one side and surveillance and attention-for-profit on the other.',
        topics: ['Needs it meets', 'Free access', 'Good sources', 'Surveillance', 'Open tools'],
        looks: ['Which needs a screen is meeting right now (learning, connection, help) and which it’s pulling from (rest, presence, play)', 'Free internet, computers, printing and Wi-Fi at public libraries, and free or low-cost ways to get connected at home', 'Finding trustworthy information, and free courses, ebooks and databases with a library card', 'Surveillance: what apps, ad trackers, data brokers and cameras collect, and the free settings that cut most of it', 'Open-source tools, repair and keeping old devices going, so digital life serves people instead of profit']
      },
      {
        id: 'death-seasons', name: 'Death & cycles', status: 'last',
        blurb: 'Seasons, death feeding new life, and the peaceful consensus that keeps ecosystems in balance.',
        topics: ['Cycles', 'Renewal', 'Consensus'],
        looks: ['Seasons and the cycles of growth, decay and return', 'How death and decomposition feed new life', 'Consensus and peaceful self-governance in nature']
      }
    ]
  }
];
/* Every lens takes its tier's colour. */
window.MN_TIERS.forEach(function (t) { t.lenses.forEach(function (l) { l.color = t.color; }); });
