# Quest Codes 抢救发布与低维护操作

日期：2026-11-01。生产站点：https://questcodes.com。

## 已实际完成

- 刷新 Codes 来源记录，新增两家媒体共同列出的 `awardwinner_yay`；明确没有游戏内实测。
- 去掉公开页面自动换月的标题，避免旧攻略每月自动变成“最新”。URL 与 canonical 不变。
- 首页移除过时累计访问数及部分面向站长的 SEO 文案，保留玩家导航。
- 增加 Pocket Tactics 来源监测，并跟踪新增兑换码是否仍出现。
- 定时 AI 审核增加相同来源信号复用，减少反复处理同一结论的调用。
- 修正项目运营 skill 的自动换月要求，保持 `.agent/skills` 和 `.agents/skills` 两份一致。
- 已完成生产迁移和 Cloudflare 发布，不只是本地改动。

生产 Worker 版本：`3576c6b5-7002-4463-9bcd-aac12e66c674`。

## 定时任务现在怎么运行

既有 Cron 保留：UTC `0 1 * * *` 和 `0 13 * * *`，即北京时间每天 09:00 和 21:00。

1. 抓取已配置的来源，保存本次 source-check 快照。
2. 如果未开启自动 AI 审核，记录 `disabled`。
3. 如果来源状态不需要审核，记录 `sources-healthy`。
4. 如果需要审核，对比来源可用性、匹配词、风险词、非实时计数信号和模型设置。
5. 相同信号且旧审核仍在复用窗口内，记录 `reused`，不调用 Vertex，不修改原审核生成时间。
6. 信号发生变化或超过复用窗口，重新调用 Vertex，记录 `reviewed`；调用失败记录 `failed`。

默认复用窗口 24 小时，可配置 1-168 小时。去 `/admin/settings`，打开 **Operations > Game Data Automation**，修改 **Reuse unchanged AI review (hours)** 并保存。

在 `/admin/game-data` 的 AI review 区域可以查看定时检查时间、状态及复用窗口。
手动 **Run AI review** 始终重新调用，不受复用窗口限制。
没有必要每天手动连续点击 Run audit、Run source check、Run AI review。

旧审核没有本次新增的信号指纹，所以下次需要审核时会先生成一份新审核，之后才能复用。
本次验证的是测试和部署成功；尚未观察到新版本第一次真实 Cron 的 `reused` 状态。

## 自动化边界

来源监测仍然只针对已配置的词与提取信号，不是对来源全文变化的完整检测。
例如旧码在 expired 区出现，也可能被检测为风险词；只在 HTML 中出现不能证明有效。
新增或变更了系统没提取的内容，不一定改变指纹。

**本次没有实现自动发现所有新码，也没有自动发布游戏事实。**
AI 负责整理需复核信号，不能替代游戏内实测、来源冲突判定与正确的版本数据。
其他攻略旧核验日期保留，不通过刷新日期掩盖待维护事实。

## 发布验收

- 11 个测试通过，包括审核复用边界、信号变化、模型变化及上游合并回归。
- `pnpm exec tsc --noEmit` 通过。
- `pnpm build` 通过；只有现有的大体积 chunk 提示。
- 首页、Codes、Classes、`/admin/game-data`、`/admin/settings`、`/ads.txt`、`/sitemap.xml` 均 HTTP 200。
- 首页与 Codes 的渲染 HTML 已包含新码及真实复核日期；公开页标题不再自动换月。
- 未登录后台 HTML 保持 `noindex, nofollow`；受保护的 AI review API 返回 Unauthorized，没有公开审核数据。
- 部署脚本保留两个 Cron，没有改动或删除 GitHub workflow。

这不是完整浏览器性能验收，也不证明搜索引擎已经重新抓取或排名将提高。
本次浏览器控制被安全机制中止，原因是无法可靠确定当前浏览器网址；没有读到最新私有 GSC 报表。

## 数据保护

既有增量迁移 `0001_upstream_tickets_api_keys.sql` 只新增 ticket、ticket_message、索引及两个可空 API Key 字段。
迁移前取得 D1 恢复点并导出 `.tmp/questcodes-pre-recovery-2026-11-01.sql`；备份不入 Git，可能含私人数据，不能分享或上传。
导出已在本地临时数据库恢复验证；迁移前后 user、account、post、apikey 行数一致。
没有删除既有账号，没有改写攻略数据库事实。

## 站长现在只需做的一件事

导出一次 GSC **效果 > 搜索结果 > 最近 3 个月**，保留查询、网页、日期、国家、设备。
另提供 **网页索引** 的未收录原因分类及 2-3 个重要 URL 的检查结果。不要发送密码或浏览器凭据。

拿到数据后，再从现有查询验证一个低维护工具需求；没有证据时不继续批量写攻略、换游戏或增加多语言。
目前不建议购买外链、流量包或新域名，也不能承诺“放着不管就会有广告收入”。

网站可以继续低成本运行，但“自动监测”和“全自动经营盈利”不是同一件事。
详细诊断、试验门槛和学习资料见 [抢救计划](../planning/questcodes-recovery-2026-11-01.zh-CN.md)。
