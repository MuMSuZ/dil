// LocalStorage'dan kelime haznesini yükle
const wordBank = JSON.parse(localStorage.getItem('wordBank')) || [];

// DOM elementlerini seç
const testWordElement = document.getElementById('test-word');
const answerInput = document.getElementById('answer');
const checkAnswerButton = document.getElementById('check-answer');
const feedbackElement = document.getElementById('feedback');
const newWordButton = document.getElementById('new-word');

let currentWord = null;

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

// Sayfa yüklendiğinde testi başlat
startTest();
