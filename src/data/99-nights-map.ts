export type MapGuideSource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type MapGuideSection = {
  title: string;
  intent: 'map-item' | 'locations' | 'missing-kids' | 'danger';
  confidence: 'high' | 'medium';
  summary: string;
  actions: string[];
  avoid: string[];
  sources: MapGuideSource[];
};

export const ninetyNineNightsMapGuide = {
  checkedAt: '2026-06-20',
  summary:
    'The 99 Nights in the Forest map is best treated as a route-planning tool: craft it early, uncover fog while exploring, use icons to avoid wasted trips, and connect locations to survival goals.',
  sections: [
    {
      title: 'Craft and place the map early',
      intent: 'map-item',
      confidence: 'medium',
      summary:
        'The wiki lists The Map as a craftable item that reveals the world, important locations, and explored versus unexplored areas after placement.',
      actions: [
        'Craft the map before long daytime trips so new discoveries are easier to track.',
        'Use a compass with the map when you need to return before night pressure gets worse.',
        'Recheck the map after each exploration loop instead of wandering until the route collapses.',
      ],
      avoid: [
        'Do not treat the map as a fixed-coordinate walkthrough; run layouts can vary.',
        'Do not travel far without food, fuel planning, and a return path.',
      ],
      sources: [
        {
          name: '99 Nights in the Forest Wiki: The Map',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/The_Map',
          checkedAt: '2026-06-20',
        },
        {
          name: 'GamerBlurb map expansion guide',
          url: 'https://gamerblurb.com/articles/99-nights-in-the-forest-how-to-expand-the-map',
          checkedAt: '2026-06-20',
        },
      ],
    },
    {
      title: 'Use locations as resource decisions',
      intent: 'locations',
      confidence: 'medium',
      summary:
        'The wiki describes locations, also called structures, as major item sources. Many include chests or entities, and some structures are guarded.',
      actions: [
        'Prioritize nearby structures when the campfire and food route are stable.',
        'Treat guarded structures as risk decisions, not automatic loot stops.',
        'Use location discoveries to decide whether the next route should be survival, badges, classes, or gems.',
      ],
      avoid: [
        'Do not chase every structure in one trip if the campfire needs fuel.',
        'Do not assume a building is safe just because it looks like a loot location.',
      ],
      sources: [
        {
          name: '99 Nights in the Forest Wiki: Locations',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Locations',
          checkedAt: '2026-06-20',
        },
      ],
    },
    {
      title: 'Plan missing children routes from the map',
      intent: 'missing-kids',
      confidence: 'high',
      summary:
        'PC Gamer recommends building a map and compass before heading out, because discovered child locations can be marked and revisited with better gear.',
      actions: [
        'Craft map and compass before committing to rescue routes.',
        'Mark missing child discoveries if you cannot safely clear the guard enemies yet.',
        'Use class and code pages before hard rescue attempts if your gear route is weak.',
      ],
      avoid: [
        'Do not assume every missing child can be safely rescued on first sight.',
        'Do not ignore the day-counter pressure that follows rescues.',
      ],
      sources: [
        {
          name: 'PC Gamer missing kids guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-missing-kid-locations/',
          checkedAt: '2026-06-20',
        },
      ],
    },
    {
      title: 'Treat stronghold and subareas as danger zones',
      intent: 'danger',
      confidence: 'medium',
      summary:
        'The Cultist Stronghold and similar subareas can contain valuable rewards, but they are not the same as a normal low-risk map stop.',
      actions: [
        'Prepare ranged damage, healing, food, and an exit plan before entering harder subareas.',
        'Use starter badges and survival progress before attempting repeated stronghold routes.',
        'Treat community stronghold tactics as tips until stronger sources confirm exact requirements.',
      ],
      avoid: [
        'Do not turn Reddit-only loadout claims into guaranteed requirements.',
        'Do not attempt a hard route just because the map reveals the location.',
      ],
      sources: [
        {
          name: '99 Nights in the Forest Wiki: Cultist Stronghold',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Cultist_Stronghold',
          checkedAt: '2026-06-20',
        },
        {
          name: '99 Nights in the Forest Wiki: Tips and Tricks',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Tips_And_Tricks',
          checkedAt: '2026-06-20',
        },
      ],
    },
  ] satisfies MapGuideSection[],
};
