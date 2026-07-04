# Quest Codes Operations Playbook

Updated: 2026-06-24

This document is the operating manual for `questcodes.com`.

Quest Codes is not a playable mini-game portal. It is an English-first Roblox codes and guide site focused on source-checked search-intent pages:

- Roblox game codes
- source-checked guide pages
- class and tier-list references
- crafting, route, item, badge, map, and update pages
- freshness auditing for admin review

The first cluster is `99 Nights in the Forest`.

## Core Operating Goal

The site should grow by doing four things repeatedly:

1. Keep existing pages fresh enough that users and search engines trust them.
2. Use GSC, Semrush, Trends, YouTube, and community signals to find the next useful page or update.
3. Improve existing pages before creating duplicate thin pages.
4. Build backlinks slowly from relevant places after the site has a trust base.

SEO is not a one-time publish event. It is a feedback loop.

## Current System

### Live Site

- Homepage: `https://questcodes.com/`
- Codes index: `https://questcodes.com/codes`
- Roblox hub: `https://questcodes.com/roblox`
- 99 Nights hub: `https://questcodes.com/roblox/99-nights-in-the-forest`
- Admin game data: `https://questcodes.com/admin/game-data`
- Sitemap: `https://questcodes.com/sitemap.xml`
- LLMs file: `https://questcodes.com/llms.txt`
- Editorial policy: `https://questcodes.com/editorial-policy`

### Important Local Commands

Run these from:

```powershell
cd C:\Users\92381\Desktop\game-website
```

Useful commands:

```powershell
pnpm game-data:audit
pnpm game-data:source-check
pnpm build
pnpm run deploy
git status --short --branch
```

### What Each Command Does

`pnpm game-data:audit`

- Checks page freshness status.
- Shows which pages are fresh, due soon, or stale.
- Tells you which pages deserve attention first.

Effect: prevents random work. You update the page with the highest stale risk first.

`pnpm game-data:source-check`

- Runs the current source-check snapshot logic.
- Reports source health and source-check attention items.
- Helps decide whether the codes/update trail needs manual review.

Effect: gives you a safer starting point before editing codes or update data.

`pnpm build`

- Verifies the project can build before deployment.
- Catches TypeScript, route, MDX, metadata, and import errors.

Effect: reduces the chance of deploying a broken page.

`pnpm run deploy`

- Deploys the current committed code to Cloudflare Workers.
- Uses the project Cloudflare configuration and D1 binding.

Effect: publishes the current site to `questcodes.com`.

## What You Should Do vs What Codex Should Do

You should usually do:

- Check GSC, Bing Webmaster Tools, Semrush, Google Trends, and Cloudflare dashboard.
- Decide whether a keyword looks worth exploring.
- Provide screenshots or copied keyword data when tools are logged in through your browser.
- Approve deploys when Codex asks.
- Avoid manually editing source files unless you are comfortable with TypeScript.

Codex should usually do:

- Run audits.
- Read relevant 7Deer skills.
- Update data files and pages.
- Add internal links, metadata, schema, sitemap, and `llms.txt` entries.
- Run `pnpm build`.
- Commit, push, deploy, and smoke test.
- Summarize what changed and what to watch in GSC.

Reason: the project is code-driven. Manual edits in the wrong file can break build or SEO metadata. Codex can keep the code, data, sitemap, and deployment consistent.

## Daily Operating SOP

Recommended time: 20-40 minutes.

Do this once per day while the site is young.

### Step 1 - Open The Live Site

Open:

- `https://questcodes.com/`
- `https://questcodes.com/roblox/99-nights-in-the-forest/codes`
- `https://questcodes.com/roblox/99-nights-in-the-forest/updates`
- `https://questcodes.com/admin/game-data`

Check:

- Does the site load?
- Does the header/navigation work?
- Does the codes page show a recent checked date?
- Does the updates page show a recent source-check entry?
- Does `/admin/game-data` load without the error screen?

Why this matters:

- Users leave quickly when they see stale dates or broken navigation.
- A codes site has to feel current.
- Admin pages breaking usually means a code or runtime issue that should be fixed before adding more content.

Effect:

- Catches obvious production issues before you spend time on SEO.
- Protects trust and crawl quality.

If something is broken, tell Codex:

```text
Quest Codes daily check: the live page <URL> is broken or looks stale. Please diagnose, fix, build, deploy, and explain what happened.
```

### Step 2 - Run Or Ask Codex To Run The Freshness Audit

Manual command:

```powershell
pnpm game-data:audit
```

Or tell Codex:

```text
Run the Quest Codes daily freshness audit, explain which pages are due or stale, and update only the highest-priority item if source evidence supports it.
```

Read the output:

- `Fresh`: no action needed.
- `Due soon`: consider checking if it is high priority.
- `Stale`: check before doing other SEO work.

Priority order:

1. Codes
2. Updates
3. Roblox game metadata
4. Classes / tier list / animals / crafting
5. Map / missing kids / badges / survival guide

Why this matters:

- Codes pages change fastest.
- Wrong codes create immediate user disappointment.
- Guide pages can be slightly older if they are source-backed and not claiming live updates.

Effect:

- Keeps the most sensitive pages current.
- Reduces stale-content risk in GSC and user behavior.

### Step 3 - Check Sources Before Updating Facts

Use source order:

1. Official Roblox game page or official developer channels.
2. Trusted gaming media and guide sites.
3. Fandom/wiki pages for terminology.
4. YouTube videos for demand and gameplay clues.
5. Reddit/community posts only as a signal, not confirmation.

For codes, use stronger rules:

- Do not mark a code active from one weak source.
- If sources disagree, use `special` or conflict notes.
- Keep expired codes when useful.
- Do not publish rumored codes as working.

Why this matters:

- A new site cannot win by copying every rumor.
- The site's edge is source labels and conservative data.

Effect:

- Builds trust with users and makes the content defensible.

Tell Codex:

```text
Run a source check for 99 Nights codes. Do not invent rewards or statuses. If sources disagree, keep the conflict visible. Update the data only if the evidence is strong, then build and deploy.
```

### Step 4 - Check GSC

Open Google Search Console for `questcodes.com`.

Check:

- Indexing > Pages
- Sitemaps
- Performance > Search results

Record:

- Indexed page count
- Not indexed reasons
- Top queries
- Top pages
- Impressions
- Clicks
- Average position

Why this matters:

- GSC tells you what Google is actually testing.
- Semrush estimates demand, but GSC tells you what your own site is being shown for.

Effect:

- Determines whether to strengthen existing pages or create new ones.

Decision rules:

- If a page has impressions but low CTR, improve title/meta/intro.
- If a page has impressions around a topic already covered, strengthen that page.
- If a new query appears and no page answers it clearly, consider a new page.
- If many pages are discovered but not indexed, improve internal links and content depth before adding more pages.

Useful prompt:

```text
Here is today's GSC data for Quest Codes: <paste queries/pages>. Decide whether we should improve an existing page or build a new page. Use the 7Deer Quest Codes skill and do not create thin pages.
```

### Step 5 - Check Bing Webmaster Tools

Check:

- Sitemap status
- URL inspection for key pages
- IndexNow / URL submission status if available

Why this matters:

- Bing can discover new pages faster through URL submission and IndexNow-style updates.
- Bing data sometimes appears earlier for a new domain.

Effect:

- Gives another indexing signal and another feedback source.

Submit only meaningful changes:

- New page
- Major page update
- New content cluster
- Important title/metadata change

Do not submit every tiny text change.

### Step 6 - Check 3-5 Keywords

Use Semrush or Google Trends.

Start with patterns:

- `99 nights in the forest codes`
- `99 nights in the forest crafting bench`
- `how to craft bandages in 99 nights in the forest`
- `99 nights in the forest class tier list`
- `99 nights in the forest gems`
- `99 nights in the forest stronghold`
- `99 nights in the forest missing kids`
- `99 nights in the forest taming flute`

For each keyword, record:

- Keyword
- US volume
- Global volume
- KD
- Intent
- Related questions
- SERP features
- Current competitors
- Existing Quest Codes page that covers it

Why this matters:

- You are looking for intent gaps, not just high volume.
- A low-volume long-tail can still be valuable if it converts into a page cluster.

Effect:

- Builds a roadmap based on demand and competition instead of guessing.

Decision rules:

- Do not target broad `Roblox` as a primary keyword.
- KD under 30 is attractive, but only if the intent is clear.
- KD 30-50 can still be worth doing if the page is source-checked and part of the existing cluster.
- Volume unavailable does not always mean worthless. For new Roblox subtopics, tools can lag behind real demand.
- Build a new page only if the intent is distinct.
- If the intent is already covered, improve the existing page instead.

Useful prompt:

```text
I checked these Semrush keywords: <paste data>. Decide the next Quest Codes action: no action, improve existing page, or build a new page. Use 7Deer rules and explain why.
```

### Step 7 - Deploy Only After Verification

If files changed, the safe order is:

```powershell
pnpm game-data:audit
pnpm build
git status --short --branch
git add <changed files>
git commit -m "..."
git push origin main
pnpm run deploy
```

Then smoke test:

```powershell
curl.exe -L -sS --noproxy "*" -o NUL -w "home HTTP=%{http_code}\n" https://questcodes.com/
curl.exe -L -sS --noproxy "*" -o NUL -w "codes HTTP=%{http_code}\n" https://questcodes.com/roblox/99-nights-in-the-forest/codes
curl.exe -L -sS --noproxy "*" -o NUL -w "sitemap HTTP=%{http_code}\n" https://questcodes.com/sitemap.xml
curl.exe -L -sS --noproxy "*" -o NUL -w "llms HTTP=%{http_code}\n" https://questcodes.com/llms.txt
```

Why this matters:

- A broken deploy can damage indexing and user trust.
- Smoke tests verify production, not only local build.

Effect:

- Keeps the site stable while updates continue.

For normal use, tell Codex:

```text
Please implement the selected Quest Codes update, run game-data audit and build, commit, push, deploy to Cloudflare after confirmation, and smoke test the live pages.
```

## Weekly Operating SOP

Recommended time: 1-2 hours.

Do this once per week.

### Step 1 - Review GSC Performance

Export or copy:

- Top 20 queries
- Top 20 pages
- Pages with impressions but no clicks
- Queries around `codes`, `crafting`, `classes`, `gems`, `map`, `badges`, `updates`

Why this matters:

- Weekly data is less noisy than daily data.
- Early impressions show which content Google is testing.

Effect:

- Turns GSC into the main content planning source.

Actions:

- Improve titles for pages with impressions but weak CTR.
- Add internal links to pages with impressions but weak average position.
- Add FAQs to pages that match question queries.
- Add missing source notes where pages feel thin.

### Step 2 - Refresh The Codes Page

Even if the audit does not show stale, check the codes page weekly.

Review:

- Active codes
- Special/conflicting codes
- Expired codes
- Source links
- Checked dates
- FAQ answers

Why this matters:

- Codes pages are the highest-frequency intent.
- This page is likely to be the first organic landing page.

Effect:

- Improves retention and repeat visits.

### Step 3 - Improve One Existing Page

Choose one page from GSC or audit.

Improve one of:

- intro clarity
- quick answer block
- FAQ
- comparison table
- internal links
- source panel
- image/media if useful
- metadata and title

Why this matters:

- New domains usually need depth more than page count.
- Updating existing pages can improve rankings without creating thin duplicates.

Effect:

- Better user experience and stronger topical authority.

### Step 4 - Evaluate One New Keyword

Use the new-page gate:

Create a new page only if all are true:

- Search intent is distinct.
- Existing page does not already answer it well.
- There are reliable sources.
- Page can have enough unique content.
- It fits the current 99 Nights cluster or a planned second cluster.

Do not create a page if:

- It is just a synonym of an existing page.
- It requires invented game stats.
- It is based only on Reddit rumors.
- It is a translated page without localized content.

Why this matters:

- Google can ignore or devalue thin/duplicate pages.
- A focused cluster is stronger than many weak pages.

Effect:

- Builds topical authority cleanly.

### Step 5 - Check Backlink Opportunities

Check 3-5 opportunities per week.

Record:

- Site name
- URL
- Type
- Free/paid
- Login required
- Submission requirements
- Status
- Notes

Why this matters:

- Backlinks are slow and manual.
- Tracking prevents duplicate submissions and spammy behavior.

Effect:

- Builds authority gradually without risking spam signals.

## Monthly Operating SOP

Recommended time: 2-4 hours.

### Step 1 - Review Traffic And Indexing

Compare month over month:

- Indexed pages
- Total impressions
- Total clicks
- Top countries
- Top queries
- Top pages
- Pages with no impressions

Why this matters:

- SEO needs enough time to show direction.
- Monthly review prevents overreacting to daily noise.

Effect:

- Decides whether to expand, prune, or strengthen.

### Step 2 - Decide Whether To Add A Second Game Cluster

Candidate from previous plan:

- `Grow a Garden 2`

Only start a second cluster when:

- The 99 Nights cluster has impressions or indexed pages.
- You can validate 10-20 keywords.
- Reliable sources exist.
- The first few pages can be source-checked.

Why this matters:

- Starting too many clusters too early spreads the site thin.

Effect:

- Expands reach without weakening focus.

### Step 3 - Check Monetization Readiness

AdSense application gate:

- Homepage is polished.
- Privacy policy exists.
- Terms of service exists.
- Editorial policy exists.
- There are enough useful non-thin pages.
- Navigation is clear.
- No broken pages.
- No aggressive affiliate blocks.
- Site has at least some indexing or early user signals.

Why this matters:

- AdSense approval depends on site quality and policy fit.
- Applying too early can waste time and create a rejection loop.

Effect:

- Increases approval chance.

### Step 4 - Check Language Expansion

Do not translate the whole site just because Roblox is popular globally.

Language candidates:

1. `pt-BR` if Portuguese queries like `codigos 99 nights in the forest` are validated.
2. `es` if Spanish LATAM queries are validated.
3. Tagalog is not first because Philippines demand is often English.
4. Chinese is not first unless Chinese query demand appears.

Why this matters:

- Thin translated pages can hurt quality.
- Real localization needs localized metadata, body copy, hreflang, sitemap, and source policy.

Effect:

- Avoids duplicate/low-quality international pages.

## Admin Game Data Page

URL:

`https://questcodes.com/admin/game-data`

Use it for:

- Checking freshness status visually.
- Running the source audit from the admin surface.
- Seeing which pages need review.

Important:

- The `Run Audit` button is not an auto-publish button.
- It should not silently rewrite live game data.
- It is a review tool: it helps identify source status, stale pages, and next actions.

Why this matters:

- Fully automatic game-data publishing is risky.
- Wrong codes or fake guide claims can damage trust more than a page being one day old.

Effect:

- Keeps the workflow safe: audit first, human/Codex review second, publish third.

## Scheduled Source Checks

Quest Codes runs a Cloudflare-native scheduled source check once per day:

```text
0 9 * * *  # 09:00 UTC / 17:00 China time
```

The scheduled Worker handler records snapshots with this reason:

```text
cloudflare-cron
```

Quest Codes also has a protected read-only HTTP endpoint for manual or external
cron callers:

`https://questcodes.com/api/cron/game-data/source-check`

It accepts `GET` or `POST` with one of these headers:

```text
Authorization: Bearer <CRON_SECRET>
```

or:

```text
x-cron-secret: <CRON_SECRET>
```

Production setup:

```powershell
.\node_modules\.bin\wrangler.CMD secret put CRON_SECRET
```

`CRON_SECRET` is required only for HTTP callers. The native Cloudflare Cron
Trigger runs inside the Worker and does not need to send this header.

What it does:

- Runs the same source-check workflow used by the admin `Run source check` button.
- Stores the latest source-check snapshot in the config table.
- Marks the snapshot reason as `cloudflare-cron` for the native scheduler, or `scheduled-cron-api` for the HTTP endpoint.
- Lets `/admin/game-data` show the latest automated check result.
- Feeds the in-admin `Operator alerts` panel so the site owner can see review-before-publish and blocked states without reading raw source data first.
- Can send optional high-priority operator alerts to an external webhook when `GAME_DATA_ALERT_WEBHOOK_URL` is configured.

What it does not do:

- It does not rewrite source files.
- It does not change code status, rewards, tier claims, crafting costs, drop rates, or patch notes.
- It does not commit, push, or deploy.
- It does not replace manual review.

Why this matters:

- Codes and Roblox metadata can be monitored automatically.
- Guide facts still need human/Codex review because wrong game data hurts trust.
- The safe automation boundary is "detect and report" first, "publish" only after verified review.

Suggested schedule:

- Once daily while traffic is low. This is currently configured in `wrangler.jsonc`.
- Twice daily only if GSC shows codes-page impressions or the game has active update/event volatility.

Next safe upgrade:

- Configure an external notification channel for high-priority `Operator alerts` if you want daily push reminders outside the admin panel.
- Keep publish decisions manual.

### Optional Operator Webhook

The scheduled source-check can push a compact operator alert to an external
webhook. This is useful when you do not want to open the admin page every day.

Production setup:

```powershell
.\node_modules\.bin\wrangler.CMD secret put GAME_DATA_ALERT_WEBHOOK_URL
```

Optional settings:

```text
GAME_DATA_ALERT_WEBHOOK_FORMAT=generic   # generic, slack, discord, feishu, lark
GAME_DATA_ALERT_MIN_PRIORITY=high        # high, medium, low
GAME_DATA_SOURCE_CHECK_TIMEOUT_MS=15000  # per-source timeout, default 15 seconds
```

Default behavior:

- If no webhook URL is configured, cron still runs and stores the snapshot.
- If a webhook URL is configured, only alerts at or above the priority threshold are sent.
- The default threshold is `high`, so routine healthy checks do not spam the channel.
- Alerts are read-only. They do not update game data, commit code, push Git, or deploy.
- Timeout or fetch failures are treated as review signals, not evidence that a code expired or a reward changed.

## Keyword Expansion Process

Use this decision tree:

```text
New keyword found
  |
  +-- Does an existing page already answer it?
  |     |
  |     +-- Yes -> strengthen existing page
  |     +-- No
  |
  +-- Is the intent distinct enough for its own page?
  |     |
  |     +-- No -> add FAQ/internal section
  |     +-- Yes
  |
  +-- Are reliable sources available?
        |
        +-- No -> add to watchlist
        +-- Yes -> build page
```

Examples:

`99 nights in the forest crafting bench`

- Existing page: `/crafting`
- Action: strengthen existing page unless the query specifically needs level 5.

`99 nights in the forest crafting bench 5`

- Existing page: `/crafting-bench-5`
- Action: strengthen that page, not create another.

`how to craft bandages in 99 nights in the forest`

- Existing page: `/bandages`
- Action: improve quick-answer and FAQ.

`99 nights in the forest codes for gems`

- Existing page: `/codes` and `/gems`
- Action: add internal links and clarify code rewards.

## Content Update Rules

### Safe To Update Quickly

- Checked dates
- Source notes
- Expired code history
- Internal links
- FAQ wording
- Metadata/title improvements
- Update log entries when the source check is real

### Requires Careful Review

- Active code status
- Reward amounts
- Class rankings
- Crafting costs
- Drop rates
- Hidden formulas
- Patch notes
- Game mechanic changes

### Do Not Publish

- Rumors as facts
- Fake codes
- AI-invented rewards
- Unsourced drop rates
- Copied competitor content
- Thin translations
- Overbroad pages targeting only `Roblox`

Why this matters:

- The site's competitive edge is source-checking, not speed alone.

Effect:

- Keeps the site trustworthy and defensible.

## Image And Video Policy

Use images or videos when they help the page.

Good uses:

- Game thumbnail on hub pages.
- Screenshot explaining a route, UI, map, item, or location.
- Video embed or link when it supports a guide step.
- OG image and clear favicon/logo.

Avoid:

- Random AI art for factual game guide pages.
- Decorative images that do not explain anything.
- Screenshots without context.
- Images that could confuse the site with official Roblox branding.

Why this matters:

- Better visuals can improve retention.
- Irrelevant visuals can reduce trust and slow pages.

Effect:

- Makes pages easier to understand without bloating the site.

## Backlink Plan

### When To Start

Start light backlinks now because the site has:

- live domain
- sitemap
- robots
- `llms.txt`
- privacy policy
- terms
- editorial policy
- first content cluster

Do not do mass backlink blasts.

### First 7 Days

Do 5-10 low-risk actions:

- Submit/verify sitemap in Google Search Console.
- Submit/verify sitemap in Bing Webmaster Tools.
- Share one helpful answer in a relevant Reddit/community thread only when it genuinely answers the question.
- Add the site to your personal profiles where allowed.
- Prepare directory submission descriptions.

Why this matters:

- Early links help discovery.
- Low-risk links avoid spam patterns.

Effect:

- Helps crawlers and creates initial brand mentions.

### Weeks 2-4

Do 10-20 evaluated opportunities:

- Gaming tool/resource directories.
- Startup/product directories only if they accept content/tool sites.
- Relevant community answers.
- GitHub resource lists only if a list genuinely fits Roblox tools/guides.
- Small creator outreach if the page helps their audience.

Why this matters:

- Relevance matters more than volume.
- New domains should build links gradually.

Effect:

- Increases trust and referral discovery.

### What To Avoid

- Buying cheap bulk backlinks.
- Private blog networks.
- Comment spam.
- Posting the same message everywhere.
- Hiding affiliate or ad intent.
- Submitting to unrelated AI/SaaS directories just because they accept links.

Why this matters:

- Bad links can waste time or create quality risk.

Effect:

- Keeps the backlink profile clean.

## Backlink Submission Description

Short version:

```text
Quest Codes is a fan-made Roblox codes and guide site with source-checked code lists, expired-code history, and practical guide pages for games such as 99 Nights in the Forest.
```

Long version:

```text
Quest Codes helps Roblox players find working game codes, expired-code history, source notes, class guides, crafting routes, gem routes, badge references, maps, and update checks. The site is fan-made, not affiliated with Roblox, and keeps an editorial policy for source-checking codes and guide claims.
```

Categories:

- Gaming
- Roblox
- Game guides
- Game codes
- Fan sites
- Web tools

Suggested URL:

`https://questcodes.com/`

Suggested title:

`Quest Codes - Source-Checked Roblox Codes and Game Guides`

## Monetization Plan

### Phase 1 - No Aggressive Monetization

Current phase.

Focus on:

- indexing
- trust
- content quality
- source freshness
- early traffic data

Why this matters:

- Ads before trust can reduce approval odds and user experience.

Effect:

- Better foundation for future AdSense approval.

### Phase 2 - Google AdSense

Apply when:

- GSC shows indexing/impressions.
- Main pages are polished.
- Legal/trust pages are live.
- Site is not visually empty.
- No broken admin/public routes.

After approval:

- Start with restrained placements.
- Avoid aggressive interstitials.
- Keep code tables and guide answers easy to read.

Why this matters:

- AdSense fits informational/code pages better than forcing users to buy something.

Effect:

- Low-maintenance monetization once traffic exists.

### Phase 3 - Affiliate Links

Possible later:

- Roblox gift cards
- gaming accessories
- gaming deals
- maybe VPN only if a real security/privacy page exists

Do not force NordVPN or unrelated offers into guide pages.

Why this matters:

- Mismatched affiliates can reduce user trust.

Effect:

- Keeps monetization aligned with page intent.

## Multi-Language Plan

Do not translate yet unless data supports it.

Validation process:

1. Check GSC country/language signals.
2. Search Semrush/Trends for localized keywords.
3. Confirm the query language has demand.
4. Build localized pages manually or with human review.
5. Add localized metadata, body copy, hreflang, sitemap entries, and source policy.

Why this matters:

- English already serves US and Philippines demand.
- Brazil and Spanish LATAM are possible next, but only after validation.

Effect:

- Avoids thin translated pages and focuses effort where demand exists.

## What To Ask Codex Each Day

Use this prompt:

```text
Run the Quest Codes daily operation using docs/operations/questcodes-operations-playbook.md and the 7Deer questcodes-99nights-keyword-to-page skill.

1. Run game-data audit and source-check if needed.
2. Tell me which page is due or stale.
3. If evidence supports an update, update only that item.
4. Run build.
5. Commit/push if files changed.
6. Ask before Cloudflare deploy.
7. Explain what I should watch in GSC.
```

## What To Ask Codex Each Week

Use this prompt:

```text
Run the Quest Codes weekly SEO operation.

Use docs/operations/questcodes-operations-playbook.md and 7Deer skills.
I will paste GSC/Semrush data if needed.
Decide whether to improve an existing page, build one new page, or do no content change.
Avoid thin pages and invented game data.
```

## What To Paste From GSC

Paste this format:

```text
GSC weekly snapshot
Date range:
Total clicks:
Total impressions:
Average CTR:
Average position:

Top queries:
1.
2.
3.

Top pages:
1.
2.
3.

Indexing issues:
-
```

Why this matters:

- Codex cannot reliably infer your private GSC data without you sharing it.
- This gives enough signal to make a content decision.

Effect:

- Faster, more accurate recommendations.

## What To Paste From Semrush

Paste this format:

```text
Keyword:
US volume:
Global volume:
KD:
Intent:
Related keywords:
Questions:
SERP features:
Competitors:
Notes:
```

Why this matters:

- KD and volume alone are not enough.
- Intent and competitors decide whether the page is worth building.

Effect:

- Prevents building pages that cannot rank or do not help users.

## Emergency Playbook

### Live Site Shows Error

Tell Codex:

```text
Quest Codes production error: <URL> shows <error>. Diagnose from the repo, run build, fix safely, deploy after confirmation, and smoke test.
```

### Admin Page Breaks

Tell Codex:

```text
The admin game-data page is broken online: https://questcodes.com/admin/game-data. Diagnose the client/server runtime issue, do not remove the admin feature, fix, build, deploy, and explain the root cause.
```

## 33. Vertex AI Review Assistant

Quest Codes can use Vertex AI for admin-only review assistance, not automatic publishing.

Recommended production configuration:

```powershell
.\node_modules\.bin\wrangler.CMD secret put VERTEX_AI_SERVICE_ACCOUNT_JSON
```

Then set these non-secret values in Admin -> Settings -> AI -> Vertex AI, or via Cloudflare vars if preferred:

- `vertex_ai_model`: recommended `gemini-2.5-flash`
- `vertex_ai_fallback_models`: recommended `gemini-2.5-flash-lite`
- `vertex_ai_project_id`: your Google Cloud project ID; can be blank if the service account JSON contains `project_id`
- `vertex_ai_location`: recommended `us-central1`

Runtime reads the saved admin config and Cloudflare secret first. It no longer silently falls back to hidden Vertex model or location defaults in code; missing required values make `Run AI review` fail with a configuration error.

Operational use:

1. Open `/admin/game-data`.
2. Click `Run source check`.
3. Click `Run AI review`.
4. Read `Safe updates`, `Blocked updates`, `Human review`, and `Publish guardrails`.
5. Use `Copy Codex prompt` and let Codex update only source-confirmed code/update data.

Why this is safe:

- Vertex AI reads the source-check snapshot.
- It writes only a review snapshot to the config table.
- It does not rewrite page files, change code status, update rewards, commit, push, or deploy.
- If sources disagree, the public page stays conservative.

### GSC Shows Not Indexed

Do not panic.

Check:

- Is the page in sitemap?
- Is canonical correct?
- Is it noindex?
- Is the page thin?
- Does it have internal links?
- Does it return HTTP 200?

Tell Codex:

```text
GSC says <URL> is not indexed because <reason>. Audit that page's SEO, sitemap, canonical, robots, internal links, and content depth. Fix only what is actually wrong.
```

### Codes Page Is Stale

Tell Codex:

```text
The codes page is stale. Run a source check against trusted sources, update active/special/expired code status only if evidence supports it, keep conflicts visible, build and deploy.
```

## Operating Metrics

Track weekly:

- Indexed pages
- GSC impressions
- GSC clicks
- Top 10 queries
- Top 10 pages
- Number of fresh pages
- Number of due-soon pages
- Number of stale pages
- Number of backlinks submitted
- Number of accepted backlinks
- Pages updated
- New pages added

Why this matters:

- Without metrics, it is easy to keep building without knowing whether the site is working.

Effect:

- Creates a feedback loop for better decisions.

## Simple Weekly Log Template

Copy this into a note every week:

```markdown
# Quest Codes Weekly Log - YYYY-MM-DD

## GSC

- Clicks:
- Impressions:
- Indexed pages:
- Top query:
- Top page:

## Freshness

- Fresh:
- Due soon:
- Stale:
- Page updated:

## Keyword Decision

- Checked keywords:
- Build/improve/no action:
- Reason:

## Backlinks

- Submitted:
- Accepted:
- Rejected:
- Notes:

## Next Week

- Priority 1:
- Priority 2:
- Priority 3:
```

## Stop Conditions

Stop building new pages for the week if:

- `pnpm build` fails and the issue is not fixed.
- The current codes page is stale.
- GSC shows major indexing errors that need investigation.
- You cannot verify a new page's game facts.
- The new keyword is just a duplicate of an existing page.

Why this matters:

- More pages are not always better.
- Quality and trust matter more for a new domain.

Effect:

- Keeps the site from becoming a thin content farm.

## Current Best Next Actions

As of 2026-06-24:

1. Keep the 99 Nights codes page fresh.
2. Watch GSC for first impressions and indexed pages.
3. Strengthen pages that get impressions first.
4. Start light backlink discovery/submission.
5. Avoid broad Roblox keywords as primary targets.
6. Do not start multi-language pages until localized keyword evidence appears.
7. Do not apply aggressive monetization until indexing and content quality are stable.
