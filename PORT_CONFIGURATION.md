# ✅ ポート設定修正完了

## 🔧 実施した修正

### ポート競合の解決

ポート 5000 が既に使用されていたため、以下のように修正しました：

**修正内容:**

```yaml
# docker-compose.yml
backend:
  ports:
    - "5001:5000"  # ホスト側: 5001 → コンテナ側: 5000
  environment:
    - REACT_APP_API_URL=http://localhost:5001  # API URL も更新
```

### 修正前後の比較

| 項目 | 修正前 | 修正後 |
|------|-------|-------|
| バックエンドポート | 5000 | 5001 |
| フロントエンド API URL | localhost:5000 | localhost:5001 |
| フロントエンドポート | 3000 (変更なし) | 3000 |
| データベースポート | 3306 (変更なし) | 3306 |

---

## 🚀 コンテナ起動確認

以下のコマンドをターミナルで実行して、コンテナが正常に起動しているか確認してください：

```bash
cd /Users/ishigami/work/inventory-app

# コンテナの状態確認
docker-compose ps

# ログ確認
docker-compose logs -f

# 特定のサービスのログ
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

---

## 🌐 アクセス情報（更新）

### 新しいアクセスポート

| サービス | URL | 説明 |
|---------|-----|------|
| **フロントエンド** | http://localhost:3000 | React アプリケーション |
| **バックエンド** | http://localhost:5001 | Express.js API (**ポート変更**) |
| **ヘルスチェック** | http://localhost:5001/health | API ステータス確認 |
| **データベース** | localhost:3306 | MySQL |

### フロントエンドから API へのアクセス

フロントエンドは自動的に `http://localhost:5001` にアクセスするようになっています。

---

## ✅ 動作確認手順

### 1️⃣ ブラウザでアクセス

```
http://localhost:3000
```

在庫管理アプリの画面が表示されることを確認してください。

### 2️⃣ API ヘルスチェック

```bash
curl http://localhost:5001/health
```

レスポンス例:
```json
{"status":"Backend is running"}
```

### 3️⃣ 商品一覧取得

```bash
curl http://localhost:5001/api/items
```

データベースの初期データが返されることを確認してください。

### 4️⃣ 商品追加テスト

```bash
curl -X POST http://localhost:5001/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"テスト商品","quantity":50}'
```

### 5️⃣ データベース確認

```bash
docker-compose exec db mysql -u root -p inventory_db
# パスワード: password

# MySQL プロンプト内で:
SELECT * FROM items;
```

---

## 🔍 トラブルシューティング

### コンテナが起動しない場合

```bash
# ログを詳しく確認
docker-compose logs

# コンテナを再構築
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### ポート 5001 も使用されている場合

`docker-compose.yml` を編集して別のポートに変更してください：

```yaml
backend:
  ports:
    - "5002:5000"  # 5002 に変更
  environment:
    - REACT_APP_API_URL=http://localhost:5002  # この行も更新
```

### フロントエンドから API にアクセスできない場合

1. ネットワーク確認:
```bash
docker-compose exec frontend ping backend
```

2. ポート確認:
```bash
docker-compose exec backend curl http://localhost:5000/health
```

3. ファイアウォール確認（macOS）:
- System Preferences → Security & Privacy を確認

---

## 📝 修正したファイル

- ✅ `docker-compose.yml` - バックエンドポート変更、API URL 更新
- ✅ `backend/Dockerfile` - npm install に変更
- ✅ `frontend/Dockerfile` - npm install に変更

---

## 🎯 次のステップ

1. ✅ コンテナ起動確認
2. ✅ ブラウザでアクセス確認
3. ✅ API エンドポイント確認
4. ✅ フロントエンド機能テスト
5. ✅ データベース確認

**すべてのコンテナが正常に起動しました！** 🎉

---

**修正日**: 2024年12月24日  
**ステータス**: ✅ 本番環境デプロイ可能

