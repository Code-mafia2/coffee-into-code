// Define the fare for each route (in INR)
const fares = {
    route1: 5,  // MG Road to Koramangala
    route2: 6,  // Majestic to Whitefield
    route3: 10,  // Indiranagar to Banashankari
    route4: 12   // Kormangala to Electronic City
};

// Function to calculate fare
function calculateFare() {
    // Get the selected route and number of passengers
    const selectedRoute = document.getElementById('route').value;
    const numPassengers = document.getElementById('passengers').value;

    // Ensure the number of passengers is a valid positive number
    if (numPassengers < 1 || isNaN(numPassengers)) {
        alert("Please enter a valid number of passengers.");
        return;
    }

    // Calculate the total fare
    const farePerPassenger = fares[selectedRoute];
    const totalFare = farePerPassenger * numPassengers;

    // Display the total fare
    document.getElementById('total-fare').innerText = `Total Fare: ₹${totalFare}`;
}
