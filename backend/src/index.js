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



// 商品一覧取得（DBから）
app.get('/api/items', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM items ORDER BY id DESC');
    connection.release();
    console.log('Items fetched successfully:', rows);
    return res.json(rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    return res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// 商品登録（新規作成）
app.post('/api/items', async (req, res) => {
  try {
    const { name, quantity } = req.body;

    if (!name || quantity === undefined) {
      return res.status(400).json({ error: 'Name and quantity are required' });
    }

    const connection = await pool.getConnection();

    const [existing] = await connection.query(
      'SELECT * FROM items WHERE name = ?',
      [name]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(409).json({ error: 'Item name already exists' });
    }

    const [result] = await connection.query(
      'INSERT INTO items (name, quantity) VALUES (?, ?)',
      [name, Number(quantity)]
    );

    connection.release();

    return res.status(201).json({
      id: result.insertId,
      name,
      quantity: Number(quantity)
    });

  } catch (error) {
    console.error('Error creating item:', error);
    return res.status(500).json({ error: 'Failed to create item' });
  }
});

// 商品数量更新
app.patch('/api/items/:id/quantity', async (req, res) => {
  try {
    const id = req.params.id;
    const { quantity } = req.body;

    // 数量が記入されていないとき
    if (quantity === undefined) {
      return res.status(400).json({ error: 'quantity is required' });
    }

    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'UPDATE items SET quantity = ? WHERE id = ?',
      [quantity, id]
    );

    connection.release();

    // 該当データなし
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // 成功
    return res.status(200).json({
      message: 'Quantity updated successfully',
      id,
      quantity
    });

  } catch (error) {
    console.error('Error updating quantity:', error);
    return res.status(500).json({ error: 'Failed to update quantity' });
  }
});

// エラーハンドリング
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// サーバー起動
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

