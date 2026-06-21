---
name: questcodes-99nights-keyword-to-page
description: Quest Codes daily operating skill for 99 Nights in the Forest keyword mining, gap analysis, page updates, and deployment-safe reporting.
category: research
---

# Quest Codes 99 Nights Keyword-To-Page Pipeline

Target site: `https://questcodes.com`
Repo path: `C:\Users\92381\Desktop\game-website`
Stack: ShipAny vinext, Next App Router, TypeScript, Cloudflare Workers.

Use this skill when continuing Quest Codes SEO operations for the `99 Nights in
the Forest` Roblox cluster.

## Operating Rules

1. Do not target broad `Roblox` as a primary keyword. It is a market signal, not
   a realistic new-domain target.
2. Do not publish invented game stats, code rewards, drop rates, class values,
   crafting costs, hidden formulas, or patch claims.
3. New content must improve the cluster with at least one of:
   - stronger source trail,
   - clearer search-intent coverage,
   - better internal linking,
   - fresher code/update data,
   - a distinct page intent that is not already covered.
4. Treat Semrush volume/KD as a filter. Prefer a lower-KD long-tail only when it
   has enough intent and the page can add source-checked value.
5. Do not create thin translated pages. Add non-English pages only after local
   keyword validation and real localized content.
6. Build and deploy only after `pnpm build` passes.

## Current Indexed-Content Policy

The current 99 Nights cluster is English-first. The sitemap should expose only
English game/content pages until a language has real localized content.

Localized static legal pages can remain in the sitemap. Future `pt-br` or `es`
content must have:

- localized metadata,
- localized body copy,
- self-canonical URL,
- hreflang alternates,
- sitemap inclusion,
- localized keyword evidence.

## Existing Data And Pages

Before building, inspect these files:

- `src/data/roblox-games.ts`
- `src/data/seo-keywords.ts`
- `src/data/99-nights-freshness.ts`
- `src/data/game-data-audit.ts`
- `src/app/sitemap.ts`
- `src/lib/llms.ts`

Current live 99 Nights pages are listed from `robloxGames[0].pages`.

## Keyword Mining Sources

Use sources in this order:

1. User-provided Semrush/Google Trends data.
2. Trusted gaming media pages for current source checks.
3. YouTube search result demand and titles.
4. Fandom/wiki pages for terminology.
5. Reddit/community posts only as signal, not confirmation.

Candidate query patterns:

- `99 nights in the forest codes`
- `99 nights in the forest codes for gems`
- `how to craft bandages in 99 nights in the forest`
- `99 nights in the forest crafting bench`
- `99 nights in the forest missing kids locations`
- `99 nights in the forest stronghold`
- `99 nights in the forest class tier list`
- `99 nights in the forest taming flute`
- `99 nights in the forest zookeeper vs beastmaster`

International validation queue:

- `codigos 99 nights in the forest`
- `99 nights in the forest codigos`
- `codigos do 99 nights in the forest`
- `codigos de 99 nights in the forest`
- `99 nights in the forest codigos roblox`

Use accents in live content after validation, but keep this skill ASCII-safe.

## Gap Analysis

For each candidate:

1. Check whether an existing page already covers the intent.
2. If covered, strengthen the existing page instead of creating a duplicate.
3. If uncovered, build a new page only when reliable source data exists.
4. Update `src/data/seo-keywords.ts`, `src/data/roblox-games.ts`, sitemap
   generation, `llms.txt` coverage, and the freshness registry as needed.
5. Keep internal links from hub pages and related pages.

## Page Build Standard

Every new public content page needs:

- `generateMetadata` with Month Year, description, keywords, and canonical.
- Breadcrumb JSON-LD.
- FAQPage JSON-LD when the page answers questions.
- VideoGame JSON-LD when the page is a game hub or major game page.
- Visible checked date or source policy.
- Related internal links.
- No AI-generated claims presented as facts.

## Data Freshness

Automation candidates:

- codes,
- updates,
- Roblox metadata.

Manual-review pages:

- classes,
- tier lists,
- animals,
- taming,
- crafting,
- map/routes,
- survival guide,
- stronghold,
- gems/materials.

If data is stale, report the source-check action first. Do not auto-publish
high-risk guide changes.

## Verification

Run:

```bash
pnpm game-data:audit
pnpm build
```

Optional live checks after deployment:

```bash
curl -I https://questcodes.com/sitemap.xml
curl -I https://questcodes.com/llms.txt
curl -I https://questcodes.com/roblox/99-nights-in-the-forest/codes
```

## Output

If changes were made, report:

- keyword or SEO issue addressed,
- files changed,
- build result,
- deploy result if deployed,
- what to watch in GSC.

If no high-value opportunity is found, do not build filler pages.
