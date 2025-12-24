# バージョン更新情報

このドキュメントでは、在庫管理アプリの最新化について説明します。

## 🔄 更新されたバージョン

### 旧バージョン（質問時点）
- Node.js: 18系
- React: 旧バージョン
- Express: 4.18.2
- MySQL2: 3.9.0
- Nodemon: 3.0.2

### 新バージョン（現在）
- **Node.js: 20 LTS** ✅
- **React: 18.3.1** ✅
- **Express: 4.21.0** ✅ (+0.3.0)
- **MySQL2: 3.11.0** ✅ (+0.2.0)
- **Nodemon: 3.1.4** ✅ (+0.1.2)
- **React Scripts: 5.0.1** ✅ (新規追加)
- **Axios: 1.7.7** ✅ (新規追加)

## 📝 変更内容

### 1. Dockerfile最適化

**フロントエンド & バックエンド**
- ベースイメージをNode 18からNode 20 Alpine版に更新
- `npm install`を`npm ci`に変更（より安定したインストール）

```dockerfile
FROM node:20-alpine
# ... (詳細はDockerfileを参照)
```

### 2. パッケージ更新

#### バックエンド (`backend/package.json`)
- Express: 4.18.2 → 4.21.0
- MySQL2: 3.9.0 → 3.11.0
- Nodemon: 3.0.2 → 3.1.4
- CORSはそのまま (最新版)

#### フロントエンド (`frontend/package.json`)
- React: 18.3.1 (LTS)
- React DOM: 18.3.1
- React Scripts: 5.0.1
- Axios: 1.7.7 (HTTP通信用)

### 3. Docker Compose改善

- Node環境変数の追加
- ヘルスチェック機能の追加（DB起動確認）
- フロントエンド用環境変数の設定

```yaml
healthcheck:
  test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
  timeout: 20s
  retries: 10
```

### 4. バックエンド機能追加

**Express.js アプリケーション** (`backend/src/index.js`)
- ✅ Connection Pool対応
- ✅ 非同期処理（async/await）
- ✅ 適切なエラーハンドリング
- ✅ CORS設定
- ✅ 全CRUD操作のAPI
- ✅ バリデーション

**API エンドポイント:**
- `GET /health` - ヘルスチェック
- `GET /api/items` - 商品一覧
- `POST /api/items` - 商品作成
- `PUT /api/items/:id` - 商品更新
- `DELETE /api/items/:id` - 商品削除

### 5. フロントエンド実装

**React コンポーネント** (`frontend/src/App.js`)
- ✅ React Hooks（useState, useEffect）
- ✅ Axios による API通信
- ✅ エラーハンドリング
- ✅ ローディング状態管理
- ✅ インラインエディット機能
- ✅ 日本語UI

**スタイリング** (`frontend/src/App.css`)
- ✅ モダンなグラデーションデザイン
- ✅ レスポンシブレイアウト
- ✅ ダークモードに適したカラースキーム
- ✅ アクセシビリティ対応

## 🚀 セットアップ手順

### 前提条件
- Docker Desktop がインストール済み
- Docker Daemon が起動していること

### ステップ1: Dockerを起動

```bash
# macOSの場合
open /Applications/Docker.app
```

### ステップ2: プロジェクトディレクトリへ移動

```bash
cd /Users/ishigami/work/inventory-app
```

### ステップ3: コンテナを起動

```bash
docker-compose up -d
```

### ステップ4: サービスが起動するまで待機

```bash
# ログで確認
docker-compose logs -f db
```

データベースのヘルスチェックが成功したら、次のステップへ。

### ステップ5: アプリケーションにアクセス

- **フロントエンド**: http://localhost:3000
- **バックエンド API**: http://localhost:5000/api/items
- **ヘルスチェック**: http://localhost:5000/health

## 📊 MySQL データベース接続

```bash
docker-compose exec db mysql -u root -p inventory_db
# パスワード: password
```

**初期テーブル:**
- `items` テーブル
  - id (INT, PRIMARY KEY, AUTO_INCREMENT)
  - name (VARCHAR, UNIQUE)
  - quantity (INT)
  - created_at (DATETIME)
  - updated_at (DATETIME)

**初期データ:**
- 商品A (数量: 100)
- 商品B (数量: 50)
- 商品C (数量: 200)

## 🛑 停止方法

```bash
# コンテナを停止
docker-compose stop

# コンテナを削除
docker-compose down

# ボリュームを含めて削除（DB データもクリア）
docker-compose down -v
```

## 🔍 トラブルシューティング

### Docker Daemon が起動していない

```bash
# macOS の場合
open /Applications/Docker.app

# Linuxの場合
sudo systemctl start docker

# Windows の場合
# Docker Desktop を起動
```

### ポートが既に使用されている

**ポート確認:**
```bash
# 3000番ポート
lsof -i :3000

# 5000番ポート
lsof -i :5000

# 3306番ポート
lsof -i :3306
```

**解決方法:** `docker-compose.yml` で別のポートを指定

```yaml
ports:
  - "3001:3000"  # 3000 → 3001
```

### データベース接続エラー

```bash
# DBコンテナのログ確認
docker-compose logs db

# DBコンテナを再起動
docker-compose restart db
```

## 📦 ファイル構成

```
inventory-app/
├── docker-compose.yml         # Docker設定
├── README.md                   # メインREADME
├── VERSION_UPDATES.md          # このファイル
├── .gitignore
├──
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json           # React + Axios
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js           # ReactDOM root
│       ├── index.css          # グローバルスタイル
│       ├── App.js             # メインコンポーネント
│       └── App.css            # コンポーネントスタイル
│
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json           # Express + MySQL2
│   └── src/
│       └── index.js           # Express サーバー
│
└── db/
    └── init.sql               # テーブル定義・初期データ
```

## 💡 LTS バージョンについて

- **Node.js 20**: LTS版で2026年4月までサポート
- **React 18**: 安定版でプロダクション環境に最適
- **Express 4**: 業界標準で継続的にメンテナンス中

これらのバージョンは、セキュリティパッチが提供され、安定性と互換性が保証されています。

---

**最終更新**: 2024年12月24日
**バージョン**: 1.0.0

