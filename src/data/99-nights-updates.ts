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
  checkedAt: '2026-06-30',
  entries: [
    {
      date: '2026-06-30',
      type: 'code-check',
      title: 'June 30 partial source-check review',
      summary:
        'Quest Codes reran the source-check workflow. PC Gamer and GamesRadar confirmed the tracked active code terms, while PCGamesN, Fandom, and Roblox metadata were not confirmed by the command-line check.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the June 30 source check.',
        'PCGamesN, Fandom Codes Wiki, and the Roblox Games API returned blocked or unconfirmed results in this pass, so they remain manual review flags.',
        'happyhalloween appeared in a source response, so status labels still need manual review before any visible code status change.',
        'No code reward, code status, Roblox stat, drop rate, tier claim, crafting fact, or patch-note claim was changed from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-06-29',
      type: 'code-check',
      title: 'June 29 reviewed source-check pass',
      summary:
        'Quest Codes reviewed the latest source-check snapshot. PC Gamer and GamesRadar confirmed the tracked active code terms, PCGamesN confirmed afterparty only, and the Roblox Games API confirmed the public game metadata.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the June 29 source check.',
        'PCGamesN returned HTTP 200 and matched afterparty, but did not confirm forestwakesup26 in this pass.',
        'Fandom Codes Wiki returned HTTP 403, so it remains in the manual review queue.',
        'happyhalloween and yay fishing still require status-label review before any visible status change.',
        'Roblox Games API confirmed the game metadata check with an updated timestamp of 2026-06-27 and 492,705 playing at check time.',
        'No code reward, code status, drop rate, tier claim, crafting fact, or patch-note claim was changed from this pass.',
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
          name: 'Official Roblox game page',
          url: 'https://www.roblox.com/games/79546208627805/99-Nights-in-the-Forest',
        },
      ],
    },
    {
      date: '2026-06-24',
      type: 'code-check',
      title: 'June 24 partial source-check review',
      summary:
        'Quest Codes reran the lightweight source-check workflow. PC Gamer and GamesRadar confirmed the tracked active code terms, so the active source dates were refreshed without changing rewards or status labels.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the June 24 source check.',
        'PCGamesN, Fandom, and the Roblox Games API returned 403, so those sources stay in the manual review queue.',
        'happyhalloween also appeared in a source response, so status labels still need manual review before any visible code status changes.',
        'No code status, reward amount, Roblox stat, drop rate, or patch claim was changed from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-06-23',
      type: 'code-check',
      title: 'June 23 lightweight source check',
      summary:
        'Quest Codes reran the code source-check workflow and confirmed that PC Gamer and GamesRadar still include the tracked active code terms.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the June 23 source check.',
        'PCGamesN, Fandom, and the Roblox Games API returned 403 from the command-line check, so they remain manual review flags rather than automatic update signals.',
        'yay fishing stays marked as special because source status labels still require manual review.',
        'No new code, reward amount, drop rate, Roblox stat, or patch claim was added from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-06-22',
      type: 'code-check',
      title: 'June 22 source-check pass',
      summary:
        'Quest Codes ran the source-check workflow and verified that PC Gamer and GamesRadar still include the active code terms.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the automated source check.',
        'PCGamesN, Fandom, and the Roblox Games API returned 403 from the command-line check, so those sources remain review flags rather than automatic update signals.',
        'yay fishing stays marked as special because source status labels still require manual review.',
        'No new code, reward amount, drop rate, or patch claim was added from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
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
