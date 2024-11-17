const API_URL = 'https://kelime-api.onrender.com'; // Render'daki API URL'n

async function loadAllWords() {
  try {
    const response = await fetch(`${API_URL}/words`);
    const wordBank = await response.json();

    const wordListElement = document.getElementById('word-list');
    wordListElement.innerHTML = wordBank.length
      ? wordBank.map(word => `<li>${word.word} - ${word.translation}</li>`).join('')
      : '<li>Hiç kelime eklenmedi.</li>';
  } catch (error) {
    alert('Tüm kelimeler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    console.error(error);
  }
}

// Sayfa yüklendiğinde tüm kelimeleri yükle
loadAllWords();
