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
      'https://tr.rbxcdn.com/180DAY-d9018aca68e7f7fca046cdd403a3afa2/500/280/Image/Jpeg/noFilter',
    developer: "Grandma's Favourite Games",
    genre: 'Survival',
    maxPlayers: 25,
    createdAt: '2025-03-04',
    updatedAt: '2026-06-16',
    stats: {
      playing: 342066,
      visits: 27447262005,
      favorites: 8168762,
      checkedAt: '2026-06-20',
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
        title: 'Classes',
        href: '/roblox/99-nights-in-the-forest/classes',
        description:
          'Class unlocks, perks, and best use cases after the class data pass.',
        status: 'planned',
      },
      {
        title: 'Class Tier List',
        href: '/roblox/99-nights-in-the-forest/class-tier-list',
        description:
          'Ranked classes for survival, team play, and solo runs once current class data is verified.',
        status: 'planned',
      },
      {
        title: 'Survival Guide',
        href: '/roblox/99-nights-in-the-forest/survival-guide',
        description:
          'Beginner route, camp priorities, night survival, and common mistakes.',
        status: 'planned',
      },
    ],
    codes: [
      {
        code: 'forestwakesup26',
        reward: '15 gems and 3 random flames',
        status: 'active',
        note: 'Listed as active by PC Gamer on its June 2026 codes page.',
        sources: [
          {
            name: 'PC Gamer',
            url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
            status: 'listed-active',
            checkedAt: '2026-06-20',
          },
        ],
      },
      {
        code: 'afterparty',
        reward: '15 gems',
        status: 'active',
        note: 'Confirmed active by both PC Gamer and PCGamesN in June 2026.',
        sources: [
          {
            name: 'PC Gamer',
            url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
            status: 'listed-active',
            checkedAt: '2026-06-20',
          },
          {
            name: 'PCGamesN',
            url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
            status: 'listed-active',
            checkedAt: '2026-06-20',
          },
        ],
      },
      {
        code: 'yay fishing',
        reward: '2 gems',
        status: 'special',
        note: 'PC Gamer lists this as a special chat redemption, while PCGamesN lists it as expired. Try it in chat rather than the normal codes box.',
        sources: [
          {
            name: 'PC Gamer',
            url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
            status: 'listed-active',
            checkedAt: '2026-06-20',
          },
          {
            name: 'PCGamesN',
            url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
            status: 'listed-expired',
            checkedAt: '2026-06-20',
          },
        ],
      },
      {
        code: 'happyhalloween',
        reward: 'Expired seasonal reward',
        status: 'expired',
        note: 'Listed as expired by PCGamesN.',
        sources: [
          {
            name: 'PCGamesN',
            url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
            status: 'listed-expired',
            checkedAt: '2026-06-20',
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
