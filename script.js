// LocalStorage'dan kelime haznesini yükle
let wordBank = JSON.parse(localStorage.getItem('wordBank')) || [];

// DOM elementlerini seç
const wordInput = document.getElementById('word');
const translationInput = document.getElementById('translation');
const addWordButton = document.getElementById('add-word');
const wordListElement = document.getElementById('word-list');

// Kelimeleri ekrana yazdırma
function displayWords() {
  wordListElement.innerHTML = ''; // Mevcut listeyi temizle

  wordBank.forEach((entry, index) => {
    const listItem = document.createElement('li');

    listItem.innerHTML = `
      <span>${entry.word} - ${entry.translation}</span>
      <button onclick="deleteWord(${index})">Sil</button>
    `;

    wordListElement.appendChild(listItem);
  });
}

// Yeni kelime ekleme
addWordButton.addEventListener('click', () => {
  const word = wordInput.value.trim();
  const translation = translationInput.value.trim();

  if (word && translation) {
    // Kelimeyi kelime haznesine ekle
    wordBank.push({ word, translation });

    // LocalStorage'a kaydet
    localStorage.setItem('wordBank', JSON.stringify(wordBank));

    // Listeyi güncelle
    displayWords();

    // Giriş kutularını temizle
    wordInput.value = '';
    translationInput.value = '';
  } else {
    alert('Lütfen her iki alanı doldurun!');
  }
});

// Kelime silme
function deleteWord(index) {
  // Kelimeyi diziden çıkar
  wordBank.splice(index, 1);

  // LocalStorage'ı güncelle
  localStorage.setItem('wordBank', JSON.stringify(wordBank));

  // Listeyi güncelle
  displayWords();
}

// Sayfa yüklendiğinde kelimeleri göster
displayWords();
