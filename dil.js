// LocalStorage'dan kelime haznesini yükle
let wordBank = JSON.parse(localStorage.getItem('wordBank')) || [];

// DOM elementlerini seç
const wordInput = document.getElementById('word');
const translationInput = document.getElementById('translation');
const addWordButton = document.getElementById('add-word');
const quizWordElement = document.getElementById('quiz-word');
const answerInput = document.getElementById('answer');
const checkAnswerButton = document.getElementById('check-answer');
const feedbackElement = document.getElementById('feedback');

// Yeni kelime ekleme
addWordButton.addEventListener('click', () => {
  const word = wordInput.value.trim();
  const translation = translationInput.value.trim();

  if (word && translation) {
    // Kelimeyi kelime haznesine ekle
    wordBank.push({ word, translation });

    // LocalStorage'a kaydet
    localStorage.setItem('wordBank', JSON.stringify(wordBank));

    alert(`Kelime eklendi: ${word} - ${translation}`);
    wordInput.value = '';
    translationInput.value = '';
  } else {
    alert('Lütfen her iki alanı doldurun!');
  }
});

// Test için rastgele kelime seçme
function getRandomWord() {
  if (wordBank.length === 0) {
    return null;
  }
  return wordBank[Math.floor(Math.random() * wordBank.length)];
}

// Yeni test başlat
let currentWord = null;
function startQuiz() {
  currentWord = getRandomWord();
  if (currentWord) {
    quizWordElement.textContent = `Kelime: ${currentWord.word}`;
    feedbackElement.textContent = '';
    answerInput.value = '';
  } else {
    quizWordElement.textContent = 'Kelime eklemeniz gerekiyor!';
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

  // Yeni test başlat
  startQuiz();
});

// İlk testi başlat
startQuiz();
