// Initialize the map with a default view
const map = L.map('map').setView([51.505, -0.09], 13); // Default coordinates

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
            const [lat, lon, date] = coord.split(',').map(item => item.trim());
            const latitude = parseFloat(lat);
            const longitude = parseFloat(lon);

            if (!isNaN(latitude) && !isNaN(longitude)) {
                // Create a marker and bind a popup with the date stamp
                L.marker([latitude, longitude]).addTo(map)
                    .bindPopup(`Point: ${latitude}, ${longitude}<br>Date: ${date}`);
            }
        });
    })
    .catch(error => console.error('Error loading coordinates:', error));
