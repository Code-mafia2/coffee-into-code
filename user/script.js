const busData = {
    "mathikade": { line: "Green Line", buses: ["Bus 101", "Bus 102"], seats: [30, 25], timings: ["10:00 AM", "10:15 AM"] },
    "yeshawantpur": { line: "Green Line", buses: ["Bus 103", "Bus 104"], seats: [40, 20], timings: ["10:10 AM", "10:30 AM"] },
    "rajajinagar": { line: "Green Line", buses: ["Bus 105", "Bus 106"], seats: [35, 28], timings: ["10:20 AM", "10:45 AM"] },
    "majestic": { 
        line: "Green & Purple Lines", 
        buses: ["Bus 107 (Green)", "Bus 201 (Purple)"], 
        seats: [50, 50], 
        timings: ["10:30 AM", "10:35 AM"]
    },
    "mgroad": { line: "Purple Line", buses: ["Bus 202", "Bus 203"], seats: [40, 20], timings: ["10:40 AM", "11:00 AM"] },
    "indiranagar": { line: "Purple Line", buses: ["Bus 204", "Bus 205"], seats: [30, 25], timings: ["10:50 AM", "11:15 AM"] },
    "byappanahalli": { line: "Purple Line", buses: ["Bus 206", "Bus 207"], seats: [20, 18], timings: ["11:10 AM", "11:30 AM"] },
    "jayanagar": { line: "Green Line", buses: ["Bus 108", "Bus 109"], seats: [25, 30], timings: ["11:00 AM", "11:20 AM"] },
    "banashankari": { line: "Green Line", buses: ["Bus 110", "Bus 111"], seats: [30, 20], timings: ["11:30 AM", "11:50 AM"] },
    "krmarket": { line: "Green Line", buses: ["Bus 112", "Bus 113"], seats: [40, 35], timings: ["11:50 AM", "12:10 PM"] },
    "vijaynagar": { line: "Purple Line", buses: ["Bus 208", "Bus 209"], seats: [50, 40], timings: ["12:00 PM", "12:20 PM"] },
    "whitefield": { line: "Purple Line", buses: ["Bus 210", "Bus 211"], seats: [30, 20], timings: ["12:30 PM", "12:50 PM"] },
};

function planJourney() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    if (origin === destination) {
        document.getElementById('result').innerHTML = `<p>You are already at your destination!</p>`;
        return;
    }

    const originData = busData[origin];
    const destinationData = busData[destination];

    let result = `<h3>Journey Details</h3>`;
    result += `<p>Origin: <strong>${origin}</strong> (${originData.line})</p>`;
    result += `<p>Destination: <strong>${destination}</strong> (${destinationData.line})</p>`;

    if (originData.line === destinationData.line) {
        // Both stops are on the same line
        result += `<p>Both stops are on the same line: <strong>${originData.line}</strong>.</p>`;
        result += `<p>Recommended Bus: <strong>${originData.buses[0]}</strong> (Seats: ${originData.seats[0]})</p>`;
        result += `<p>Arrival at Origin: <strong>${originData.timings[0]}</strong></p>`;
        result += `<p>Estimated Arrival at Destination: <strong>${destinationData.timings[1]}</strong></p>`;
    } else {
        // Stops are on different lines
        result += `<p>You need to change lines at Majestic.</p>`;
        result += `<p>Take <strong>${originData.buses[1]}</strong> to Majestic (Seats: ${originData.seats[1]}).</p>`;
        result += `<p>At Majestic, transfer to <strong>${destinationData.buses[0]}</strong> (Seats: ${destinationData.seats[0]}).</p>`;
        result += `<p>Arrival at Origin: <strong>${originData.timings[0]}</strong></p>`;
        result += `<p>Departure from Majestic: <strong>${destinationData.timings[0]}</strong></p>`;
        result += `<p>Estimated Arrival at Destination: <strong>${destinationData.timings[1]}</strong></p>`;
    }

    document.getElementById('result').innerHTML = result;
}
