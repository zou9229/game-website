# Quest Codes AdSense Post-Fix Verification

**Date:** 2026-07-17  
**Baseline:** `adsense-readiness-audit-2026-07-17.md`  
**Code status:** Ready to deploy  
**AdSense status:** Ready after the remaining manual checks below

## Implemented

- AdSense loader removed from the Roblox layout and `/codes`; the configured review code remains on the substantive homepage only.
- `/codes` and `/roblox` are `noindex, follow` and removed from the sitemap while they remain navigation-only directories.
- Classes, Animals, Survival Guide, and Updates are `noindex, follow`, excluded from the sitemap, and carry no AdSense loader until original testing/value is added.
- The duplicate Class Tier List route now returns a permanent redirect to Classes and no longer appears in the page registry or freshness audit.
- The public Updates page now shows only the latest entry for each player-facing update type; repeated runs remain operational data rather than duplicate public entries.
- The privacy policy now identifies Google AdSense, Google Analytics, Google Privacy & Messaging, and Cloudflare; discloses cookies, web beacons, IP addresses and identifiers; and covers retention, rights, international processing, and minors.
- Public registration and implicit social sign-up are disabled. Existing authorized accounts, including the super administrator, can still sign in.
- Invalid Chinese alternate-link response headers are disabled while non-English routes remain noindex.
- `Referrer-Policy`, `X-Content-Type-Options`, and a restrictive `Permissions-Policy` are applied by the application proxy.
- Homepage low-contrast emerald text was strengthened.
- The July 17 source check confirmed `forestwakesup26` and `afterparty` in PC Gamer and GamesRadar. Blocked sources and disputed statuses were left unchanged.

## Verification

- `pnpm build`: pass.
- `pnpm game-data:audit`: 19 fresh, 0 due soon, 0 stale; Launch MVP 100%, operating system 80%.
- Local rendered checks: six review/thin routes return `noindex, follow` and contain no AdSense script.
- Local sitemap: 21 URLs; no thin directory, review-only page, or Class Tier List URL.
- Class Tier List: HTTP 308 to `/roblox/99-nights-in-the-forest/classes`.
- Homepage response: no invalid locale alternate header; security headers present.
- `pnpm lint`: unavailable because the repository has no ESLint or Oxlint dependency. The production TypeScript/vinext build is the compile gate.

## Manual Gates Before Requesting Review

1. Deploy this revision and verify the same robots, sitemap, privacy, redirect, and AdSense boundaries on `https://questcodes.com`.
2. From a clean EEA/UK/Swiss session, verify the Google-certified consent message, reject/manage choices, and network behavior before and after consent.
3. In AdSense, confirm `questcodes.com` is attached to publisher `pub-6801555055690403` and the China payment identity is complete.
4. Keep the four review-only guides noindex/no-ads until real test evidence or substantial independent utility is added.
5. Document the permitted-use basis for Roblox/game images.

No code change can truthfully replace gates 2, 3, or 5; they require operator/account evidence.
