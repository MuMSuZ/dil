// LocalStorage'dan kelime haznesini yükle
let wordBank = JSON.parse(localStorage.getItem('wordBank')) || [];

// DOM elementlerini seç
const wordInput = document.getElementById('word');
const translationInput = document.getElementById('translation');
const addWordButton = document.getElementById('add-word');

// Yeni kelime ekleme
addWordButton.addEventListener('click', () => {
  const word = wordInput.value.trim();
  const translation = translationInput.value.trim();
  const today = new Date().toISOString().split('T')[0]; // Tarihi al (YYYY-MM-DD formatı)

  if (word && translation) {
    // Kelimeyi kelime haznesine ekle
    wordBank.push({ word, translation, date: today });

    // LocalStorage'a kaydet
    localStorage.setItem('wordBank', JSON.stringify(wordBank));

    alert(`Kelime eklendi: ${word} - ${translation}`);
    wordInput.value = '';
    translationInput.value = '';
  } else {
    alert('Lütfen her iki alanı doldurun!');
  }
});
