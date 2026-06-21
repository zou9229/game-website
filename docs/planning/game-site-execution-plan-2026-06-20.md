# Quest Codes Execution Plan - Updated 2026-06-21

## Current Decision

Quest Codes is an English-first Roblox codes and guide site on the
Cloudflare-native `shipany-vinext` template.

The current product is not a playable mini-game portal. It is a Roblox
search-intent site:

- working and expired game codes,
- source-checked game guides,
- class and tier-list references,
- crafting, route, item, and update pages,
- an admin freshness audit for source-review operations.

## Current Status

- Template: `shipany-ai/shipany-vinext`
- Repo: `zou9229/game-website`
- Branch: `main`
- Domain: `questcodes.com`
- Deployment: Cloudflare Workers via vinext and Wrangler
- GSC: submitted by the owner
- Skills: 7Deer skills installed in `.agent/skills` and mirrored to
  `.agents/skills`
- Project-specific operation skill:
  `.agent/skills/questcodes-99nights-keyword-to-page/SKILL.md`

Live public foundation:

- `/`
- `/codes`
- `/roblox`
- `/roblox/99-nights-in-the-forest`
- 18 live child pages under `/roblox/99-nights-in-the-forest/*`
- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`
- `/llms-full.txt`

Operational foundation:

- `src/data/99-nights-freshness.ts`
- `src/data/game-data-audit.ts`
- `pnpm game-data:audit`
- `/admin/game-data` read-only freshness audit

## Progress View

There are two different completion baselines:

- Launch MVP: about 80%.
- Long-term operating system: about 45%.

The MVP is mostly live because the domain, Cloudflare deployment, first content
cluster, sitemap, robots, llms, and GSC submission are in place.

The operating system is not complete because automated source checks, community
submissions, AI-assisted moderation, review queues, and multi-language content
are still intentionally gated.

## GitHub Workflow Status

The GitHub workflow named `Build and Push Docker Image` is not the active
Cloudflare Workers deployment path.

Current decision:

- Do not delete it.
- Do not rely on it for Cloudflare deploys.
- Do not modify GitHub workflows unless there is a confirmed deployment need or
  the owner explicitly asks.

Cloudflare deploys use:

- `vinext`
- `vite.config.ts`
- `wrangler.jsonc`
- `pnpm run deploy`

## SEO Strategy

Do not target broad `Roblox` as a primary keyword. It is a market and language
signal, not a realistic ranking target for a new domain.

Primary ranking wedge:

- `99 nights in the forest codes`
- lower-competition supporting pages for gems, crafting, bandages, stronghold,
  missing kids, classes, tier lists, taming, animals, and updates.

Semrush and Trends are used to decide priority, not to guarantee traffic.

The site reduces risk by building a topical cluster instead of depending on one
keyword.

## Language Strategy

Current indexable game content is English only.

Reason:

- US and Philippines demand can both be served by English queries.
- Current game pages are written in English.
- Adding translated routes without real localized content would create thin or
  duplicate pages.

Next language candidates after GSC/keyword validation:

1. `pt-BR` for Brazil.
2. `es` for Mexico and broader Spanish-speaking LATAM.

Do not prioritize Chinese content for this Roblox SEO wedge until search data
shows Chinese-language query demand for the game cluster.

Implementation gate for any non-English page:

- local keyword evidence,
- localized title and description,
- localized page body,
- self canonical,
- hreflang alternates,
- sitemap inclusion,
- source policy preserved.

## Current Sitemap Policy

The sitemap should expose:

- English/default-locale public pages only.

It should not expose `zh`, `pt-BR`, or `es` game pages until those pages have
real localized content. Non-default locale routes should stay `noindex, follow`
until a language passes the localization gate.

## Monetization

Phase 1: no aggressive monetization.

- Focus on indexing, trust, and Search Console data.
- Avoid intrusive ads before the site has traffic and engagement.

Phase 2: lightweight monetization.

- Display ads after meaningful organic traffic.
- Affiliate links only where they naturally fit, such as Roblox gift cards or
  gaming accessories.

Phase 3: tool-led monetization.

- Calculators, value tools, or alert features only after formulas/data sources
  are verified.

## Execution Phases

### Phase 0 - Foundation

Status: complete.

Done:

- Template selected.
- Domain selected and deployed.
- Skills installed and mirrored.
- Cloudflare deployment working.
- SEO infra present.

### Phase 1 - First Game Cluster

Status: mostly complete.

Done:

- Codes
- Gems
- Gem of the Forest
- Forest Gem Fragments
- Stronghold
- Crafting
- Crafting Bench 5
- Bandages
- Badges
- Map
- Missing Kids
- Classes
- Class Tier List
- Animals
- Taming Flute
- Zookeeper vs Beastmaster
- Survival Guide
- Updates

Remaining:

- Keep source checks fresh.
- Avoid adding duplicate thin pages.
- Expand only when a new keyword has a distinct intent.

### Phase 2 - Search Feedback Loop

Status: active.

Steps:

1. Watch GSC indexing and impressions.
2. Check which pages get impressions first.
3. Use Semrush/Trends for the next keyword batch.
4. Strengthen existing pages before creating duplicates.
5. Submit updated sitemap after meaningful page or sitemap changes.

### Phase 3 - Safe Automation

Status: started.

Current safe automation:

- read-only freshness audit,
- game data audit script,
- project-specific keyword-to-page skill.

Next safe automation:

- scheduled read-only source check report,
- no auto-publish for high-risk guide data,
- optional admin action that copies a source-check checklist.

### Phase 4 - Language Validation

Status: not started.

First candidates:

- `pt-BR`
- `es`

Do not create translated indexable pages until local keyword evidence exists.

### Phase 5 - Second Game Cluster

Status: planned.

Candidate: `Grow a Garden 2`.

Gate:

- first cluster has indexing/impression signals,
- source data is available,
- 10-20 target keywords are validated,
- pages can be built without fake formulas or copied lists.

## Immediate Next Steps

1. Keep sitemap honest: index English game pages only until localization exists.
2. Use `questcodes-99nights-keyword-to-page` for each new keyword pass.
3. Watch GSC for first impressions and indexing errors.
4. Validate `pt-BR` and `es` keyword demand before building localized pages.
5. Build the next page only when the intent is not already covered.
