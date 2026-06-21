# Quest Codes Monetization, I18n, and Content Decisions

Updated: 2026-06-21

## Design Direction

Quest Codes should not keep the default ShipAny SaaS feel. It should look like
a compact guide desk:

- fast navigation,
- source-check badges,
- current game status,
- grouped guide routes,
- real game thumbnails,
- visible next steps on every guide page.

Do not copy the Roblox official style closely. The site is fan-made and should
avoid brand confusion.

## Multi-Language Timing

Current indexable content stays English-first.

Start non-English pages only after one of these is true:

- GSC shows non-English impressions for the current 99 Nights cluster,
- Semrush/Trends validates a language-specific keyword group,
- a reliable localized content pass can be written by hand or reviewed by a
  human.

Priority queue:

1. `pt-BR` for Brazil if `codigos` / `codigos do 99 nights in the forest`
   demand is validated.
2. `es` for Mexico and broader LATAM if Spanish query demand is validated.
3. Tagalog is not first because Philippines demand is already strong in English.
4. Chinese is not a priority until Chinese-language query demand appears.

No thin translations. Non-English pages need localized metadata, localized body
copy, self-canonical URL, hreflang alternates, sitemap inclusion, and the same
source policy as English pages.

## Monetization Timing

AdSense is the first monetization path because it fits code and guide pages
without requiring users to buy anything.

Current codebase status:

- AdSense publisher ID config exists.
- Auto ads loader exists.
- Dynamic `/ads.txt` exists after a valid publisher ID is configured.
- Auto ads should stay disabled until approval.

Recommended sequence:

1. Keep building content and internal links.
2. Apply for AdSense once the site has a polished homepage, privacy/terms pages,
   a clear fan-made disclaimer, and enough non-thin content pages.
3. After approval, add restrained placements first; do not start with aggressive
   interstitials or too many display blocks.

Affiliate monetization can come later. Best-fit categories are Roblox gift
cards, gaming accessories, or broad gaming deals. VPN offers such as NordVPN
should not be inserted early unless there is a real page intent around account
security, regional access, or gaming safety. For this site, mismatched affiliate
links can reduce trust.

## Why The Site Can Feel Thin

The issue is partly visual and partly product depth.

Visual causes:

- many pages used generic card layouts,
- some pages lacked a persistent route back to related guides,
- homepage and game hub did not yet feel like a guide desk.

Content causes:

- current pages are source-checked, but many are still article/reference pages,
- fewer pages have interactive tools, comparison widgets, printable checklists,
  or decision tables,
- no user discussion, saved lists, or update alerts yet.

Fix order:

1. Add guide-site navigation and route grouping.
2. Strengthen the game hub and homepage.
3. Add higher-retention blocks to priority pages: quick answers, decision
   tables, checklists, source panels, and related-route cards.
4. Build automation for codes/updates before opening community submissions.
5. Add community/AI review later after moderation rules are ready.
