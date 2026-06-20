export type ForestGemFragmentSource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type ForestGemFragmentRule = {
  title: string;
  type: 'source' | 'combine' | 'limit' | 'spend';
  confidence: 'high' | 'medium';
  summary: string;
  details: string[];
  sources: ForestGemFragmentSource[];
};

export type ForestGemFragmentStep = {
  title: string;
  stage: 'before-day-100' | 'day-100-raid' | 'combine' | 'spend';
  summary: string;
  do: string[];
  avoid: string[];
  sources: ForestGemFragmentSource[];
};

const fandomGemSource: ForestGemFragmentSource = {
  name: 'Fandom Gem of the Forest',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Gem_of_the_Forest',
  checkedAt: '2026-06-21',
};

const fandomStrongholdSource: ForestGemFragmentSource = {
  name: 'Fandom Cultist Stronghold',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Cultist_Stronghold',
  checkedAt: '2026-06-21',
};

const fandomCraftingSource: ForestGemFragmentSource = {
  name: 'Fandom Crafting',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Crafting',
  checkedAt: '2026-06-21',
};

export const ninetyNineNightsForestGemFragments = {
  checkedAt: '2026-06-21',
  summary:
    'Forest Gem fragments are the source-checked way to build toward a full Gem of the Forest in long 99 Nights in the Forest runs. The important facts are simple: fragments are tied to Day 100+ nighttime raid cultists, and 4 fragments can be combined into 1 full Forest Gem.',
  sourceNote:
    'This page uses Fandom for the fragment source and combine rule. It does not publish drop rates, hourly farming estimates, or guaranteed chest claims because the checked source does not provide stable odds.',
  rules: [
    {
      title: 'Fragments come from Day 100+ nighttime raid cultists',
      type: 'source',
      confidence: 'high',
      summary:
        'Fandom says Forest Gem fragments can be found by defeating cultists in nighttime raids after day 100.',
      details: [
        'This makes fragments a long-run objective, not a beginner route.',
        'The checked source ties the fragment route to nighttime raids after day 100.',
        'Use the Stronghold and survival pages before intentionally pushing late nights.',
      ],
      sources: [fandomGemSource],
    },
    {
      title: '4 fragments combine into 1 Gem of the Forest',
      type: 'combine',
      confidence: 'high',
      summary:
        'Fandom says a full Gem of the Forest can be made by dragging 4 Forest Gem fragments into each other.',
      details: [
        'Track fragment count separately from normal gems, diamonds, and codes.',
        'Do not spend the resulting full gem until the team has chosen a Tier 5 goal.',
        'Use the Gem of the Forest page for the full source list and spend comparison.',
      ],
      sources: [fandomGemSource],
    },
    {
      title: 'Drop rates are not confirmed',
      type: 'limit',
      confidence: 'high',
      summary:
        'The checked data confirms the route, but not a stable fragment drop percentage or per-hour farm rate.',
      details: [
        'Avoid exact odds unless a patch-specific source publishes them.',
        'Treat YouTube or Reddit farm claims as tactic signals, not final numbers.',
        'Write down route results locally if you are testing, but do not assume every run matches.',
      ],
      sources: [fandomGemSource, fandomStrongholdSource],
    },
    {
      title: 'The first full Forest Gem should have a spend plan',
      type: 'spend',
      confidence: 'medium',
      summary:
        'A full Gem of the Forest can unlock Crafting Bench Level 5 or fund one Tier 5 craft, so the first spend matters.',
      details: [
        'Bench 5 is the flexible unlock if the team wants multiple Tier 5 options.',
        'Respawn Capsule is the safer spend when death ends the route.',
        'Temporal Accelerometer, Weather Machine, and Recycler are more situational.',
      ],
      sources: [fandomGemSource, fandomCraftingSource],
    },
  ] satisfies ForestGemFragmentRule[],
  steps: [
    {
      title: 'Do not chase fragments before the route is stable',
      stage: 'before-day-100',
      summary:
        'Before Day 100, the better goal is building a camp and recovery route that can actually survive late nights.',
      do: [
        'Stabilize food, fuel, map planning, and revive resources first.',
        'Use bandages and survival pages to reduce avoidable late-run deaths.',
        'Keep Stronghold and Forest Gem pages open as the route moves into late objectives.',
      ],
      avoid: [
        'Do not burn resources pushing Day 100 if normal night pressure still breaks the run.',
        'Do not confuse normal code gems with Forest Gem fragments.',
      ],
      sources: [fandomGemSource],
    },
    {
      title: 'Treat Day 100+ nighttime raids as the fragment route',
      stage: 'day-100-raid',
      summary:
        'The checked fragment source is defeating cultists in nighttime raids after day 100.',
      do: [
        'Prepare ranged damage and recovery before the night starts.',
        'Plan a safe loop back to camp before cultist pressure escalates.',
        'Record fragments after each raid so you know when a full gem is possible.',
      ],
      avoid: [
        'Do not claim a guaranteed fragment from every cultist.',
        'Do not use unverified drop-rate tables as if they are current patch data.',
      ],
      sources: [fandomGemSource, fandomStrongholdSource],
    },
    {
      title: 'Combine fragments only when the spend is clear',
      stage: 'combine',
      summary:
        'Four fragments can become one full Gem of the Forest, but combining should lead into a concrete Bench 5 or Tier 5 decision.',
      do: [
        'Confirm you have 4 fragments before planning a full gem spend.',
        'Compare Bench 5 against direct Tier 5 crafts before committing.',
        'Keep the full gem for the route problem that is actually ending runs.',
      ],
      avoid: [
        'Do not craft the first full gem without knowing whether recovery, night skipping, weather, or conversion matters most.',
        'Do not treat the combine rule as a reason to ignore normal survival prep.',
      ],
      sources: [fandomGemSource, fandomCraftingSource],
    },
    {
      title: 'Spend the full gem by failure point',
      stage: 'spend',
      summary:
        'The best use is the one that fixes the route: unlock options, stop deaths, skip nights, control storms, or convert materials.',
      do: [
        'Pick Crafting Bench Level 5 when access to all Tier 5 choices matters.',
        'Pick Respawn Capsule when deaths are the main failure point.',
        'Use Weather Machine, Temporal Accelerometer, or Recycler only when their specific effect solves the route.',
      ],
      avoid: [
        'Do not copy a creator spend if your run fails for a different reason.',
        'Do not spend a full Forest Gem on conversion unless conversion is worth more than safety.',
      ],
      sources: [fandomCraftingSource, fandomGemSource],
    },
  ] satisfies ForestGemFragmentStep[],
};
