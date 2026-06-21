export type GuideImage = {
  title: string;
  src: string;
  alt: string;
  caption: string;
};

export type GuideVideoSearch = {
  title: string;
  href: string;
  description: string;
};

export const ninetyNineNightsVideoSearches = {
  craftingBench: {
    title: 'Crafting bench guide videos',
    href: 'https://www.youtube.com/results?search_query=99+nights+in+the+forest+crafting+bench+guide',
    description:
      'Use current YouTube results to discover player questions around bench upgrades and recipe confusion.',
  },
  bandages: {
    title: 'Bandage crafting videos',
    href: 'https://www.youtube.com/results?search_query=how+to+craft+bandages+in+99+nights+in+the+forest',
    description:
      'Good demand signal for recovery, revive, Tool Workshop, Rabbit Foot, and Wolf Pelt questions.',
  },
  updates: {
    title: '99 Nights update videos',
    href: 'https://www.youtube.com/results?search_query=99+nights+in+the+forest+update+2026',
    description:
      'Useful for spotting fresh update demand before turning confirmed source data into pages.',
  },
  missingKids: {
    title: 'Missing kids route videos',
    href: 'https://www.youtube.com/results?search_query=99+nights+in+the+forest+missing+kids+locations',
    description:
      'Useful for finding current route questions around Dino Kid, Kraken Kid, Squid Kid, and Koala Kid.',
  },
  map: {
    title: 'Map and locations videos',
    href: 'https://www.youtube.com/results?search_query=99+nights+in+the+forest+map+locations',
    description:
      'Good signal for player confusion around route planning, marked locations, and danger zones.',
  },
  stronghold: {
    title: 'Stronghold raid videos',
    href: 'https://www.youtube.com/results?search_query=99+nights+in+the+forest+cultist+stronghold',
    description:
      'Useful for spotting current Stronghold raid questions before changing source-checked written guidance.',
  },
} satisfies Record<string, GuideVideoSearch>;

export const ninetyNineNightsMedia = {
  images: [
    {
      title: 'Camp defense thumbnail',
      src: '/imgs/roblox/99-nights-thumbnail-1.jpg',
      alt: '99 Nights in the Forest Roblox thumbnail showing players defending a camp from the forest creature',
      caption:
        'Useful for pages about camp defense, routes, survival pressure, and early crafting priorities.',
    },
    {
      title: 'Late-run camp thumbnail',
      src: '/imgs/roblox/99-nights-thumbnail-2.jpg',
      alt: '99 Nights in the Forest Roblox thumbnail showing a late-run camp layout with crops, chests, and defenses',
      caption:
        'Useful for pages about crafting bench upgrades, camp planning, and late-run survival goals.',
    },
    {
      title: 'Night survival thumbnail',
      src: '/imgs/roblox/99-nights-thumbnail-3.jpg',
      alt: '99 Nights in the Forest Roblox thumbnail showing two players hiding from the forest creature at night',
      caption:
        'Useful for survival, missing kids, classes, and route-risk pages where night pressure matters.',
    },
  ] satisfies GuideImage[],
  videoSearches: [
    ninetyNineNightsVideoSearches.craftingBench,
    ninetyNineNightsVideoSearches.bandages,
    ninetyNineNightsVideoSearches.updates,
  ] satisfies GuideVideoSearch[],
};
