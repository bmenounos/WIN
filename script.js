// Initialize the map with a default view
const map = L.map('map').setView([34.01319,-116.668594], 13); // Default coordinates

// Load and add Stamen Terrain tiles
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
    maxZoom: 18,
    minZoom: 1,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under ODbL.'
}).addTo(map);


// Load coordinates from the text file and add markers
fetch('coordinates.txt')
    .then(response => response.text())
    .then(data => {
        const coordinates = data.split('\n');

        coordinates.forEach(coord => {
            const parts = coord.split(','); // split the line by comma
            
            // Trim and check if we have exactly three parts
            if (parts.length === 3) {
                const lat = parseFloat(parts[0].trim());
                const lon = parseFloat(parts[1].trim());
                const date = parts[2].trim(); // get the date

                // Check if latitude and longitude are valid numbers
                if (!isNaN(lat) && !isNaN(lon)) {
                    // Create a marker and bind a popup with the date stamp
                    L.marker([lat, lon]).addTo(map)
                        .bindPopup(`Point: ${lat}, ${lon}<br>Date: ${date}`);
                }
            }
        });
    })
    .catch(error => console.error('Error loading coordinates:', error));
