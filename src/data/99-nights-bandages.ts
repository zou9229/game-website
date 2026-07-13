export type BandageSource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type BandageRequirement = {
  label: string;
  detail: string;
  confidence: 'high' | 'medium';
  sources: BandageSource[];
};

export type BandageRoute = {
  title: string;
  intent: 'requirements' | 'workshop' | 'crafting' | 'revive' | 'stockpile';
  confidence: 'high' | 'medium';
  summary: string;
  steps: string[];
  cautions: string[];
  sources: BandageSource[];
};

export type BandageMethod = {
  title: string;
  reliability: 'best' | 'good' | 'rng' | 'class';
  summary: string;
  sources: BandageSource[];
};

const pcGamerBandageSource: BandageSource = {
  name: 'PC Gamer bandage guide',
  url: 'https://www.pcgamer.com/games/survival-crafting/roblox-99-nights-in-the-forest-bandages/',
  checkedAt: '2026-07-13',
};

const pcGamerReviveSource: BandageSource = {
  name: 'PC Gamer revive guide',
  url: 'https://www.pcgamer.com/games/survival-crafting/roblox-99-nights-in-the-forest-revive/',
  checkedAt: '2026-07-13',
};

const pcGamerTipsSource: BandageSource = {
  name: 'PC Gamer survival tips',
  url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-tips/',
  checkedAt: '2026-07-13',
};

const fandomBandageSource: BandageSource = {
  name: 'Fandom Bandage',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Bandage',
  checkedAt: '2026-06-20',
};

const fandomMedkitSource: BandageSource = {
  name: 'Fandom Medkit',
  url: 'https://99-nights-in-the-forest.fandom.com/wiki/Medkit',
  checkedAt: '2026-06-20',
};

const beebomCraftingSource: BandageSource = {
  name: 'Beebom crafting recipes',
  url: 'https://beebom.com/99-nights-in-the-forest-crafting-recipes/',
  checkedAt: '2026-07-13',
};

export const ninetyNineNightsBandages = {
  checkedAt: '2026-07-13',
  summary:
    'Bandages are a recovery and revive item in 99 Nights in the Forest. The checked route is to find the Tool Workshop / Anvil, select the Bandage recipe, and craft it with Rabbit Foot and Wolf Pelt materials.',
  sourceNote:
    'PC Gamer was rechecked on July 13 for the practical Anvil route, requirements, cooldown, revive handling, and survival context. Beebom was rechecked for the Tool Workshop recipe context. Fandom remains an auxiliary source from the previous manual pass because it was not part of this refresh.',
  requirements: [
    {
      label: 'Campfire Level 4',
      detail:
        'PC Gamer lists Campfire Level 4 before the bandage crafting route becomes available.',
      confidence: 'high',
      sources: [pcGamerBandageSource],
    },
    {
      label: 'Upgraded axe or chainsaw',
      detail:
        'Use an upgraded axe or chainsaw to clear the branches blocking the Tool Workshop entrance.',
      confidence: 'high',
      sources: [pcGamerBandageSource],
    },
    {
      label: "2 Rabbit's Foot",
      detail:
        "Place two Rabbit's Foot items on the Anvil after selecting the Bandage recipe.",
      confidence: 'high',
      sources: [pcGamerBandageSource, fandomBandageSource],
    },
    {
      label: '2 Wolf Pelt',
      detail:
        'Place two Wolf Pelt items on the Anvil. Repeat material costs stay under manual review because the Fandom cross-check was not refreshed in the July 1 command-line pass.',
      confidence: 'high',
      sources: [pcGamerBandageSource, fandomBandageSource],
    },
    {
      label: 'Anvil / Tool Workshop',
      detail:
        'The Tool Workshop appears as an Anvil-marked building, and the Anvil may need to be rebuilt in some event variants.',
      confidence: 'high',
      sources: [pcGamerBandageSource, beebomCraftingSource],
    },
  ] satisfies BandageRequirement[],
  routes: [
    {
      title: 'Unlock the bandage route first',
      intent: 'requirements',
      confidence: 'high',
      summary:
        'Do not farm materials blindly before the run can reach the Tool Workshop safely.',
      steps: [
        'Reach Campfire Level 4 before planning this as a repeatable craft.',
        'Upgrade your axe or bring a chainsaw so workshop branches do not block entry.',
        'Carry enough food and recovery before entering a guarded structure.',
      ],
      cautions: [
        'Bandages matter most when you can still recover the route after a teammate goes down.',
        'If the camp route is unstable, stabilize fire and food before forcing the workshop.',
      ],
      sources: [pcGamerBandageSource, pcGamerTipsSource],
    },
    {
      title: 'Find and rebuild the Anvil if needed',
      intent: 'workshop',
      confidence: 'high',
      summary:
        'The crafting station can vary by world or event, but the Anvil principle stays the same.',
      steps: [
        'Look for the Tool Workshop building marked with an anvil icon.',
        'Clear the entry and handle nearby enemies before using the station.',
        'If the Anvil is broken, gather the pieces around the building and rebuild it.',
      ],
      cautions: [
        'Do not assume every workshop variant is visually identical after updates.',
        'If enemies or night pressure are active, leave and return when the route is safer.',
      ],
      sources: [pcGamerBandageSource, beebomCraftingSource],
    },
    {
      title: 'Craft one bandage at the station',
      intent: 'crafting',
      confidence: 'high',
      summary:
        "Select the Bandage recipe, place two Rabbit's Foot and two Wolf Pelt, then respect the craft cooldown.",
      steps: [
        'Interact with the bench beside the Anvil and select the Bandage recipe.',
        "Place 2 Rabbit's Foot and 2 Wolf Pelt on the station one at a time.",
        'If the station says something is missing, pick the item back up and place it again.',
        'Plan around the cooldown instead of expecting instant mass crafting.',
      ],
      cautions: [
        'PC Gamer notes a cooldown between crafts, so stockpiling requires patience.',
        'Treat repeat costs as a manual-review detail until the Fandom material notes can be checked again.',
      ],
      sources: [pcGamerBandageSource, fandomBandageSource],
    },
    {
      title: 'Use bandages for revives before medkits',
      intent: 'revive',
      confidence: 'high',
      summary:
        'Bandages and medkits can revive allies, but medkits are better saved for bigger heals.',
      steps: [
        'Carry a bandage when the team pushes far from camp.',
        'When a teammate is down, reach them with a healing item and hold the revive key.',
        'Use a bandage for the revive when possible, then save medkits for heavier self-healing.',
      ],
      cautions: [
        'You usually cannot self-revive with a normal bandage route, so solo players should heal before dying.',
        'A rescue during night pressure can turn one downed player into a full wipe.',
      ],
      sources: [pcGamerReviveSource, pcGamerTipsSource, fandomMedkitSource],
    },
    {
      title: 'Stockpile materials without wasting recovery',
      intent: 'stockpile',
      confidence: 'medium',
      summary:
        'Bandages can also appear from exploration, but RNG makes crafting materials a safer plan for longer runs.',
      steps: [
        "Save Rabbit's Foot and Wolf Pelt once your Pelt Trader needs are covered.",
        'Check chests, buildings, and hospital-style locations for extra bandages.',
        'Consider Medic in team runs when fast revives matter more than solo power.',
      ],
      cautions: [
        'Exploration drops are random, so do not count on a chest supplying every revive.',
        'Do not use bandages after small fights if the campfire can safely regenerate health.',
      ],
      sources: [pcGamerBandageSource, pcGamerTipsSource],
    },
  ] satisfies BandageRoute[],
  methods: [
    {
      title: 'Craft at the Anvil',
      reliability: 'best',
      summary:
        "Best controlled route once you have Campfire Level 4, an upgraded axe or chainsaw, Rabbit's Foot, and Wolf Pelt.",
      sources: [pcGamerBandageSource, fandomBandageSource],
    },
    {
      title: 'Loot chests and buildings',
      reliability: 'rng',
      summary:
        'Bandages can show up while exploring, but the result depends on the run.',
      sources: [pcGamerBandageSource],
    },
    {
      title: 'Check hospital-style locations',
      reliability: 'good',
      summary:
        'PC Gamer notes hospitals can contain multiple bandages, a medkit, and other useful resources after enough camp progression.',
      sources: [pcGamerBandageSource],
    },
    {
      title: 'Use the Medic class',
      reliability: 'class',
      summary:
        'Medic starts with bandages and revives faster, which is useful for bigger groups but weaker as a solo-first pick.',
      sources: [pcGamerReviveSource],
    },
  ] satisfies BandageMethod[],
};
