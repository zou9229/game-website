# Game Data Update Strategy - 2026-06-20

## Principle

This site should not promise second-by-second realtime guide data.

For SEO guide pages, the goal is:

1. Current enough for search intent.
2. Source-backed enough to be trusted.
3. Cheap enough to run before revenue exists.
4. Auditable when a player or search engine revisits the page.

Every dynamic content page should expose:

- `checkedAt` date.
- Source URL trail.
- Data status when relevant, such as `active`, `special`, `expired`, or
  `planned`.
- Conflict notes when sources disagree.

## Page Type Cadence

### Codes Pages

Codes need the highest freshness.

Recommended cadence:

- During launch: manual source check before every publish.
- After deploy: daily scheduled check.
- During major updates/events: same-day check.

Sources:

- Official Roblox game page or official social links when available.
- Trusted Roblox codes publishers.
- Community channels only after manual verification.

Rules:

- Do not mark a code active from one weak source if another strong source says
  expired. Use a conflict note or `special` status.
- Keep expired codes on the page for long-tail searches and to prevent users
  from repeatedly testing bad codes.

### Classes, Tier Lists, Items, Entities

These pages change slower than codes but still need review after balance changes
or content updates.

Recommended cadence:

- Weekly source check while a game is hot.
- Immediate source check after a major patch, event, or new class/item release.
- Monthly source check after traffic stabilizes.

Rules:

- Do not invent stats, costs, drop rates, formulas, or hidden perks.
- If the source only supports a qualitative ranking, publish qualitative
  guidance instead of fake numbers.
- Store class/item data separately from page components so future automation can
  update data without rewriting page layout.

### Survival Guides and Beginner Guides

These are stable enough for a lower cadence.

Recommended cadence:

- Weekly during the first cluster build.
- After major gameplay updates.
- Monthly once stable.

Rules:

- Focus on durable play patterns: route priority, camp setup, resource use,
  mistakes, and team roles.
- Avoid exact mechanics unless a source or direct test confirms them.

### Game Stats

Roblox public stats such as playing count, visits, and favorites can be fresher,
but they are not the core SEO value.

Recommended cadence:

- Manual snapshot during early content build.
- Later: daily or twice-daily API refresh if the API path is reliable.

Rules:

- Always show `checkedAt`.
- Do not block publishing a guide because a live player count is stale.

## Automation Roadmap

### Phase 1 - Manual Ledger

Current phase.

- Keep data in `src/data/*`.
- Add checked dates and source URLs.
- Build pages from typed data.
- Run `pnpm build` before pushing.

### Phase 2 - Scheduled Checks

After Cloudflare deploy and Search Console setup:

- Add a scheduled GitHub Action or Cloudflare Cron job.
- Check source pages for changed text or new codes.
- Open a report or commit only when data changes.
- Trigger build/deploy after review.

Do not edit the existing Docker workflow for this unless we decide it is not
part of any hosting path. The current Cloudflare path should use vinext and
wrangler.

Current implementation step:

- `src/data/99-nights-freshness.ts` is the page-level freshness registry.
- `pnpm game-data:audit` prints a source-review report ordered by stale risk.
- The public updates page shows the same freshness dashboard for transparency.
- No scheduled GitHub Action has been added yet. The next safe automation step
  is a read-only scheduled audit that opens a report, not an auto-publish bot.

### Phase 3 - Data Pipeline

After traffic proves the model:

- Move high-change data into JSON snapshots.
- Keep historical snapshots for codes and tier lists.
- Add a small admin/review workflow before publishing high-risk changes.
- Consider alerts for hot games, new codes, and ranking changes.

## Current Implementation Target

The first crawlable content cluster is live and Search Console has been
submitted. The next implementation target is a safer operating loop:

1. Keep `pnpm game-data:audit` and `/admin/game-data` as read-only checks.
2. Add scheduled or manual source-check reports before any auto-publish flow.
3. Refresh codes and update metadata first, because they are the safest
   automation candidates.
4. Keep guide, class, tier-list, animal, crafting, and route pages behind manual
   review.
5. Use GSC impressions and Semrush/Trends checks to decide which page to
   strengthen next.

Do not build an automatic scrape-and-publish bot yet. Wrong game data is more
damaging than a page that is a few days stale.
