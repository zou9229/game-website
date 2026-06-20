export type CraftingBench5Source = {
  name: string;
  url: string;
  checkedAt: string;
};

export type CraftingBench5Requirement = {
  label: string;
  detail: string;
  sources: CraftingBench5Source[];
};

export type CraftingBench5Recipe = {
  name: string;
  bestFor: 'solo' | 'speedrun' | 'weather' | 'long-run';
  materials: string[];
  effect: string;
  recommendation: string;
  cautions: string[];
  sources: CraftingBench5Source[];
};

export type CraftingBench5Section = {
  title: string;
  intent: 'unlock' | 'gem-route' | 'first-craft' | 'source-note';
  confidence: 'high' | 'medium';
  summary: string;
  actions: string[];
  sources: CraftingBench5Source[];
};

const fandomCraftingSource: CraftingBench5Source = {
  name: 'Fandom Crafting',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Crafting',
  checkedAt: '2026-06-21',
};

const fandomGemSource: CraftingBench5Source = {
  name: 'Fandom Gem of the Forest',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Gem_of_the_Forest',
  checkedAt: '2026-06-21',
};

const gamesRadarCraftingSource: CraftingBench5Source = {
  name: 'GamesRadar crafting recipes',
  url: 'https://www.gamesradar.com/games/simulation/99-nights-in-the-forest-crafting-recipes-perks-bench-upgrade/',
  checkedAt: '2026-06-21',
};

const redditDecisionSource: CraftingBench5Source = {
  name: 'Reddit player decision thread',
  url: 'https://www.reddit.com/r/99nightsintheforest/comments/1r5zzmi/what_do_you_craft_on_level_5_crafting_bench/',
  checkedAt: '2026-06-21',
};

export const ninetyNineNightsCraftingBench5 = {
  checkedAt: '2026-06-21',
  summary:
    'Crafting Bench 5 is the late-game 99 Nights in the Forest workbench upgrade that costs heavy Wood, Scrap, and a Gem of the Forest. It unlocks high-impact crafts such as Respawn Capsule, Temporal Accelerometer, and Weather Machine.',
  sourceNote:
    'Fandom and GamesRadar agree on the Crafting Bench 5 upgrade cost. Fandom is used for exact Tier 5 recipe effects and materials. Reddit is used only as a player-priority signal, not as a factual source.',
  requirements: [
    {
      label: '50 Wood',
      detail:
        'The level 5 bench upgrade requires a large Wood stockpile, so plan it after core camp and route crafts are stable.',
      sources: [fandomCraftingSource, gamesRadarCraftingSource],
    },
    {
      label: '50 Scrap',
      detail:
        'Some guides describe Scrap using bolt wording, but this site normalizes the material as Scrap to match the existing crafting data model.',
      sources: [fandomCraftingSource, gamesRadarCraftingSource],
    },
    {
      label: '1 Gem of the Forest',
      detail:
        'The Gem of the Forest is the real bottleneck. Fandom lists it as the material used for Crafting Bench Level 5 and the Tier 5 recipes.',
      sources: [fandomCraftingSource, fandomGemSource, gamesRadarCraftingSource],
    },
  ] satisfies CraftingBench5Requirement[],
  recipes: [
    {
      name: 'Respawn Capsule',
      bestFor: 'solo',
      materials: ['40 Wood', '40 Scrap', '1 Gem of the Forest'],
      effect:
        'After charging, it automatically respawns the most recent dead player inside it.',
      recommendation:
        'Best first pick for solo or small-team safety when one death can end the run.',
      cautions: [
        'It is not a replacement for carrying bandages or medkits before the capsule is charged.',
        'The Forest Gem cost makes it a serious late-run decision.',
      ],
      sources: [fandomCraftingSource, fandomGemSource, redditDecisionSource],
    },
    {
      name: 'Temporal Accelerometer',
      bestFor: 'speedrun',
      materials: ['40 Wood', '40 Scrap', '1 Gem of the Forest'],
      effect: 'After charging, it skips the next night.',
      recommendation:
        'Best for speedrun-style progression, day-count control, and routes that already have recovery covered.',
      cautions: [
        'Skipping a night helps pacing, but it does not solve weak food, fuel, or revive planning.',
        'Choose it after the route can survive without extra recovery insurance.',
      ],
      sources: [fandomCraftingSource, fandomGemSource, redditDecisionSource],
    },
    {
      name: 'Weather Machine',
      bestFor: 'weather',
      materials: ['40 Wood', '40 Scrap', '1 Gem of the Forest'],
      effect:
        'After charging, it stops rain and thunderstorms for the next three days.',
      recommendation:
        'Best when storms are disrupting fuel, travel, or base safety in long routes.',
      cautions: [
        'It is weaker than Respawn Capsule if deaths are the main failure point.',
        'Do not craft it just because it is unlocked; craft it when weather is the actual blocker.',
      ],
      sources: [fandomCraftingSource, fandomGemSource, redditDecisionSource],
    },
  ] satisfies CraftingBench5Recipe[],
  sections: [
    {
      title: 'Unlock Crafting Bench 5 only after the route is stable',
      intent: 'unlock',
      confidence: 'high',
      summary:
        'The upgrade cost is high enough that rushing it can weaken food, fuel, walls, or revive planning.',
      actions: [
        'Finish early navigation and recovery crafts before saving for level 5.',
        'Bank 50 Wood and 50 Scrap without draining campfire and base safety.',
        'Treat the Forest Gem as the limiting material, not the common materials.',
      ],
      sources: [fandomCraftingSource, gamesRadarCraftingSource],
    },
    {
      title: 'Plan a Gem of the Forest route before upgrading',
      intent: 'gem-route',
      confidence: 'high',
      summary:
        'Gem of the Forest is tied to high-risk or late progression sources, so Bench 5 belongs after Stronghold and long-run planning.',
      actions: [
        'Use the Stronghold page before deciding whether the route is ready for gem farming.',
        'Track Gem of the Forest fragments because four fragments can be combined into one gem.',
        'Do not spend the first Forest Gem until you know whether Bench 5 or a Tier 5 recipe matters more.',
      ],
      sources: [fandomGemSource],
    },
    {
      title: 'Choose the first Tier 5 craft by failure point',
      intent: 'first-craft',
      confidence: 'medium',
      summary:
        'The right first recipe depends on what ends your run: death, slow nights, or weather pressure.',
      actions: [
        'Pick Respawn Capsule when death or solo recovery is the main risk.',
        'Pick Temporal Accelerometer for speedrun pacing or night skipping.',
        'Pick Weather Machine when rain and thunderstorms are blocking longer objectives.',
      ],
      sources: [fandomCraftingSource, redditDecisionSource],
    },
    {
      title: 'Normalize source wording before comparing costs',
      intent: 'source-note',
      confidence: 'medium',
      summary:
        'Some media uses Logs/Wood or Bolts/Scrap wording. This page keeps Wood and Scrap in the UI to match the site cluster.',
      actions: [
        'Use Fandom and GamesRadar for the checked Bench 5 cost.',
        'Treat Reddit as a decision signal, not a recipe authority.',
        'Recheck the page after major crafting or biome updates.',
      ],
      sources: [fandomCraftingSource, gamesRadarCraftingSource, redditDecisionSource],
    },
  ] satisfies CraftingBench5Section[],
};
