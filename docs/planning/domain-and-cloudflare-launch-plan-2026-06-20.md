# Domain and Cloudflare Launch Plan - 2026-06-20

## Decision

Buy a domain before the first production deploy.

Reason:

- The site should not launch on a `workers.dev` URL if we already know this is
  an SEO project.
- Canonical URLs, sitemap URLs, Open Graph URLs, Search Console, and
  Cloudflare routes should all use the final domain from day one.
- Changing the domain after indexing starts is possible, but it creates extra
  redirect and recrawl work.

## Domain Rules

Recommended:

- Use a neutral, brandable English domain.
- Prefer `.com` if affordable.
- `.gg` is acceptable for gaming, but only if the price is reasonable.
- Keep the domain broad enough for Roblox plus future game guides.
- Keep it easy to say and type.
- Avoid hyphens, numbers, long spellings, and hard-to-pronounce words.

Avoid:

- Do not put `roblox` in the root domain.
- Do not put `blox` in the root domain.
- Do not use a single game name such as `99nights` as the main brand.
- Do not use official-looking wording such as `official`, `support`, `wiki` if
  it could imply affiliation.

Rationale:

- Roblox Terms say creators are prohibited from using `Roblox`, `Blox`, or names
  similar to Roblox in experience titles, usernames, display names, or community
  names, and trademark use outside Roblox is governed by Roblox's name/logo
  guidelines. For a public SEO site, a neutral domain is lower risk.
- We can still target Roblox keywords in page titles, headings, body text, and
  URLs such as `/roblox/...`.

## Domain Shape

Best shape:

- `{brand}.com`
- `{brand}.gg`
- `{brand}guides.com`
- `{brand}codes.com`

Good brand themes:

- Codes + guides: `codes`, `guides`, `loot`, `patch`, `rank`, `quest`
- Game-neutral: `play`, `game`, `meta`, `hub`, `base`, `forge`

Candidate patterns to check:

- `playguidehub.com`
- `gameguidehub.com`
- `dailygamecodes.com`
- `lootguide.com`
- `lootguides.com`
- `patchguides.com`
- `rankguides.com`
- `questcodes.com`
- `gamecodeshub.com`
- `playcodeshub.com`

Availability must be checked at purchase time. Do not buy a premium-priced
domain unless the price is still sensible for a zero-revenue test site.

## My Preferred Direction

Choose a broad domain, not a Roblox-specific domain.

Best fit for this project:

1. `gamecodeshub.com` or similar if available at normal price.
2. `playguidehub.com` or similar if we want guides + tools, not only codes.
3. `dailygamecodes.com` if we want the site to lean harder into codes freshness.

If none are available, look for the same pattern with a short brand word plus
`guides`, `codes`, or `hub`.

## Cloudflare Launch Steps After Domain Purchase

1. Add the domain to Cloudflare as a zone.
2. Point registrar nameservers to Cloudflare.
3. Pick final app name from the domain.
4. Update production config:
   - `package.json` package name / worker-safe slug if needed.
   - `wrangler.jsonc` Worker name.
   - `wrangler.jsonc.vars.NEXT_PUBLIC_APP_URL`.
   - `wrangler.jsonc.vars.NEXT_PUBLIC_APP_NAME`.
   - `.env.production` public app URL and app name.
5. Create D1 and replace the placeholder database ID in `wrangler.jsonc`.
6. Set required secrets with `wrangler secret put`.
7. Build.
8. Confirm production deploy.
9. Verify `/`, `/roblox`, `/sitemap.xml`, and `/api/config/public`.
10. Add Google Search Console and submit sitemap.

## Current Blockers

- No final domain/app name yet.
- `wrangler.jsonc` still contains the D1 placeholder:
  `REPLACE_WITH_OUTPUT_OF_WRANGLER_D1_CREATE`.
- `.env.production` does not exist yet.
- Cloudflare zone and route are not configured yet.

## Do Not Change Yet

- Do not edit or delete the GitHub Docker workflow for launch unless we decide
  it is definitely not used anywhere.
- Do not deploy to Cloudflare until the domain decision is made, unless we
  intentionally choose a temporary `workers.dev` launch.
