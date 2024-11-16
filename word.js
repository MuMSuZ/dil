// LocalStorage'dan kelime haznesini yükle
const wordBank = JSON.parse(localStorage.getItem('wordBank')) || [];

// DOM elementlerini seç
const wordListElement = document.getElementById('word-list');

// Kelimeleri ekrana yazdırma
function displayWords() {
  wordListElement.innerHTML = ''; // Mevcut listeyi temizle

  wordBank.forEach((entry, index) => {
    const listItem = document.createElement('li');

    listItem.textContent = `${entry.word} - ${entry.translation}`;
    wordListElement.appendChild(listItem);
  });
}

// Sayfa yüklendiğinde kelimeleri göster
displayWords();
