const API_URL = 'https://kelime-api.onrender.com'; // Render'daki API URL'n

async function loadAllWords() {
  try {
    const response = await fetch(`${API_URL}/words`); // Tüm kelimeleri çek
    if (!response.ok) {
      throw new Error(`API Hatası: ${response.status}`);
    }

    const wordBank = await response.json(); // JSON veriyi çöz
    const wordListElement = document.getElementById('word-list');

    // Listeyi güncelle
    wordListElement.innerHTML = wordBank.length
      ? wordBank.map(word => `<li>${word.word} - ${word.translation}</li>`).join('')
      : '<li>Hiç kelime eklenmedi.</li>';
  } catch (error) {
    console.error('Kelime listesi yüklenirken bir hata oluştu:', error);
    alert('Tüm kelimeler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
  }
}

// Sayfa yüklendiğinde tüm kelimeleri yükle
loadAllWords();
