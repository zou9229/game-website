export type ClassComparisonSource = {
  name: string;
  url: string;
  checkedAt: string;
  note: string;
};

export type ComparedTamingClass = {
  name: 'Zookeeper' | 'Beastmaster';
  role: string;
  startingFlute: string;
  petLimit: string;
  unlockCost: string;
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
  sourceNotes: string[];
};

export const ninetyNineNightsZookeeperBeastmaster = {
  checkedAt: '2026-07-13',
  sources: [
    {
      name: 'PC Gamer classes guide',
      url: 'https://www.pcgamer.com/roblox/99-nights-in-the-forest-classes/',
      checkedAt: '2026-07-13',
      note: 'Used for broad class tier context and general class recommendations.',
    },
    {
      name: 'PC Gamer Taming Flute guide',
      url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-how-to-upgrade-taming-flute/',
      checkedAt: '2026-07-13',
      note: 'Used for starting flute notes, pet limit notes, and upgrade-route context.',
    },
    {
      name: 'PC Gamer animal taming guide',
      url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-animal-taming/',
      checkedAt: '2026-07-13',
      note: 'Used for animal planning context and flute-tier pressure.',
    },
    {
      name: 'Fandom Zookeeper',
      url: 'https://99-nights-in-the-forest.fandom.com/wiki/Zookeeper',
      checkedAt: '2026-07-13',
      note: 'Used for Zookeeper class cost, pet limit, and progression notes.',
    },
    {
      name: 'Fandom Classes',
      url: 'https://99-nights-in-the-forest.fandom.com/wiki/Classes',
      checkedAt: '2026-07-13',
      note: 'Used to cross-check Zookeeper class wording against the class list.',
    },
    {
      name: 'PCGamesN tier list',
      url: 'https://www.pcgamesn.com/99-nights-in-the-forest/tier-list',
      checkedAt: '2026-07-13',
      note: 'Used as a competing tier-list signal because it ranks Beastmaster and Zookeeper differently from PC Gamer.',
    },
  ] satisfies ClassComparisonSource[],
  verdict:
    'Beastmaster is the stronger taming-first class when you can afford it and want the highest animal ceiling. Zookeeper is cheaper and useful for learning animal routes, but current source signals disagree on whether it is broadly worth a class slot.',
  classes: [
    {
      name: 'Zookeeper',
      role: 'Budget taming learner and pet-care support class.',
      startingFlute: 'Old Taming Flute in checked PC Gamer route notes',
      petLimit:
        'Fandom lists up to 3 pets regardless of flute level for Zookeeper.',
      unlockCost: 'Fandom lists 70 Diamonds.',
      strengths: [
        'Lower listed unlock cost than Beastmaster.',
        'Starts the taming path earlier than general classes.',
        'Fandom notes faster flute leveling and pet-care benefits.',
        'Good for learning tame timing, food routes, and animal management.',
      ],
      weaknesses: [
        'PC Gamer class tier data places Zookeeper in a low-impact group.',
        'Taming focus can feel weak if the run needs direct combat, resource speed, or safer solo tools.',
        'Needs animal food planning before its benefits matter.',
      ],
      bestFor: [
        'Players learning taming routes',
        'Lower-cost animal-focused testing',
        'Team runs that already have combat covered',
      ],
      sourceNotes: [
        'Fandom is more favorable on Zookeeper mechanics than the checked PC Gamer tier grouping.',
        'Treat Zookeeper as a specialist pick, not a universal best class.',
      ],
    },
    {
      name: 'Beastmaster',
      role: 'Premium taming-first class for stronger animal routes.',
      startingFlute: 'Good Taming Flute in checked PC Gamer route notes',
      petLimit:
        'PC Gamer Taming Flute notes describe Beastmaster as the pet-limit exception with up to 5 pets.',
      unlockCost: 'PC Gamer Taming Flute notes list Beastmaster at 400 diamonds.',
      strengths: [
        'Starts ahead on the Taming Flute path.',
        'Higher animal ceiling than ordinary flute routes.',
        'PCGamesN places Beastmaster in its highest tier group.',
        'Best fit when the run is built around animal companions.',
      ],
      weaknesses: [
        'High listed diamond cost creates a large opportunity cost.',
        'Still depends on food, biome, and animal availability.',
        'May not beat top generalist picks if you are not actively using pets.',
      ],
      bestFor: [
        'Animal-focused players',
        'Team runs with food support',
        'Players who already understand taming and flute upgrades',
      ],
      sourceNotes: [
        'PC Gamer and PCGamesN both support Beastmaster as a stronger taming signal than Zookeeper, though their exact tier systems differ.',
        'The class is not automatically best if your run ignores animals.',
      ],
    },
  ] satisfies ComparedTamingClass[],
  decisions: [
    {
      title: 'Choose Zookeeper if you are testing taming cheaply',
      summary:
        'Zookeeper makes sense when you want to learn flute XP, pet care, and animal food routes without committing to the expensive Beastmaster path.',
    },
    {
      title: 'Choose Beastmaster if pets are the whole plan',
      summary:
        'Beastmaster is the better choice when your run is deliberately built around upgraded flute access, multiple pets, and stronger animal targets.',
    },
    {
      title: 'Skip both if you need a safer generalist',
      summary:
        'If you mostly need solo survival, direct combat, or broad consistency, compare Cyborg, Big Game Hunter, Necromancer, Explorer, and support classes first.',
    },
  ],
  caveats: [
    'Tier lists disagree because some rank raw survival value while others value taming ceiling.',
    'Animal-focused classes depend on food supply, map luck, and whether the team can protect pets.',
    'Do not treat Reddit-only perk claims or sale-price screenshots as stable class data.',
  ],
};
