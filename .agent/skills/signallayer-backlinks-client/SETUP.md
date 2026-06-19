# SignalLayer Backlinks Client - 安装配置指南

## 前置要求

- OpenClaw 已安装并正常运行
- SignalLayer 账户和 API Key

## 获取 SignalLayer API Key

1. 访问 https://app.signallayer.io
2. 注册/登录账户
3. 在 Dashboard 或 Settings 中获取 API Key
4. API Key 格式：`sl_xxxxxxxxxxxxxxxx`

## 安装 Skill

### 方式一：复制文件（推荐）

1. 将整个 `signallayer-backlinks-client` 文件夹复制到：
   ```
   ~/.openclaw/skills/signallayer-backlinks-client/
   ```

2. 在 OpenClaw 中确认 skill 已加载：
   ```
   /skills list
   ```

### 方式二：通过 ClawHub 安装（待开放）

等待 publish 到 ClawHub 后使用：
```
/clawhub install signallayer-backlinks-client
```

## 配置 API Key

安装后，使用以下任一方式配置你的 API Key：

### 方式一：告诉 Agent

直接对 Agent 说：
```
"我的 SignalLayer API Key 是 sl_xxxxxxxxxxxxxxxx"
```

Agent 会自动保存到 `memory/signallayer-api-user.md`

### 方式二：手动创建配置文件

在 `memory/` 目录创建 `signallayer-api-user.md`：

```markdown
# SignalLayer API 配置（用户）

## API Key
- **Key**: `sl_xxxxxxxxxxxxxxxx`
- **配置时间**: 2026-05-19

## 账户信息
- **Email**: 你的注册邮箱
- **积分余额**: （待查询）

## Campaign 记录

<!-- 新 campaign 会追加到这里 -->
```

## 验证安装

测试 skill 是否正常工作：

1. 告诉 Agent："查看 SignalLayer 任务状态"
2. 如果返回"暂无记录"或历史 campaign，说明配置成功
3. 如果返回错误，检查 API Key 是否正确

## 常见问题

### Q: API Key 无效
A: 检查 Key 格式是否为 `sl_` 开头，或在 SignalLayer dashboard 重新生成

### Q: 积分不足
A: 登录 https://app.signallayer.io 充值积分

### Q: Skill 没有响应
A: 确认文件放在正确目录后，使用 `/skills list` 检查是否加载

## 技术支持

如有问题，检查：
1. `memory/signallayer-api-user.md` 文件是否存在且格式正确
2. API Key 是否有权限
3. 网络是否能访问 signallayer.io
