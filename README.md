# 在庫管理アプリ

Dockerを使用したフルスタック在庫管理アプリケーションです。最新のNode.js LTS、React、Expressで構築されています。

## 🚀 特徴

- **モダンなスタック**: React 18、Express 4、MySQL 8
- **Docker対応**: Docker Composeで簡単にセットアップ
- **レスポンシブUI**: モバイル対応のモダンなデザイン
- **REST API**: Express.jsで構築された完全なREST API
- **データベース**: MySQLで信頼性の高いデータ管理

## 📋 プロジェクト構成

```
inventory-app/
├── frontend/          # React フロントエンド
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── backend/           # Express バックエンド
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── db/               # データベース
│   └── init.sql
└── docker-compose.yml
```

## 🛠️ セットアップ方法

### 前提条件

- Docker
- Docker Compose

### インストール

1. プロジェクトをクローン/コピー

```bash
cd inventory-app
```

2. Dockerコンテナを起動

```bash
docker-compose up -d
```

3. ブラウザでアクセス

```
http://localhost:3000
```

### 停止方法

```bash
docker-compose down
```

### ボリューム含めて削除

```bash
docker-compose down -v
```

## 🔌 API エンドポイント

### ヘルスチェック

```
GET /health
```

### 商品一覧取得

```
GET /api/items
```

レスポンス例:
```json
[
  {
    "id": 1,
    "name": "商品A",
    "quantity": 100,
    "created_at": "2024-12-24T00:00:00.000Z",
    "updated_at": "2024-12-24T00:00:00.000Z"
  }
]
```

### 商品作成

```
POST /api/items
Content-Type: application/json

{
  "name": "新しい商品",
  "quantity": 50
}
```

### 商品更新

```
PUT /api/items/:id
Content-Type: application/json

{
  "name": "更新された商品名",
  "quantity": 75
}
```

### 商品削除

```
DELETE /api/items/:id
```

## 📦 使用技術バージョン

### フロントエンド
- **Node.js**: 20 LTS (Alpine)
- **React**: 18.3.1
- **React DOM**: 18.3.1
- **Axios**: 1.7.7
- **React Scripts**: 5.0.1

### バックエンド
- **Node.js**: 20 LTS (Alpine)
- **Express**: 4.21.0
- **MySQL2**: 3.11.0
- **CORS**: 2.8.5
- **Nodemon**: 3.1.4 (開発用)

### データベース
- **MySQL**: 8.0

## 💻 開発

### ログの確認

```bash
# すべてのサービスのログ
docker-compose logs -f

# 特定のサービスのログ
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### コンテナへのアクセス

```bash
# バックエンドコンテナへのアクセス
docker-compose exec backend sh

# フロントエンドコンテナへのアクセス
docker-compose exec frontend sh

# データベースコンテナへのアクセス
docker-compose exec db bash
```

### データベースへの接続

```bash
docker-compose exec db mysql -u root -p inventory_db
# パスワード: password
```

## 🐛 トラブルシューティング

### ポートが既に使用されている

ポート3000（フロントエンド）、5000（バックエンド）、3306（DB）が既に使用されている場合は、`docker-compose.yml`を編集して別のポートを指定してください。

### データベース接続エラー

コンテナのヘルスチェックが通るまで待ってください。

```bash
docker-compose logs db
```

### モジュールのインストール失敗

キャッシュをクリアして再度ビルドしてください：

```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 📝 ライセンス

MIT

# inventory-app
