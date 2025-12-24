#!/bin/bash

# カラー定義
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}   在庫管理アプリ - バージョン情報${NC}"
echo -e "${BLUE}================================================${NC}\n"

echo -e "${YELLOW}📦 システムバージョン:${NC}"
echo -e "  Docker: $(docker --version 2>/dev/null || echo 'インストール未了')"
echo -e "  Docker Compose: $(docker-compose --version 2>/dev/null || echo 'インストール未了')\n"

echo -e "${YELLOW}🐳 Dockerイメージバージョン:${NC}"
docker images | grep -E "node|mysql" | awk '{printf "  %s:%s\n", $1, $2}' || echo "  イメージが存在しません"

echo -e "\n${YELLOW}📋 プロジェクト依存関係:${NC}\n"

echo -e "${GREEN}フロントエンド (frontend/package.json):${NC}"
if [ -f "frontend/package.json" ]; then
    cat frontend/package.json | grep -A 10 '"dependencies"' | grep -E '^\s+"[^"]+":' | sed 's/^/  /'
else
    echo "  ファイルが見つかりません"
fi

echo -e "\n${GREEN}バックエンド (backend/package.json):${NC}"
if [ -f "backend/package.json" ]; then
    cat backend/package.json | grep -A 10 '"dependencies"' | grep -E '^\s+"[^"]+":' | sed 's/^/  /'
else
    echo "  ファイルが見つかりません"
fi

echo -e "\n${YELLOW}🗄️  データベース設定:${NC}"
echo -e "  MySQL Image: mysql:8.0"
echo -e "  Host: localhost"
echo -e "  Port: 3306"
echo -e "  Database: inventory_db"
echo -e "  User: root\n"

echo -e "${YELLOW}🌐 サービスポート:${NC}"
echo -e "  フロントエンド: localhost:3000"
echo -e "  バックエンド: localhost:5000"
echo -e "  データベース: localhost:3306\n"

echo -e "${GREEN}✅ 準備完了！${NC}"
echo -e "セットアップを開始するには:"
echo -e "  ${BLUE}./setup.sh${NC} または ${BLUE}make setup${NC} を実行してください\n"

