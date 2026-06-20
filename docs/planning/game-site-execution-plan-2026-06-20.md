# Game Website Execution Plan - 2026-06-20

## Current Decision

Build a low-cost Roblox SEO tools/content site on the Cloudflare-native
`shipany-vinext` template.

The first content cluster is `99 Nights in the Forest`. The second cluster is
`Grow a Garden 2`, after the first cluster proves the page model.

## Current Status

- Template: `shipany-ai/shipany-vinext`
- Target repo: `zou9229/game-website`
- Branch: `main`
- Skills: 7Deer skills copied to `.agents/skills`
- First research report:
  `docs/research/game-site-keyword-opportunities-2026-06-20.md`
- Domain and launch plan:
  `docs/planning/domain-and-cloudflare-launch-plan-2026-06-20.md`
- First shipped content commit:
  `52d19ca feat: add roblox game codes pages`
- Live local pages added:
  - `/roblox`
  - `/roblox/99-nights-in-the-forest`
  - `/roblox/99-nights-in-the-forest/codes`
  - `/roblox/99-nights-in-the-forest/classes`
  - `/roblox/99-nights-in-the-forest/class-tier-list`
  - `/roblox/99-nights-in-the-forest/animals`
  - `/roblox/99-nights-in-the-forest/survival-guide`
- Verification: `vinext build` passed after the first Roblox pages were added.

## GitHub Workflow Status

The workflow named `Build and Push Docker Image` is not the Cloudflare Workers
deployment path.

Why:

- Cloudflare deployment uses `vinext`, `wrangler`, `vite.config.ts`, and
  `wrangler.jsonc`.
- The Docker workflow builds and pushes a GHCR Docker image.
- The current `Dockerfile` still expects `.next/standalone`, which belongs to
  the Node/Docker deployment model and is not produced by the vinext Workers
  build.

Decision:

- Do not delete the workflow yet.
- Do not rely on this workflow for Cloudflare.
- If GitHub failures become noisy, make the workflow manual-only, but only after
  confirming there is no separate Docker hosting plan.

## Cloudflare Status

The repo is Cloudflare-ready, but Cloudflare is not fully configured yet.

Evidence:

- `package.json` has a production deploy script that sources `.env.production`
  before `vinext deploy`.
- `vite.config.ts` includes the Cloudflare plugin path.
- `wrangler.example.jsonc` exists.
- Local `wrangler.jsonc` still contains the D1 placeholder
  `REPLACE_WITH_OUTPUT_OF_WRANGLER_D1_CREATE`.
- `.env.production` does not exist yet.

Decision:

- Do not deploy before the first content loop is clean enough.
- When ready, run the `deploy-cloudflare` flow:
  1. Wrangler login check.
  2. Create/populate D1.
  3. Create `.env.production`.
  4. Set secrets.
  5. Build.
  6. Confirm final deploy.
  7. Verify live URL.

## Product Strategy

This is not a broad game portal at the start. It is a Roblox search-intent site.

Core user intents:

- Find working Roblox game codes.
- Compare classes, items, values, or builds.
- Learn how to survive, progress, or unlock features.
- Check what changed after an update.

Initial site shape:

- `/roblox` - Roblox hub.
- `/roblox/<game>` - game hub.
- `/roblox/<game>/codes` - first traffic entry page.
- `/roblox/<game>/class-tier-list` - decision-support page.
- `/roblox/<game>/classes` - wiki-style lookup page.
- `/roblox/<game>/animals` - taming/wiki lookup page when source data exists.
- `/roblox/<game>/survival-guide` - guide page.
- `/roblox/codes` - multi-game codes index after at least 2 game clusters.

## Monetization

Phase 1: no aggressive monetization.

- Goal: get pages indexed and collect Search Console data.
- Avoid intrusive ads before the site has trust.
- Add clear fan-site disclaimers.

Phase 2: lightweight monetization.

- Display ads after meaningful traffic.
- Affiliate links only where they fit naturally, such as gaming accessories,
  Roblox gift cards, or VPN/browser-game related offers.
- Optional newsletter or Discord for code/update alerts.

Phase 3: tool-led monetization.

- Premium alerts are possible only if there is real repeat demand.
- Calculators or value trackers can support ads and backlinks, but only with
  verified formulas/data sources.

## Cost Model

Expected early cost is low:

- Cloudflare Workers + D1: likely near zero at early traffic levels.
- Domain: annual domain cost if a custom domain is used.
- Semrush: optional research cost; use only when deciding clusters or validating
  10-20 target keywords.
- Content cost: mostly data verification and page creation time.

Avoid early costs:

- Paid game APIs before traffic exists.
- Heavy scraping infrastructure.
- Broad HTML5 game hosting/licensing.
- Large ad stack before indexing.

## Keyword Roadmap

First cluster: `99 Nights in the Forest`

Priority pages:

1. `99 nights in the forest codes`
2. `99 nights in the forest class tier list`
3. `99 nights in the forest classes`
4. `99 nights in the forest beginner guide`
5. `99 nights in the forest survival guide`
6. `99 nights in the forest animals`
7. `99 nights in the forest taming`
8. `99 nights in the forest entities`
9. `99 nights in the forest update`

Second cluster: `Grow a Garden 2`

Priority pages:

1. `grow a garden 2 codes`
2. `grow a garden 2 tier list`
3. `grow a garden 2 best plants`
4. `grow a garden 2 gear tier list`
5. `grow a garden 2 value list`
6. `grow a garden 2 stock notifier`

Support hub:

1. `roblox codes`
2. `roblox codes 2026`
3. `roblox game codes`
4. `working roblox codes`

Semrush timing:

- Not required before finishing the first cluster shell.
- Use before building the second cluster or before deciding whether a calculator
  is worth building.
- Validate: search volume, KD, top competitors, SERP features, traffic trend.

## Execution Phases

### Phase 0 - Foundation

Status: mostly complete.

Done:

- Template selected.
- Skills installed.
- Research report created.
- First Roblox data model added.
- SEO helpers added.
- Sitemap and robots added.
- First game codes page added.

Remaining:

- Leave GitHub Docker workflow alone until Cloudflare deploy path is verified.
- Decide site/domain name before production deploy.

### Phase 1 - First Game Cluster

Goal: make `99 Nights in the Forest` a complete crawlable cluster.

Pages:

1. Codes page - done.
2. Classes page - done.
3. Class tier list - done.
4. Animals/taming page - done.
5. Survival guide - done.
6. Broader entities page - only after verified source pass.
7. Updates page - after we have reliable update sources.

Completion standard:

- Every page has canonical URL, metadata, Breadcrumb schema, and relevant FAQ or
  VideoGame schema.
- No invented game stats, codes, classes, rewards, values, or formulas.
- Sitemap includes all live pages.
- `vinext build` passes.

### Phase 2 - Cloudflare First Deploy

Goal: deploy a working version with the first cluster.

Steps:

1. Confirm domain/app name.
2. Run Cloudflare preflight.
3. Create D1 or choose Postgres/Hyperdrive.
4. Set production URL in `.env.production` and `wrangler.jsonc.vars`.
5. Set secrets.
6. Build.
7. Confirm and deploy.
8. Verify live page and `/api/config/public`.
9. Add Search Console and submit sitemap.

Completion standard:

- Live URL returns 200.
- Sitemap works.
- Auth/config endpoint works.
- No localhost URL baked into production.

### Phase 3 - Search Feedback Loop

Goal: use real indexing/search data before scaling content.

Steps:

1. Add Google Search Console.
2. Submit sitemap.
3. Track indexed pages.
4. Watch impressions and queries for 7-14 days.
5. Update codes and freshness dates when sources change.

Completion standard:

- First impressions appear.
- Queries identify which page type gets traction.

### Phase 4 - Second Game Cluster

Goal: expand into `Grow a Garden 2` only after the first cluster structure is
stable.

Steps:

1. Use Semrush or SERP checks to validate 10-20 target keywords.
2. Build codes page.
3. Build plant/gear tier list pages.
4. Avoid calculators until values/formulas are verified.

Completion standard:

- At least two game clusters are live.
- Multi-game hub can be useful.

### Phase 5 - Multi-Game Hub and Monetization

Goal: turn individual clusters into a broader Roblox hub.

Steps:

1. Build `/roblox/codes`.
2. Add internal linking between clusters.
3. Add update cadence.
4. Add ads/affiliate only after indexing and early traffic.

Completion standard:

- Hub pages drive crawl and internal discovery.
- Monetization does not damage UX or trust.

## Immediate Next Step

Buy or choose the production domain, then configure Cloudflare for the first
deploy.

Do not build a calculator yet. The calculator needs verified game formulas or
data. The next low-risk product step is:

1. Domain/app-name decision

Recommended order:

1. Buy or confirm a neutral gaming domain.
2. Add the domain to Cloudflare.
3. Configure worker name, D1, `.env.production`, and `wrangler.jsonc`.
4. Deploy the first content cluster.
5. Add Search Console and submit sitemap.
