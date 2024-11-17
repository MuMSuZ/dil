const API_URL = 'http://localhost:3000'; // Node.js API URL'si

// DOM elementlerini seç
const wordListElement = document.getElementById('word-list');

// API'den tüm kelimeleri al ve ekrana yazdır
async function loadAllWords() {
  try {
    const response = await fetch(`${API_URL}/words`); // Tüm kelimeleri al
    const wordBank = await response.json();

    wordListElement.innerHTML = ''; // Mevcut listeyi temizle

    if (wordBank.length === 0) {
      wordListElement.innerHTML = '<li>Hiç kelime eklenmedi.</li>';
    } else {
      wordBank.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.word} - ${entry.translation}`;
        wordListElement.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error('Kelimeler yüklenirken hata oluştu:', error);
    wordListElement.innerHTML = '<li>Kelime listesi yüklenemedi. Lütfen daha sonra tekrar deneyin.</li>';
  }
}

// Sayfa yüklendiğinde tüm kelimeleri göster
loadAllWords();
