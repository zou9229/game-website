export type CraftingSource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type CraftingItem = {
  name: string;
  tier: 'starter' | 'tier-2' | 'tier-3' | 'tier-4' | 'tier-5' | 'tool-workshop';
  role:
    | 'navigation'
    | 'base'
    | 'food'
    | 'recovery'
    | 'fuel'
    | 'combat'
    | 'late-game';
  priority: 'first' | 'early' | 'mid-run' | 'late-run' | 'situational';
  materials: string[];
  why: string;
  caution: string;
  sources: CraftingSource[];
};

export type CraftingSection = {
  title: string;
  intent: 'starter-route' | 'base-defense' | 'food-recovery' | 'fuel-weather' | 'late-game';
  confidence: 'high' | 'medium';
  summary: string;
  actions: string[];
  items: string[];
};

const fandomCraftingSource: CraftingSource = {
  name: 'Fandom Crafting',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Crafting',
  checkedAt: '2026-06-20',
};

const pcGamerTipsSource: CraftingSource = {
  name: 'PC Gamer survival tips',
  url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-tips/',
  checkedAt: '2026-06-20',
};

const pcGamerBandagesSource: CraftingSource = {
  name: 'PC Gamer bandage guide',
  url: 'https://www.pcgamer.com/games/survival-crafting/roblox-99-nights-in-the-forest-bandages/',
  checkedAt: '2026-06-20',
};

const fandomItemsSource: CraftingSource = {
  name: 'Fandom Items',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Items',
  checkedAt: '2026-06-20',
};

export const ninetyNineNightsCrafting = {
  checkedAt: '2026-06-20',
  summary:
    'Crafting in 99 Nights in the Forest decides how safely you can explore, defend camp, recover teammates, farm diamonds, and survive late-game objectives. This page focuses on priority order and source-checked key crafts rather than claiming a complete realtime recipe table.',
  sourceNote:
    'Fandom provides the main crafting tier data. PC Gamer is used for route priority, bandage crafting, and practical survival context. Community and video sources are treated as demand signals unless they match stronger sources.',
  items: [
    {
      name: 'Map',
      tier: 'starter',
      role: 'navigation',
      priority: 'first',
      materials: ['3 Wood'],
      why: 'PC Gamer highlights the map as an early craft because it lets you plan routes beyond camp.',
      caution:
        'A map helps planning, but it does not make dangerous routes safe by itself.',
      sources: [pcGamerTipsSource],
    },
    {
      name: 'Compass',
      tier: 'tier-2',
      role: 'navigation',
      priority: 'early',
      materials: ['3 Scrap'],
      why: 'Fandom says the Compass shows direction information for the Fairy and missing children, which makes it a strong route-planning craft.',
      caution:
        'Craft it after stabilizing basic camp needs; it is a navigation tool, not combat protection.',
      sources: [fandomCraftingSource, pcGamerTipsSource],
    },
    {
      name: 'Sun Dial',
      tier: 'tier-2',
      role: 'navigation',
      priority: 'early',
      materials: ['5 Scrap'],
      why: 'Fandom says the Sun Dial shows how much time is left until day or night.',
      caution:
        'It is most useful when you actually return before night pressure becomes dangerous.',
      sources: [fandomCraftingSource, pcGamerTipsSource],
    },
    {
      name: 'Farm Plot',
      tier: 'tier-2',
      role: 'food',
      priority: 'early',
      materials: ['20 Wood'],
      why: 'Fandom lists Farm Plot as a crop source, and PC Gamer places farm plots before pushing deeper bench upgrades.',
      caution:
        'Do not spend all wood on farming if your campfire and base defense are still weak.',
      sources: [fandomCraftingSource, pcGamerTipsSource],
    },
    {
      name: 'Log Wall or Log Gate',
      tier: 'tier-2',
      role: 'base',
      priority: 'early',
      materials: ['20 Wood'],
      why: 'Fandom lists both as base fortification crafts that can be placed more than once.',
      caution:
        'Walls help only if you still manage wood, fire, and enemy pathing carefully.',
      sources: [fandomCraftingSource],
    },
    {
      name: 'Crafting Bench Tier 3',
      tier: 'tier-2',
      role: 'late-game',
      priority: 'early',
      materials: ['15 Wood', '10 Scrap'],
      why: 'Unlocks Tier 3 crafts such as Crock Pot, Biofuel Processor, Torch, Lightning Rod, and Good Bed.',
      caution:
        'Upgrade after basic map and survival needs; rushing bench upgrades without supplies can strand the route.',
      sources: [fandomCraftingSource, pcGamerTipsSource],
    },
    {
      name: 'Crock Pot',
      tier: 'tier-3',
      role: 'food',
      priority: 'mid-run',
      materials: ['15 Wood', '10 Scrap'],
      why: 'Fandom says the Crock Pot combines food to make stew, and PC Gamer treats it as part of the Tier 3 survival route.',
      caution:
        'Food recipes and seasonal dishes can change; this page does not claim a complete cooking list.',
      sources: [fandomCraftingSource, pcGamerTipsSource],
    },
    {
      name: 'Biofuel Processor',
      tier: 'tier-3',
      role: 'fuel',
      priority: 'mid-run',
      materials: ['12 Wood', '12 Scrap'],
      why: 'Fandom says it turns logs, pelts, and some food into biofuel, making it relevant when fuel pressure increases.',
      caution:
        'Do not convert scarce food or materials blindly; fuel planning depends on your route.',
      sources: [fandomCraftingSource],
    },
    {
      name: 'Lightning Rod',
      tier: 'tier-3',
      role: 'base',
      priority: 'mid-run',
      materials: ['8 Scrap'],
      why: 'Fandom lists Lightning Rod as a storm safety craft, and PC Gamer calls it important before rough storms.',
      caution:
        'It does not replace safe timing; storms can still disrupt routes and visibility.',
      sources: [fandomCraftingSource, pcGamerTipsSource],
    },
    {
      name: 'Bandage',
      tier: 'tool-workshop',
      role: 'recovery',
      priority: 'mid-run',
      materials: [
        'Campfire Level 4',
        'Upgraded axe or chainsaw',
        '2 Rabbit Foot',
        '2 Wolf Pelt',
      ],
      why: 'PC Gamer says bandages are a priority recovery item for revives and can be crafted at the Anvil / Tool Workshop route.',
      caution:
        'Costs can matter, and PC Gamer notes the resource cost increases after crafts. Save recovery items for revives and emergencies.',
      sources: [pcGamerBandagesSource, pcGamerTipsSource],
    },
    {
      name: 'Ammo Crate',
      tier: 'tier-4',
      role: 'combat',
      priority: 'late-run',
      materials: ['20 Wood', '30 Scrap', '1 Cultist Gem'],
      why: 'Fandom lists Ammo Crate as a Tier 4 craft that lets players buy ammo with Scrap.',
      caution:
        'This only matters once you are using ranged weapons enough to justify the gem cost.',
      sources: [fandomCraftingSource],
    },
    {
      name: 'Oil Drill',
      tier: 'tier-4',
      role: 'fuel',
      priority: 'late-run',
      materials: ['25 Wood', '35 Scrap', '1 Cultist Gem'],
      why: 'Fandom lists Oil Drill as a Tier 4 craft that periodically drills for oil barrels.',
      caution:
        'The Cultist Gem cost means you should connect this decision to Stronghold or other gem-fragment routes.',
      sources: [fandomCraftingSource, fandomItemsSource],
    },
    {
      name: 'Teleporter',
      tier: 'tier-4',
      role: 'late-game',
      priority: 'situational',
      materials: ['15 Wood', '25 Scrap', '1 Cultist Gem'],
      why: 'Fandom lists Teleporter as a Tier 4 craft for teleporting across the map when multiple teleporters are placed.',
      caution:
        'Only craft it when your map route is developed enough to benefit from fixed travel points.',
      sources: [fandomCraftingSource, fandomItemsSource],
    },
    {
      name: 'Respawn Capsule',
      tier: 'tier-5',
      role: 'recovery',
      priority: 'late-run',
      materials: ['40 Wood', '40 Scrap', '1 Forest Gem'],
      why: 'Fandom lists Respawn Capsule as a Tier 5 craft that can automatically respawn a recently dead player after charging.',
      caution:
        'Forest Gem requirements push this into late-game planning, not early survival.',
      sources: [fandomCraftingSource, fandomItemsSource],
    },
  ] satisfies CraftingItem[],
  sections: [
    {
      title: 'Craft map, compass, and timing tools before long routes',
      intent: 'starter-route',
      confidence: 'high',
      summary:
        'Navigation crafts reduce failed exploration loops and connect directly to missing kids, Stronghold, and resource routes.',
      actions: [
        'Craft the map early so route decisions are not blind.',
        'Use Compass and Sun Dial when you start pushing farther from camp.',
        'Pair navigation crafts with the map guide instead of treating them as combat tools.',
      ],
      items: ['Map', 'Compass', 'Sun Dial'],
    },
    {
      title: 'Use wood for both survival and base defense',
      intent: 'base-defense',
      confidence: 'high',
      summary:
        'Crafting can protect camp, but wood is also needed for fire and progression. Spend it deliberately.',
      actions: [
        'Use Log Wall or Log Gate when camp pressure becomes a route risk.',
        'Add Farm Plot after the route can spare wood for food stability.',
        'Keep wood rain storage and shelves as organization choices, not emergency priorities.',
      ],
      items: ['Farm Plot', 'Log Wall or Log Gate'],
    },
    {
      title: 'Turn Tier 3 into food and recovery stability',
      intent: 'food-recovery',
      confidence: 'high',
      summary:
        'Crafting Bench Tier 3 opens core mid-run survival options, while bandages support revive planning.',
      actions: [
        'Upgrade to Crafting Bench Tier 3 once early camp needs are under control.',
        'Use Crock Pot for food planning instead of wasting recovery items for hunger pressure.',
        'Save bandages and medkits for revives, team saves, and high-risk routes.',
      ],
      items: ['Crafting Bench Tier 3', 'Crock Pot', 'Bandage'],
    },
    {
      title: 'Prepare fuel and weather tools before harder objectives',
      intent: 'fuel-weather',
      confidence: 'high',
      summary:
        'Biofuel Processor and Lightning Rod are mid-run stabilizers before longer map pushes or Stronghold attempts.',
      actions: [
        'Use Biofuel Processor when fuel becomes harder than simple wood feeding.',
        'Craft Lightning Rod before storm pressure ruins a serious route.',
        'Review survival guide priorities before spending materials on optional utility.',
      ],
      items: ['Biofuel Processor', 'Lightning Rod'],
    },
    {
      title: 'Spend Cultist Gem and Forest Gem crafts late',
      intent: 'late-game',
      confidence: 'medium',
      summary:
        'Tier 4 and Tier 5 crafts can be powerful, but their gem costs tie them to Stronghold and late-game route planning.',
      actions: [
        'Use Stronghold and gems pages before spending Cultist Gems on Tier 4 crafts.',
        'Pick Ammo Crate if ranged combat is central to your route.',
        'Treat Respawn Capsule as late-run recovery, not a day-one objective.',
      ],
      items: ['Ammo Crate', 'Oil Drill', 'Teleporter', 'Respawn Capsule'],
    },
  ] satisfies CraftingSection[],
};
