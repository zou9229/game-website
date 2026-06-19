# SignalLayer.io API 参考

## 基础信息

- **API 文档**: https://docs.signallayer.com
- **Base URL**: https://signallayer.io/api/openclaw
- **认证**: Bearer Token (API Key)

## 创建 Campaign

### Endpoint
```
POST /create-campaign
```

### Headers
```
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

### Request Body

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| targetUrl | string | 是 | 目标网站 URL |
| brandName | string | 是 | 品牌名称 |
| keywords | string | 是 | SEO 关键词（逗号分隔） |
| linkCount | integer | 是 | 外链数量（建议 50-500） |
| strategy | string | 否 | `safety`（默认）或 `aggressive` |
| speed | string | 否 | `drip`（默认）或 `instant` |
| dripDays | integer | 否 | drip 模式天数（默认 14） |
| source | string | 否 | 来源标识（建议填写） |

### Request 示例

```json
{
  "targetUrl": "https://example.com",
  "brandName": "Example Brand",
  "keywords": "example, keywords, for, seo",
  "linkCount": 200,
  "strategy": "safety",
  "speed": "drip",
  "dripDays": 14,
  "source": "openclaw"
}
```

### Response 成功示例

```json
{
  "success": true,
  "campaign": {
    "id": "8b8ff7e3-f29d-4b7d-b0cb-f3e00b731233",
    "targetUrl": "https://example.com",
    "brandName": "Example Brand",
    "keywords": "example,keywords,for,seo",
    "linkCount": 200,
    "strategy": "safety",
    "speed": "drip",
    "dripDays": 14,
    "status": "processing",
    "createdAt": "2026-05-19T22:30:00Z"
  }
}
```

### Response 错误示例

```json
{
  "success": false,
  "error": "Invalid API key"
}
```

## 查询 Campaign 状态

### Endpoint
```
GET /campaigns/{campaign_id}
```

### Headers
```
Authorization: Bearer <API_KEY>
```

### Response 示例

```json
{
  "success": true,
  "campaign": {
    "id": "8b8ff7e3-f29d-4b7d-b0cb-f3e00b731233",
    "status": "processing",
    "progress": {
      "total": 200,
      "completed": 45,
      "remaining": 155
    },
    "createdAt": "2026-05-19T22:30:00Z",
    "updatedAt": "2026-05-19T23:00:00Z"
  }
}
```

## Campaign 状态

| 状态 | 说明 |
|------|------|
| pending | 等待处理 |
| processing | 处理中 |
| completed | 已完成 |
| failed | 失败 |
| paused | 暂停 |

## 策略说明

| 策略 | 说明 |
|------|------|
| safety | 安全策略，外链逐步释放，降低风险（推荐） |
| aggressive | 激进策略，更快投放，可能有更高风险 |

## 速度说明

| 速度 | 说明 |
|------|------|
| drip | 滴灌模式，分批逐步投放（默认 14 天） |
| instant | 即时模式，快速投放所有外链 |

## 错误码

| 错误 | 说明 |
|------|------|
| Invalid API key | API Key 无效或已过期 |
| Insufficient credits | 积分不足 |
| Invalid target URL | 目标 URL 格式错误 |
| Rate limit exceeded | 请求频率过高，请稍后重试 |

## 示例代码

### Python

```python
import requests

API_KEY = "sl_your_api_key_here"
BASE_URL = "https://signallayer.io/api/openclaw"

def create_campaign(target_url, brand, keywords, quantity=200):
    response = requests.post(
        f"{BASE_URL}/create-campaign",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "targetUrl": target_url,
            "brandName": brand,
            "keywords": keywords,
            "linkCount": quantity,
            "strategy": "safety",
            "speed": "drip",
            "dripDays": 14,
            "source": "openclaw"
        }
    )
    return response.json()

result = create_campaign(
    "https://example.com",
    "Example Brand",
    "example,keywords,for,seo",
    200
)
print(result)
```

### curl

```bash
curl -X POST https://signallayer.io/api/openclaw/create-campaign \
  -H "Authorization: Bearer sl_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "targetUrl": "https://example.com",
    "brandName": "Example Brand",
    "keywords": "example,keywords,for,seo",
    "linkCount": 200,
    "strategy": "safety",
    "speed": "drip",
    "dripDays": 14,
    "source": "openclaw"
  }'
```
