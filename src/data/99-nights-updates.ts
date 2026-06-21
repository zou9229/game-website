export type UpdateSource = {
  name: string;
  url: string;
};

export type UpdateEntry = {
  date: string;
  type: 'code-check' | 'guide-data-pass' | 'roblox-page-update';
  title: string;
  summary: string;
  details: string[];
  sources: UpdateSource[];
};

export const ninetyNineNightsUpdates = {
  checkedAt: '2026-06-21',
  entries: [
    {
      date: '2026-06-21',
      type: 'code-check',
      title: 'June 21 code source refresh',
      summary:
        'Quest Codes refreshed the 99 Nights in the Forest code source trail and kept yay fishing marked as special because sources still disagree.',
      details: [
        'forestwakesup26 is now backed by PC Gamer, GamesRadar, and the community wiki in the source table.',
        'afterparty remains active across PC Gamer, PCGamesN, GamesRadar, and the community wiki.',
        'yay fishing remains special: PC Gamer, GamesRadar, and the community wiki list it as an in-game activation, while PCGamesN still lists it as expired.',
        'happyhalloween remains expired and is kept only for history.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'PCGamesN codes page',
          url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
        {
          name: 'Fandom codes page',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Codes',
        },
      ],
    },
    {
      date: '2026-06-20',
      type: 'code-check',
      title: 'June code source check',
      summary:
        'Quest Codes checked the current 99 Nights in the Forest code lists and separated active, expired, and conflicting code entries.',
      details: [
        'forestwakesup26 and afterparty are treated as active based on checked source pages.',
        'yay fishing remains marked as special because sources disagree on the redemption path and status.',
        'happyhalloween is kept in expired history to reduce repeat testing.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'PCGamesN codes page',
          url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
        },
      ],
    },
    {
      date: '2026-06-20',
      type: 'guide-data-pass',
      title: 'Class, animals, and survival guide pass',
      summary:
        'The first 99 Nights guide cluster was expanded beyond codes into classes, class tier list, animals, and survival guidance.',
      details: [
        'The class and tier-list pages avoid invented stats and cite the checked guide source.',
        'The animals page separates food requirements, flute requirements, and biome notes.',
        'The survival guide focuses on campfire priorities, early looting, tools, and common mistakes.',
      ],
      sources: [
        {
          name: 'PC Gamer 99 Nights classes guide',
          url: 'https://www.pcgamer.com/roblox/99-nights-in-the-forest-classes/',
        },
        {
          name: 'PC Gamer animal taming guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-animal-taming/',
        },
        {
          name: 'PC Gamer tips guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-tips/',
        },
      ],
    },
    {
      date: '2026-06-16',
      type: 'roblox-page-update',
      title: 'Roblox game page metadata update',
      summary:
        'The stored Roblox game data records 2026-06-16 as the latest checked game page update date.',
      details: [
        'Quest Codes records this as metadata only, not as a patch-note summary.',
        'Patch details are not inferred unless a source provides the actual update notes.',
        'The game page remains the source for Roblox place ID, universe ID, developer, and current public stats.',
      ],
      sources: [
        {
          name: 'Official Roblox game page',
          url: 'https://www.roblox.com/games/79546208627805/99-Nights-in-the-Forest',
        },
      ],
    },
  ] satisfies UpdateEntry[],
};
