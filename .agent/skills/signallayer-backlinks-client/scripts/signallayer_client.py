#!/usr/bin/env python3
"""
SignalLayer Backlinks Client
通用版外链投放脚本，支持用户配置自己的 API Key

用法:
    # 配置 API Key（只需配置一次）
    python signallayer_client.py --configure
    
    # 创建 campaign
    python signallayer_client.py --target "https://example.com" --brand "Example Brand" --keywords "example,keywords" --quantity 200
    
    # 查询 campaign 状态
    python signallayer_client.py --status "campaign_id"
    
    # 列出所有 campaign
    python signallayer_client.py --list
"""

import sys
import os
import json
import argparse
import requests
from datetime import datetime

# 路径配置
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
CONFIG_FILE = os.path.join(PROJECT_DIR, "memory", "signallayer-api-user.md")

# API 配置
BASE_URL = "https://signallayer.io/api/openclaw"

# 确保 memory 目录存在
os.makedirs(os.path.join(PROJECT_DIR, "memory"), exist_ok=True)


def load_config():
    """从 memory 文件加载配置"""
    if not os.path.exists(CONFIG_FILE):
        return None
    
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 简单解析 API Key
    for line in content.split('\n'):
        if '**Key**:' in line or '**Key**:' in line:
            # 提取 Key 值
            parts = line.split('`')
            if len(parts) >= 2:
                return parts[1]
    return None


def save_config(api_key, email=None):
    """保存配置到 memory 文件"""
    timestamp = datetime.now().strftime("%Y-%m-%d")
    
    content = f"""# SignalLayer API 配置（用户）

## API Key
- **Key**: `{api_key}`
- **配置时间**: {timestamp}

## 账户信息
- **Email**: {email or '（待补充）'}
- **积分余额**: （待查询）

## Campaign 记录

"""
    
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ 配置已保存到 {CONFIG_FILE}")


def configure():
    """交互式配置 API Key"""
    print("\n" + "=" * 50)
    print("SignalLayer API Key 配置")
    print("=" * 50)
    print("\n1. 访问 https://app.signallayer.io 注册/登录")
    print("2. 在 Dashboard 获取 API Key（格式: sl_xxx）")
    print()
    
    api_key = input("请输入你的 SignalLayer API Key: ").strip()
    
    if not api_key.startswith('sl_'):
        print("❌ API Key 格式错误，应以 sl_ 开头")
        return False
    
    email = input("（可选）请输入你的注册邮箱: ").strip()
    
    save_config(api_key, email if email else None)
    print("\n✅ 配置完成！现在可以创建 campaign 了。")
    return True


def create_campaign(target_url, brand, keywords, quantity=200, strategy="safety", speed="drip"):
    """创建外链 campaign"""
    api_key = load_config()
    if not api_key:
        print("❌ 请先配置 API Key: python signallayer_client.py --configure")
        return None
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "targetUrl": target_url,
        "brandName": brand,
        "keywords": keywords,
        "linkCount": quantity,
        "strategy": strategy,
        "speed": speed,
        "dripDays": 14,
        "source": "openclaw-client"
    }
    
    try:
        print(f"\n📤 正在创建 campaign...")
        print(f"   目标: {target_url}")
        print(f"   品牌: {brand}")
        print(f"   数量: {quantity}")
        print(f"   策略: {strategy}")
        print(f"   速度: {speed}")
        print()
        
        response = requests.post(
            f"{BASE_URL}/create-campaign",
            headers=headers,
            json=data,
            timeout=30
        )
        
        result = response.json()
        
        if result.get('success'):
            campaign = result.get('campaign', {})
            campaign_id = campaign.get('id')
            
            print("✅ Campaign 创建成功！")
            print(f"   Campaign ID: {campaign_id}")
            print(f"   状态: {campaign.get('status')}")
            print(f"   创建时间: {campaign.get('createdAt')}")
            
            # 更新 memory 文件
            update_memory(result)
            
            return campaign_id
        else:
            error = result.get('error', 'Unknown error')
            print(f"❌ 创建失败: {error}")
            return None
            
    except Exception as e:
        print(f"❌ 请求异常: {str(e)}")
        return None


def get_campaign_status(campaign_id):
    """查询 campaign 状态"""
    api_key = load_config()
    if not api_key:
        print("❌ 请先配置 API Key: python signallayer_client.py --configure")
        return None
    
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    try:
        response = requests.get(
            f"{BASE_URL}/campaigns/{campaign_id}",
            headers=headers,
            timeout=15
        )
        
        result = response.json()
        
        if result.get('success'):
            campaign = result.get('campaign', {})
            progress = campaign.get('progress', {})
            
            print(f"\n📊 Campaign 状态查询结果:")
            print(f"   Campaign ID: {campaign_id}")
            print(f"   状态: {campaign.get('status')}")
            print(f"   进度: {progress.get('completed', 0)}/{progress.get('total', 0)}")
            print(f"   剩余: {progress.get('remaining', 0)}")
            print(f"   创建时间: {campaign.get('createdAt')}")
            print(f"   更新时间: {campaign.get('updatedAt')}")
            
            return campaign
        else:
            error = result.get('error', 'Unknown error')
            print(f"❌ 查询失败: {error}")
            return None
            
    except Exception as e:
        print(f"❌ 请求异常: {str(e)}")
        return None


def update_memory(result):
    """更新 memory 文件"""
    if not result or not result.get('success'):
        return
    
    campaign = result.get('campaign', {})
    
    # 读取现有内容
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
    else:
        content = "# SignalLayer API 配置\n\n## Campaign 记录\n\n"
    
    # 找到 ## Campaign 记录 部分并追加
    marker = "## Campaign 记录"
    if marker not in content:
        content += f"{marker}\n\n"
    else:
        content += "\n"
    
    # 提取下一个 Campaign 编号
    import re
    campaign_matches = re.findall(r'### Campaign #(\d+)', content)
    next_num = max([int(m) for m in campaign_matches], default=0) + 1
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M UTC")
    
    entry = f"""### Campaign #{next_num}
- **Campaign ID**: {campaign.get('id', 'N/A')}
- **目标**: {campaign.get('targetUrl', 'N/A')}
- **品牌**: {campaign.get('brandName', 'N/A')}
- **关键词**: {campaign.get('keywords', 'N/A')}
- **外链数量**: {campaign.get('linkCount', 'N/A')}
- **策略**: {campaign.get('strategy', 'N/A')}
- **速度**: {campaign.get('speed', 'N/A')}
- **状态**: {campaign.get('status', 'N/A')}
- **创建时间**: {timestamp}
"""
    
    content += entry
    
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        f.write(content)


def main():
    parser = argparse.ArgumentParser(
        description="SignalLayer Backlinks Client - 外链投放工具",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  python signallayer_client.py --configure
  python signallayer_client.py --target "https://example.com" --brand "Example" --keywords "test,example" --quantity 200
  python signallayer_client.py --status "campaign_id_here"
  python signallayer_client.py --list
        """
    )
    
    parser.add_argument('--configure', action='store_true', help='配置 API Key')
    parser.add_argument('--target', type=str, help='目标网站 URL')
    parser.add_argument('--brand', type=str, help='品牌名称')
    parser.add_argument('--keywords', type=str, help='关键词（逗号分隔）')
    parser.add_argument('--quantity', type=int, default=200, help='外链数量（默认 200）')
    parser.add_argument('--strategy', type=str, default='safety', choices=['safety', 'aggressive'], help='策略')
    parser.add_argument('--speed', type=str, default='drip', choices=['drip', 'instant'], help='速度')
    parser.add_argument('--status', type=str, help='查询 campaign 状态')
    parser.add_argument('--list', action='store_true', help='列出所有 campaign')
    
    args = parser.parse_args()
    
    # 配置模式
    if args.configure:
        configure()
        return
    
    # 列出 campaign
    if args.list:
        print("\n📋 读取 memory 文件中的 Campaign 记录...")
        print(f"文件位置: {CONFIG_FILE}")
        if os.path.exists(CONFIG_FILE):
            with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
                print(f.read())
        else:
            print("暂无记录。请先创建 campaign。")
        return
    
    # 查询状态
    if args.status:
        get_campaign_status(args.status)
        return
    
    # 创建 campaign
    if args.target and args.brand and args.keywords:
        create_campaign(
            args.target,
            args.brand,
            args.keywords,
            args.quantity,
            args.strategy,
            args.speed
        )
        return
    
    # 无参数
    parser.print_help()
    print("\n💡 提示: 首次使用请先运行 --configure 配置 API Key")


if __name__ == "__main__":
    main()
