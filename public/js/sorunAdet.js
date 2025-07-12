$(document).ready(function () {
    // Fetch data from the API
    $.ajax({
        url: 'http://localhost:3000/api/sorunAdet',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            createBrowserUsageChart(data);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });

    // Function to create the Browser Usage chart
    function createBrowserUsageChart(data) {
        // Extract data for the chart
        const labels = data.map(item => item.marka_model);
        const sorunAdet = data.map(item => item.sorun_adet);

        // Get the chart canvas
        const ctx = document.getElementById('browserUsageChart').getContext('2d');

        // Create the pie chart
        const browserUsageChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: sorunAdet,
                        backgroundColor: [
                            '#f56954',
                            '#00a65a',
                            '#f39c12',
                            '#00c0ef',
                            '#3c8dbc',
                            '#d2d6de'
                        ],
                    }
                ]
            },
        });
    }
});