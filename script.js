let map; // Map instance
let liveMarker; // Live location marker
let intervalId; // Timer interval
let startTime; // Track the start time

document.getElementById("homeButton").addEventListener("click", () => startTracking("Home"));
document.getElementById("workButton").addEventListener("click", () => startTracking("Work"));

function initMap() {
    // Initialise the map without centring
    map = L.map('map', { zoomControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

function startTracking(destination) {
    // Hide welcome screen and show the map and timer
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("map").style.display = "block";
    document.getElementById("timer").style.display = "block";

    // Centre map on current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 15);

            // Add live marker
            liveMarker = L.circleMarker([latitude, longitude], {
                radius: 10,
                color: "red"
            }).addTo(map);

            // Start updating position
            startUpdatingPosition();
            startTimer();
        }, handleError, { enableHighAccuracy: true });
    } else {
        alert("Geolocation not supported.");
    }

    alert(`Tracking started for ${destination}`);
}

function startUpdatingPosition() {
    navigator.geolocation.watchPosition(position => {
        const { latitude, longitude } = position.coords;

        // Update live marker without resetting the map view
        liveMarker.setLatLng([latitude, longitude]);
    }, handleError, { enableHighAccuracy: true });
}

function startTimer() {
    startTime = new Date();
    const timerElement = document.getElementById("timer");

    intervalId = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;

        timerElement.innerText = `Time: ${minutes}m ${seconds}s`;
    }, 1000);
}

function handleError(error) {
    console.error("Error fetching location:", error);
}

// Initialise map on page load
window.onload = initMap;
