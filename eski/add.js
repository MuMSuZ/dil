const API_URL = 'https://kelime-api.onrender.com'; // Render'daki API URL'n

document.getElementById('add-word').addEventListener('click', async function () {
  const word = document.getElementById('word').value.trim();
  const translation = document.getElementById('translation').value.trim();
  const date = new Date().toISOString().split('T')[0]; // Bugünün tarihi (YYYY-MM-DD)

  if (!word || !translation) {
    alert('Lütfen tüm alanları doldurun!');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/words`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word, translation, date }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Kelime başarıyla eklendi.');
      document.getElementById('word').value = ''; // Formu temizle
      document.getElementById('translation').value = ''; // Formu temizle
    } else {
      alert(`Hata: ${data.message}`);
    }
  } catch (error) {
    alert('API ile bağlantı kurulamadı. Lütfen daha sonra tekrar deneyin.');
    console.error(error);
  }
});
