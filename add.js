const API_URL = 'http://localhost:3000'; // Node.js API URL'si

// Kelime Ekleme İşlemi
document.getElementById('add-word').addEventListener('click', async function () {
  const word = document.getElementById('word').value.trim(); // İngilizce kelime
  const translation = document.getElementById('translation').value.trim(); // Türkçe karşılık
  const date = new Date().toISOString().split('T')[0]; // Bugünün tarihi (YYYY-MM-DD)

  if (!word || !translation) {
    alert('Lütfen tüm alanları doldurun!');
    return;
  }

  try {
    // API'ye POST isteği gönder
    const response = await fetch(`${API_URL}/words`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word, translation, date }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); // "Kelime eklendi." mesajını göster
      document.getElementById('word').value = ''; // Formu temizle
      document.getElementById('translation').value = ''; // Formu temizle
    } else {
      alert('Kelime eklenirken bir sorun oluştu: ' + data.message);
    }
  } catch (error) {
    alert('Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.');
    console.error(error);
  }
});
