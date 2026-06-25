# Quest Codes 中文运营手册

更新日期：2026-06-25

本文档是 `questcodes.com` 的中文运营手册。英文版见：

`docs/operations/questcodes-operations-playbook.md`

## 1. 网站定位

Quest Codes 不是“在线玩小游戏”的网站，而是 Roblox 攻略和兑换码 SEO 站。

当前第一阶段聚焦：

- Roblox 游戏兑换码
- 99 Nights in the Forest 攻略
- source-checked 源检查
- class / tier list / crafting / gems / map / badges / updates 页面
- 管理后台里的 game data freshness audit

核心原则：

1. 不追求盲目上很多页面。
2. 先把已有页面保持新鲜、可信、可索引。
3. 新页面必须来自真实关键词需求。
4. 游戏事实不能由 AI 编造。
5. 自动化可以辅助审核，但不能直接替代来源验证。

## 2. 当前阶段

当前阶段是：

- 第一版可观察 MVP：约 90%
- 运营自动化体系：约 58%

这两个数字不是矛盾。

MVP 90% 的意思是：网站已经能上线观察真实数据。

自动化 58% 的意思是：后台已有审计、source check、管理提示词，但还没有开放“全自动抓取并发布”。这是有意控制风险，不是漏做。

## 3. 每天应该怎么运营

每天运营时间建议：20-40 分钟。

### 第一步：打开线上关键页面

打开：

- `https://questcodes.com/`
- `https://questcodes.com/roblox/99-nights-in-the-forest/codes`
- `https://questcodes.com/roblox/99-nights-in-the-forest/updates`
- `https://questcodes.com/admin/game-data`

检查：

- 首页能否打开
- Codes 页面是否显示最近 checked date
- Updates 页面是否有最新 source-check 记录
- Admin Game Data 页面是否正常

为什么做：

用户进入 codes 页面时，最敏感的是“日期是否新鲜”。如果用户看到日期旧，很容易直接离开。

达到的效果：

- 及时发现线上错误
- 避免 stale date 影响信任
- 避免在站点有问题时继续发外链或加页面

## 4. 后台 Run Audit 怎么用

路径：

`https://questcodes.com/admin/game-data`

### Run Audit 是什么

`Run Audit` 是只读审计。

它只检查当前代码/数据库里记录的 checked date，然后告诉你：

- 哪些页面 fresh
- 哪些页面 due soon
- 哪些页面 stale

它不会：

- 抓外部网站
- 修改代码
- 改兑换码状态
- 改奖励
- 自动部署

为什么这样设计：

如果后台一键自动改代码和部署，一旦来源页面被误判、403、内容变动或 AI 理解错，就会把错误游戏数据发布给用户。

达到的效果：

Run Audit 是“体检”，不是“治疗”。先知道哪个页面有风险，再决定下一步。

### 看到 Due soon 怎么办

如果看到：

`Codes due-soon`

下一步不是乱改页面，而是点：

`Run source check`

为什么：

Codes 是最容易变动的页面。source check 会去查 PC Gamer、GamesRadar、PCGamesN、Fandom、Roblox API 等来源。

达到的效果：

确认当前 active code terms 是否还出现在可信来源中。

## 5. Run Source Check 怎么用

### Source check 是什么

`Run source check` 会抓可信来源，检查关键词是否出现，例如：

- `forestwakesup26`
- `afterparty`
- `yay fishing`
- `happyhalloween`

它会输出：

- 几个来源健康
- 几个来源需要 review
- 哪些词匹配
- 哪些词缺失
- 是否有 high-risk terms

### 看到 review-before-publish 怎么办

这是正常情况，不代表出错。

意思是：

- 有来源确认了部分代码
- 但仍有来源阻断、缺失、冲突或 high-risk term
- 不能直接自动发布

你应该：

1. 点 `Copy Codex prompt`
2. 把复制内容发给 Codex
3. 让 Codex 只更新 source-confirmed 数据
4. 不允许 AI 编造奖励、状态、掉率或 patch note

为什么：

Roblox codes 的竞争点不是“最快复制”，而是“能解释来源冲突并保持保守”。

达到的效果：

- Codes 页面保持新鲜
- 用户能看到来源轨迹
- 避免把不确定信息写成事实

## 6. Codex 收到维护提示词后应该做什么

当你把 Copy Codex prompt 发给 Codex 后，Codex 应该：

1. 读取 7Deer 的 `questcodes-99nights-keyword-to-page` skill
2. 运行 `pnpm game-data:audit`
3. 运行 `pnpm game-data:source-check`
4. 判断是否有足够来源支持更新
5. 只改 source-confirmed 数据
6. 跑 `pnpm build`
7. commit + push
8. 部署前询问确认

如果来源不够强，Codex 应该不改页面，不做 filler content。

## 7. 什么时候可以点部署

Cloudflare 部署应该在以下条件都满足时执行：

- `pnpm game-data:audit` 通过
- `pnpm build` 通过
- Git commit 已完成
- 你明确同意部署

部署后要 smoke test：

```powershell
curl.exe -L -sS --noproxy "*" -o NUL -w "home HTTP=%{http_code}\n" https://questcodes.com/
curl.exe -L -sS --noproxy "*" -o NUL -w "codes HTTP=%{http_code}\n" https://questcodes.com/roblox/99-nights-in-the-forest/codes
curl.exe -L -sS --noproxy "*" -o NUL -w "admin HTTP=%{http_code}\n" https://questcodes.com/admin/game-data
curl.exe -L -sS --noproxy "*" -o NUL -w "sitemap HTTP=%{http_code}\n" https://questcodes.com/sitemap.xml
```

为什么：

本地构建通过不等于线上一定正常。Cloudflare Worker、D1、环境变量、登录态都可能导致线上差异。

达到的效果：

确认用户和搜索引擎看到的是正常页面。

## 8. GSC 每天看什么

打开 Google Search Console。

每天不用看太多，主要看：

- Pages 是否有索引错误
- Sitemaps 是否成功读取
- Performance 有没有 impressions
- 哪些 query 开始出现
- 哪些 page 开始曝光

为什么：

Semrush 是市场估算，GSC 是你自己网站真实被 Google 测试的数据。

达到的效果：

后续页面优化不靠猜，而是根据真实 impressions 和 queries。

如果你看到 GSC 数据，可以按这个格式发给 Codex：

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

## 9. Semrush / Trends 怎么用

关键词判断不要只看 volume。

记录：

- Keyword
- US volume
- Global volume
- KD
- Intent
- Related keywords
- Questions
- SERP features
- Competitors

判断规则：

- 不把 `Roblox` 当主关键词，它太大且偏导航。
- KD 30 以下很好，但必须有清晰意图。
- KD 30-50 可以做，但要有 source-checked 价值。
- 没有 volume 不一定没价值，Roblox 新游戏数据经常滞后。
- 如果已有页面能覆盖，就强化旧页面，不新建重复页。

为什么：

新站最怕做一堆薄页面。薄页面不会带来权重，反而浪费 crawl 和维护成本。

达到的效果：

让每个新增页面都能增强当前 99 Nights cluster。

## 10. 新页面创建标准

只有满足以下条件才建新页：

- 搜索意图明确
- 不是已有页面的同义词
- 有可靠来源
- 能写出独立内容
- 能加入 sitemap / llms / internal links
- 能提供 FAQ 或结构化数据

不要建：

- 只有标题不同的重复页
- 只有 Reddit 传言的页面
- 需要编造掉率、公式、奖励的页面
- 没有本地化内容的翻译页

## 11. 外链什么时候开始

现在可以轻量开始。

原因：

- 域名已上线
- sitemap 已有
- robots 已有
- llms.txt 已有
- privacy / terms / editorial policy 已有
- 第一组内容页已有

第一周只做 5-10 个低风险动作：

- GSC 提交 sitemap
- Bing 提交 sitemap
- 个人 profile 允许的地方加链接
- 真实回答 Reddit/社区问题，不硬广
- 准备目录提交文案

不要做：

- 批量垃圾外链
- PBN
- 评论区刷链接
- 不相关 AI/SaaS 目录乱投

为什么：

新站的外链要看自然度和相关性。大量垃圾链接不会解决内容和信任问题。

达到的效果：

提升发现速度，建立基础品牌提及。

## 12. AdSense 什么时候接

不要急着开广告。

申请前应满足：

- 首页像真实游戏攻略站
- Privacy / Terms / Editorial Policy 已有
- 内容页不是薄页面
- 主要页面无报错
- GSC 至少有初步 indexed / impressions
- 页面阅读体验不被广告破坏

为什么：

太早申请容易被拒。即使通过，过早插广告也会降低用户体验。

达到的效果：

提高 AdSense 审核通过率，并减少对 SEO 的干扰。

## 13. Vertex AI 是否适合接入

结论：适合做“AI 辅助运营”，不适合现在直接做“全自动发布”。

### 适合 Vertex AI 的任务

1. Source-check 结果摘要  
   把 PC Gamer、GamesRadar、PCGamesN、Fandom 的结果总结成：safe / review / blocked。

2. 冲突解释  
   例如 `yay fishing` 为什么是 special，而不是 normal active code。

3. GSC query 分类  
   把查询词分成 codes / crafting / gems / classes / map / badges 等意图。

4. 页面改进建议  
   根据已有页面和 query，建议强化 FAQ、intro、internal links。

5. 草稿生成  
   为新页面生成大纲、FAQ、meta description，但不能直接发布。

6. 社区投稿审核  
   后续如果开放用户提交 codes 或评论，AI 可以先筛 spam、重复、辱骂、无来源 claims。

### 不适合 Vertex AI 直接做的任务

- 自动把 code 改成 active
- 自动改 reward amount
- 自动发布 class tier
- 自动生成 drop rate
- 自动写 patch notes
- 自动部署

为什么：

AI 可以总结和分类，但不能替代来源证据。尤其是游戏数据，错一次就会影响用户信任。

### 推荐接入路线

阶段 1：不接 API，只用 Codex + 后台 source check  
当前就是这个阶段。

阶段 2：Vertex AI Review Assistant  
输入：source-check snapshot  
输出：结构化 JSON，例如：

```json
{
  "decision": "review-before-publish",
  "safe_updates": ["refresh PC Gamer checkedAt"],
  "blocked_updates": ["do not change yay fishing status"],
  "human_review_needed": ["PCGamesN conflict"]
}
```

这个阶段只写 D1 review snapshot，不改源码，不部署。

阶段 3：AI Draft Assistant  
AI 生成页面强化建议或草稿，由 Codex 审核、改代码、build。

阶段 4：有限自动化  
只允许非常低风险更新，例如：

- 多个可信来源确认同一 active code
- 只刷新 checkedAt
- 不改 reward
- 不改 status
- build 通过
- 人工确认部署

阶段 5：真正自动化  
只有当系统有稳定日志、回滚、人工审核队列、错误告警后，才考虑。

### 技术注意点

当前项目已有 Gemini provider，但它是通用 AI 抽象的一部分，不等于已经接了 Vertex AI。

如果接 Vertex AI：

- 不要把 service account JSON 放进仓库
- 不要把密钥写进 D1 明文配置
- 应使用 Cloudflare secrets / Google ADC / 服务账号最小权限
- 先做后台只读 AI review，不做自动发布

## 14. 每天给 Codex 的推荐提示词

```text
按照 docs/operations/questcodes-operations-playbook.zh-CN.md 和 7Deer 的 questcodes-99nights-keyword-to-page skill 跑一轮 Quest Codes 日常运营。

1. 先跑 game-data audit。
2. 如果 Codes due soon 或 stale，再跑 source-check。
3. 只更新来源确认的数据。
4. 不编造游戏事实、奖励、掉率、tier 或 patch notes。
5. 跑 pnpm build。
6. 有改动则提交推送。
7. 部署前问我确认。
8. 告诉我 GSC 下一步该看什么。
```

## 15. 每周运营记录模板

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
- Build / improve / no action:
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

## 16. 当前最推荐的下一步

截至 2026-06-25：

1. 先部署最近两个 commit，让线上 Codes 日期和后台向导更新。
2. 继续观察 GSC 是否出现 impressions。
3. 如果 GSC 有 query，优先强化已有页面。
4. 如果 GSC 还没有数据，继续保持 Codes/Updates 新鲜。
5. 轻量开始外链，不做垃圾外链。
6. Vertex AI 暂不接自动发布，先规划成 review assistant。

## 17. Vertex AI Review Assistant 当前怎么用

结论：现在可以把 Vertex AI 接成后台“只读审核助手”，但仍然不能让它自动发布游戏事实。

推荐生产配置方式：

```powershell
.\node_modules\.bin\wrangler.CMD secret put VERTEX_AI_SERVICE_ACCOUNT_JSON
```

然后在后台：

`/admin/settings` -> `AI` -> `Vertex AI`

填写：

- `Review Model`: `gemini-2.5-flash`
- `Fallback Models`: `gemini-2.5-flash-lite`
- `Project ID`: Google Cloud 项目 ID
- `Location`: `us-central1`

`Service Account JSON` 字段可以用，但更推荐用 Cloudflare secret，因为 service account JSON 是敏感凭据。

日常使用步骤：

1. 打开 `/admin/game-data`。
2. 点击 `Run source check`。
3. 点击 `Run AI review`。
4. 看 `Safe updates`、`Blocked updates`、`Human review`、`Publish guardrails`。
5. 点击 `Copy Codex prompt` 发给 Codex。
6. Codex 只允许更新 source-confirmed 的 codes/update 数据。

为什么这样做：

- Vertex AI 只读取 source-check snapshot。
- Vertex AI 只写入一份 review snapshot。
- 它不会改页面文件。
- 它不会改 code status、reward、tier、掉率、攻略事实。
- 它不会 commit、push 或 deploy。
- 如果来源冲突，页面保持保守展示。

达到的效果：

- 你可以消耗 Vertex AI 额度来提高运营效率。
- 后台能更清楚地告诉你哪些可以改、哪些不能改。
- 自动化体系继续推进，但不会牺牲内容可信度。
