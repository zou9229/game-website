# SignalLayer 外链投放 - 完整操作手册

> 详细指南：如何使用 SignalLayer.io API 为网站创建外链投放 campaign

---

## 目录

1. [什么是 SignalLayer 外链投放？](#什么是-signallayer-外链投放)
2. [前置准备](#前置准备)
3. [安装 Skill](#安装-skill)
4. [配置 API Key](#配置-api-key)
5. [创建外链 Campaign](#创建外链-campaign)
6. [查询 Campaign 状态](#查询-campaign-状态)
7. [常用命令参考](#常用命令参考)
8. [参数说明](#参数说明)
9. [独立脚本使用](#独立脚本使用)
10. [常见问题](#常见问题)

---

## 什么是 SignalLayer 外链投放？

SignalLayer.io 是一个外链投放平台，可以帮助网站快速建立高质量外链。

**核心能力：**
- 自动向数千个网站投放外链
- 支持 drip（分批滴灌）和 instant（即时）两种模式
- 实时跟踪投放进度
- 支持安全/激进两种策略

**典型应用场景：**
- 新网站快速建立外链基础
- 游戏站点推广
- SEO 优化提速
- 内容网站权重提升

---

## 前置准备

### 需要准备

1. **SignalLayer 账户**
   - 注册地址：https://app.signallayer.io
   - 支持 GitHub 登录

2. **API Key**
   - 登录后在 Dashboard 获取
   - 格式：`sl_xxxxxxxxxxxxxxxx`

3. **积分**
   - 新用户有免费积分
   - 每条外链消耗积分（数量 × 策略系数）
   - 积分不足时需充值

---

## 安装 Skill

### 方式一：复制文件夹（推荐）

```bash
# 克隆整个技能库
git clone https://github.com/kennyzir/7deer_skills.git

# 或者只复制需要的技能
npx degit kennyzir/7deer_skills/signallayer-backlinks-client signallayer-backlinks-client
```

将 `signallayer-backlinks-client` 文件夹复制到：

**OpenClaw 全局安装（所有项目共享）：**
```
~/.openclaw/skills/signallayer-backlinks-client/
```

**项目内安装：**
```
your-project/.agent/skills/signallayer-backlinks-client/
```

### 方式二：通过 OpenClaw 命令

```bash
# 查看已安装的 skills
openclaw skills list

# 确认 signallayer-backlinks-client 已加载
```

### 验证安装

告诉 Agent：`查看 SignalLayer 任务状态`

如果返回"暂无记录"或历史 campaign，说明安装成功。

---

## 配置 API Key

### 第一次使用时

告诉 Agent 你的 API Key：

```
我的 SignalLayer API Key 是 sl_xxxxxxxxxxxxxxxx
```

Agent 会自动：
1. 保存到 `memory/signallayer-api-user.md`
2. 验证 Key 是否有效
3. 反馈配置结果

### 手动配置

如果 Agent 无法保存，可以手动创建配置文件：

在 `memory/` 目录创建 `signallayer-api-user.md`：

```markdown
# SignalLayer API 配置（用户）

## API Key
- **Key**: `sl_xxxxxxxxxxxxxxxx`
- **配置时间**: 2026-05-19

## 账户信息
- **Email**: your@email.com
- **积分余额**: （待查询）

## Campaign 记录

<!-- 新 campaign 会追加到这里 -->
```

---

## 创建外链 Campaign

### 基本命令

**最简写法：**
```
给 https://example.com 发 200 条外链
```

**完整写法：**
```
用 SignalLayer 创建外链 campaign：
- 目标：https://example.com
- 品牌：Example Site
- 关键词：example,keywords,for,seo
- 数量：200
- 策略：safety
- 速度：drip
```

### Agent 执行流程

```
1. 读取 memory 中的 API Key
2. 验证参数是否完整
3. 调用 SignalLayer.io API
4. 保存 campaign 信息到 memory
5. 返回结果给用户
```

### 返回示例

成功创建后，你会收到：

```
✅ Campaign 创建成功！

📊 Campaign 信息：
   Campaign ID: 8b8ff7e3-f29d-4b7d-b0cb-f3e00b731233
   目标网站: https://example.com
   品牌: Example Site
   外链数量: 200
   策略: safety
   速度: drip（分14天投放）
   状态: processing
   预计完成: 14天后
```

---

## 查询 Campaign 状态

### 基本命令

```
查看 SignalLayer 任务状态
```

或指定 Campaign ID：

```
查询 Campaign 8b8ff7e3-f29d-4b7d-b0cb-f3e00b731233 的状态
```

### 返回示例

```
📊 Campaign 状态查询：

Campaign ID: 8b8ff7e3-f29d-4b7d-b0cb-f3e00b731233
状态: processing
进度: 45/200
剩余: 155
创建时间: 2026-05-19 10:00 UTC
更新时间: 2026-05-19 15:00 UTC
```

### Campaign 状态说明

| 状态 | 说明 | 需要操作 |
|------|------|---------|
| pending | 等待处理 | 等待 |
| processing | 处理中 | 等待 |
| completed | 已完成 | 无 |
| failed | 失败 | 检查原因 |
| paused | 暂停 | 联系支持 |

---

## 常用命令参考

### 创建 Campaign

```
# 默认 200 条，safety 策略，drip 速度
"给 https://example.com 发外链"

# 指定数量
"给 https://example.com 发 500 条外链"

# 激进策略
"用 aggressive 策略给 https://example.com 发外链"

# 即时投放
"给 https://example.com 发 200 条外链，instant 速度"
```

### 查询状态

```
"查看 SignalLayer 任务状态"
"查看所有 campaign"
"查看最近的外链任务"
```

### 配置相关

```
"配置我的 SignalLayer API Key"
"更新 SignalLayer API Key"
"查看我的 API Key 配置"
```

---

## 参数说明

### 必填参数

| 参数 | 说明 | 示例 |
|------|------|------|
| target_url | 目标网站 URL | `https://example.com` |
| brand | 品牌名称 | `Example Brand` |
| keywords | SEO 关键词（逗号分隔） | `example,keywords,seo` |
| quantity | 外链数量 | `200` |

### 可选参数

| 参数 | 默认值 | 可选值 | 说明 |
|------|--------|--------|------|
| strategy | safety | `safety` / `aggressive` | 安全策略更慢但风险低 |
| speed | drip | `drip` / `instant` | drip 分14天投放 |
| email | - | 邮箱地址 | 联系邮箱 |

### 策略对比

| 策略 | 速度 | 风险 | 推荐场景 |
|------|------|------|---------|
| safety | 慢（14天） | 低 | 新网站、正式项目 |
| aggressive | 快（1-2天） | 中 | 急需外链的老站 |

### 速度对比

| 速度 | 投放方式 | 适用场景 |
|------|---------|---------|
| drip | 分14天逐步投放 | 大多数情况，推荐 |
| instant | 一次性全部投放 | 小批量、快速测试 |

---

## 独立脚本使用

如果不通过 Agent，也可以直接运行 Python 脚本。

### 安装依赖

```bash
pip install requests
```

### 配置 API Key

```bash
python scripts/signallayer_client.py --configure
```

会提示输入 API Key，只需配置一次。

### 创建 Campaign

```bash
python scripts/signallayer_client.py \
  --target "https://example.com" \
  --brand "Example Brand" \
  --keywords "example,keywords,for,seo" \
  --quantity 200
```

### 查询状态

```bash
python scripts/signallayer_client.py --status "campaign_id"
```

### 查看历史

```bash
python scripts/signallayer_client.py --list
```

### 完整参数

```bash
python scripts/signallayer_client.py \
  --target "https://example.com" \
  --brand "Example Brand" \
  --keywords "kw1,kw2,kw3" \
  --quantity 200 \
  --strategy safety \
  --speed drip
```

---

## 常见问题

### Q: API Key 无效怎么办？

**A:** 检查以下两点：
1. Key 是否以 `sl_` 开头
2. Key 是否完整（不是 `sl_xxx` 而是完整的 `sl_xxxxxxxxxxxxxxxx`）

如果 Key 过期或无效，请在 SignalLayer Dashboard 重新生成。

### Q: 请求失败怎么排查？

**A:** 按以下顺序检查：

1. **网络问题** - 能否访问 `https://signallayer.io`？
2. **API Key 问题** - 是否正确配置？
3. **积分不足** - 登录查看积分余额
4. **参数问题** - URL 格式是否正确？

### Q: 积分怎么计算？

**A:** 基本公式：

```
消耗积分 = 外链数量 × 策略系数

- safety 策略系数：1.0
- aggressive 策略系数：1.5
```

例如：200 条外链，safety 策略，消耗 200 积分。

### Q: 可以同时运行多个 Campaign 吗？

**A:** 可以。SignalLayer 支持同时运行多个 campaign，互不影响。

### Q: Campaign 失败怎么办？

**A:** 常见失败原因：

1. **积分不足** - 充值后重试
2. **目标 URL 无效** - 检查 URL 格式和可访问性
3. **频率限制** - 等待后重试

### Q: drip 和 instant 哪个好？

**A:** 推荐大多数情况使用 **drip**：

- 更自然，符合搜索引擎算法
- 风险更低
- 效果更持久

instant 适合：
- 小批量快速测试
- 老站点维护
- 时间紧迫的情况

### Q: 如何联系支持？

**A:** 
- SignalLayer 官网：https://signallayer.io
- 文档：https://docs.signallayer.com
- 邮箱：support@signallayer.io

---

## 示例：完整操作流程

### 场景：为一个新上线的游戏网站创建外链

**Step 1: 配置 API Key**
```
用户：我的 SignalLayer API Key 是 sl_abc123xyz456
Agent：✅ API Key 配置成功！
```

**Step 2: 创建 Campaign**
```
用户：给 https://mygame.com 发 300 条外链，品牌是 My Game，关键词是 online game, free game, browser game
```

**Step 3: 等待处理**
```
Agent：✅ Campaign 创建成功！
       Campaign ID: xxx-xxx-xxx
       状态: processing
       速度: drip（分14天）
       预计完成: 14天后
```

**Step 4: 定期查询状态**
```
用户：查看 SignalLayer 任务状态
Agent：📊 进度：85/300
       状态: processing
       剩余: 215 条
```

**Step 5: 完成**
```
Agent：🎉 Campaign 已完成！
       成功投放: 300/300 条外链
```

---

## 相关资源

- **SignalLayer 官网**: https://signallayer.io
- **API 文档**: https://docs.signallayer.com
- **GitHub 仓库**: https://github.com/kennyzir/7deer_skills
- **本技能位置**: `signallayer-backlinks-client/`

---

## 更新日志

### v1.0.0 (2026-05-19)
- 初始版本
- 支持创建/查询 campaign
- 支持 safety/aggressive 策略
- 支持 drip/instant 速度
- 用户独立配置 API Key
