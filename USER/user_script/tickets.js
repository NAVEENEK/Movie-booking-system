// =========================
// FETCH USER TICKETS
// =========================
fetch("user_backend/get_tickets.php", {
    credentials: "include" // ✅ REQUIRED for session
})
.then(res => res.json())
.then(data => {

    console.log("Tickets:", data)

    const container = document.getElementById("ticketsContainer")
    container.innerHTML = ""

    // ✅ If no tickets
    if (!data || data.length === 0) {
        container.innerHTML = "<p>No tickets booked yet</p>"
        return
    }

    // =========================
    // DISPLAY TICKETS
    // =========================
    data.forEach(ticket => {

        container.innerHTML += `
            <div class="ticket-card">
                <h2>${ticket.movie_name}</h2>
                <p><strong>Theatre:</strong> ${ticket.theatre_name}</p>
                <p><strong>Seats:</strong> ${formatSeats(ticket.seats)}</p>
                <p><strong>Total Price:</strong> ₹${ticket.total_price}</p>
                <p><strong>Date:</strong> ${ticket.booking_date}</p>
            </div>
        `
    })
})
.catch(err => {
    console.error("Fetch Error:", err)

    const container = document.getElementById("ticketsContainer")
    container.innerHTML = "<p>Failed to load tickets</p>"
})


// =========================
// FORMAT SEATS (BONUS 🔥)
// Convert: 1,2,3 → A1,A2,A3
// =========================
function formatSeats(seatsString){

    if(!seatsString) return ""

    const seats = seatsString.split(",")

    return seats.map(seat => {

        const num = parseInt(seat)

        const row = String.fromCharCode(65 + Math.floor((num - 1) / 10))
        const col = ((num - 1) % 10) + 1

        return row + col

    }).join(", ")
}