const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); // File System modülü
const FILE_PATH = 'words.json'; // Kelimelerin kaydedileceği JSON dosyası
const { Pool } = require('pg'); // PostgreSQL için pg modülü

const app = express();

// Render için dinamik port, yerelde 3000
const PORT = process.env.PORT || 3000;

// PostgreSQL bağlantısı
const pool = new Pool({
  connectionString: 'postgresql://kelime_user:y271BQ2qtzZfWgaKSX3TuNmvZtl1wvfN@dpg-csubk28gph6c7389bj40-a/kelime',
  ssl: {
    rejectUnauthorized: false, // Render için SSL doğrulamasını devre dışı bırak
  },
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Tüm Kelimeleri Listele (GET /words)
app.get('/words', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM words'); // Veritabanından kelimeleri çek
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
      'INSERT INTO words (word, translation, date) VALUES ($1, $2, $3)', // Kelimeyi ekle
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
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD formatı
  try {
    const result = await pool.query(
      'SELECT * FROM words WHERE date = $1', // Bugünün tarihine göre filtrele
      [today]
    );
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
