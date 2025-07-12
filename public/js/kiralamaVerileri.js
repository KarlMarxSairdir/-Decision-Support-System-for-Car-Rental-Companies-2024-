// Define optionSection1 and optionSection2
const optionSection1 = document.getElementById('selectOption1');
const optionSection2 = document.getElementById('selectOption2');

// Canvas elementini seçin
const ctx = document.getElementById('myChart').getContext('2d');

// Initial radar chart with two datasets
const radarChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Labels will be populated dynamically
        datasets: [
            {
                label: 'Option 1 Data',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            },
            {
                label: 'Option 2 Data',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            }
        ]
    },
    options: {
        scales: {
            r: {
                beginAtZero: true
            }
        }
    }
});

function updateChart(data1, data2, callback) {
    // Check if data is not null or undefined
    if (data1 && data2 && data1.length > 0 && data2.length > 0) {
        // Assuming the structure of data1 and data2 is the same
        const labels = Object.keys(data1[0]);
        const values1 = Object.values(data1[0]);
        const values2 = Object.values(data2[0]);

        radarChart.data.labels = labels;
        radarChart.data.datasets[0].data = values1;
        radarChart.data.datasets[1].data = values2;

        radarChart.update(); // Update the chart

        // Execute the callback after the chart is updated
        if (typeof callback === 'function') {
            callback();
        }
    } else {
        console.error('No data to update the chart');
    }
}

// Fetch data from the API and add options to the dropdowns
fetch('http://localhost:3000/api/aracAd1')
    .then(response => response.json())
    .then(data => {
        // Create and add the default option to the dropdowns
        const defaultOption1 = document.createElement('option');
        defaultOption1.text = 'Select a vehicle';
        defaultOption1.value = '';
        optionSection1.add(defaultOption1);

        const defaultOption2 = document.createElement('option');
        defaultOption2.text = 'Select a vehicle';
        defaultOption2.value = '';
        optionSection2.add(defaultOption2);

        // Populate the dropdowns with data from the API
        data.forEach(item => {
            const option1 = document.createElement('option');
            option1.value = item.mevcut_arac_id;
            option1.text = item.marka_model;
            optionSection1.add(option1);

            const option2 = document.createElement('option');
            option2.value = item.mevcut_arac_id;
            option2.text = item.marka_model;
            optionSection2.add(option2);
        });
    })
    .catch(error => console.error('Error:', error));
// Event listener for option selection
optionSection1.addEventListener('change', function () {
    const selectedOptionValue = optionSection1.value;
    const selectedOptionText = optionSection1.options[optionSection1.selectedIndex].text;
    fetch(`http://localhost:3000/api/mevcutAraclar/${selectedOptionValue}`)
        .then(response => response.json())
        .then(selectedData => {
            console.log('Selected data for option 1:', selectedData); // Log the selected data

            // Extract labels and values from the selected data
            const labels = Object.keys(selectedData[0]);
            const values1 = Object.values(selectedData[0]);

            radarChart.data.labels = labels;
            radarChart.data.datasets[0].label = selectedOptionText;
            radarChart.data.datasets[0].data = values1;

            radarChart.update(); // Update the chart

            // Code to execute after the chart is updated for option 1
            console.log('Chart updated for option 1');
        })
        .catch(error => console.error('Error fetching selected data:', error));
});

optionSection2.addEventListener('change', function () {
    const selectedOptionValue = optionSection2.value;
    const selectedOptionText = optionSection2.options[optionSection2.selectedIndex].text;
    fetch(`http://localhost:3000/api/mevcutAraclar/${selectedOptionValue}`)
        .then(response => response.json())
        .then(selectedData => {
            console.log('Selected data for option 2:', selectedData); // Log the selected data

            // Extract labels and values from the selected data
            const labels = Object.keys(selectedData[0]);
            const values2 = Object.values(selectedData[0]);

            radarChart.data.labels = labels;
            radarChart.data.datasets[1].label = selectedOptionText;
            radarChart.data.datasets[1].data = values2;

            radarChart.update(); // Update the chart

            // Code to execute after the chart is updated for option 2
            console.log('Chart updated for option 2');
        })
        .catch(error => console.error('Error fetching selected data:', error));
});



// Get the context of the canvas element we want to select
var ctx1 = document.getElementById('myChart1').getContext('2d');

// Fetch the data from the server
fetch('http://localhost:3000/api/toplamHasilat')
    .then(response => response.json())
    .then(data => {
        // Extract the labels and data from the fetched data
        var labels = data.map(item => item.marka_model);
        var hasilatData = data.map(item => item.toplam_hasilat);

        // Create the chart
        var myChart = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Toplam Hasilat',
                    data: hasilatData,
                    backgroundColor: 'rgba(183, 28, 28, 0.2)', // Change the background color to burgundy
                    borderColor: 'rgba(13, 71, 161, 1)', // Change the border color to blue
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
