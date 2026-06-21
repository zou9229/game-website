# 99 Nights Codes SEO Audit

Date: 2026-06-20
URL: https://questcodes.com/roblox/99-nights-in-the-forest/codes

## Source Signals

- AITDK reported title length as acceptable at 41 characters, but the title was short for a competitive codes SERP.
- Meta description was 118 characters, below the preferred 140-160 character range.
- Meta keywords were missing. This is not fixed intentionally because modern Google SEO does not use the `keywords` meta tag.
- H3 tags were missing because FAQ questions were rendered as H2 elements.
- Word count was 416, too thin for a competitive Roblox codes page.
- Canonical, robots.txt, sitemap.xml, H1, H2, image alt, and social meta tags were present.
- Indexed pages were 0, expected for a domain registered on 2026-06-20.

## Changes Made

- Expanded the title to include a reward modifier.
- Expanded the meta description to 145 characters for the current month.
- Added Twitter card metadata and Open Graph site name / image alt metadata.
- Added semantic H2 sections and H3 subsections.
- Converted FAQ questions from H2 to H3.
- Added image title text for the Roblox thumbnail.
- Added a quick answer box, current status summary, verification notes, troubleshooting notes, and related guide links.
- Added HowTo JSON-LD for the code redemption flow.
- Kept FAQ, Breadcrumb, and VideoGame JSON-LD.
- Removed the template pricing page from the public sitemap and replaced public header links with Roblox / Codes links.
- Updated `llms.txt` and `llms-full.txt` page lists so AI crawlers see the game-guide surface instead of the SaaS pricing page.

## Not Changed

- No `meta keywords` tag was added. It is not a ranking requirement and can make the page look mechanically optimized.
- Google Analytics and Google AdSense configuration are now available from the admin settings. AdSense Auto ads should stay disabled until the site has approval and enough indexed content.
- GitHub Actions workflows were not changed.
- The `/pricing` route itself was not deleted because billing/payment code may need it later.

## Next SEO Steps

1. Deploy the updated page to Cloudflare.
2. Re-run AITDK on the live URL and confirm title, description, H3, image title, structured data, and word count.
3. Add Google Search Console property for `questcodes.com`.
4. Submit `https://questcodes.com/sitemap.xml` in GSC.
5. Request indexing for priority URLs:
   - `/`
   - `/roblox/`
   - `/roblox/99-nights-in-the-forest/`
   - `/roblox/99-nights-in-the-forest/codes/`
   - `/roblox/99-nights-in-the-forest/class-tier-list/`
   - `/roblox/99-nights-in-the-forest/survival-guide/`
6. Start lightweight backlink discovery after the priority pages are live and submitted. Backlinks do not need to happen before GSC submission.
