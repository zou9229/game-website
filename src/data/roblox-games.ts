export type GameCodeStatus = 'active' | 'special' | 'expired';

export type GameCodeSource = {
  name: string;
  url: string;
  status: 'listed-active' | 'listed-expired' | 'official-game-page';
  checkedAt: string;
};

export type GameCode = {
  code: string;
  reward: string;
  status: GameCodeStatus;
  note: string;
  sources: GameCodeSource[];
};

export type RobloxGame = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  robloxPlaceId: string;
  robloxUniverseId: string;
  robloxUrl: string;
  imageUrl: string;
  developer: string;
  genre: string;
  maxPlayers: number;
  createdAt: string;
  updatedAt: string;
  stats: {
    playing: number;
    visits: number;
    favorites: number;
    checkedAt: string;
  };
  pages: {
    title: string;
    href: string;
    description: string;
    status: 'live' | 'planned';
  }[];
  codes: GameCode[];
};

export const robloxGames: RobloxGame[] = [
  {
    slug: '99-nights-in-the-forest',
    name: '99 Nights in the Forest',
    shortName: '99 Nights',
    description:
      'A Roblox survival horror game about building a camp, surviving the woods, and rescuing missing children while something watches from the forest.',
    robloxPlaceId: '79546208627805',
    robloxUniverseId: '7326934954',
    robloxUrl:
      'https://www.roblox.com/games/79546208627805/99-Nights-in-the-Forest',
    imageUrl:
      'https://tr.rbxcdn.com/180DAY-d9018aca68e7f7fca046cdd403a3afa2/768/432/Image/Jpeg/noFilter',
    developer: "Grandma's Favourite Games",
    genre: 'Survival',
    maxPlayers: 25,
    createdAt: '2025-03-04',
    updatedAt: '2026-07-01',
    stats: {
      playing: 393516,
      visits: 27834841022,
      favorites: 8438845,
      checkedAt: '2026-07-02',
    },
    pages: [
      {
        title: 'Codes',
        href: '/roblox/99-nights-in-the-forest/codes',
        description:
          'Current codes, special redemption notes, expired codes, and source history.',
        status: 'live',
      },
      {
        title: 'Gems',
        href: '/roblox/99-nights-in-the-forest/gems',
        description:
          'Gem and diamond rewards, code routes, badge rewards, class spending, and low-confidence community signals.',
        status: 'live',
      },
      {
        title: 'Gem of the Forest',
        href: '/roblox/99-nights-in-the-forest/gem-of-the-forest',
        description:
          'Forest Gem sources, fragment combining, Stronghold route notes, chest caveats, and Tier 5 spending decisions.',
        status: 'live',
      },
      {
        title: 'Forest Gem Fragments',
        href: '/roblox/99-nights-in-the-forest/forest-gem-fragments',
        description:
          'Day 100+ nighttime raid fragment route, 4-fragment combine rule, no-drop-rate caveats, and first Forest Gem spend planning.',
        status: 'live',
      },
      {
        title: 'Stronghold',
        href: '/roblox/99-nights-in-the-forest/stronghold',
        description:
          'Cultist Stronghold route planning, diamond farming notes, level scaling, class prep, and source-checked risk guidance.',
        status: 'live',
      },
      {
        title: 'Crafting',
        href: '/roblox/99-nights-in-the-forest/crafting',
        description:
          'Crafting guide for map, compass, bench upgrades, Crock Pot, bandages, Biofuel Processor, Lightning Rod, and late-game gem crafts.',
        status: 'live',
      },
      {
        title: 'Crafting Bench 5',
        href: '/roblox/99-nights-in-the-forest/crafting-bench-5',
        description:
          'Crafting Bench 5 requirements, Forest Gem route, Tier 5 recipes, and first-craft recommendations.',
        status: 'live',
      },
      {
        title: 'Bandages',
        href: '/roblox/99-nights-in-the-forest/bandages',
        description:
          'Bandage crafting route, Anvil requirements, Rabbit Foot and Wolf Pelt materials, revive use, cooldown notes, and source checks.',
        status: 'live',
      },
      {
        title: 'Badges',
        href: '/roblox/99-nights-in-the-forest/badges',
        description:
          'Badge goals, diamond reward notes, starter badges, challenge badges, and the Humiliation Badge route.',
        status: 'live',
      },
      {
        title: 'Map',
        href: '/roblox/99-nights-in-the-forest/map',
        description:
          'Map crafting, location planning, missing child route notes, and danger-zone guidance.',
        status: 'live',
      },
      {
        title: 'Missing Kids',
        href: '/roblox/99-nights-in-the-forest/missing-kids',
        description:
          'Missing children route planning for Dino Kid, Kraken Kid, Squid Kid, and Koala Kid.',
        status: 'live',
      },
      {
        title: 'Classes',
        href: '/roblox/99-nights-in-the-forest/classes',
        description:
          'Class unlocks, perks, and best use cases after the class data pass.',
        status: 'live',
      },
      {
        title: 'Class Tier List',
        href: '/roblox/99-nights-in-the-forest/class-tier-list',
        description:
          'Ranked classes for survival, team play, and solo runs based on the checked class data pass.',
        status: 'live',
      },
      {
        title: 'Animals',
        href: '/roblox/99-nights-in-the-forest/animals',
        description:
          'Tameable animals, food requirements, Flute requirements, and biome notes from the checked animal data pass.',
        status: 'live',
      },
      {
        title: 'Taming Flute',
        href: '/roblox/99-nights-in-the-forest/taming-flute',
        description:
          'Taming Flute obtainment, XP upgrade route, Old/Good/Strong Flute tiers, Skills Building notes, and animal planning cautions.',
        status: 'live',
      },
      {
        title: 'Zookeeper vs Beastmaster',
        href: '/roblox/99-nights-in-the-forest/zookeeper-vs-beastmaster',
        description:
          'Source-checked taming class comparison covering Zookeeper, Beastmaster, flute starts, pet-limit notes, diamond costs, and tier-list disagreements.',
        status: 'live',
      },
      {
        title: 'Survival Guide',
        href: '/roblox/99-nights-in-the-forest/survival-guide',
        description:
          'Beginner route, campfire priorities, night survival, and common mistakes from the checked guide pass.',
        status: 'live',
      },
      {
        title: 'Updates',
        href: '/roblox/99-nights-in-the-forest/updates',
        description:
          'Source-checked update notes, code checks, guide refreshes, and Roblox metadata changes.',
        status: 'live',
      },
    ],
    codes: [
      {
        code: 'forestwakesup26',
        reward: '15 gems and 3 random flames',
        status: 'active',
        note: 'Matched by PC Gamer and GamesRadar in the July 3 source check; PCGamesN and the community wiki remain in the manual review queue because the command-line pass could not confirm them.',
        sources: [
          {
            name: 'PC Gamer',
            url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
            status: 'listed-active',
            checkedAt: '2026-07-03',
          },
          {
            name: 'GamesRadar',
            url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
            status: 'listed-active',
            checkedAt: '2026-07-03',
          },
          {
            name: 'Fandom Codes',
            url: 'https://99-nights-in-the-forest.fandom.com/wiki/Codes',
            status: 'listed-active',
            checkedAt: '2026-06-21',
          },
        ],
      },
      {
        code: 'afterparty',
        reward: '15 gems',
        status: 'active',
        note: 'Matched by PC Gamer and GamesRadar in the July 3 source check; PCGamesN last confirmed this term in the July 2 pass and remains in manual review after a July 3 command-line block.',
        sources: [
          {
            name: 'PC Gamer',
            url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
            status: 'listed-active',
            checkedAt: '2026-07-03',
          },
          {
            name: 'PCGamesN',
            url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
            status: 'listed-active',
            checkedAt: '2026-07-02',
          },
          {
            name: 'GamesRadar',
            url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
            status: 'listed-active',
            checkedAt: '2026-07-03',
          },
          {
            name: 'Fandom Codes',
            url: 'https://99-nights-in-the-forest.fandom.com/wiki/Codes',
            status: 'listed-active',
            checkedAt: '2026-06-21',
          },
        ],
      },
      {
        code: 'yay fishing',
        reward: '2 gems',
        status: 'special',
        note: 'PC Gamer and GamesRadar still mention this term in the June 23 source check. PCGamesN lists it as expired, so keep it as a special in-game activation rather than a normal code-box claim.',
        sources: [
          {
            name: 'PC Gamer',
            url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
            status: 'listed-active',
            checkedAt: '2026-06-23',
          },
          {
            name: 'PCGamesN',
            url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
            status: 'listed-expired',
            checkedAt: '2026-06-21',
          },
          {
            name: 'GamesRadar',
            url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
            status: 'listed-active',
            checkedAt: '2026-06-23',
          },
          {
            name: 'Fandom Codes',
            url: 'https://99-nights-in-the-forest.fandom.com/wiki/Codes',
            status: 'listed-active',
            checkedAt: '2026-06-21',
          },
        ],
      },
      {
        code: 'happyhalloween',
        reward: 'Expired seasonal reward',
        status: 'expired',
        note: 'Listed as expired by PCGamesN, GamesRadar, and the community wiki.',
        sources: [
          {
            name: 'PCGamesN',
            url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
            status: 'listed-expired',
            checkedAt: '2026-06-21',
          },
          {
            name: 'GamesRadar',
            url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
            status: 'listed-expired',
            checkedAt: '2026-06-21',
          },
          {
            name: 'Fandom Codes',
            url: 'https://99-nights-in-the-forest.fandom.com/wiki/Codes',
            status: 'listed-expired',
            checkedAt: '2026-06-21',
          },
        ],
      },
    ],
  },
];

export function getRobloxGame(slug: string) {
  return robloxGames.find((game) => game.slug === slug);
}

export function getFeaturedRobloxGame() {
  return robloxGames[0];
}

export function getLatestCodeCheckedAt(game: RobloxGame = getFeaturedRobloxGame()) {
  const checkedDates = game.codes.flatMap((code) =>
    code.sources.map((source) => source.checkedAt)
  );

  return checkedDates.sort().at(-1) ?? game.stats.checkedAt;
}
