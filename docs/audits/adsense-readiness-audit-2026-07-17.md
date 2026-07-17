# Quest Codes Google AdSense Readiness Audit

**Audit date:** 2026-07-17  
**Stage:** Region-change reapplication / post-core-page-fix review  
**Live site:** https://questcodes.com  
**Repository:** `C:\Users\92381\Desktop\game-website`  
**Decision:** **Not ready to re-submit**  
**Checklist coverage:** 77/77 virtual requirements checked (100%)

## 1. Scope and Decision Standard

Google does not publish an official checklist with `ADS-*` identifiers. This report creates a traceable virtual checklist from the current official AdSense and Google Publisher Policy requirements. The IDs are an audit device, not Google-issued policy codes.

The review combined:

- Live HTTP and rendered-page checks of the homepage, all 28 sitemap URLs, authentication/account routes, admin routes, a synthetic 404, `robots.txt`, `sitemap.xml`, `ads.txt`, and `llms.txt`.
- Repository inspection of route layouts, metadata, AdSense loading, analytics, legal pages, source data, automated source checks, editorial review, and content generation patterns.
- Mobile Lighthouse testing of the homepage.
- Source comparison for the classes, animals, and survival-guide clusters.
- The local game-data freshness audit on 2026-07-17.

The decision is intentionally stricter than a general SEO audit. A page can be long and well structured while still being low-value or replicated for AdSense purposes.

## 2. Official Policy Basis

The virtual requirements below are derived from these official Google sources:

- [AdSense site readiness](https://support.google.com/adsense/answer/7299563?hl=en-EN): unique, relevant content; clear navigation; original specialist knowledge or commentary when using external resources.
- [AdSense Program policies](https://support.google.com/adsense/answer/48182?hl=en): invalid clicks, deceptive implementation, non-content pages, navigation, and ad behavior.
- [Low-value or no-publisher-content inventory](https://support.google.com/publisherpolicies/answer/11112688?hl=en): ads must not appear on low-value, under-construction, or navigation/behavioral screens; automated content requires manual review or curation.
- [Replicated content](https://support.google.com/publisherpolicies/answer/11190248?hl=en): copied, embedded, or rewritten material needs substantial added commentary, curation, or value.
- [More ads or promotions than publisher content](https://support.google.com/publisherpolicies/answer/11169917?hl=en).
- [AdSense eligibility](https://support.google.com/adsense/answer/9724?hl=en) and [minimum age](https://support.google.com/adsense/answer/14230?hl=en).
- [Site access requirements](https://support.google.com/adsense/answer/9131547?hl=en) and [site/ads.txt status](https://support.google.com/adsense/answer/12170222?hl=en).
- [Required privacy disclosures](https://support.google.com/adsense/answer/1348695?hl=en) and [Google Publisher Policies privacy requirements](https://support.google.com/adsense/answer/10502938?hl=en-15).
- [Google-certified CMP requirement for EEA, UK, and Switzerland](https://support.google.com/adsense/answer/13554020?hl=en) and [European regulations messages](https://support.google.com/adsense/answer/10961068?hl=en).
- [Child-directed treatment](https://support.google.com/adsense/answer/3248194?hl=en) and [tag-for-child-directed-treatment guidance](https://support.google.com/adsense/answer/17042704?hl=en).
- [Publisher restrictions](https://support.google.com/publisherpolicies/answer/10437795?hl=en).

## 3. Executive Verdict

Quest Codes has a sound technical base: HTTPS works, all sitemap URLs return 200, the public pages are server-rendered and crawlable, legal/contact pages exist, `ads.txt` contains the current publisher ID, non-content authentication routes do not load ads, and most guide pages are materially longer than a typical thin affiliate page.

The site is nevertheless **not ready to re-submit** because three approval-level risks remain:

1. Ads load on two thin directory pages (`/roblox` and `/codes`) whose rendered main content is approximately 120 and 217 words.
2. Several commercially important pages are built primarily from one PC Gamer article, with limited first-hand testing or independently developed analysis. The classes and tier-list pages also overlap heavily.
3. The privacy policy does not yet fully describe the live analytics/security processors and all required identifier technologies, while EEA consent and child/teen treatment cannot be verified.

Fixing technical metadata alone will not resolve the highest risk. The content cluster must demonstrate why Quest Codes is independently useful rather than a reformatted copy of source publications.

## 4. Priority Findings

### Blocker B-01: Ads on low-value directory inventory

**Requirements:** `ADS-CONTENT-03`, `ADS-ADS-03`, `ADS-ADS-07`  
**Status:** Fail

**Evidence**

- `/roblox` renders about 120 main-content words, no H2, and primarily acts as a link directory.
- `/codes` renders about 217 main-content words and primarily acts as a game-index page.
- `src/app/[locale]/roblox/layout.tsx:12` loads `ConfiguredGoogleAdSense` for every Roblox route, including `/roblox`.
- `src/app/[locale]/codes/page.tsx:251` loads AdSense directly on `/codes`.
- Google expressly treats navigation/behavioral screens and low-value pages as unsuitable ad inventory.

**Required fix**

1. Remove the AdSense loader from `/roblox` and `/codes` for the reapplication build. Keep ads on substantive game/guide pages only.
2. Do not solve this only by adding generic paragraphs. If these indexes are monetized later, add original decision support: game coverage criteria, freshness status, code-change summaries, filters, comparison data, and user-facing utility.
3. Acceptance: both live pages contain no `pagead2.googlesyndication.com` script, while substantive guide routes still load the configured AdSense script.

### Blocker B-02: Replicated-content and insufficient added-value cluster

**Requirements:** `ADS-CONTENT-04`, `ADS-CONTENT-05`, `ADS-CONTENT-06`, `ADS-CONTENT-13`, `ADS-POL-08`  
**Status:** Fail / Unknown

**Evidence**

- `src/data/99-nights-classes.ts:12-16` declares PC Gamer as the sole source. Lines 18-105 reproduce its recommendations and complete tier grouping in structured form.
- Both `classes/page.tsx:3` and `class-tier-list/page.tsx:3` import the same class data. Rendered token-set similarity is approximately 0.598, the highest duplicate pair in the public content cluster.
- `src/data/99-nights-animals.ts:13-17` declares one PC Gamer source and lines 26-104 reproduce the complete 11-animal food/flute/biome table.
- `src/data/99-nights-survival-guide.ts:12-15` declares one PC Gamer source; the page expands that article's tips into paraphrased checklists and action cards.
- The [PC Gamer class guide](https://www.pcgamer.com/roblox/99-nights-in-the-forest-classes/), [animal guide](https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-animal-taming/), and [survival tips](https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-tips/) expose the same underlying lists and recommendations.
- No guide byline, named tester, test build/server, test date, original screenshots, or reproducible testing notes were found. The editorial policy says direct testing occurs “when available,” but individual pages do not identify it.

This is not a claim of copyright infringement. It is a strict AdSense value assessment: citation and paraphrasing do not by themselves create enough publisher value.

**Required fix**

1. Merge `/classes` and `/class-tier-list`, or make their jobs truly distinct. Recommended structure: one authoritative class database plus a separately useful comparison tool only if it uses original scoring and methodology.
2. Add first-party evidence to derivative guides: tester/byline, date and game version, original screenshots, methodology, scenario-based results, failure cases, and a change log.
3. Replace copied source ranking with Quest Codes' own disclosed scoring dimensions (solo safety, co-op utility, unlock cost, early/mid/late-run value). Explain how each score was produced.
4. For animals, add original route planning, food-cost normalization, biome risk, flute progression, and tested practical recommendations rather than republishing the source table.
5. For survival, document actual test runs or rewrite around independently reasoned route decisions with evidence. Remove any section that merely restates a source tip.
6. Acceptance: a reviewer can identify at least one substantial first-party contribution on every monetized guide without opening the cited source, and the two class routes no longer target substantially the same intent/data.

### Blocker B-03: Privacy disclosures do not fully match live processing

**Requirements:** `ADS-PRIV-04`, `ADS-PRIV-05`  
**Status:** Fail

**Evidence**

- `privacy-policy.en.mdx:36-40` correctly names Google AdSense, advertising cookies, prior visits, and opt-out options.
- It does not explicitly disclose that third parties may place/read cookies or use web beacons, IP addresses, or other identifiers as required by the publisher privacy policy.
- The live site loads Google Analytics (`G-GXLDP0WT3C`) and Cloudflare Insights, but `privacy-policy.en.mdx:30-32` only refers generically to third-party hosting, analytics, and security services.
- It does not identify Google Analytics or Cloudflare, link their privacy information, or explain the actual categories/purposes of data they process.

**Required fix**

1. Name Google AdSense, Google Analytics, and Cloudflare as active processors/services.
2. State that Google and other third parties may place/read cookies or use web beacons, IP addresses, device identifiers, and similar technologies to collect information from the site.
3. Link Google's explanation of how it uses information from partner sites and keep the personalized-ad opt-out links.
4. Add data retention, access/deletion/contact rights, controller/operator contact, and a children/teen section.
5. Acceptance: the published policy describes every live analytics/advertising script and all identifier categories visible in the implementation.

### High H-01: EEA/UK/Switzerland consent cannot be verified

**Requirements:** `ADS-PRIV-06`, `ADS-PRIV-07`  
**Status:** Unknown

The operator reports that Google Privacy & Messaging was configured, but this audit could not verify the experience from an EEA/UK/Swiss IP. Google Analytics loads globally in code, and no local Consent Mode defaults, TCF API integration, or consent gate was found.

**Required verification**

- Test from an EEA VPN in a clean browser. Capture the first-load CMP, Manage Options flow, vendor list, reject/consent behavior, and network requests before/after consent.
- Confirm the message is a Google-certified CMP and applies to `questcodes.com`.
- Confirm `ad_storage`, `ad_user_data`, `ad_personalization`, and `analytics_storage` behavior is appropriate before consent. Add Consent Mode or gate analytics if the Google-managed message does not control GA.

### High H-02: Child/teen treatment is unresolved for a Roblox audience

**Requirement:** `ADS-PRIV-08`  
**Status:** Unknown

Roblox content predictably attracts minors. The site has public sign-up/account routes but no age gate or children section in the privacy policy. The audit cannot determine whether the site is legally child-directed or whether the operator knowingly collects data from under-13 users.

**Required fix/decision**

- Document whether the service is general-audience or directed to children; do not rely on a disclaimer alone.
- If users under 13 are known or intentionally targeted, use Google's child-directed/age-restricted treatment, disable personalized ads for them, and implement appropriate consent/parental controls.
- If accounts are unnecessary for the public guide product, disable public sign-up before review. Otherwise add age handling, data deletion, and account privacy procedures.

### High H-03: Raw update log looks repetitive and automation-generated

**Requirements:** `ADS-CONTENT-10`, `ADS-CONTENT-11`  
**Status:** Pass for publication gating; Fail for public inventory quality

`/roblox/99-nights-in-the-forest/updates` renders about 4,083 words, 24 H2 headings, and 72 external links. Much of the page is repeated source-check reporting. The automation is conservative and does not blindly change game facts, which is good, but publishing the raw operational trail as an ad-bearing editorial page creates a low-value/repetitive-content signal.

**Required fix**

- Keep only meaningful player-facing changes on the public updates page.
- Move unchanged source-check runs to an admin-only log or a noindex/no-ads archive.
- Summarize “no public data changed” runs instead of emitting near-identical sections.

### High H-04: Two high-priority data surfaces are stale by the site's own rules

**Requirement:** `ADS-CONTENT-09`  
**Status:** Fail

`pnpm game-data:audit` on 2026-07-17 reports 18 fresh, 0 due soon, and 2 stale: Codes and Updates were last editorially checked on 2026-07-15 against a one-day cadence. Staleness alone is not an automatic AdSense violation, but prominent “current” and month-based claims raise the trust bar.

**Required fix**

- Run the source check and manual review before reapplication.
- Change only source-confirmed statuses. If confirmation is partial, keep conservative labels and update the visible checked date only when the underlying review actually occurred.

### High H-05: Image/content rights cannot be proven from the repository

**Requirements:** `ADS-CONTENT-14`, `ADS-POL-08`  
**Status:** Unknown

Official Roblox/game thumbnails are copied into `public/imgs/roblox/`, and source URLs/credits are tracked. A fan-site notice is present, but the repository does not contain a license or rights-holder permission. Fair-use/fan-content treatment is jurisdiction-specific.

**Required fix**

- Keep source URL, rights holder, retrieval date, and allowed-use basis for each asset.
- Verify the Roblox/game creator terms for fan-site thumbnail use.
- Prefer original in-game screenshots captured by the operator where permitted, with captions and test context.

### Medium M-01: Publisher and author accountability is weak

**Requirement:** `ADS-UX-07`  
**Status:** Fail

The About and Editorial Policy pages explain the process, but no responsible editor/author, author profile, testing role, or jurisdiction/business identity is shown.

**Fix:** add a real publisher/editor identity appropriate to the operator's privacy needs, an author/testing profile, correction history, and per-guide “reviewed by / tested on” evidence.

### Medium M-02: Privacy rights and retention are incomplete

**Requirement:** `ADS-PRIV-09`  
**Status:** Fail

The policy does not explain retention periods or criteria, access/deletion requests, account deletion, complaint/escalation options, or the operator/controller location.

### Medium M-03: Mobile performance and contrast need work

**Requirements:** `ADS-UX-08`, `ADS-TECH-04`  
**Status:** Fail

Mobile Lighthouse on the homepage produced Performance 77, Accessibility 95, Best Practices 77, SEO 100; FCP 2.8s, LCP 3.7s, Speed Index 6.8s, TBT 160ms, CLS 0, and TTI 7.5s. Contrast failures occur around `src/app/[locale]/page.tsx:327`, `:393`, `:399`, and `:431` due to low-opacity emerald text.

**Fix:** use opaque/high-contrast text tokens, reduce initial script/image cost, and retest the actual production Worker on mobile.

### Medium M-04: Security headers are minimal

**Requirement:** `ADS-TECH-05`  
**Status:** Fail

The live homepage response has HTTPS and Cloudflare headers but no visible Content-Security-Policy, Referrer-Policy, X-Content-Type-Options, or Permissions-Policy. These are not direct AdSense approval gates, but they are reasonable production trust controls. CSP must explicitly allow required Google ad/consent/analytics origins.

### Medium M-05: Dormant Chinese route is not a real localized product

**Requirement:** `ADS-SITE-10`  
**Status:** Fail

`/zh` returns 200, declares `lang=zh`, and is about 663 words, but renders the same English homepage title/content. It is correctly marked `noindex, follow` and omitted from the sitemap, which limits search damage, but the live response still advertises it as an alternate in the `Link` header.

**Fix:** either remove `zh` from public locale alternates until translated, or implement genuine Chinese content and then index/sitemap it. Do not expose an English page as a Chinese alternate.

## 5. Rendered Route Inventory

Word counts are approximate visible words inside the rendered primary content. All listed sitemap URLs returned HTTP 200 and had canonical URLs.

| Route                             | Approx. words | Ads script | Assessment                                      |
| --------------------------------- | ------------: | ---------- | ----------------------------------------------- |
| `/`                               |           668 | Yes        | Substantive hub; passes basic depth             |
| `/codes`                          |           217 | Yes        | **Thin monetized directory**                    |
| `/roblox`                         |           120 | Yes        | **Thin monetized directory**                    |
| `/roblox/99-nights-in-the-forest` |         1,078 | Yes        | Substantive game hub                            |
| `.../codes`                       |         1,339 | Yes        | Stronger multi-source treatment; freshness due  |
| `.../gems`                        |           899 | Yes        | Substantive                                     |
| `.../gem-of-the-forest`           |         1,160 | Yes        | Substantive                                     |
| `.../forest-gem-fragments`        |         1,162 | Yes        | Substantive                                     |
| `.../stronghold`                  |         1,161 | Yes        | Substantive                                     |
| `.../crafting`                    |         1,801 | Yes        | Stronger multi-source treatment                 |
| `.../crafting-bench-5`            |         1,240 | Yes        | Substantive                                     |
| `.../bandages`                    |         1,369 | Yes        | Substantive but source-derived                  |
| `.../pelt-trader`                 |         1,027 | Yes        | Substantive                                     |
| `.../badges`                      |           757 | Yes        | Moderate depth                                  |
| `.../map`                         |           936 | Yes        | Substantive                                     |
| `.../missing-kids`                |           882 | Yes        | Substantive                                     |
| `.../classes`                     |           636 | Yes        | High replicated-value risk                      |
| `.../class-tier-list`             |           569 | Yes        | High overlap/replicated-value risk              |
| `.../animals`                     |           552 | Yes        | Single-source table risk                        |
| `.../taming-flute`                |         1,131 | Yes        | Substantive but verify first-party value        |
| `.../zookeeper-vs-beastmaster`    |           850 | Yes        | Better comparative intent; still source-heavy   |
| `.../survival-guide`              |           872 | Yes        | Single-source paraphrase risk                   |
| `.../updates`                     |         4,083 | Yes        | Repetitive operational-log risk                 |
| `/about`                          |           438 | No         | Pass                                            |
| `/contact`                        |           320 | No         | Pass; MX records exist                          |
| `/privacy-policy`                 |           393 | No         | Exists; disclosure fixes required               |
| `/terms-of-service`               |           344 | No         | Pass                                            |
| `/editorial-policy`               |           514 | No         | Pass; implementation evidence needs improvement |

Additional route checks:

- `/sign-in`, `/sign-up`, and `/forgot-password`: 200, `noindex, nofollow`, no AdSense loader.
- `/pricing`: 200, `noindex, follow`, no AdSense loader.
- `/admin` and `/settings`: no AdSense loader and blocked by `robots.txt`; explicit meta `noindex` was not observed.
- Synthetic unknown route: 404, `noindex`, no AdSense loader.

## 6. Full Virtual ADS Checklist

### A. Account and eligibility

| ID         | Requirement                                                                     | Status    | Evidence / exact next proof                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| ADS-ACC-01 | Publisher is at least 18 and identity can be verified                           | [Unknown] | Repository/live site cannot verify age or identity. Provide successful Payments identity verification.                                         |
| ADS-ACC-02 | Payee name, country, address, tax and payment profile are accurate              | [Unknown] | User reports a China-region account, but backend evidence was not available. Verify before submission; do not use mismatched-region identity.  |
| ADS-ACC-03 | Publisher owns/controls the site and can edit source                            | [Pass]    | Local repository, DNS/Worker deployment, publisher meta, and `ads.txt` are aligned.                                                            |
| ADS-ACC-04 | Content language and publisher country are supported                            | [Pass]    | English is a supported AdSense language; China AdSense availability is supported subject to account verification.                              |
| ADS-ACC-05 | Site is added to the same active account and current review state is understood | [Unknown] | Live code shows `pub-6801555055690403`; confirm the AdSense Sites screen still shows this site under that account and note its current status. |

### B. Site access, crawlability, and inventory boundaries

| ID          | Requirement                                                                 | Status    | Evidence / exact next proof                                                                                                                                |
| ----------- | --------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ADS-SITE-01 | Site uses valid HTTPS and returns usable 200 pages                          | [Pass]    | Homepage and all 28 sitemap URLs returned HTTPS 200.                                                                                                       |
| ADS-SITE-02 | Core content is public without login/paywall                                | [Pass]    | All guide pages are public.                                                                                                                                |
| ADS-SITE-03 | `robots.txt` permits public content and exposes sitemap                     | [Pass]    | `/robots.txt` is 200 and allows public routes; `/api`, admin, settings and auth paths are disallowed.                                                      |
| ADS-SITE-04 | AdSense crawler is not blocked by geo, WAF, cookies or authentication       | [Unknown] | Normal crawler access succeeded, but Google AdSense crawler logs/firewall events were not available. Check Cloudflare Security Events after review starts. |
| ADS-SITE-05 | Sitemap lists canonical public URLs only                                    | [Pass]    | `/sitemap.xml` is 200 with 28 English public URLs and no auth/admin routes.                                                                                |
| ADS-SITE-06 | Canonicals, status codes and robots directives are coherent                 | [Pass]    | Sampled public pages have self-canonicals; 404/auth routes are noindex.                                                                                    |
| ADS-SITE-07 | Public routes are complete and not under construction                       | [Pass]    | No “coming soon,” empty template, or broken sitemap page detected.                                                                                         |
| ADS-SITE-08 | Ads are excluded from errors, auth, settings, admin and legal utility pages | [Pass]    | AdSense loader absent on checked 404, auth, pricing, admin, settings and legal pages.                                                                      |
| ADS-SITE-09 | `ads.txt` is reachable and authorizes the current publisher                 | [Pass]    | `/ads.txt` is 200 and contains the live `pub-6801555055690403` relationship.                                                                               |
| ADS-SITE-10 | Public locale alternates contain genuine localized content                  | [Fail]    | `/zh` declares Chinese but renders English; it is noindex yet is still advertised as an alternate response link.                                           |

### C. Navigation, trust, and rendered usability

| ID        | Requirement                                            | Status | Evidence / exact next proof                                                                                   |
| --------- | ------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------- |
| ADS-UX-01 | Navigation is clear and consistent                     | [Pass] | Header/footer, game hub, related guides and primary calls to action are understandable.                       |
| ADS-UX-02 | Users can move between hub, codes and guides           | [Pass] | Breadcrumbs/related-guide links are present on representative content routes.                                 |
| ADS-UX-03 | Mobile layout is usable without horizontal overflow    | [Pass] | Rendered homepage had no horizontal overflow; responsive shell exists.                                        |
| ADS-UX-04 | About page explains the site's purpose                 | [Pass] | `/about` is public, substantive, and fan-site status is clear.                                                |
| ADS-UX-05 | Contact path is real and usable                        | [Pass] | `/contact` and `contact@questcodes.com` are published; Cloudflare MX records resolve.                         |
| ADS-UX-06 | Terms and editorial standards are accessible           | [Pass] | `/terms-of-service` and `/editorial-policy` are public and linked.                                            |
| ADS-UX-07 | Responsible publisher/authors/testers are identifiable | [Fail] | Process is described, but no named responsible editor, author profile, or per-page test attribution exists.   |
| ADS-UX-08 | Text contrast and core accessibility are acceptable    | [Fail] | Lighthouse Accessibility 95; low-opacity emerald text fails contrast at homepage lines 327, 393, 399 and 431. |

### D. Content value, originality, and editorial quality

| ID             | Requirement                                                           | Status    | Evidence / exact next proof                                                                                 |
| -------------- | --------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| ADS-CONTENT-01 | Site has a clear audience and useful editorial purpose                | [Pass]    | Focused Roblox codes/guides cluster with source conflicts and freshness metadata.                           |
| ADS-CONTENT-02 | Site has a reasonable inventory of substantive public pages           | [Pass]    | 19 guide/detail pages plus hubs and five trust/legal pages; no official page-count minimum exists.          |
| ADS-CONTENT-03 | Monetized pages are not thin/navigation-only                          | [Fail]    | `/roblox` ~120 words and `/codes` ~217 words both load ads.                                                 |
| ADS-CONTENT-04 | Monetized content contains substantial first-party value              | [Fail]    | Several pages rely on source summaries without documented testing, unique data, or original methodology.    |
| ADS-CONTENT-05 | Content is not copied, lightly rewritten or reformatted from sources  | [Fail]    | Classes, animals and survival content closely mirror single PC Gamer source articles.                       |
| ADS-CONTENT-06 | Separate URLs answer distinct intents without near-duplicate content  | [Fail]    | Classes and Class Tier List share the same data and approximately 0.598 token-set similarity.               |
| ADS-CONTENT-07 | External sources and disagreements are disclosed                      | [Pass]    | Source links, checked dates, and conflict notes are visible; code-page handling is especially conservative. |
| ADS-CONTENT-08 | Uncertain facts are labeled rather than invented                      | [Pass]    | Editorial rules and code data retain conflicting/special states instead of forcing certainty.               |
| ADS-CONTENT-09 | “Current” claims and checked dates meet the site's cadence            | [Fail]    | Codes and Updates are two days old against a one-day cadence in the 2026-07-17 audit.                       |
| ADS-CONTENT-10 | Automated collection is manually reviewed before factual publication  | [Pass]    | Source-check/AI-review flow is conservative and does not automatically publish unconfirmed facts.           |
| ADS-CONTENT-11 | Public update pages provide player value rather than raw machine logs | [Fail]    | Updates page is ~4,083 words with repeated source-check entries and 72 external links.                      |
| ADS-CONTENT-12 | Site avoids fabricated stats, drop rates, codes and tier claims       | [Pass]    | No invented numerical claims were detected; editorial policy explicitly prohibits them.                     |
| ADS-CONTENT-13 | First-hand evidence supports experience-based recommendations         | [Fail]    | No per-guide tester, test date/build, screenshots, run logs, or reproducible methodology found.             |
| ADS-CONTENT-14 | Publisher can substantiate rights to copied images/content            | [Unknown] | Credits/source URLs exist, but licenses/permission or documented fan-content terms were not found.          |

### E. Prohibited and restricted content

| ID         | Requirement                                                                 | Status    | Evidence / exact next proof                                                                                      |
| ---------- | --------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| ADS-POL-01 | No illegal content or facilitation                                          | [Pass]    | No evidence found.                                                                                               |
| ADS-POL-02 | No sexual explicit content or child sexual exploitation                     | [Pass]    | No evidence found.                                                                                               |
| ADS-POL-03 | No hate, harassment or discriminatory content                               | [Pass]    | No evidence found.                                                                                               |
| ADS-POL-04 | No dangerous, violent-instruction or self-harm promotion                    | [Pass]    | Fictional survival-game guidance does not provide real-world harmful instruction.                                |
| ADS-POL-05 | No dishonest behavior, hacking, cheating or credential abuse                | [Pass]    | Redeem codes are public game codes, not cheats or unauthorized access.                                           |
| ADS-POL-06 | No malware, unwanted software or deceptive download behavior                | [Pass]    | No downloads or malicious behavior detected.                                                                     |
| ADS-POL-07 | No deceptive representation or false affiliation                            | [Pass]    | Fan-site/non-affiliation notices are visible.                                                                    |
| ADS-POL-08 | No copyright/IP infringement                                                | [Unknown] | Derivative source content and locally copied game thumbnails require rights/use-basis review.                    |
| ADS-POL-09 | No graphic/shocking real-world content                                      | [Pass]    | No evidence found.                                                                                               |
| ADS-POL-10 | No prohibited gambling, drugs, tobacco, weapons or regulated-goods commerce | [Pass]    | No evidence found.                                                                                               |
| ADS-POL-11 | No exploitation, denial or condoning of the war in Ukraine                  | [Pass]    | No relevant content found.                                                                                       |
| ADS-POL-12 | Restricted content, if any, is appropriately excluded from ads              | [Pass]    | No restricted-content category detected in current inventory.                                                    |
| ADS-POL-13 | Public user-generated content is moderated                                  | [N/A]     | No public comments, forum, or user-post publishing surface was found. Reassess before adding community features. |

### F. Ad implementation and behavior

| ID         | Requirement                                                             | Status    | Evidence / exact next proof                                                                                                                               |
| ---------- | ----------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ADS-ADS-01 | Live publisher ID is consistent                                         | [Pass]    | Meta, loader, config and `ads.txt` use `pub-6801555055690403`.                                                                                            |
| ADS-ADS-02 | Official AdSense loader is used without prohibited modification         | [Pass]    | Async Google loader is used; no code rewriting ad responses found.                                                                                        |
| ADS-ADS-03 | Ad code appears only on eligible publisher-content pages                | [Fail]    | Layout/page loaders include `/roblox` and `/codes`, both thin directories.                                                                                |
| ADS-ADS-04 | UI does not encourage clicks or disguise ads as navigation              | [Pass]    | No “support us by clicking,” deceptive ad labels, or fake navigation found.                                                                               |
| ADS-ADS-05 | Ads/promotions do not exceed publisher content                          | [Unknown] | No manual slots exist, but final Auto Ads density cannot be observed while inventory is not fully serving. Verify after approval with mobile screenshots. |
| ADS-ADS-06 | No popups, popunders, forced redirects or ad-interfering behavior       | [Pass]    | None detected.                                                                                                                                            |
| ADS-ADS-07 | Ads are absent from low-value/navigation-only screens                   | [Fail]    | `/roblox` and `/codes` violate the conservative inventory boundary.                                                                                       |
| ADS-ADS-08 | Operator does not click ads or use incentivized/invalid click practices | [Unknown] | Behavioral/account evidence required. Never click live ads or ask others to click.                                                                        |
| ADS-ADS-09 | Affiliate content is clearly disclosed and not dominant                 | [N/A]     | No active affiliate links were found. Policy text exists for future use; reassess before adding VPN/game affiliate offers.                                |

### G. Privacy, consent, and minors

| ID          | Requirement                                                                        | Status    | Evidence / exact next proof                                                                                           |
| ----------- | ---------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| ADS-PRIV-01 | Privacy policy is public and easy to reach                                         | [Pass]    | `/privacy-policy` is public and linked in site navigation/footer.                                                     |
| ADS-PRIV-02 | Basic data categories and purposes are disclosed                                   | [Pass]    | Policy covers usage/device data, voluntary account/email data, cookies, security, analytics and improvement purposes. |
| ADS-PRIV-03 | Google advertising cookies, prior visits and opt-outs are disclosed                | [Pass]    | Policy lines 36-40 name AdSense, prior visits, Ads Settings and AboutAds.                                             |
| ADS-PRIV-04 | Third-party cookies, web beacons, IP addresses and identifiers are fully disclosed | [Fail]    | Cookies/similar technologies are mentioned, but the complete required technology/identifier disclosure is absent.     |
| ADS-PRIV-05 | Live processors and services are named accurately                                  | [Fail]    | Google Analytics and Cloudflare Insights run live but are only described generically.                                 |
| ADS-PRIV-06 | Google-certified CMP is active in EEA/UK/Switzerland                               | [Unknown] | Operator reports configuration; geo-specific clean-session verification is required.                                  |
| ADS-PRIV-07 | Consent choices control personalized ads and analytics before storage              | [Unknown] | No local Consent Mode/TCF gate found; test actual CMP and GA network behavior by region.                              |
| ADS-PRIV-08 | Child/teen audience and ad treatment are correctly determined                      | [Unknown] | Roblox audience and public sign-up create material minor-data risk; no age/child flow found.                          |
| ADS-PRIV-09 | Retention, data rights, deletion and controller contact are described              | [Fail]    | Privacy page lacks retention criteria, access/deletion procedure, account deletion, and operator/controller location. |

### H. Traffic quality

| ID             | Requirement                                                         | Status    | Evidence / exact next proof                                                                                      |
| -------------- | ------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| ADS-TRAFFIC-01 | Traffic and clicks are organic/valid                                | [Unknown] | Requires AdSense/GA/Search Console acquisition and invalid-traffic evidence.                                     |
| ADS-TRAFFIC-02 | No purchased, bot, autosurf, incentivized or click-exchange traffic | [Unknown] | Operator confirmation and source reports required.                                                               |
| ADS-TRAFFIC-03 | Analytics exists to monitor acquisition and anomalies               | [Pass]    | Google Analytics `G-GXLDP0WT3C` and Cloudflare Insights are live.                                                |
| ADS-TRAFFIC-04 | Backlinks/promotion do not use spam or link schemes                 | [Unknown] | No backlink campaign history was audited. Use editorially relevant links and avoid mass low-quality submissions. |

### I. Technical page quality

| ID          | Requirement                                                               | Status | Evidence / exact next proof                                                                            |
| ----------- | ------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------ |
| ADS-TECH-01 | Public content is server-rendered with useful title/description/canonical | [Pass] | Representative and crawled pages expose SSR content and metadata.                                      |
| ADS-TECH-02 | Structured data is present and not visibly misleading                     | [Pass] | JSON-LD exists on content routes; no false rating/review schema detected.                              |
| ADS-TECH-03 | Informative images have accessible alt text                               | [Pass] | Homepage and sitemap crawl found no missing image alt text on inspected images.                        |
| ADS-TECH-04 | Mobile loading performance is reasonable                                  | [Fail] | Lighthouse Performance 77, LCP 3.7s, Speed Index 6.8s, TTI 7.5s.                                       |
| ADS-TECH-05 | Production security/privacy headers are adequately configured             | [Fail] | HTTPS works, but CSP, Referrer-Policy, X-Content-Type-Options and Permissions-Policy were not visible. |

## 7. Reapplication Gate

Do not request review until all of these are true:

- [ ] AdSense is removed from `/roblox` and `/codes`.
- [ ] Classes/Tier List are merged or demonstrably differentiated with original methodology and first-party evidence.
- [ ] Animals and Survival Guide contain substantial original analysis/testing, not just reformatted source material.
- [ ] Public Updates contains meaningful changes only; raw checks are admin-only or noindex/no-ads.
- [ ] Privacy Policy names all live processors and includes the full Google-required cookie/web-beacon/IP/identifier disclosures.
- [ ] EEA/UK/Swiss CMP behavior is verified in a clean geo-specific session.
- [ ] Child/teen treatment and public account policy are explicitly decided and implemented.
- [ ] Codes and Updates pass the site's freshness audit.
- [ ] Current image/content use rights have a documented basis.

Recommended but not approval-blocking before the same submission:

- [ ] Add named publisher/editor/tester accountability.
- [ ] Fix homepage contrast and improve mobile LCP.
- [ ] Add production security headers without breaking AdSense/GA/CMP.
- [ ] Remove the false Chinese alternate or complete the translation.

## 8. Completeness Check

### Count reconciliation

| Result    |  Count |
| --------- | -----: |
| [Pass]    |     44 |
| [Fail]    |     17 |
| [Unknown] |     14 |
| [N/A]     |      2 |
| **Total** | **77** |

### ID coverage

- Account: `ADS-ACC-01` through `ADS-ACC-05` (5/5)
- Site: `ADS-SITE-01` through `ADS-SITE-10` (10/10)
- UX/trust: `ADS-UX-01` through `ADS-UX-08` (8/8)
- Content: `ADS-CONTENT-01` through `ADS-CONTENT-14` (14/14)
- Prohibited/restricted policy: `ADS-POL-01` through `ADS-POL-13` (13/13)
- Ads: `ADS-ADS-01` through `ADS-ADS-09` (9/9)
- Privacy/minors: `ADS-PRIV-01` through `ADS-PRIV-09` (9/9)
- Traffic: `ADS-TRAFFIC-01` through `ADS-TRAFFIC-04` (4/4)
- Technical: `ADS-TECH-01` through `ADS-TECH-05` (5/5)

**Completeness result:** 77 distinct requirements were defined and 77 received exactly one `[Pass]`, `[Fail]`, `[Unknown]`, or `[N/A]` status. No defined ID was omitted. All Fail and Unknown items include evidence or the exact additional proof needed.

## 9. How to Use the Referenced Skill Prompt

The prompt supplied for `@adsense-site-auditor` is a good audit specification, but the skill itself is not installed in this Codex environment and no trustworthy source repository/package was included. Local skill discovery did not find a matching installable skill.

Therefore:

- Pasting the full prompt into Codex still works as an instruction, which is what this audit followed.
- Typing `@adsense-site-auditor` or `$adsense-site-auditor` only adds skill-specific behavior when that skill has actually been installed and appears in the available skill list.
- Do not install a similarly named package from an unknown source. Obtain the original GitHub repository or exact skill package URL, inspect its `SKILL.md` and scripts, then install it into `.agents/skills/adsense-site-auditor`.
- This report can serve as the baseline for a later post-fix invocation. The post-fix audit must recheck all 77 IDs, not only the failed ones.
