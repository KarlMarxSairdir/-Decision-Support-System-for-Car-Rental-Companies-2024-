// Create a radar chart outside the function to update it later
const ctx = document.getElementById('radarChart').getContext('2d');
const radarChart = new Chart(ctx, {
    type: 'line',
    data: {},
    options: {
        elements: {
            line: {
                fill: true // This fills the area under the line
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx2 = document.getElementById('radarChart2').getContext('2d');
const radarChart2 = new Chart(ctx2, {
    type: 'line',
    data: {},
    options: {
        elements: {
            line: {
                fill: true // This fills the area under the line
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to fetch and populate tables and radar charts
function populateTables(selectedValue, tableBody1, tableBody2, selectId, datasetIndex, sectionNumber) {
    const selectElement = document.getElementById(selectId);

    // Get the selected option's text
    const selectedOptionText = selectElement.options[selectElement.selectedIndex].text;

    fetch(`http://localhost:3000/api/araclar/${selectedValue}`)
        .then(response => response.json())
        .then(data => {
            // Clear the table bodies
            tableBody1.innerHTML = '';
            tableBody2.innerHTML = '';

            // Populate the tables with the 'araclar' data
            data.araclar.forEach(item => {
                const row1 = document.createElement('tr');
                for (const property in item) {
                    const cell1 = document.createElement('td');
                    cell1.textContent = item[property];
                    row1.appendChild(cell1);
                }
                tableBody1.appendChild(row1);
            });

            // Populate the tables with the 'kronik_ariza' data
            data.kronik_ariza.forEach(item => {
                const row2 = document.createElement('tr');
                for (const property in item) {
                    const cell2 = document.createElement('td');
                    cell2.textContent = item[property];
                    row2.appendChild(cell2);
                }
                tableBody2.appendChild(row2);
            });

            const chartDefinitions = [
                {
                    properties: ['emisyon', 'satın_alim_maliyet', 'kiralama_fiyat'],
                    propertyNames: {
                        'emisyon': 'Emisyon Değerleri(gram/km)',
                        'satın_alim_maliyet': 'Satın Alım Maliyeti',
                        'kiralama_fiyat': 'Kiralama Kazançları'
                    },
                    chart: radarChart
                },
                {
                    properties: ['motor_hacim', 'motor_beygir', 'yakit_tuketim', 'yillik_vergi', 'bakim_maliyet'],
                    propertyNames: {
                        'motor_hacim': 'Motor Hacmi',
                        'motor_beygir': 'Motor Beygir',
                        'yakit_tuketim': 'Yakıt Tüketim',
                        'yillik_vergi': 'Yıllık Vergi',
                        'bakim_maliyet': 'Bakım Maliyet'
                    },
                    chart: radarChart2
                }
            ];

            // Loop through each chart definition
            chartDefinitions.forEach(({ properties, propertyNames, chart }) => {
                // Get the numerical data for the chart
                const numericalData = {};
                properties.forEach(property => {
                    numericalData[propertyNames[property]] = data.araclar[0][property];
                });

                // Update the chart data
                chart.data.labels = Object.keys(numericalData);
                chart.data.datasets[datasetIndex] = {
                    label: selectedOptionText,
                    data: Object.values(numericalData),
                    backgroundColor: datasetIndex === 0 ? 'rgba(0, 123, 255, 0.5)' : 'rgba(255, 0, 0, 0.5)'
                };
                chart.update();
            });
        })
        .catch(error => console.error('Error:', error));
}

// Get the select elements
const select1 = document.getElementById('selectOption1');
const select2 = document.getElementById('selectOption2');

// Declare sectionNumber here
let sectionNumber;

[{ select: select1, tableBody1Id: 'organizasyonTableBody1', tableBody2Id: 'organizasyonTableBody2', datasetIndex: 0 },
{ select: select2, tableBody1Id: 'organizasyonTableBody3', tableBody2Id: 'organizasyonTableBody4', datasetIndex: 1 }]
    .forEach(({ select, tableBody1Id, tableBody2Id, datasetIndex }) => {
        // Add an event listener for the change event
        select.addEventListener('change', function () {
            // Update the sectionNumber when the event is triggered
            sectionNumber = parseInt(select.id.charAt(select.id.length - 1));

            // Get the table bodies
            const tableBody1 = document.getElementById(tableBody1Id);
            const tableBody2 = document.getElementById(tableBody2Id);

            // Call the function to populate tables and radar charts for the selected option
            populateTables(this.value, tableBody1, tableBody2, select.id, datasetIndex, sectionNumber);
        });
    });
// Fetch data from the API
fetch('http://localhost:3000/api/aracAd')
    .then(response => response.json())
    .then(data => {
        // Create and add the default option to the dropdowns
        const defaultOption1 = document.createElement('option');
        defaultOption1.text = 'Select a vehicle';
        defaultOption1.value = '';
        select1.add(defaultOption1);

        const defaultOption2 = document.createElement('option');
        defaultOption2.text = 'Select a vehicle';
        defaultOption2.value = '';
        select2.add(defaultOption2);

        // Create an option element for each item in the data
        data.forEach(item => {
            const option1 = document.createElement('option');
            option1.value = item.arac_id;
            option1.text = item.marka_model;
            select1.add(option1);

            const option2 = document.createElement('option');
            option2.value = item.arac_id;
            option2.text = item.marka_model;
            select2.add(option2);
        });
    })
    .catch(error => console.error('Error:', error));