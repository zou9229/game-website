export type BadgeSource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type BadgeCluster = {
  title: string;
  intent: 'starter' | 'progression' | 'challenge' | 'secret';
  confidence: 'high' | 'medium';
  summary: string;
  examples: string[];
  notes: string[];
  sources: BadgeSource[];
};

export const ninetyNineNightsBadges = {
  checkedAt: '2026-07-13',
  summary:
    'Badges are achievement goals in 99 Nights in the Forest. They matter for SEO users because badge rewards connect survival goals, class progression, and free diamond searches.',
  rewardNote:
    'The community wiki lists badges as first-time diamond rewards and continues to change with game updates. Treat exact totals as source-checked wiki data, not an official guarantee.',
  clusters: [
    {
      title: 'Starter badges to collect first',
      intent: 'starter',
      confidence: 'medium',
      summary:
        'Start with low-friction badges that overlap normal survival, campfire, combat, and first-team actions.',
      examples: [
        'Survive 10, 20, 30, and 40 days as early milestone targets.',
        'Combat for defending the campfire from cultists.',
        'Gardening, Apprenticeship, Firemaking I, First Aid, and Free Throwing as simple side objectives.',
      ],
      notes: [
        'Starter badges are useful because they teach the route while also creating small diamond rewards.',
        'Do not chase badge-only tasks before the campfire and food route are stable.',
      ],
      sources: [
        {
          name: '99 Nights in the Forest Wiki badge list',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Badges',
          checkedAt: '2026-07-13',
        },
      ],
    },
    {
      title: 'Progression badges for longer runs',
      intent: 'progression',
      confidence: 'medium',
      summary:
        'Longer survival, campfire upgrades, daily quests, tools, and rescue routes become the next badge layer.',
      examples: [
        'Survive 50 through 100 days as the main survival ladder.',
        'Firemaking II, III, and IV for campfire upgrade progress.',
        'Orienteering, Toolfinding, Errands, Botany, Scholarship, and Blessing goals for longer routes.',
      ],
      notes: [
        'Progression badges are better planned around a survival guide than rushed individually.',
        'These targets overlap with class choice, animals, exploration, and team roles.',
      ],
      sources: [
        {
          name: '99 Nights in the Forest Wiki badge list',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Badges',
          checkedAt: '2026-07-13',
        },
        {
          name: 'MuMuPlayer all badges guide',
          url: 'https://www.mumuplayer.com/blog/roblox-99-nights-in-the-forest-guide-to-all-badges.html',
          checkedAt: '2026-06-20',
        },
      ],
    },
    {
      title: 'Challenge badges that need preparation',
      intent: 'challenge',
      confidence: 'medium',
      summary:
        'Boss, biome, and restriction badges should wait until you have gear, supplies, and a stable route.',
      examples: [
        'Beastmaster for defeating the Frog King.',
        'Usurpation for defeating the Cultist King.',
        'Infiltration for clearing the Cultist Stronghold.',
        'Vegetarian, Carnivory, Self Preservation, and hard-mode survival goals for challenge runs.',
      ],
      notes: [
        'These badges are higher risk because a failed attempt can consume a full run.',
        'Use the survival and class pages before deciding which challenge to attempt.',
      ],
      sources: [
        {
          name: '99 Nights in the Forest Wiki badge list',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Badges',
          checkedAt: '2026-07-13',
        },
        {
          name: 'Times of India Hunting Badge guide',
          url: 'https://timesofindia.indiatimes.com/sports/esports/news/how-to-get-hunting-badge-in-99-nights-in-the-forest/articleshow/122132174.cms',
          checkedAt: '2026-06-20',
        },
      ],
    },
    {
      title: 'Humiliation Badge diamond route',
      intent: 'secret',
      confidence: 'high',
      summary:
        'PC Gamer identifies the Humiliation Badge secret action as dying to your own bear traps and reports a four-diamond reward.',
      examples: [
        'Upgrade to Crafting Bench 2.',
        'Collect enough scrap for bear traps.',
        'Use a private or throwaway run because the goal intentionally ends the run.',
      ],
      notes: [
        'This is not a normal survival route; it is a badge-specific diamond route.',
        'If another enemy deals the final damage, the badge condition may fail according to the source test notes.',
      ],
      sources: [
        {
          name: 'PC Gamer Humiliation Badge guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-secret-action-humiliation-badge/',
          checkedAt: '2026-07-13',
        },
      ],
    },
  ] satisfies BadgeCluster[],
};
