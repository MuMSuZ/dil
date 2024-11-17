const API_URL = 'https://kelime-api.onrender.com'; // Render'daki API URL'n

// DOM elementlerini seç
const testWordElement = document.getElementById('test-word');
const answerInput = document.getElementById('answer');
const checkAnswerButton = document.getElementById('check-answer');
const feedbackElement = document.getElementById('feedback');
const newWordButton = document.getElementById('new-word');

let wordBank = [];
let currentWord = null;

// API'den kelimeleri yükle
async function loadWordsFromAPI() {
  try {
    const response = await fetch(`${API_URL}/words`);
    wordBank = await response.json();

    if (wordBank.length === 0) {
      alert('Kelime haznesi boş! Lütfen önce kelime ekleyin.');
    } else {
      startTest(); // Kelimeler yüklendiğinde testi başlat
    }
  } catch (error) {
    console.error('Kelimeler yüklenirken hata oluştu:', error);
    alert('Kelimeler API\'den yüklenemedi. Sunucu çalışıyor mu?');
  }
}

// Rastgele bir kelime seçme
function getRandomWord() {
  if (wordBank.length === 0) {
    alert('Kelime haznesi boş! Lütfen önce kelime ekleyin.');
    return null;
  }
  return wordBank[Math.floor(Math.random() * wordBank.length)];
}

// Testi başlat
function startTest() {
  currentWord = getRandomWord();
  if (currentWord) {
    testWordElement.textContent = `Kelime: ${currentWord.word}`;
    feedbackElement.textContent = '';
    feedbackElement.className = ''; // Feedback rengini sıfırla
    answerInput.value = '';
  }
}

// Cevabı kontrol et
checkAnswerButton.addEventListener('click', () => {
  if (!currentWord) {
    alert('Test için önce kelime ekleyin!');
    return;
  }

  const userAnswer = answerInput.value.trim();
  if (userAnswer.toLowerCase() === currentWord.translation.toLowerCase()) {
    feedbackElement.textContent = 'Doğru!';
    feedbackElement.className = 'correct';
  } else {
    feedbackElement.textContent = `Yanlış! Doğru cevap: ${currentWord.translation}`;
    feedbackElement.className = 'wrong';
  }
});

// Yeni kelime testi başlat
newWordButton.addEventListener('click', startTest);

// Sayfa yüklendiğinde API'den kelimeleri yükle ve testi başlat
loadWordsFromAPI();
