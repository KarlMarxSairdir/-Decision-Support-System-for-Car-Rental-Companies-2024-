$(document).ready(function() {
    // Get the mevcut_arac_id from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const mevcut_arac_id = urlParams.get('mevcut_arac_id');

    // Fetch data from the API
    fetch(`http://localhost:3000/api/kiralamaSorunlari/${mevcut_arac_id}`)
        .then(response => response.json())
        .then(data => {
            // Get a reference to the parent element
            const parentElement = $('#sorunTable');

            // Iterate through the data and append elements to the parent
            data.forEach(item => {
                const element = $(`
                  <tr>
                        <td>${item.model_arac}</td>
                        <td>${item.sorun_baslik}</td>
                        <td>${item.sorun_aciklama}</td>
                        <td>${item.sorun_maliyet}</td>
                    </tr>`);

                // Append the element to the parent
                parentElement.append(element);
            });
        })
        .catch(error => console.error('Error:', error));
});