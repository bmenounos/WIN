// Initialize the map
const map = L.map('map').setView([34.149513, -116.710434 ], 13); // Default coordinates

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
            const [lat, lon] = coord.split(',').map(Number);
            if (!isNaN(lat) && !isNaN(lon)) {
                L.marker([lat, lon]).addTo(map)
                    .bindPopup(`Point: ${lat}, ${lon}`);
            }
        });
    })
    .catch(error => console.error('Error loading coordinates:', error));
