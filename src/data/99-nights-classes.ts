export type ClassTier = 'S' | 'A' | 'B' | 'C' | 'D' | 'Event';

export type ClassAvailability = 'active' | 'limited' | 'removed';

export type ClassCurrency =
  | 'diamonds'
  | 'candy'
  | 'candy-canes'
  | 'eggs';

export type ClassEntry = {
  name: string;
  sourceTitle?: string;
  detailHref?: string;
  availability: ClassAvailability;
  price: number;
  currency: ClassCurrency;
};

export type ClassTierGroup = {
  tier: ClassTier;
  label: string;
  summary: string;
  classes: string[];
};

const activeClasses: ClassEntry[] = [
  ['Camper', 10],
  ['Scavenger', 25],
  ['Base Defender', 40],
  ['Hunter', 40],
  ['Cook', 40, 'Cook Class'],
  ['Medic', 40],
  ['Support', 45],
  ['Fisherman', 50],
  ['Brute', 50],
  ['Gambler', 55],
  ['Ranger', 70],
  ['Zookeeper', 70],
  ['Lumberjack', 70],
  ['Farmer', 80],
  ['Explorer', 80],
  ['Undead', 100],
  ['Berserker', 100],
  ['Snowman', 100],
  ['Brawler', 100],
  ['Grenadier', 100],
  ['Alien', 100],
  ['Feaster', 150],
  ['Chef', 150],
  ['Poison Master', 200],
  ['Blacksmith', 200],
  ['Nightcrawler', 200],
  ['Fire Bandit', 200],
  ['Beastmaster', 400],
  ['Assassin', 500],
  ['Pyromaniac', 600],
  ['Necromancer', 600],
  ['Gunslinger', 600],
  ['Big Game Hunter', 600],
  ['Alien Scientist', 600],
  ['Cyborg', 600],
  ['Vampire', 600],
].map(([name, price, sourceTitle]) => ({
  name: String(name),
  sourceTitle: sourceTitle ? String(sourceTitle) : undefined,
  availability: 'active',
  price: Number(price),
  currency: 'diamonds',
}));

const limitedClasses: ClassEntry[] = [
  {
    name: 'Trick or Treater',
    availability: 'limited',
    price: 30,
    currency: 'candy',
  },
  {
    name: 'Witch',
    availability: 'limited',
    price: 900,
    currency: 'candy',
  },
  {
    name: "Santa's Helper",
    availability: 'limited',
    price: 30,
    currency: 'candy-canes',
  },
  {
    name: 'Gifting Elf',
    availability: 'limited',
    price: 900,
    currency: 'candy-canes',
  },
  {
    name: 'Engineer',
    availability: 'limited',
    price: 1000,
    currency: 'diamonds',
  },
  {
    name: 'Egg Hunter',
    availability: 'limited',
    price: 30,
    currency: 'eggs',
  },
  {
    name: 'Bunny',
    sourceTitle: 'Bunny (Class)',
    availability: 'limited',
    price: 900,
    currency: 'eggs',
  },
];

const removedClasses: ClassEntry[] = [
  {
    name: 'Decorator',
    availability: 'removed',
    price: 40,
    currency: 'diamonds',
  },
];

const assassin = activeClasses.find((entry) => entry.name === 'Assassin');
if (assassin) {
  assassin.detailHref =
    '/roblox/99-nights-in-the-forest/classes/assassin';
}

export const ninetyNineNightsClasses = {
  checkedAt: '2026-07-27',
  inventorySource: {
    name: '99 Nights in the Forest Wiki',
    url: 'https://99-nights-in-the-forest.fandom.com/wiki/Classes',
    revisionAt: '2026-07-19',
    checkedAt: '2026-07-27',
    note: 'The class inventory and listed prices come from the July 19 community-wiki revision. The in-game stock remains the final availability check.',
  },
  tierSource: {
    name: 'PC Gamer',
    url: 'https://www.pcgamer.com/roblox/99-nights-in-the-forest-classes/',
    lastUpdated: '2025-12-21',
    checkedAt: '2026-07-27',
    note: 'This is a dated editorial tier snapshot. It does not rank classes added after the source article was published.',
  },
  classes: [...activeClasses, ...limitedClasses, ...removedClasses],
  tierSnapshot: [
    {
      tier: 'S',
      label: 'S-Tier',
      summary:
        'Top late-run and high-impact classes in the December 2025 source snapshot.',
      classes: ['Big Game Hunter', 'Cyborg', 'Necromancer', 'Vampire'],
    },
    {
      tier: 'A',
      label: 'A-Tier',
      summary:
        'Strong solo, co-op, speed, resource, or damage choices in the dated snapshot.',
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
        'Useful classes with tradeoffs or heavier setup in the dated snapshot.',
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
        'Niche classes that usually need a team plan or objective in the dated snapshot.',
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
        'Lower-impact picks in the December 2025 source snapshot.',
      classes: ['Camper', 'Decorator', 'Support', 'Hunter', 'Zookeeper'],
    },
    {
      tier: 'Event',
      label: 'Event Classes',
      summary:
        'The two seasonal classes covered by the December 2025 source snapshot.',
      classes: ["Santa's Helper", 'Trick or Treater'],
    },
  ] satisfies ClassTierGroup[],
};
