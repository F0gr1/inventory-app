const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 5000;

// ミドルウェア
app.use(cors());
app.use(express.json());

// MySQL接続プール設定
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'inventory_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// エラーハンドリング
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 商品一覧取得（DBから）
app.get('/api/items', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM items ORDER BY id DESC');
    connection.release();
    console.log('Items fetched successfully:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// 商品登録（新規作成）
app.post('/api/items', async (req, res) => {
  try {
    const { name, quantity } = req.body;

    // バリデーション
    if (!name || quantity === undefined) {
      return res.status(400).json({ error: 'Name and quantity are required' });
    }

    const connection = await pool.getConnection();
    
    // 商品名が既に存在するか確認
    const [existing] = await connection.query('SELECT * FROM items WHERE name = ?', [name]);
    if (existing.length > 0) {
      connection.release();
      return res.status(409).json({ error: 'Item name already exists' });
    }

    // 新規商品を登録
    const [result] = await connection.query(
      'INSERT INTO items (name, quantity) VALUES (?, ?)',
      [name, Number(quantity)]
    );
    
    connection.release();
    
    console.log('Item created successfully:', { id: result.insertId, name, quantity });
    res.status(201).json({
      id: result.insertId,
      name: name,
      quantity: Number(quantity),
      message: 'Item created successfully'
    });

  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// サーバー起動
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

