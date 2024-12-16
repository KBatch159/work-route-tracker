let map; // Map instance
let liveMarker; // Live location marker
let intervalId; // Timer interval
let startTime; // Track the start time

// Event listeners for Home and Work buttons
document.getElementById("homeButton").addEventListener("click", () => startTracking("Home"));
document.getElementById("workButton").addEventListener("click", () => startTracking("Work"));

function startTracking(destination) {
    // Hide the welcome screen
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("map").style.display = "block";
    document.getElementById("timer").style.display = "block";

    // Initialise the map if not already created
    if (!map) {
        map = L.map('map');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    }

    // Centre the map on the current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            // Set map view and add live marker
            map.setView([latitude, longitude], 15);
            liveMarker = L.circleMarker([latitude, longitude], {
                radius: 10,
                color: "red"
            }).addTo(map);

            // Start updating position and timer
            startUpdatingPosition();
            startTimer();

            alert(`Tracking started for ${destination}`);
        }, handleError, { enableHighAccuracy: true });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function startUpdatingPosition() {
    // Update live position marker without resetting the map
    navigator.geolocation.watchPosition(position => {
        const { latitude, longitude } = position.coords;
        if (liveMarker) liveMarker.setLatLng([latitude, longitude]);
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
    alert("Unable to retrieve location. Please check your GPS settings.");
}
