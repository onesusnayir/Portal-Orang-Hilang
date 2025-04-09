const submitButton = document.getElementById('submit-button');

document.getElementById('report-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Ambil field yang diinginkan
    const missingPersonFields = ['full_name', 'age', 'gender', 'height', 'weight', 'last_seen_location', 'last_seen_date', 'photo_url']; // hanya kirim field ini

    const missingPersonData = {};
    missingPersonFields.forEach(key => {
        missingPersonData[key] = formData.get(key);
    });

    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

    try {
      const res = await axios.post('http://localhost:3000/missing', missingPersonData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Form submitted successfully!');
      console.log(res.data);
    } catch (error) {
      alert('Failed to submit form.');
      console.error(error);
    }
  });