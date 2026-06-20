import { ninetyNineNightsAnimals } from '@/data/99-nights-animals';
import { ninetyNineNightsBadges } from '@/data/99-nights-badges';
import { ninetyNineNightsBandages } from '@/data/99-nights-bandages';
import { ninetyNineNightsClasses } from '@/data/99-nights-classes';
import { ninetyNineNightsCrafting } from '@/data/99-nights-crafting';
import { ninetyNineNightsCraftingBench5 } from '@/data/99-nights-crafting-bench-5';
import { ninetyNineNightsForestGem } from '@/data/99-nights-forest-gem';
import { ninetyNineNightsForestGemFragments } from '@/data/99-nights-forest-gem-fragments';
import { ninetyNineNightsGems } from '@/data/99-nights-gems';
import { ninetyNineNightsMapGuide } from '@/data/99-nights-map';
import { ninetyNineNightsMissingKids } from '@/data/99-nights-missing-kids';
import { ninetyNineNightsStronghold } from '@/data/99-nights-stronghold';
import { ninetyNineNightsSurvivalGuide } from '@/data/99-nights-survival-guide';
import { ninetyNineNightsTamingFlute } from '@/data/99-nights-taming-flute';
import { ninetyNineNightsUpdates } from '@/data/99-nights-updates';
import { ninetyNineNightsZookeeperBeastmaster } from '@/data/99-nights-zookeeper-beastmaster';
import { robloxGames } from '@/data/roblox-games';

export type FreshnessKind = 'codes' | 'guide' | 'metadata' | 'updates';

export type FreshnessEntry = {
  title: string;
  href: string;
  kind: FreshnessKind;
  checkedAt: string;
  cadenceDays: number;
  owner: 'manual-review' | 'automation-candidate';
  note: string;
};

const game = robloxGames[0];

function latestCodeCheckedAt() {
  const dates = game.codes.flatMap((code) =>
    code.sources.map((source) => source.checkedAt)
  );

  return dates.sort().at(-1) ?? game.stats.checkedAt;
}

export const ninetyNineNightsFreshnessEntries: FreshnessEntry[] = [
  {
    title: 'Codes',
    href: '/roblox/99-nights-in-the-forest/codes',
    kind: 'codes',
    checkedAt: latestCodeCheckedAt(),
    cadenceDays: 1,
    owner: 'automation-candidate',
    note: 'Highest priority. Code status can change after updates, events, apology drops, and milestone rewards.',
  },
  {
    title: 'Updates',
    href: '/roblox/99-nights-in-the-forest/updates',
    kind: 'updates',
    checkedAt: ninetyNineNightsUpdates.checkedAt,
    cadenceDays: 1,
    owner: 'automation-candidate',
    note: 'Tracks source checks and metadata changes without inventing patch notes.',
  },
  {
    title: 'Roblox game metadata',
    href: '/roblox/99-nights-in-the-forest',
    kind: 'metadata',
    checkedAt: game.stats.checkedAt,
    cadenceDays: 7,
    owner: 'automation-candidate',
    note: 'Public stats and game updated date are useful freshness signals but not the main SEO value.',
  },
  {
    title: 'Crafting',
    href: '/roblox/99-nights-in-the-forest/crafting',
    kind: 'guide',
    checkedAt: ninetyNineNightsCrafting.checkedAt,
    cadenceDays: 7,
    owner: 'manual-review',
    note: 'Recipe and bench pages need source review after major crafting or event changes.',
  },
  {
    title: 'Crafting Bench 5',
    href: '/roblox/99-nights-in-the-forest/crafting-bench-5',
    kind: 'guide',
    checkedAt: ninetyNineNightsCraftingBench5.checkedAt,
    cadenceDays: 7,
    owner: 'manual-review',
    note: 'Forest Gem and Tier 5 crafting claims should stay source-backed.',
  },
  {
    title: 'Bandages',
    href: '/roblox/99-nights-in-the-forest/bandages',
    kind: 'guide',
    checkedAt: ninetyNineNightsBandages.checkedAt,
    cadenceDays: 7,
    owner: 'manual-review',
    note: 'Recovery mechanics and crafting costs need review after health or revive changes.',
  },
  {
    title: 'Gems',
    href: '/roblox/99-nights-in-the-forest/gems',
    kind: 'guide',
    checkedAt: ninetyNineNightsGems.checkedAt,
    cadenceDays: 7,
    owner: 'manual-review',
    note: 'Diamond and gem pages should separate confirmed rewards from community-only signals.',
  },
  {
    title: 'Gem of the Forest',
    href: '/roblox/99-nights-in-the-forest/gem-of-the-forest',
    kind: 'guide',
    checkedAt: ninetyNineNightsForestGem.checkedAt,
    cadenceDays: 7,
    owner: 'manual-review',
    note: 'Late-game material claims should stay conservative and source-checked.',
  },
  {
    title: 'Forest Gem Fragments',
    href: '/roblox/99-nights-in-the-forest/forest-gem-fragments',
    kind: 'guide',
    checkedAt: ninetyNineNightsForestGemFragments.checkedAt,
    cadenceDays: 7,
    owner: 'manual-review',
    note: 'Fragment routes should be reviewed after raid or day-threshold changes.',
  },
  {
    title: 'Stronghold',
    href: '/roblox/99-nights-in-the-forest/stronghold',
    kind: 'guide',
    checkedAt: ninetyNineNightsStronghold.checkedAt,
    cadenceDays: 7,
    owner: 'manual-review',
    note: 'Stronghold level and reward claims need manual review because wrong data hurts trust.',
  },
  {
    title: 'Map',
    href: '/roblox/99-nights-in-the-forest/map',
    kind: 'guide',
    checkedAt: ninetyNineNightsMapGuide.checkedAt,
    cadenceDays: 14,
    owner: 'manual-review',
    note: 'Route pages are slower-moving unless new locations or children are added.',
  },
  {
    title: 'Missing Kids',
    href: '/roblox/99-nights-in-the-forest/missing-kids',
    kind: 'guide',
    checkedAt: ninetyNineNightsMissingKids.checkedAt,
    cadenceDays: 14,
    owner: 'manual-review',
    note: 'Missing child locations need review after map or event changes.',
  },
  {
    title: 'Badges',
    href: '/roblox/99-nights-in-the-forest/badges',
    kind: 'guide',
    checkedAt: ninetyNineNightsBadges.checkedAt,
    cadenceDays: 14,
    owner: 'manual-review',
    note: 'Badge pages should update when new challenge, event, or reward badges appear.',
  },
  {
    title: 'Classes',
    href: '/roblox/99-nights-in-the-forest/classes',
    kind: 'guide',
    checkedAt: ninetyNineNightsClasses.checkedAt,
    cadenceDays: 7,
    owner: 'manual-review',
    note: 'Class unlocks, perks, and costs need review after balance changes.',
  },
  {
    title: 'Class Tier List',
    href: '/roblox/99-nights-in-the-forest/class-tier-list',
    kind: 'guide',
    checkedAt: ninetyNineNightsClasses.checkedAt,
    cadenceDays: 7,
    owner: 'manual-review',
    note: 'Tier-list claims need source review because they are opinion-heavy and competitive.',
  },
  {
    title: 'Animals',
    href: '/roblox/99-nights-in-the-forest/animals',
    kind: 'guide',
    checkedAt: ninetyNineNightsAnimals.checkedAt,
    cadenceDays: 7,
    owner: 'manual-review',
    note: 'Animal, food, and flute requirements need review when taming changes.',
  },
  {
    title: 'Taming Flute',
    href: '/roblox/99-nights-in-the-forest/taming-flute',
    kind: 'guide',
    checkedAt: ninetyNineNightsTamingFlute.checkedAt,
    cadenceDays: 7,
    owner: 'manual-review',
    note: 'Flute XP and tier claims should remain source-checked.',
  },
  {
    title: 'Zookeeper vs Beastmaster',
    href: '/roblox/99-nights-in-the-forest/zookeeper-vs-beastmaster',
    kind: 'guide',
    checkedAt: ninetyNineNightsZookeeperBeastmaster.checkedAt,
    cadenceDays: 7,
    owner: 'manual-review',
    note: 'Class comparison should be revisited if tier-list sources change.',
  },
  {
    title: 'Survival Guide',
    href: '/roblox/99-nights-in-the-forest/survival-guide',
    kind: 'guide',
    checkedAt: ninetyNineNightsSurvivalGuide.checkedAt,
    cadenceDays: 14,
    owner: 'manual-review',
    note: 'Stable beginner advice can update less often than codes and class data.',
  },
];

export type FreshnessStatus = 'fresh' | 'due-soon' | 'stale';

export function getFreshnessAgeDays(checkedAt: string, now = new Date()) {
  const checkedDate = new Date(`${checkedAt}T00:00:00Z`);
  const todayUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  return Math.max(
    0,
    Math.floor((todayUtc - checkedDate.getTime()) / 86_400_000)
  );
}

export function getFreshnessStatus(
  entry: Pick<FreshnessEntry, 'checkedAt' | 'cadenceDays'>,
  now = new Date()
): FreshnessStatus {
  const ageDays = getFreshnessAgeDays(entry.checkedAt, now);

  if (ageDays > entry.cadenceDays) return 'stale';
  if (ageDays >= Math.max(1, entry.cadenceDays - 1)) return 'due-soon';
  return 'fresh';
}
