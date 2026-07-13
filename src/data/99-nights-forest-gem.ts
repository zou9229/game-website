export type ForestGemSource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type ForestGemRoute = {
  title: string;
  type: 'stronghold' | 'day-100-raid' | 'chests' | 'fragments';
  confidence: 'high' | 'medium';
  summary: string;
  actions: string[];
  cautions: string[];
  sources: ForestGemSource[];
};

export type ForestGemUse = {
  name: string;
  type: 'bench-upgrade' | 'tier-5-craft' | 'conversion';
  materials: string[];
  effect: string;
  decision: string;
  sources: ForestGemSource[];
};

const fandomGemSource: ForestGemSource = {
  name: 'Fandom Gem of the Forest',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Gem_of_the_Forest',
  checkedAt: '2026-07-13',
};

const fandomCraftingSource: ForestGemSource = {
  name: 'Fandom Crafting',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Crafting',
  checkedAt: '2026-07-13',
};

const fandomStrongholdSource: ForestGemSource = {
  name: 'Fandom Cultist Stronghold',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Cultist_Stronghold',
  checkedAt: '2026-07-13',
};

const gamesRadarCraftingSource: ForestGemSource = {
  name: 'GamesRadar crafting guide',
  url: 'https://www.gamesradar.com/games/simulation/99-nights-in-the-forest-crafting-recipes-perks-bench-upgrade/',
  checkedAt: '2026-07-13',
};

export const ninetyNineNightsForestGem = {
  checkedAt: '2026-07-13',
  summary:
    'Gem of the Forest is a late-game 99 Nights in the Forest crafting material used for Crafting Bench Level 5 and Tier 5 crafts. It is separate from the normal gems or diamonds used for classes and code rewards.',
  sourceNote:
    'Fandom is the primary source for Forest Gem sources, fragments, and Tier 5 uses. GamesRadar is used as a second source for the Crafting Bench Level 5 upgrade cost.',
  routes: [
    {
      title: 'Raid the Cultist Stronghold',
      type: 'stronghold',
      confidence: 'high',
      summary:
        'Fandom lists Gem of the Forest as one of the rewards tied to defeating the Cultist Stronghold.',
      actions: [
        'Use the Stronghold page before attempting this route because cultist waves and scaling levels can end weak runs.',
        'Bring ranged damage, food, and recovery before treating Stronghold as a Forest Gem route.',
        'Plan the return path before entering so the reward does not turn into a lost run.',
      ],
      cautions: [
        'Do not treat Stronghold as a beginner farm route.',
        'Do not assume every Stronghold run is worth the risk if your route is still missing food, ammo, or revives.',
      ],
      sources: [fandomGemSource, fandomStrongholdSource],
    },
    {
      title: 'Farm Day 100+ nighttime raid fragments',
      type: 'day-100-raid',
      confidence: 'high',
      summary:
        'Fandom says Forest Gem fragments can be found by defeating cultists in nighttime raids after day 100.',
      actions: [
        'Treat this as a long-run objective, not an early-game checklist item.',
        'Prepare recovery and base safety before intentionally pushing into late nights.',
        'Track fragments until you have enough to combine into a full Forest Gem.',
      ],
      cautions: [
        'Do not build a page or route around exact drop rates because the checked source does not publish a stable rate.',
        'Do not push day 100 just for fragments if your base cannot survive normal night pressure.',
      ],
      sources: [fandomGemSource],
    },
    {
      title: 'Check Golden and Ruby Chest rewards',
      type: 'chests',
      confidence: 'medium',
      summary:
        'Fandom lists Golden or Ruby Chests as possible Forest Gem sources and says Ruby Chest can provide it as an extra drop.',
      actions: [
        'Use chest routes as bonus value while you are already doing late-game objectives.',
        'Keep this route secondary until stronger sources confirm exact chest odds.',
        'Link chest planning with Stronghold and map routes instead of chasing random containers blindly.',
      ],
      cautions: [
        'Do not claim a guaranteed Forest Gem from every chest.',
        'Do not publish a drop-rate table without patch-specific proof.',
      ],
      sources: [fandomGemSource],
    },
    {
      title: 'Combine 4 Forest Gem fragments',
      type: 'fragments',
      confidence: 'high',
      summary:
        'Fandom says a full Gem of the Forest can be made by dragging 4 Forest Gem fragments into each other.',
      actions: [
        'Save fragments until you can combine a full gem.',
        'Decide the spend before combining if your team is split between Bench 5 and a Tier 5 craft.',
        'Use the Crafting Bench 5 page once the full gem is ready.',
      ],
      cautions: [
        'Do not confuse Forest Gem fragments with normal diamond or code rewards.',
        'Do not spend the first full Forest Gem without choosing the run failure point you need to solve.',
      ],
      sources: [fandomGemSource],
    },
  ] satisfies ForestGemRoute[],
  uses: [
    {
      name: 'Crafting Bench Level 5',
      type: 'bench-upgrade',
      materials: ['50 Wood', '50 Scrap', '1 Gem of the Forest'],
      effect:
        'Unlocks the Tier 5 crafting bench options after the route can afford the Wood, Scrap, and Forest Gem cost.',
      decision:
        'Best first spend when your team needs access to multiple Tier 5 options rather than one immediate effect.',
      sources: [fandomCraftingSource, gamesRadarCraftingSource],
    },
    {
      name: 'Respawn Capsule',
      type: 'tier-5-craft',
      materials: ['40 Wood', '40 Scrap', '1 Gem of the Forest'],
      effect:
        'After charging, automatically respawns the most recent dead player inside it.',
      decision:
        'Best when deaths are the main reason your long runs fail, especially in solo or small-team routes.',
      sources: [fandomCraftingSource],
    },
    {
      name: 'Temporal Accelerometer',
      type: 'tier-5-craft',
      materials: ['40 Wood', '40 Scrap', '1 Gem of the Forest'],
      effect: 'After charging, skips the next night.',
      decision:
        'Best for speedrun pacing or routes where night pressure wastes more value than death risk.',
      sources: [fandomCraftingSource],
    },
    {
      name: 'Weather Machine',
      type: 'tier-5-craft',
      materials: ['40 Wood', '40 Scrap', '1 Gem of the Forest'],
      effect: 'After charging, stops rain and thunderstorms for the next three days.',
      decision:
        'Best when storms are the blocker for fuel, travel, or base safety.',
      sources: [fandomCraftingSource],
    },
    {
      name: 'Recycler',
      type: 'conversion',
      materials: ['40 Wood', '40 Scrap', '1 Gem of the Forest'],
      effect:
        'Fandom currently lists Recycler as a Tier 5 craft that can convert Gem of the Forest into Cultist Gems and Cultist Gems into Scrap.',
      decision:
        'Best only when conversion value matters more than recovery, night skipping, or weather control.',
      sources: [fandomCraftingSource],
    },
  ] satisfies ForestGemUse[],
};
