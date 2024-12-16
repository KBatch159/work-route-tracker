let map; // Map instance
let markers = []; // Store markers placed every minute
let liveMarker; // Current live position marker
let intervalId; // To keep track of the tracking interval
let startTime; // Track the start time
let direction; // Work or Home?

document.getElementById("startButton").addEventListener("click", startTracking);

function initMap() {
    // Initialise the map and set default view
    map = L.map('map').setView([51.505, -0.09], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

function startTracking() {
    // Ask if user is going to work or home
    direction = prompt("Are you going to work or home? (Type 'work' or 'home')");

    if (!direction || (direction.toLowerCase() !== "work" && direction.toLowerCase() !== "home")) {
        alert("Invalid input. Please type 'work' or 'home'.");
        return;
    }

    alert(`Tracking started - ${direction === "work" ? "to Work" : "to Home"}`);

    if (navigator.geolocation) {
        startTime = new Date();
        updateTimer();
        intervalId = setInterval(() => {
            navigator.geolocation.getCurrentPosition(dropMarker, handleError);
        }, 60000); // Every 1 minute

        // Track live location more frequently
        navigator.geolocation.watchPosition(updateLiveLocation, handleError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function dropMarker(position) {
    const { latitude, longitude } = position.coords;

    // Add a small black marker for each minute
    const marker = L.circleMarker([latitude, longitude], {
        radius: 5,
        color: "black"
    }).addTo(map);

    markers.push(marker);
    map.setView([latitude, longitude], 13); // Update map view
}

function updateLiveLocation(position) {
    const { latitude, longitude } = position.coords;

    // Remove previous live marker
    if (liveMarker) {
        map.removeLayer(liveMarker);
    }

    // Add a large red marker for the current position
    liveMarker = L.circleMarker([latitude, longitude], {
        radius: 10,
        color: "red"
    }).addTo(map);

    map.setView([latitude, longitude], 13);
}

function updateTimer() {
    const timerElement = document.getElementById("timer");

    setInterval(() => {
        if (startTime) {
            const now = new Date();
            const elapsed = Math.floor((now - startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;

            timerElement.innerText = `Time: ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

function handleError(error) {
    console.error("Error occurred while retrieving location:", error);
}

// Initialise the map on page load
window.onload = initMap;
