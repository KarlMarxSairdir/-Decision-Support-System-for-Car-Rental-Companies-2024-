$(document).ready(function () {
    // Fetch data from the API
    $.ajax({
        url: 'http://localhost:3000/api/maliyetler',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            createStackedBarChart(data);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });

    // Function to create the stacked bar chart
    function createStackedBarChart(data) {
        // Extract data for the chart
        const labels = data.map(item => item.marka_model);
        const bakimMaliyet = data.map(item => item.bakim_maliyet);
        const yillikVergi = data.map(item => item.yillik_vergi);
        const sorunlarMaliyet = data.map(item => item.sorunlar_toplam_maliyet);

        // Configuration options for the chart
        const options = {
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        };

        // Get the chart canvas
        const ctx = document.getElementById('stackedBarChart').getContext('2d');

        // Create the stacked bar chart
        const stackedBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Bakım Maliyet',
                        backgroundColor: 'rgba(75, 192, 192, 0.7)',
                        data: bakimMaliyet
                    },
                    {
                        label: 'Yıllık Vergi',
                        backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        data: yillikVergi
                    },
                    {
                        label: 'Sorunlar Maliyet',
                        backgroundColor: 'rgba(255, 206, 86, 0.7)',
                        data: sorunlarMaliyet
                    }
                ]
            },
            options: options
        });
        
    }
});
