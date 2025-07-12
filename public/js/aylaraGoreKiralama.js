fetch('http://localhost:3000/api/aylaraGoreKiralama')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('lineChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
                datasets: [{
                    label: 'Aylara Göre Toplam Kiralama Sayısı',
                    data: [
                        data[0].ocak_toplam_satis,
                        data[0].subat_toplam_satis,
                        data[0].mart_toplam_satis,
                        data[0].nisan_toplam_satis,
                        data[0].mayis_toplam_satis,
                        data[0].haziran_toplam_satis,
                        data[0].temmuz_toplam_satis,
                        data[0].agustos_toplam_satis,
                        data[0].eylul_toplam_satis,
                        data[0].ekim_toplam_satis,
                        data[0].kasim_toplam_satis,
                        data[0].aralik_toplam_satis
                    ],
                    borderColor: 'rgb(75, 192, 192)',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Aylara Göre Toplam Kiralama Sayısı'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Ay'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Kiralama Sayısı'
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));