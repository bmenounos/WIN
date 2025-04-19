// Initialize the map with a default view
const map = L.map('map').setView([34.01319,-116.668594], 13); // Default coordinates

// Load and add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
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

// Load the Pacific Crest Trail GeoJSON file and add it to the map
fetch('pct.geojson')
    .then(response => response.json())
    .then(data => {
        // Add the PCT as a geoJSON layer
        L.geoJSON(data, {
            style: {
                color: 'red', // PCT line color
                weight: 4,
                opacity: 0.7
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading PCT data:', error));
