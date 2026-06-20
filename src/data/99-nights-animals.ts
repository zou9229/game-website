export type AnimalFlute = 'Old Flute' | 'Good Flute' | 'Strong Flute';

export type NinetyNineNightsAnimal = {
  name: string;
  food: string[];
  flute: AnimalFlute;
  biome: string;
  note: string;
};

export const ninetyNineNightsAnimals = {
  checkedAt: '2026-06-20',
  source: {
    name: 'PC Gamer',
    url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-animal-taming/',
    publishedAt: '2025-11-29',
    checkedAt: '2026-06-20',
  },
  summary: {
    totalAnimals: 11,
    beginnerTargets: ['Bunny', 'Wolf', 'Kiwi'],
    advancedTargets: ['Alpha Wolf', 'Polar Bear', 'Mammoth', 'Hellephant'],
    classNotes:
      'Zookeeper and Beastmaster are the class directions to review if a run is focused on taming.',
  },
  animals: [
    {
      name: 'Bunny',
      food: ['1 Carrot'],
      flute: 'Old Flute',
      biome: 'Not specified by source',
      note: 'Lowest requirement animal and the cleanest first tame.',
    },
    {
      name: 'Wolf',
      food: ['3 Steak', '3 Morsel'],
      flute: 'Old Flute',
      biome: 'Not specified by source',
      note: 'Early combat companion target once meat supplies are stable.',
    },
    {
      name: 'Scorpion',
      food: ['2 Steak', '2 Morsel'],
      flute: 'Old Flute',
      biome: 'Lava',
      note: 'Biome-dependent Old Flute animal.',
    },
    {
      name: 'Green Frog',
      food: ['2 Mackerel'],
      flute: 'Old Flute',
      biome: 'Forest/Pond',
      note: 'Biome-dependent animal that needs fishing supply.',
    },
    {
      name: 'Kiwi',
      food: ['1 Berry'],
      flute: 'Old Flute',
      biome: 'Not specified by source',
      note: 'Low food requirement, but the source describes it as a rare sight.',
    },
    {
      name: 'Alpha Wolf',
      food: ['4 Salmon', '4 Steak', '4 Mackerel'],
      flute: 'Good Flute',
      biome: 'Not specified by source',
      note: 'High food pressure target that rewards early fish planning.',
    },
    {
      name: 'Snow Fox',
      food: ['3 Steak', '3 Chili'],
      flute: 'Good Flute',
      biome: 'Snow',
      note: 'Snow biome Good Flute target.',
    },
    {
      name: 'Bear',
      food: ['5 Steak', '5 Salmon', '5 Pumpkin'],
      flute: 'Strong Flute',
      biome: 'Not specified by source',
      note: 'Strong Flute target with meat, fish, and produce requirements.',
    },
    {
      name: 'Polar Bear',
      food: ['5 Ribs', '5 Swordfish', '5 Stew'],
      flute: 'Strong Flute',
      biome: 'Snow',
      note: 'Snow biome Strong Flute target with expensive food requirements.',
    },
    {
      name: 'Mammoth',
      food: ['10 Pumpkin', '5 Cake'],
      flute: 'Strong Flute',
      biome: 'Snow',
      note: 'Late taming target that needs heavy farming preparation.',
    },
    {
      name: 'Hellephant',
      food: ['10 Pumpkin', '5 Cake'],
      flute: 'Strong Flute',
      biome: 'Lava',
      note: 'Lava biome Strong Flute target with the same listed food as Mammoth.',
    },
  ] satisfies NinetyNineNightsAnimal[],
};
