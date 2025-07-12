$(document).ready(function () {
    // Fetch data from the API
    $.ajax({
        url: 'http://localhost:3000/api/km',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            createKmChart(data);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });

    // Function to create the KM chart
    function createKmChart(data) {
        // Extract data for the chart
        const labels = data.map(item => item.marka_model);
        const kmData = data.map(item => item.ortalama_kilometre);

        // Create an array of colors
        const colors = data.map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`);

        // Get the chart canvas
        const ctx = document.getElementById('barChart').getContext('2d');

        // Create the bar chart
        const kmChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Ortalama Kilometre',
                        backgroundColor: colors,
                        data: kmData
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});