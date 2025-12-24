.PHONY: help setup up down logs stop restart clean db-shell backend-shell frontend-shell build pull

help:
	@echo "📦 在庫管理アプリ - Makefile コマンド"
	@echo ""
	@echo "セットアップ:"
	@echo "  make setup          初期セットアップ（Docker起動、コンテナ構築）"
	@echo ""
	@echo "コンテナ操作:"
	@echo "  make up             コンテナを起動"
	@echo "  make down           コンテナを停止"
	@echo "  make stop           コンテナを一時停止"
	@echo "  make restart        コンテナを再起動"
	@echo "  make clean          コンテナを削除（ボリュームは保持）"
	@echo "  make clean-all      コンテナと全ボリュームを削除"
	@echo ""
	@echo "ログ・デバッグ:"
	@echo "  make logs           全サービスのログを表示"
	@echo "  make db-shell       DBコンテナのシェルにアクセス"
	@echo "  make backend-shell  バックエンドのシェルにアクセス"
	@echo "  make frontend-shell フロントエンドのシェルにアクセス"
	@echo ""
	@echo "ビルド:"
	@echo "  make build          イメージをビルド"
	@echo "  make pull           外部イメージをプル"

setup: pull build up
	@echo "✅ セットアップ完了！"
	@echo "🌐 ブラウザで http://localhost:3000 にアクセスしてください"

up:
	@echo "🚀 コンテナを起動中..."
	docker-compose up -d
	@echo "✅ 起動完了"

down:
	@echo "🛑 コンテナを停止中..."
	docker-compose down
	@echo "✅ 停止完了"

stop:
	@echo "⏸  コンテナを一時停止中..."
	docker-compose stop
	@echo "✅ 一時停止完了"

restart:
	@echo "🔄 コンテナを再起動中..."
	docker-compose restart
	@echo "✅ 再起動完了"

clean:
	@echo "🗑  コンテナを削除中..."
	docker-compose down
	@echo "✅ 削除完了"

clean-all:
	@echo "🗑  コンテナとボリュームを削除中..."
	docker-compose down -v
	@echo "✅ 削除完了"

logs:
	docker-compose logs -f

db-shell:
	docker-compose exec db bash

backend-shell:
	docker-compose exec backend sh

frontend-shell:
	docker-compose exec frontend sh

build:
	@echo "🔨 イメージをビルド中..."
	docker-compose build
	@echo "✅ ビルド完了"

pull:
	@echo "📥 外部イメージをプル中..."
	docker pull node:20-alpine
	docker pull mysql:8.0
	@echo "✅ プル完了"

