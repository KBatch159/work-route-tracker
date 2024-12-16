let map; // Map instance
let markers = []; // Store markers placed every minute
let intervalId; // To keep track of the tracking interval

document.getElementById("startButton").addEventListener("click", startTracking);

function initMap() {
    // Initialise the map and set view
    map = L.map('map').setView([51.505, -0.09], 13); // Default location

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

function startTracking() {
    if (navigator.geolocation) {
        // Drop markers every minute
        intervalId = setInterval(() => {
            navigator.geolocation.getCurrentPosition(dropMarker, handleError);
        }, 60000);

        alert("Tracking started!");
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function dropMarker(position) {
    const { latitude, longitude } = position.coords;

    // Add a marker to the map
    const marker = L.circleMarker([latitude, longitude], { radius: 5 }).addTo(map);
    markers.push(marker);

    // Update the map view to the new position
    map.setView([latitude, longitude], 13);
}

function handleError(error) {
    console.error("Error occurred while retrieving location:", error);
}

// Initialise the map on page load
window.onload = initMap;
