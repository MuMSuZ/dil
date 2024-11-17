const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); // File System modülü
const FILE_PATH = 'words.json'; // Kelimelerin kaydedileceği JSON dosyası

const app = express();
// Render için dinamik port kullanımı, yerelde 3000 olarak ayarlanır
const PORT = process.env.PORT || 3000;

// Bellekteki kelime listesi
let words = [];

// Sunucu Başlangıcında JSON Dosyasını Yükle
if (fs.existsSync(FILE_PATH)) {
  const fileData = fs.readFileSync(FILE_PATH, 'utf-8'); // Dosyayı oku
  words = JSON.parse(fileData); // JSON olarak ayrıştır
} else {
  words = []; // Dosya yoksa boş bir diziyle başla
}

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Tüm Kelimeleri Listele (GET /words)
app.get('/words', (req, res) => {
  res.json(words);
});

// Yeni Kelime Ekle (POST /words)
app.post('/words', (req, res) => {
  const { word, translation, date } = req.body;

  if (!word || !translation || !date) {
    return res.status(400).json({ message: 'Tüm alanlar gereklidir.' });
  }

  // Yeni kelimeyi listeye ekle
  words.push({ word, translation, date });

  // JSON dosyasını güncelle
  fs.writeFileSync(FILE_PATH, JSON.stringify(words, null, 2), 'utf-8');

  res.status(201).json({ message: 'Kelime eklendi.' });
});

// Bugünkü Kelimeleri Getir (GET /words/today)
app.get('/words/today', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const todayWords = words.filter(word => word.date === today);

  res.json(todayWords);
});

// Sunucuyu Başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} üzerinde çalışıyor.`);
});
