export type MissingKidSource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type MissingKidRoute = {
  name: string;
  tentColor: string;
  order: number;
  routeSignal: string;
  guardRisk: 'low' | 'medium' | 'high' | 'very-high';
  summary: string;
  preparation: string[];
  sources: MissingKidSource[];
};

export const ninetyNineNightsMissingKids = {
  checkedAt: '2026-06-20',
  summary:
    'The missing kids route is one of the main progression goals in 99 Nights in the Forest. Use the map and compass first, then rescue each child only when your campfire, gear, food, and combat route are stable enough.',
  routeNotes: [
    'Build a map and compass before long rescue trips.',
    'The fog of war lifts as you explore, and discovered child locations can be marked for a later attempt.',
    'Do not force a rescue when the guard enemies are too risky for your current gear.',
    'Each rescue changes the run pressure, so return to camp and restabilize before the next route.',
  ],
  kids: [
    {
      name: 'Dino Kid',
      tentColor: 'Red',
      order: 1,
      routeSignal: 'Usually the first child route after early campfire upgrades.',
      guardRisk: 'low',
      summary:
        'Dino Kid is the first practical missing child target. Public sources describe him as an early route tied to campfire level 2 or 3 and guarded by regular wolves.',
      preparation: [
        'Upgrade campfire enough to reveal the early child route.',
        'Bring basic healing and a weapon before entering the cave.',
        'Use this rescue as the test run before harder child routes.',
      ],
      sources: [
        {
          name: 'PC Gamer missing kids guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-missing-kid-locations/',
          checkedAt: '2026-06-20',
        },
        {
          name: '99 Nights in the Forest Wiki: Missing Children',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Missing_Children',
          checkedAt: '2026-06-20',
        },
      ],
    },
    {
      name: 'Kraken Kid',
      tentColor: 'Blue',
      order: 2,
      routeSignal: 'A mid-route child target once the map has opened further.',
      guardRisk: 'medium',
      summary:
        'Kraken Kid is a step up from Dino Kid. Public guide data points to a later campfire route and stronger wolf enemies.',
      preparation: [
        'Return to camp after Dino Kid before pushing deeper.',
        'Use map markers to avoid repeating empty routes.',
        'Bring better weapons before fighting alpha wolves.',
      ],
      sources: [
        {
          name: 'PC Gamer missing kids guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-missing-kid-locations/',
          checkedAt: '2026-06-20',
        },
        {
          name: '99 Nights in the Forest Wiki: Missing Children',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Missing_Children',
          checkedAt: '2026-06-20',
        },
      ],
    },
    {
      name: 'Squid Kid',
      tentColor: 'Yellow',
      order: 3,
      routeSignal: 'A harder route after stronger gear and higher campfire progress.',
      guardRisk: 'high',
      summary:
        'Squid Kid should not be treated like an early rescue. PC Gamer describes this route as protected by bear enemies, which makes preparation more important than speed.',
      preparation: [
        'Upgrade gear before attempting the route.',
        'Consider traps and ranged damage before fighting bears.',
        'Delay the rescue if night pressure or supplies are already bad.',
      ],
      sources: [
        {
          name: 'PC Gamer missing kids guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-missing-kid-locations/',
          checkedAt: '2026-06-20',
        },
        {
          name: '99 Nights in the Forest Wiki: Missing Children',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Missing_Children',
          checkedAt: '2026-06-20',
        },
      ],
    },
    {
      name: 'Koala Kid',
      tentColor: 'Purple',
      order: 4,
      routeSignal: 'The final standard missing child route in the checked source set.',
      guardRisk: 'very-high',
      summary:
        'Koala Kid is the hardest standard child rescue in the current checked set. Treat it as a late route that needs strong preparation and a stable return plan.',
      preparation: [
        'Prepare high-level gear, healing, and food before leaving camp.',
        'Plan the return path before starting the fight.',
        'Use team roles or a stronger class setup if solo attempts keep failing.',
      ],
      sources: [
        {
          name: 'PC Gamer missing kids guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-missing-kid-locations/',
          checkedAt: '2026-06-20',
        },
        {
          name: '99 Nights in the Forest Wiki: Missing Children',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Missing_Children',
          checkedAt: '2026-06-20',
        },
      ],
    },
  ] satisfies MissingKidRoute[],
};
