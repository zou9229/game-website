export type PeltTraderSource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type PeltTraderFact = {
  title: string;
  intent:
    | 'location'
    | 'wolf-pelt'
    | 'bandage'
    | 'medkit'
    | 'trade-caution';
  confidence: 'high' | 'medium';
  summary: string;
  details: string[];
  cautions: string[];
  sources: PeltTraderSource[];
};

const fandomPeltTraderSource: PeltTraderSource = {
  name: 'Fandom Pelt Trader',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Pelt_Trader',
  checkedAt: '2026-07-09',
};

const fandomWolfPeltSource: PeltTraderSource = {
  name: 'Fandom Wolf Pelt',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Wolf_Pelt',
  checkedAt: '2026-07-09',
};

const fandomMedkitSource: PeltTraderSource = {
  name: 'Fandom Medkit',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Medkit',
  checkedAt: '2026-07-09',
};

const fandomBandageSource: PeltTraderSource = {
  name: 'Fandom Bandage',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Bandage',
  checkedAt: '2026-07-09',
};

const pcGamerBandageSource: PeltTraderSource = {
  name: 'PC Gamer bandage guide',
  url: 'https://www.pcgamer.com/games/survival-crafting/roblox-99-nights-in-the-forest-bandages/',
  checkedAt: '2026-07-09',
};

export const ninetyNineNightsPeltTrader = {
  checkedAt: '2026-07-09',
  summary:
    'Pelt Trader searches usually mean the player is deciding whether to spend Wolf Pelt at the trader, save it for bandages, or keep a Medkit for bigger recovery. This page separates those decisions so the route does not waste scarce recovery materials.',
  sourceNote:
    'Fandom is used for the Pelt Trader, Wolf Pelt, Medkit, and Bandage reference trail. PC Gamer is used to cross-check the bandage route. Quest Codes does not claim a Medkit is a current Pelt Trader reward unless the checked trader table confirms it.',
  facts: [
    {
      title: 'Find the Pelt Trader near camp before night risk',
      intent: 'location',
      confidence: 'high',
      summary:
        'The checked Pelt Trader source describes a camp-adjacent trader route tied to animal pelts and daytime planning.',
      details: [
        'Use the trader as a route decision after the camp is stable, not as the first objective of a weak run.',
        'Bring the exact pelt you want to trade instead of carrying every animal drop blindly.',
        'Check nearby danger and return timing before opening trade decisions far from safety.',
      ],
      cautions: [
        'Do not assume the trader replaces crafting; some pelts are better saved for recovery crafts.',
        'Do not publish exact rotation timing beyond the checked source trail without a fresh in-game/source confirmation.',
      ],
      sources: [fandomPeltTraderSource],
    },
    {
      title: 'Wolf Pelt is a trade item and a crafting material',
      intent: 'wolf-pelt',
      confidence: 'high',
      summary:
        'Wolf Pelt appears in the Pelt Trader decision path, but it also matters for bandage planning.',
      details: [
        'Treat Wolf Pelt as a scarce route material until your bandage needs are covered.',
        'Use the Pelt Trader when the offered item solves the current route problem.',
        'Save Wolf Pelt when the team still lacks safe revive resources.',
      ],
      cautions: [
        'A trader reward is not automatically better than keeping the material for recovery.',
        'Do not turn one run result into a guaranteed trader table if sources change after an update.',
      ],
      sources: [fandomPeltTraderSource, fandomWolfPeltSource],
    },
    {
      title: 'Save Wolf Pelt for bandages when revives matter',
      intent: 'bandage',
      confidence: 'high',
      summary:
        'The checked bandage trail uses Wolf Pelt as part of the recovery route, so trading it away can weaken team safety.',
      details: [
        'Use the bandage page when the team is pushing Missing Kids, Stronghold, or late-night routes.',
        'Carry Wolf Pelt toward the Tool Workshop / Anvil if the run needs revive coverage.',
        'Trade only surplus Wolf Pelt after recovery needs are covered.',
      ],
      cautions: [
        'Do not spend the last Wolf Pelt on a trade if the team still needs a revive plan.',
        'Material names can differ between sources; this page keeps the route-level decision conservative.',
      ],
      sources: [fandomWolfPeltSource, fandomBandageSource, pcGamerBandageSource],
    },
    {
      title: 'Use Medkit for bigger recovery, not small mistakes',
      intent: 'medkit',
      confidence: 'high',
      summary:
        'Medkit is a stronger recovery item in the checked item trail, so it belongs in dangerous routes rather than routine healing.',
      details: [
        'Save Medkit for deeper route pressure, teammate recovery, or emergency survival.',
        'Use bandages first when the revive route can be handled without consuming a Medkit.',
        'Keep Medkit and Wolf Pelt decisions separate unless a checked source confirms a direct trader link.',
      ],
      cautions: [
        'The current page does not claim Medkit is a confirmed Pelt Trader reward.',
        'Do not spend premium recovery after minor fights if campfire healing can safely handle the damage.',
      ],
      sources: [fandomMedkitSource, pcGamerBandageSource],
    },
    {
      title: 'Do not follow unsourced Pelt Trader shortcuts',
      intent: 'trade-caution',
      confidence: 'medium',
      summary:
        'Players often connect the Pelt Trader, Medkit, and Wolf Pelt, but that does not make every community shortcut confirmed.',
      details: [
        'Start with the route decision the player needs to make, then separate confirmed facts from community assumptions.',
        'Keep exact trader-item claims tied to source tables or visible in-game confirmation.',
        'Send recovery questions back to Bandages, Survival Guide, and Map pages when the safer answer is route planning.',
      ],
      cautions: [
        'Do not publish drop rates, hidden trader odds, or exact refresh rules without stronger confirmation.',
        'Do not merge Medkit, Wolf Pelt, and Pelt Trader into one claim when sources only confirm them as related route decisions.',
      ],
      sources: [
        fandomPeltTraderSource,
        fandomWolfPeltSource,
        fandomMedkitSource,
        pcGamerBandageSource,
      ],
    },
  ] satisfies PeltTraderFact[],
};
