$(document).ready(function() {
    // Fetch data from the API
    fetch('http://localhost:3000/api/aracIstatistik')
        .then(response => response.json())
        .then(data => {
            // Get a reference to the table body
            const tableBody = $('#IstatistikTableBody');

            // Iterate through the data and append rows to the table
            data.forEach(item => {
                const row = $(`
                    <tr>
                        <td><a href="kiralamaSorunları.html?mevcut_arac_id=${item.mevcut_arac_id}" class="arac-id">${item.mevcut_arac_id}</a></td>
                        <td>${item.marka}</td>
                        <td>${item.model}</td>
                        <td>${item.model_yıl}</td>
                        <td>${item.motor}</td>
                        <td>${item.kiralama_bedeli}</td>
                        <td>${item.eldeki_arac_sayi}</td>
                        <td>${item.ortalama_kilometre}</td>
                        <td>${item.bakim_maliyet}</td>
                        <td>${item.yillik_vergi}</td>
                        <td>${item.yakit_tuketim}</td>
                        <td>${item.yakıt_türü}</td>
                    </tr>`);

                // Append the row to the table
                tableBody.append(row);
            });

            // Initialize DataTable
            $('#IstatistikTable').DataTable();
        })
        .catch(error => console.error('Error:', error));
});