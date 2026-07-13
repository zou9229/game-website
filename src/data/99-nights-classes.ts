export type ClassTier = 'S' | 'A' | 'B' | 'C' | 'D' | 'Event';

export type ClassTierGroup = {
  tier: ClassTier;
  label: string;
  summary: string;
  classes: string[];
};

export const ninetyNineNightsClasses = {
  checkedAt: '2026-07-13',
  source: {
    name: 'PC Gamer',
    url: 'https://www.pcgamer.com/roblox/99-nights-in-the-forest-classes/',
    lastUpdated: '2025-12-21',
    checkedAt: '2026-07-13',
  },
  recommendations: [
    {
      title: 'Best starter path',
      classes: ['Scavenger', 'Lumberjack', 'Explorer', 'Alien'],
      note: 'PC Gamer recommends learning the basics with a cheap class before saving for stronger long-term options.',
    },
    {
      title: 'Best solo direction',
      classes: ['Cyborg', 'Big Game Hunter', 'Necromancer'],
      note: 'Cyborg is the safest all-around solo target, while Big Game Hunter and Necromancer are late-run options.',
    },
    {
      title: 'Best co-op support mix',
      classes: ['Lumberjack', 'Chef', 'Blacksmith', 'Base Defender'],
      note: 'Support classes help larger teams avoid resource pressure as difficulty scales.',
    },
  ],
  tiers: [
    {
      tier: 'S',
      label: 'S-Tier',
      summary:
        'Top late-run and high-impact classes for players who can afford premium unlocks.',
      classes: ['Big Game Hunter', 'Cyborg', 'Necromancer', 'Vampire'],
    },
    {
      tier: 'A',
      label: 'A-Tier',
      summary:
        'Strong choices for solo, co-op, speed, resource support, or specialized damage.',
      classes: [
        'Assassin',
        'Beastmaster',
        'Brawler',
        'Chef',
        'Explorer',
        'Fire Bandit',
        'Gambler',
        'Lumberjack',
      ],
    },
    {
      tier: 'B',
      label: 'B-Tier',
      summary:
        'Useful classes with tradeoffs, narrower roles, or heavier setup requirements.',
      classes: [
        'Alien',
        'Berserker',
        'Blacksmith',
        'Brute',
        'Poison Master',
        'Pyromaniac',
        'Snowman',
        'Witch',
      ],
    },
    {
      tier: 'C',
      label: 'C-Tier',
      summary:
        'Niche classes that usually need a team plan or a specific objective to justify the slot.',
      classes: [
        'Base Defender',
        'Cook',
        'Farmer',
        'Fisherman',
        'Medic',
        'Ranger',
        'Scavenger',
        'Undead',
      ],
    },
    {
      tier: 'D',
      label: 'D-Tier',
      summary:
        'Low-impact picks that are usually outclassed once enough diamonds are available.',
      classes: ['Camper', 'Decorator', 'Support', 'Hunter', 'Zookeeper'],
    },
    {
      tier: 'Event',
      label: 'Event Classes',
      summary:
        'Limited-time classes that are useful mainly during their seasonal events.',
      classes: ["Santa's Helper", 'Trick or Treater'],
    },
  ],
};
