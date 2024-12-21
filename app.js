let map;
let directionsService;
let directionsRenderer;

const buses = [
    { id: 1, origin: 'New York', destination: 'Boston', seatsAvailable: 10, location: { lat: 40.7128, lng: -74.0060 }, arrivalTime: '12:30 PM' },
    { id: 2, origin: 'New York', destination: 'Boston', seatsAvailable: 5, location: { lat: 42.3601, lng: -71.0589 }, arrivalTime: '1:00 PM' },
    { id: 3, origin: 'New York', destination: 'Boston', seatsAvailable: 0, location: { lat: 40.730610, lng: -73.935242 }, arrivalTime: '2:00 PM' },
    { id: 4, origin: 'Chicago', destination: 'Los Angeles', seatsAvailable: 2, location: { lat: 34.0522, lng: -118.2437 }, arrivalTime: '4:30 PM' }
];

// Initialize Google Maps
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7128, lng: -74.0060 }, // Default to New York
        zoom: 10
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}

// Search buses based on origin and destination
function searchBuses() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    const filteredBuses = buses.filter(bus => bus.origin.toLowerCase() === origin.toLowerCase() && bus.destination.toLowerCase() === destination.toLowerCase());

    const busesListContainer = document.getElementById('buses-list');
    busesListContainer.innerHTML = ''; // Clear previous results

    if (filteredBuses.length === 0) {
        busesListContainer.innerHTML = '<p>No buses found for the selected route.</p>';
    } else {
        filteredBuses.forEach(bus => {
            const busItem = document.createElement('div');
            busItem.className = 'bus-item';
            busItem.innerHTML = `
                <p>Bus ID: ${bus.id}</p>
                <p>Seats Available: ${bus.seatsAvailable}</p>
            `;
            busItem.onclick = function() { showBusDetails(bus) };
            busesListContainer.appendChild(busItem);
        });
    }
}

// Show bus details when clicked
function showBusDetails(bus) {
    document.getElementById('bus-location').innerText = `Location: ${bus.location.lat}, ${bus.location.lng}`;
    document.getElementById('bus-seats').innerText = `Seats Available: ${bus.seatsAvailable}`;
    document.getElementById('arrival-time').innerText = `Arrival Time: ${bus.arrivalTime}`;

    // Calculate and display travel time using Google Maps
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    calculateTravelTime(origin, destination, bus.location);

    const busDetailsSection = document.getElementById('bus-details');
    busDetailsSection.style.display = 'block';
}

// Calculate travel time using Google Maps API
function calculateTravelTime(origin, destination, busLocation) {
    const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            const duration = result.routes[0].legs[0].duration.text;
            document.getElementById('travel-time').innerText = `Travel Time: ${duration}`;
        } else {
            document.getElementById('travel-time').innerText = `Error calculating travel time`;
        }
    });
}
