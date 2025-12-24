#!/bin/bash

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 在庫管理アプリ - セットアップスクリプト${NC}\n"

# Docker確認
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker がインストールされていません。${NC}"
    echo "https://www.docker.com/products/docker-desktop からインストールしてください。"
    exit 1
fi

echo -e "${GREEN}✓ Docker がインストールされています${NC}"

# Docker Daemon確認
if ! docker info > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠ Docker Daemon が起動していません。起動してください...${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open /Applications/Docker.app
        sleep 5
    fi
fi

# docker-compose確認
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}✗ Docker Compose がインストールされていません。${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker Compose がインストールされています${NC}\n"

# コンテナ起動
echo -e "${YELLOW}📦 コンテナを起動しています...${NC}"
docker-compose up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ コンテナの起動に成功しました！${NC}\n"
    
    echo -e "${YELLOW}⏳ データベースが起動するまで待機中...${NC}"
    sleep 10
    
    echo -e "\n${GREEN}✓ セットアップ完了！${NC}\n"
    
    echo -e "${YELLOW}📍 アクセス先:${NC}"
    echo -e "  🌐 フロントエンド: ${GREEN}http://localhost:3000${NC}"
    echo -e "  🔌 バックエンド: ${GREEN}http://localhost:5000${NC}"
    echo -e "  📊 データベース: ${GREEN}localhost:3306${NC}\n"
    
    echo -e "${YELLOW}📝 よく使うコマンド:${NC}"
    echo -e "  ログ確認: ${GREEN}docker-compose logs -f${NC}"
    echo -e "  停止: ${GREEN}docker-compose down${NC}"
    echo -e "  再起動: ${GREEN}docker-compose restart${NC}"
    echo -e "  リセット: ${GREEN}docker-compose down -v${NC}\n"
    
else
    echo -e "${RED}✗ コンテナの起動に失敗しました。${NC}"
    echo -e "${YELLOW}詳細はログを確認してください:${NC}"
    docker-compose logs
    exit 1
fi

