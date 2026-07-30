export const ninetyNineNightsAssassin = {
  checkedAt: '2026-07-30',
  source: {
    name: '99 Nights in the Forest Wiki - Assassin',
    url: 'https://99-nights-in-the-forest.fandom.com/wiki/Assassin',
    revisionAt: '2026-07-11',
    checkedAt: '2026-07-30',
    note: 'Cost, starter tools, perks, and level requirements follow the July 11 community-wiki revision. Live stock and in-game balance remain the final check.',
  },
  availability: 'Active rotating stock',
  price: 500,
  currency: 'diamonds',
  starterTools: ['Katana', '120 Throwing Knives (Kunai)'],
  levelProgression: [
    {
      level: 1,
      title: 'Movement and ranged supply',
      perks: [
        '10% sprint speed increase',
        '15% maximum-health reduction',
        '5% chance for Throwing Knives to appear in chests',
      ],
      requirements: [],
    },
    {
      level: 2,
      title: 'First-hit critical chance',
      perks: [
        'The first hit on an enemy has a chance to critically strike',
      ],
      requirements: [
        'Defeat 100 enemies without taking damage',
        'Travel 2,500 studs',
      ],
    },
    {
      level: 3,
      title: 'Improved knife supply',
      perks: [
        'Adds a 10% chance for Throwing Knives to appear in chests',
      ],
      requirements: [
        'Defeat 250 enemies without taking damage',
        'Travel 10,000 studs',
      ],
    },
  ],
  verifiedUseCases: [
    {
      title: 'Fast route movement',
      detail:
        'The Level 1 sprint-speed increase helps cover map distance and move between rescue objectives.',
    },
    {
      title: 'Immediate mixed combat kit',
      detail:
        'Assassin begins with a Katana and 120 Throwing Knives, so it starts with both melee and ranged options.',
    },
    {
      title: 'Longer ranged supply',
      detail:
        'Its chest perk can add Throwing Knives during a run, with the listed chance increasing through class progression.',
    },
  ],
  tradeoffs: [
    'The class costs 500 diamonds and may not be present in the current shop rotation.',
    'The Level 1 speed benefit comes with a 15% maximum-health reduction.',
    'Level 2 and Level 3 both require no-damage enemy defeats, so progression rewards controlled fights.',
  ],
};
