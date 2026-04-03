const user_id = 1;

fetch(`user_backend/get_tickets.php?user_id=${user_id}`)
.then(res => res.json())
.then(data => {
    console.log("Tickets:", data);

    const container = document.getElementById("ticketsContainer");
    container.innerHTML = "";

    if (!data || data.length === 0) {
        container.innerHTML = "<p>No tickets booked yet</p>";
        return;
    }

    data.forEach(ticket => {
        container.innerHTML += `
            <div class="ticket-card">
                <h2>${ticket.movie_name}</h2>
                <p><strong>Theatre:</strong> ${ticket.theatre_name}</p>
                <p><strong>Seats:</strong> ${ticket.seats}</p>
                <p><strong>Total Price:</strong> ₹${ticket.total_price}</p>
                <p><strong>Date:</strong> ${ticket.booking_date}</p>
            </div>
        `;
    });
})
.catch(err => {
    console.error("Fetch Error:", err);
});