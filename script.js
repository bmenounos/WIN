// Check if geolocation is supported
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition, showError);
} else {
    alert("Geolocation is not supported by this browser.");
}

// Initialize the map
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
            const [lat, lon] = coord.split(',').map(Number);
            if (!isNaN(lat) && !isNaN(lon)) {
                L.marker([lat, lon]).addTo(map)
                    .bindPopup(`Point: ${lat}, ${lon}`);
            }
        });
    })
    .catch(error => console.error('Error loading coordinates:', error));

// Function to update the user's position on the map
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    // Update the map view and marker
    map.setView([lat, lon], 13); // Move map to user's position
    L.marker([lat, lon]).addTo(map) // Add a marker for the user's position
        .bindPopup('You are here')
        .openPopup();
}

// Function to handle errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
