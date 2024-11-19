const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); // PostgreSQL bağlantısı için

const app = express();

// Render için dinamik port
const PORT = process.env.PORT || 3000;

// PostgreSQL bağlantısı
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Render'da SSL'i etkinleştirmek için
  },
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Tüm Kelimeleri Listele (GET /words)
app.get('/words', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM words');
    res.json(result.rows);
  } catch (error) {
    console.error('Veritabanı hatası:', error);
    res.status(500).json({ message: 'Veritabanından kelimeler alınamadı.' });
  }
});

// Yeni Kelime Ekle (POST /words)
app.post('/words', async (req, res) => {
  const { word, translation, date } = req.body;

  if (!word || !translation || !date) {
    return res.status(400).json({ message: 'Tüm alanlar gereklidir.' });
  }

  try {
    await pool.query(
      'INSERT INTO words (word, translation, date) VALUES ($1, $2, $3)',
      [word, translation, date]
    );
    res.status(201).json({ message: 'Kelime eklendi.' });
  } catch (error) {
    console.error('Veritabanı hatası:', error);
    res.status(500).json({ message: 'Kelime eklenirken bir hata oluştu.' });
  }
});

// Bugünkü Kelimeleri Getir (GET /words/today)
app.get('/words/today', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const result = await pool.query('SELECT * FROM words WHERE date = $1', [today]);
    res.json(result.rows);
  } catch (error) {
    console.error('Veritabanı hatası:', error);
    res.status(500).json({ message: 'Bugünkü kelimeler alınamadı.' });
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
