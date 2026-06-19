---
name: signallayer-backlinks-client
description: SignalLayer 外链投放客户端（通用版）。供其他 OpenClaw 用户安装使用，通过 SignalLayer.io API 为网站创建外链投放 campaign。支持创建 campaign、查询状态、管理多任务。用户需自行配置自己的 SignalLayer API Key。
---

# SignalLayer Backlinks Client

通用版 SignalLayer 外链投放工具，供其他 OpenClaw 用户安装使用。

## 功能

- ✅ 创建外链投放 campaign
- ✅ 查询 campaign 状态
- ✅ 管理多个外链任务
- ✅ 自动记录到 memory 文件

## 快速开始

### 1. 安装后首次使用

首次使用时，告诉 Agent 你的 SignalLayer API Key：
```
"我的 SignalLayer API Key 是 xxx"
```

Agent 会自动保存到 `memory/signallayer-api-user.md`

### 2. 创建外链 campaign

告诉 Agent：
```
"用 SignalLayer 给 https://example.com 发 200 条外链"
```

Agent 会使用你的 API Key 发送请求。

## 工作流程

### Step 1: 检查配置

1. 读取 `memory/signallayer-api-user.md` 获取用户 API Key
2. 如不存在，引导用户配置

### Step 2: 准备 Campaign 参数

必填：
- `target_url` - 目标网站 URL
- `brand` - 品牌名称
- `keywords` - 关键词
- `quantity` - 外链数量（默认 200）

可选：
- `strategy` - 策略：`safety`（默认）或 `aggressive`
- `speed` - 速度：`drip`（默认，分14天）或 `instant`

### Step 3: 调用 API

```
POST https://signallayer.io/api/openclaw/create-campaign
Headers: Authorization: Bearer <USER_API_KEY>
Body: { targetUrl, brandName, keywords, linkCount, strategy, speed, dripDays, source }
```

### Step 4: 记录结果

追加到 `memory/signallayer-api-user.md`：
```markdown
### Campaign #N
- **Campaign ID**: <id>
- **目标**: <target_url>
- **品牌**: <brand>
- **关键词**: <keywords>
- **外链数量**: <quantity>
- **策略**: <strategy>
- **速度**: <speed>
- **状态**: <status>
- **创建时间**: <timestamp>
```

### Step 5: 向用户报告

- Campaign ID
- 目标 URL
- 外链数量
- 状态
- 预计完成时间

## 常用命令

- "给 https://example.com 发 200 条外链"
- "用 SignalLayer 投 500 条外链到 example.com"
- "SignalLayer 创建外链 campaign"
- "查看 SignalLayer 任务状态"
- "配置我的 SignalLayer API Key"

## 获取 API Key

访问 https://app.signallayer.io 注册并获取 API Key。

## 文件结构

```
signallayer-backlinks-client/
├── SKILL.md                    # 本文件
├── SETUP.md                    # 安装配置指南
└── references/
    └── api.md                  # API 文档
```
