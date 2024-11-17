const API_URL = 'http://localhost:3000'; // Node.js API URL'si

// DOM elementlerini seç
const wordListElement = document.getElementById('word-list');
const todayDateElement = document.getElementById('today-date');

// Bugünün tarihini al ve ekrana yazdır
const today = new Date().toISOString().split('T')[0];
todayDateElement.textContent = `Bugün: ${today}`;

// API'den bugünün kelimelerini al ve ekrana yazdır
async function loadTodayWords() {
  try {
    const response = await fetch(`${API_URL}/words/today`);
    const todayWords = await response.json();

    if (todayWords.length === 0) {
      wordListElement.innerHTML = '<li>Bugün hiç kelime eklenmedi.</li>';
    } else {
      wordListElement.innerHTML = ''; // Mevcut listeyi temizle

      todayWords.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.word} - ${entry.translation}`;
        wordListElement.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error('Bugünün kelimeleri yüklenirken hata oluştu:', error);
    wordListElement.innerHTML = '<li>Kelime listesi yüklenemedi. Lütfen daha sonra tekrar deneyin.</li>';
  }
}

// Sayfa yüklendiğinde kelimeleri göster
loadTodayWords();
