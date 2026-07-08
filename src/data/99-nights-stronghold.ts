export type StrongholdSource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type StrongholdSection = {
  title: string;
  intent: 'entry' | 'diamonds' | 'levels' | 'classes' | 'community-signal';
  confidence: 'high' | 'medium' | 'low';
  summary: string;
  do: string[];
  avoid: string[];
  sources: StrongholdSource[];
};

export const ninetyNineNightsStronghold = {
  checkedAt: '2026-07-09',
  summary:
    'Cultist Stronghold is a high-risk structure in 99 Nights in the Forest with repeatable raids, scaling levels, cultist waves, and diamond chest rewards. Use it after you have ranged damage, supplies, and a clear reason to risk the run.',
  sections: [
    {
      title: 'Find and enter the Cultist Stronghold',
      intent: 'entry',
      confidence: 'high',
      summary:
        'The Stronghold is marked by a three-diamond style icon and becomes a real route decision after your campfire progression is high enough.',
      do: [
        'Use the map page first so you know where the Stronghold is relative to camp, food, and safe return routes.',
        'Prepare ranged weapons before entering because the building is guarded by waves of cultists.',
        'Treat the first run as a scouting run if your gear, food, or class setup is weak.',
      ],
      avoid: [
        'Do not enter just because the icon is visible if you cannot handle cultist waves.',
        'Do not assume the Stronghold is a beginner route; source notes call it high-risk.',
      ],
      sources: [
        {
          name: 'Fandom Cultist Stronghold',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Cultist_Stronghold',
          checkedAt: '2026-07-09',
        },
        {
          name: 'Fandom Cultist',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Cultist',
          checkedAt: '2026-07-09',
        },
      ],
    },
    {
      title: 'Use level 1 first if your goal is diamonds',
      intent: 'diamonds',
      confidence: 'high',
      summary:
        'The Diamond Chest reward makes Stronghold attractive, but harder levels do not automatically mean better diamond value.',
      do: [
        'Clear level 1 first and compare the risk to your current class, weapon, and supply route.',
        'Link Stronghold farming with daily quests, badges, and codes instead of relying on one reward path.',
        'Use the gems page to decide whether a code or badge reward is safer before another raid.',
      ],
      avoid: [
        'Do not grind higher levels only for diamonds if the sources still show the same diamond reward.',
        'Do not publish exact hourly farm rates unless a stronger source confirms the current patch.',
      ],
      sources: [
        {
          name: 'Fandom Cultist Stronghold',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Cultist_Stronghold',
          checkedAt: '2026-07-09',
        },
        {
          name: 'Fandom Diamonds',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Diamonds',
          checkedAt: '2026-07-09',
        },
      ],
    },
    {
      title: 'Understand level scaling before level 4',
      intent: 'levels',
      confidence: 'high',
      summary:
        'The Stronghold has four levels, becomes harder after clears, and keeps level 4 difficulty after level 4 is beaten.',
      do: [
        'Expect more danger after every complete raid because the level only increases after completion.',
        'Plan level 3 and level 4 attempts around stronger enemies and larger wave pressure.',
        'Leave the run if food, ammo, or revive safety collapses before the final floor.',
      ],
      avoid: [
        'Do not assume level 4 resets back to level 1 after a clear.',
        'Do not treat multiplayer as always easier; source notes say cultist health and army size can scale with player count.',
      ],
      sources: [
        {
          name: 'Fandom Cultist Stronghold',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Cultist_Stronghold',
          checkedAt: '2026-07-09',
        },
        {
          name: 'Sportskeeda Level 4 guide',
          url: 'https://www.sportskeeda.com/roblox-news/how-clear-level-4-stronghold-99-nights-forest',
          checkedAt: '2026-06-20',
        },
      ],
    },
    {
      title: 'Bring ranged damage and class prep',
      intent: 'classes',
      confidence: 'medium',
      summary:
        'Ranged weapons, wall-peeking, and combat-focused classes are repeated across Stronghold and cultist guidance.',
      do: [
        'Use ranged weapons wherever possible because melee cultists become dangerous in groups.',
        'Pick a class that fits your raid goal: safer clearing, stronger solo damage, or team support.',
        'Review the class tier list before spending diamonds on a Stronghold-focused class.',
      ],
      avoid: [
        'Do not buy an expensive class only for one raid without checking whether it fits your normal survival route.',
        'Do not copy a creator tactic if it depends on gear or event items you do not have.',
      ],
      sources: [
        {
          name: 'Fandom Cultist Stronghold',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Cultist_Stronghold',
          checkedAt: '2026-07-09',
        },
        {
          name: 'Fandom Cultist',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Cultist',
          checkedAt: '2026-07-09',
        },
        {
          name: 'PC Gamer class tier list',
          url: 'https://www.pcgamer.com/roblox/99-nights-in-the-forest-classes/',
          checkedAt: '2026-07-09',
        },
      ],
    },
    {
      title: 'Use Reddit and YouTube as tactic signals',
      intent: 'community-signal',
      confidence: 'low',
      summary:
        'Community posts and videos are useful for discovering player questions, but they should not override source-checked reward or level data.',
      do: [
        'Use videos to spot search demand around diamond farming, level 4 clears, and solo raid tactics.',
        'Use Reddit threads to discover common pain points such as whether level 4 is worth farming.',
        'Promote a tactic only after it matches stronger source data or repeated gameplay evidence.',
      ],
      avoid: [
        'Do not turn a single Reddit comment into a guaranteed farming method.',
        'Do not claim hidden drop rates or exact speedrun timings without patch-specific proof.',
      ],
      sources: [
        {
          name: 'YouTube Stronghold search signal',
          url: 'https://www.youtube.com/results?search_query=99+nights+in+the+forest+cultist+stronghold',
          checkedAt: '2026-06-20',
        },
        {
          name: 'Reddit level 4 discussion',
          url: 'https://www.reddit.com/r/99nightsintheforest/comments/1oe94nl/level_4_cultist_stronghold/',
          checkedAt: '2026-06-20',
        },
      ],
    },
  ] satisfies StrongholdSection[],
};
