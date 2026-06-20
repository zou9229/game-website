export type GemSource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type GemMethod = {
  title: string;
  type: 'code' | 'badge' | 'spending' | 'community-signal';
  confidence: 'high' | 'medium' | 'low';
  summary: string;
  details: string[];
  sources: GemSource[];
};

export const ninetyNineNightsGems = {
  checkedAt: '2026-06-20',
  note:
    'Public guides use both gems and diamonds for the 99 Nights in the Forest premium currency. Quest Codes keeps the wording attached to each source.',
  methods: [
    {
      title: 'Redeem current gem and diamond codes',
      type: 'code',
      confidence: 'high',
      summary:
        'The checked code set has two normal gem codes and one special/conflicting gem reward.',
      details: [
        'forestwakesup26 is listed with 15 gems and 3 random flames.',
        'afterparty is listed with 15 gems or diamonds depending on source wording.',
        'yay fishing is a 2-gem special entry because sources disagree on the normal code-box status.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
          checkedAt: '2026-06-20',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
          checkedAt: '2026-06-20',
        },
        {
          name: 'Pocket Gamer codes page',
          url: 'https://www.pocketgamer.com/roblox/99-nights-in-the-forest-codes/',
          checkedAt: '2026-06-20',
        },
      ],
    },
    {
      title: 'Use badge rewards as a secondary diamond source',
      type: 'badge',
      confidence: 'high',
      summary:
        'PC Gamer says the Humiliation Badge awards four diamonds after completing its secret action.',
      details: [
        'The badge path is slower than codes and requires gameplay setup.',
        'Use badge rewards as a progression supplement, not as a guaranteed fast farm.',
        'Do not mix this with random community farming claims unless the exact badge reward is confirmed.',
      ],
      sources: [
        {
          name: 'PC Gamer Humiliation Badge guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-secret-action-humiliation-badge/',
          checkedAt: '2026-06-20',
        },
      ],
    },
    {
      title: 'Save diamonds for classes and rerolls',
      type: 'spending',
      confidence: 'high',
      summary:
        'Diamonds are tied to class progression, so early spending matters more than a single code reward.',
      details: [
        'PC Gamer warns against spending premium currency before learning the basics.',
        'GamesRadar describes the Daily Class Shop as the place to buy classes once you have diamonds.',
        'The first free reroll matters because later rerolls can cost Robux according to GamesRadar.',
      ],
      sources: [
        {
          name: 'PC Gamer tips guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-tips/',
          checkedAt: '2026-06-20',
        },
        {
          name: 'GamesRadar classes guide',
          url: 'https://www.gamesradar.com/games/simulation/99-nights-in-the-forest-classes-all/',
          checkedAt: '2026-06-20',
        },
      ],
    },
    {
      title: 'Treat unsourced farming shortcuts as low confidence',
      type: 'community-signal',
      confidence: 'low',
      summary:
        'Community threads mention gifts, events, chests, and long-run milestones, but these are not stable enough for a normal high-confidence route.',
      details: [
        'Community tips can signal questions players are asking.',
        'Quest Codes does not turn Reddit-only claims into confirmed gem routes.',
        'Use the updates page for future source-checked changes to gem rewards.',
      ],
      sources: [
        {
          name: 'Reddit community discussion',
          url: 'https://www.reddit.com/r/99nightsintheforest/comments/1o7wc57/how_do_i_get_free_gems/',
          checkedAt: '2026-06-20',
        },
      ],
    },
  ] satisfies GemMethod[],
};
