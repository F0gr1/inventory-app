# 🚀 在庫管理アプリ - クイックセットアップ

## ⚠️ 重要: Docker権限エラーが発生した場合

Docker Daemon の権限問題が発生している場合は、以下の対応をしてください。

### macOS での対応

#### 方法1: Docker Desktop を再起動

```bash
# Docker Desktop を終了
killall Docker

# Docker Desktop を再起動
open /Applications/Docker.app

# 少し待機してから再度試行
sleep 10
docker-compose up -d
```

#### 方法2: Docker のリセット

1. Docker Desktop を開く
2. 設定 → トラブルシューティング → リセット を選択
3. Docker Desktop を再起動
4. 以下を実行:

```bash
cd /Users/ishigami/work/inventory-app
docker-compose up -d
```

#### 方法3: Docker buildx の再初期化

```bash
# buildx ビルダーをリセット
docker buildx create --reset

# 再度ビルド
cd /Users/ishigami/work/inventory-app
docker-compose build --no-cache
docker-compose up -d
```

---

## 🎯 正常にセットアップされた場合

Docker が正常に動作している場合は、以下の手順でセットアップしてください：

### ステップ1: セットアップスクリプトを実行

```bash
cd /Users/ishigami/work/inventory-app
./setup.sh
```

### ステップ2: 起動確認

```bash
# ログを確認
docker-compose logs -f

# Ctrl+C で終了
```

### ステップ3: ブラウザでアクセス

```
http://localhost:3000
```

---

## 🔍 トラブルシューティング

### Docker Daemon が起動していない場合

```bash
open /Applications/Docker.app
```

### "resource busy" エラーが出た場合

```bash
# 既存のコンテナを停止
docker-compose down -v

# 再度実行
docker-compose up -d
```

### ポート 3000/5000 が既に使用されている場合

```bash
# 使用しているプロセスを確認
lsof -i :3000
lsof -i :5000

# docker-compose.yml でポートを変更
# ports:
#   - "3001:3000"  # 3000 を 3001 に変更
```

---

## 📝 手動セットアップ（トラブル時）

Docker コンテナが起動できない場合は、以下の手順で手動セットアップしてください。

### フロントエンドの手動セットアップ

```bash
cd /Users/ishigami/work/inventory-app/frontend
npm install
npm start
# ブラウザで http://localhost:3000 にアクセス
```

### バックエンドの手動セットアップ

```bash
cd /Users/ishigami/work/inventory-app/backend
npm install
npm run dev
# サーバーは http://localhost:5000 で起動
```

### データベースの手動セットアップ

MySQL がローカルにインストールされている場合：

```bash
mysql -u root -p

# MySQL プロンプト内で:
CREATE DATABASE inventory_db;
USE inventory_db;
source /Users/ishigami/work/inventory-app/db/init.sql;
```

---

## ✅ セットアップ確認

すべてが正常に動作しているか確認するには：

```bash
# フロントエンド確認
curl http://localhost:3000

# バックエンド確認
curl http://localhost:5000/health

# データベース接続確認
docker-compose exec db mysql -u root -p inventory_db
# パスワード: password
```

---

**問題が解決しない場合は、各ログを確認してください:**

```bash
# 全ログ
docker-compose logs

# 特定のサービスのログ
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

