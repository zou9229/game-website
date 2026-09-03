# Quest Codes 上游合并与广告检查

日期：2026-09-03。范围：本地合并、回归验证、线上广告接入只读检查。

## 合并范围

- 开始时工作区干净，没有进行中的 merge；本地 HEAD 为 `b1f395b`。
- 实际 upstream 是 `shipany-ai/shipany-vinext`，没有更改远程地址。
- 合并目标 `ebfdd7b`，共 6 个上游提交，原始差异 83 个文件。
- 未推送、未部署、未修改生产 D1 或线上游戏事实。

## 11 个冲突文件

| 文件                                       | 处理                                                                        |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| `pnpm-lock.yaml`                           | 从本站锁文件出发，由 pnpm 合并新增依赖，保留现有版本及安全 overrides。      |
| `src/app/[locale]/(auth)/sign-up/page.tsx` | 保留跳转登录页，不能恢复公开注册。                                          |
| `src/app/[locale]/admin/layout.tsx`        | 合并上游导航重排及工单入口，保留 Game Data，去掉重复内容分组。              |
| `src/app/ads.txt/route.ts`                 | 保留本站已使用的发布商配置键、格式校验及缓存。                              |
| `src/app/layout.tsx`                       | 保留品牌、metadata、服务端配置和 One Tap 开关；不注入上游全站广告。         |
| `src/blocks/pricing.tsx`                   | 保留跳过配置请求的参数，接入上游 no-store 和返回原页面能力。                |
| `src/components/analytics/index.tsx`       | 保留传入配置复用，支持仅填写 Plausible 自定义脚本地址。                     |
| `src/components/google-one-tap.tsx`        | 保留服务端开关和配置注入，接入登录返回原页面。                              |
| `src/lib/resp.ts`                          | 同时接受本站数字 HTTP 状态码和上游 ResponseInit 参数。                      |
| `src/modules/config/settings.ts`           | 保留唯一 AdSense 配置入口、Vertex AI 和 Operations；不增加第二套发布商 ID。 |
| `src/proxy.ts`                             | 保留安全响应头和后台 noindex；不新增用于注册归因的营销 cookie。             |

上游的配置脱敏、付款续费分发、Stripe 异步签名验证、后台富文本和工单功能已合入。
Cloudflare 入口、Cron、D1 绑定、部署脚本、游戏内容、GitHub 工作流没有被模板覆盖。

## 额外兼容与安全修复

- 登录返回地址按 URL 规则规范化，拒绝反斜杠、协议相对地址、编码后的登录循环。
- 新 API Key 没有配置加密密钥时仍然仅保存哈希，不采用上游明文可恢复存储的回退。
- 只有配置 `CONFIG_ENCRYPTION_KEY` 后才保存加密副本；密钥由 Cloudflare Secret 管理，不写公共 vars。
- 修复已有 freshnessBasis 的 TypeScript 推断问题，不修改任何 checkedAt 或游戏数值。
- TypeScript 排除 gitignored 的旧 `worker/` 生成物和 `dist/`，实际 `src/worker.ts` 仍参加检查。

## 数据库与上线门槛

迁移文件：`drizzle/0001_upstream_tickets_api_keys.sql`。

1. 新建 `ticket`、`ticket_message` 和索引。
2. 给 `apikey` 新增可空 `key`、`last_used_at` 字段。
3. 没有 DROP、数据清理、非空强制回填或现有数据覆盖。

原模板忽略整个 drizzle 目录。本轮把基线 SQL、增量 SQL 和生成快照纳入版本管理，确保其他 checkout 可以运行同样的迁移和回归测试。

上线前必须完成：

1. 确认生产 D1 实际结构和迁移记录；尤其检查旧 `0000` 是由 migrations apply 还是直接执行 SQL 建表。
2. 如果现有表已经存在但基线没有登记，不能盲目重放 `0000`，先核对基线并处理迁移记录。
3. 站长审核本次增量 SQL，准备 D1 备份或恢复点。
4. 经确认后使用生产迁移流程应用增量，再部署 Worker。
5. 验证登录、Game Data、工单、API Key、广告和 Cron。

本轮没有执行生产 migrations apply，也没有执行 db:push 修改真实数据库。
数据库验证使用全新内存 SQLite：先建立旧结构和样例行，再应用增量，确认原 API Key 保留且新工单可写入。

## 验证

- `pnpm install --ignore-scripts`：成功，锁文件由 pnpm 生成。
- `pnpm test:merge`：6 组回归测试通过。
- `pnpm exec tsc --noEmit`：通过。
- `pnpm build`：通过，存在构建体积提示，不是构建失败。
- 本地 HTTP：首页、Codes、Assassin、登录页、后台页面壳、配置、sitemap 和 robots 可访问。
- `/sign-up` 返回 307 到 `/sign-in`，未登录后台 API 返回 Unauthorized；后台页面有 noindex。
- 未实际执行第三方支付、登录后的工单操作或生产 D1 迁移；不能把构建通过当作这些流程已验收。

## 当前广告情况

线上只读核验：

- `google_adsense_enabled=true`。
- 发布商为 `ca-pub-6801555055690403`。
- `/ads.txt` HTTP 200，内容为 `google.com, pub-6801555055690403, DIRECT, f08c47fec0942fa0`。
- 首页仅一份 `adsense-loader`。
- GA 已配置；配置存在不等于已经确认实际访客或统计事件正常入库。
- 没有读取 AdSense 私有后台，审批、政策中心、付款验证、CMP 发布状态和广告收入仍未知。

配置入口：`/admin/settings` → Analytics → Google AdSense。
当前不需要再贴一份广告脚本。

站长下一步：

1. 打开 AdSense → 网站 → questcodes.com，提供最新审核状态或拒审原文。
2. 如果网站状态是 Ready，检查 Ads → By site 中的 Auto ads 和页面排除，再在实际页面验证投放。
3. 如果仍在审核，等待或按后台具体问题修复；切换广告网络不能解决内容或获客问题。
4. 检查 Privacy & messaging 已发布、隐私页匹配真实数据用途、付款资料无待处理提醒。
5. 不点击自己的广告，不刷流量，不购买保证点击或流量包。

Google 要求网站获批后才能展示广告，技术接入成功不是审批通过：
[连接站点到 AdSense](https://support.google.com/adsense/answer/7584263?hl=en)。
准入强调原创内容与合规，而不是承诺只要达到某个流量数就能通过：
[AdSense 准入要求](https://support.google.com/adsense/answer/9724?hl=en)。

## 获客优先级

`pnpm game-data:audit` 基于本地内容日期显示 20 项超期；这不是线上定时任务停机证明，也不是所有事实均错误的证明。
源码日期集中在 7 月，线上首页也仍显示 Codes checked 2026-07-17，首先需要重新核验高时效内容。

1. 提供 GSC 最近 28 天与前 28 天对比，包含查询、页面、国家、点击、展示、排名，以及未索引原因。
2. 优先核验 Codes、Classes、Assassin；来源确认后更新真实变化，不只把标题或日期改成今天。
3. 每轮只优化 2-3 个有真实展示、意图明确的页面，记录改动，观察至少两个完整周的数据。
4. 不因为 Treasure Quest/Rumble Quest 的零星展示就扩建新游戏；先验证意图匹配、来源与维护能力。
5. 外链不是必须先购买的门票。不做无关目录群发；有原创实测截图、路线或对比后再到允许分享的相关社区提供答案。
6. 暂不增加 VPN 等不相关联盟广告，也不把继续更换视觉风格当作流量增长方案。

7 月底的 262 展示、0 点击不能替代 9 月数据；仅凭全站平均排名不能断言标题、国家或外链就是零点击的原因。
没有可靠方式保证 SEO 流量。按最近报表、索引状态和内容质量逐步验证，而不是无限增加代码和页面数量。
