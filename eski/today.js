const API_URL = 'https://kelime-api.onrender.com'; // Render'daki API URL'n

async function loadTodayWords() {
  try {
    const response = await fetch(`${API_URL}/words/today`);
    const todayWords = await response.json();

    const wordListElement = document.getElementById('word-list');
    wordListElement.innerHTML = todayWords.length
      ? todayWords.map(word => `<li>${word.word} - ${word.translation}</li>`).join('')
      : '<li>Bugün hiç kelime eklenmedi.</li>';
  } catch (error) {
    alert('Bugünün kelimeleri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    console.error(error);
  }
}

// Sayfa yüklendiğinde kelimeleri yükle
loadTodayWords();
