export type TamingFluteSource = {
  name: string;
  url: string;
  checkedAt: string;
  note: string;
};

export type TamingFluteTier = {
  name: 'Old Taming Flute' | 'Good Taming Flute' | 'Strong Taming Flute';
  shortName: 'Old Flute' | 'Good Flute' | 'Strong Flute';
  unlocks: string[];
  planningNote: string;
};

export type TamingFluteStep = {
  title: string;
  summary: string;
  detail: string;
};

export const ninetyNineNightsTamingFlute = {
  checkedAt: '2026-06-21',
  sources: [
    {
      name: 'Fandom Taming Flute',
      url: 'https://99-nights-in-the-forest.fandom.com/wiki/Taming_Flute',
      checkedAt: '2026-06-21',
      note: 'Used for flute variants, obtainment paths, general use, and animal tier list checks.',
    },
    {
      name: 'Fandom Taming',
      url: 'https://99-nights-in-the-forest.fandom.com/wiki/Taming',
      checkedAt: '2026-06-21',
      note: 'Used for the taming minigame, feeding stages, reset caution, and pet limit caveats.',
    },
    {
      name: 'Fandom Upgrade Station',
      url: 'https://99-nights-in-the-forest.fandom.com/wiki/Upgrade_Station',
      checkedAt: '2026-06-21',
      note: 'Used for the Upgrade Station / Skills Building bench location and flute upgrade station role.',
    },
    {
      name: 'PC Gamer Taming Flute',
      url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-how-to-upgrade-taming-flute/',
      checkedAt: '2026-06-21',
      note: 'Used for practical upgrade route, class starting flute notes, and XP route planning.',
    },
    {
      name: 'PC Gamer Animal Taming',
      url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-animal-taming/',
      checkedAt: '2026-06-21',
      note: 'Used for animal food requirements and Old/Good/Strong Flute group checks.',
    },
  ] satisfies TamingFluteSource[],
  summary:
    'The Taming Flute lets you start animal taming, gain flute XP through taming and pet care, then upgrade toward stronger animal tiers at the Upgrade Station / Skills Building.',
  keyFacts: [
    'The listed flute tiers are Old Taming Flute, Good Taming Flute, and Strong Taming Flute.',
    'Non-taming classes can obtain a flute through map routes such as the animal shelter or Pelt Trader path.',
    'Zookeeper starts with the Old Taming Flute in the checked PC Gamer route notes.',
    'Beastmaster starts with the Good Taming Flute in the checked PC Gamer route notes.',
    'The Upgrade Station / Skills Building contains the Taming Flute upgrade bench.',
    'Using a flute on another animal while one is mid-tame can reset the current taming progress.',
  ],
  obtainment: [
    {
      title: 'Animal shelter route',
      summary:
        'The practical first route for most non-taming classes is finding the animal shelter and picking up the Old Taming Flute early.',
      detail:
        'This route avoids spending diamonds on a taming class before you know whether an animal-focused run is worth it.',
    },
    {
      title: 'Pelt Trader route',
      summary:
        'The checked sources list a Pelt Trader path, with PC Gamer describing a Wolf Pelt trade.',
      detail:
        'Treat this as a backup route when shelter pathing is inconvenient or when pelts are already available.',
    },
    {
      title: 'Class starting route',
      summary:
        'Zookeeper and Beastmaster start closer to the taming path than general classes.',
      detail:
        'Use the class tier list before spending diamonds because taming perks compete with stronger survival and combat choices.',
    },
  ] satisfies TamingFluteStep[],
  upgradeSteps: [
    {
      title: 'Get the first flute',
      summary:
        'Secure the Old Taming Flute early if your class does not start with one.',
      detail:
        'Early pickup matters because flute XP takes time and the game becomes harder as the run advances.',
    },
    {
      title: 'Tame beginner animals',
      summary:
        'Start with Old Flute animals such as Bunny, Wolf, Green Frog, Scorpion, or Kiwi depending on route and biome.',
      detail:
        'The easiest path is not always the strongest animal; it is the animal whose food requirement you can reliably supply.',
    },
    {
      title: 'Feed or heal pets for XP',
      summary:
        'PC Gamer notes that pet care can help fill the flute XP bar, not only repeated catch-and-release taming.',
      detail:
        'This is useful for normal runs because you can progress the flute while continuing the main survival route.',
    },
    {
      title: 'Use the upgrade bench',
      summary:
        'When the flute XP bar is ready, go to the Upgrade Station / Skills Building and use the Taming Flute bench.',
      detail:
        'Fandom identifies the Taming Flute upgrade bench on the left side of the Upgrade Station entrance.',
    },
    {
      title: 'Plan Good and Strong targets first',
      summary:
        'Good and Strong Flute animals have heavier food needs, so start banking fish, meat, crops, and crafted food before the upgrade.',
      detail:
        'Do not upgrade without a food plan if the next goal is Alpha Wolf, Bear, Polar Bear, Mammoth, or Hellephant.',
    },
  ] satisfies TamingFluteStep[],
  tiers: [
    {
      name: 'Old Taming Flute',
      shortName: 'Old Flute',
      unlocks: ['Bunny', 'Wolf', 'Scorpion', 'Green Frog', 'Kiwi'],
      planningNote:
        'Best for learning taming and building XP without expensive food routes.',
    },
    {
      name: 'Good Taming Flute',
      shortName: 'Good Flute',
      unlocks: ['Alpha Wolf', 'Snow Fox'],
      planningNote:
        'Move here after you can support fish, meat, and biome-dependent food needs.',
    },
    {
      name: 'Strong Taming Flute',
      shortName: 'Strong Flute',
      unlocks: ['Bear', 'Polar Bear', 'Mammoth', 'Hellephant'],
      planningNote:
        'Late route tier for expensive food plans and stronger animal goals.',
    },
  ] satisfies TamingFluteTier[],
  cautions: [
    {
      title: 'Do not start a second tame mid-process',
      summary:
        'Fandom warns that using the flute on another animal while a tame is in progress can reset progress.',
      detail:
        'Finish the current animal or abandon it intentionally before changing targets.',
    },
    {
      title: 'Respect the pet limit',
      summary:
        'Base taming has a pet cap, while Strong Flute and taming classes can change pet-limit decisions.',
      detail:
        'Because classes have separate handling, compare the classes page before treating one pet-limit number as universal.',
    },
    {
      title: 'Avoid fake upgrade costs',
      summary:
        'Current checked sources explain the XP and bench route, but do not provide a stable universal diamond or material cost table for every upgrade step.',
      detail:
        'This page avoids publishing unsourced upgrade costs and should be refreshed when a reliable source confirms them.',
    },
  ] satisfies TamingFluteStep[],
};
