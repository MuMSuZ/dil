// LocalStorage'dan kelime haznesini yükle
const wordBank = JSON.parse(localStorage.getItem('wordBank')) || [];

// DOM elementlerini seç
const wordListElement = document.getElementById('word-list');
const todayDateElement = document.getElementById('today-date');

// Bugünün tarihini al
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD formatı

// Tarihi ekrana yazdır
todayDateElement.textContent = `Bugün: ${today}`;

// Bugünün kelimelerini filtrele
const todayWords = wordBank.filter(entry => entry.date === today);

// Kelimeleri ekrana yazdırma
function displayWords() {
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
}

// Sayfa yüklendiğinde kelimeleri göster
displayWords();
