export type SurvivalPriority = 'first' | 'early' | 'mid-run' | 'team' | 'utility';

export type SurvivalGuideSection = {
  title: string;
  priority: SurvivalPriority;
  summary: string;
  actions: string[];
};

export const ninetyNineNightsSurvivalGuide = {
  checkedAt: '2026-07-13',
  source: {
    name: 'PC Gamer',
    url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-tips/',
    checkedAt: '2026-07-13',
  },
  quickChecklist: [
    'Feed the campfire before long looting trips.',
    'Search buildings early for tools and supplies.',
    'Upgrade deliberately instead of spending every resource immediately.',
    'Use navigation tools before pushing far from camp.',
    'Keep bandages for revives and team recovery.',
  ],
  mistakes: [
    'Leaving camp before the fire is stable.',
    'Ignoring buildings during the first resource pass.',
    'Spending pelts without a clear survival priority.',
    'Wandering at night without a return plan.',
    'Using bandages casually when a teammate may need a revive.',
  ],
  sections: [
    {
      title: 'Feed the fire before exploring',
      priority: 'first',
      summary:
        'Camp stability comes first. A longer loot route is not worth it if the fire is low when night pressure starts.',
      actions: [
        'Add logs before leaving camp.',
        'Return early enough to refuel before the next night cycle.',
        'Treat the fire as the team objective, not as a background task.',
      ],
    },
    {
      title: 'Search buildings for the first power spike',
      priority: 'early',
      summary:
        'Buildings are the early route for supplies, tools, and momentum. Clearing them gives a safer base before deeper forest trips.',
      actions: [
        'Prioritize nearby buildings before long forest routes.',
        'Share useful finds with the team instead of duplicating roles.',
        'Use early supplies to stabilize camp, not to overextend.',
      ],
    },
    {
      title: 'Use trader upgrades with a plan',
      priority: 'mid-run',
      summary:
        'The Pelt Trader can improve a run, but each spend should match the current problem: survival, navigation, or resource pressure.',
      actions: [
        'Decide the next bottleneck before spending pelts.',
        'Favor upgrades that keep the whole run alive.',
        'Avoid buying a niche option before the basics are covered.',
      ],
    },
    {
      title: 'Get a better axe when the route supports it',
      priority: 'mid-run',
      summary:
        'A stronger axe improves gathering and makes camp upkeep less painful once the team has basic supplies.',
      actions: [
        'Do not delay basic camp safety just to rush the axe.',
        'Upgrade when wood and exploration pressure start slowing the run.',
        'Put the extra gathering speed back into fire safety and building progress.',
      ],
    },
    {
      title: 'Use map, workbench, compass, and sundial tools',
      priority: 'utility',
      summary:
        'Navigation and timing tools reduce bad walks, late returns, and wasteful scouting once the route expands.',
      actions: [
        'Use the map and compass before splitting up.',
        'Use the sundial to avoid starting risky trips too late.',
        'Use the workbench to turn supplies into practical run upgrades.',
      ],
    },
    {
      title: 'Build defensive space around camp',
      priority: 'team',
      summary:
        'Camp layout matters. Defensive setup gives the team more time to react when night pressure reaches the base.',
      actions: [
        'Keep the area around the fire readable and easy to move through.',
        'Place defensive resources where they protect return paths.',
        'Do not block teammates from reaching the fire or reviving players.',
      ],
    },
    {
      title: 'Save bandages for revives',
      priority: 'team',
      summary:
        'Bandages are run-saving team resources. Use them when they prevent a death spiral, not just as convenience healing.',
      actions: [
        'Track who has bandages before risky pushes.',
        'Bring bandages when splitting into smaller groups.',
        'Prioritize reviving players who carry key supplies or tools.',
      ],
    },
    {
      title: 'Use the taming flute only when the run can support it',
      priority: 'utility',
      summary:
        'The taming flute can add utility, but it is a later decision after fire, supplies, and route safety are handled.',
      actions: [
        'Do not chase optional utility before stabilizing the camp.',
        'Use it when the team can still maintain fire and supplies.',
        'Treat it as support for a working route, not a replacement for basics.',
      ],
    },
  ] satisfies SurvivalGuideSection[],
};
