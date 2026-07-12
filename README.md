# Quest Codes

Quest Codes is a Roblox codes and game guides site focused on source-checked
code lists, update notes, tier lists, and practical survival guides.

Live site: https://questcodes.com

## Current Scope

- Roblox codes and guides, starting with `99 Nights in the Forest`
- Public SEO pages for codes, classes, animals, crafting, route guides,
  material guides, updates, and common questions
- Structured metadata, sitemap, robots.txt, and `llms.txt`
- Cloudflare Workers deployment through ShipAny vinext
- Admin-only game data freshness audit page at `/admin/game-data`
- Quest Codes operating skill at
  `.agent/skills/questcodes-99nights-keyword-to-page/SKILL.md`

## Tech Stack

- Next.js 15 App Router on vinext/Vite
- React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- Cloudflare Workers with D1 in production
- Drizzle ORM and better-auth
- next-intl locale routing

## Local Development

```bash
pnpm install
pnpm db:push
pnpm dev
```

Local environment values live in `.env.development` and are not committed.
Keep `.env.example` in sync when adding new public or server environment
variables.

## Verification

```bash
pnpm build
pnpm game-data:audit
```

`pnpm game-data:audit` checks the freshness metadata for the game guide data and
prints which sections are fresh, due soon, or stale.

## Cloudflare Deployment

```bash
pnpm run deploy
```

The production Worker is configured for `questcodes.com`. Cloudflare secrets
must be managed through Wrangler or the Cloudflare dashboard, not committed to
the repository.

## Admin

The admin panel is available at `/admin` for authorized users. The game data
freshness tab at `/admin/game-data` currently performs a read-only audit. It
does not scrape external sites or publish content automatically.

## Monetization And Tracking

Google Analytics and Google AdSense are configured from `/admin/settings` under
the Analytics tab. Google Analytics uses the GA4 Measurement ID. AdSense uses a
Publisher ID (`ca-pub-...` or `pub-...`), generates `/ads.txt`, and only injects
the AdSense verification/ads script when its switch is enabled. Enable the
script during AdSense site review; control Auto ads separately in the AdSense
dashboard after approval. Keep intrusive formats disabled while early search
traffic and user engagement are still being measured.

## Content Strategy

The current SEO direction is English-first Roblox guide content. Country demand
from keyword checks showed strong interest in the United States and the
Philippines for `99 Nights in the Forest codes`, but the query language is still
English.

The sitemap intentionally exposes English/default-locale public pages only.
Non-default locale routes are `noindex, follow` until they have real localized
content. Additional indexable languages such as `pt-BR` or `es` should be added
only after Semrush/Trends/GSC show local-language demand and the page body is
actually localized. Do not publish thin translated duplicates.

## Upstream Template

This project is based on ShipAny vinext, the Cloudflare-native edition of
ShipAny. The `upstream` remote should remain the ShipAny template. Do not push
Quest Codes changes back to upstream.

## Useful Commands

| Command                | Purpose                        |
| ---------------------- | ------------------------------ |
| `pnpm dev`             | Start local development server |
| `pnpm build`           | Run production build           |
| `pnpm db:push`         | Sync local development schema  |
| `pnpm game-data:audit` | Check guide data freshness     |
| `pnpm run deploy`      | Deploy to Cloudflare Workers   |
