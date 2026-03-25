// Get theatre ID from URL
const params = new URLSearchParams(window.location.search);
const theatreId = params.get("id");

// If no ID → error
if (!theatreId) {
    alert("No request ID provided");
}


// Fetch theatre details from backend
fetch(`/movie_booking/ADMIN/admin_backend/request_detail.php?id=${theatreId}`)
    .then(response => response.json())
    .then(data => {

        console.log(data); // debug

        // Fill data into HTML
        document.getElementById("theatreName").innerText = data.name;
        document.getElementById("ownerName").innerText = data.owner;
        document.getElementById("license").innerText = data.license;
        document.getElementById("type").innerText = data.type;
        document.getElementById("ac").innerText = data.ac;
        document.getElementById("capacity").innerText = data.seats;
        document.getElementById("location").innerText = data.address;

    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to load data");
    });


// APPROVE FUNCTION
function approveRequest() {
    console.log("Approve clicked, ID:", theatreId);

    fetch("/movie_booking/ADMIN/admin_backend/update_request.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id=${theatreId}&status=approved`
    })
    .then(res => res.text())
    .then(data => {
        console.log("Server response:", data);
        window.location.href = "view_request.html";
    })
    .catch(err => console.error("Fetch error:", err));
}


// REJECT FUNCTION
function rejectRequest() {

    fetch("/movie_booking/ADMIN/admin_backend/update_request.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id=${theatreId}&status=rejected`
    })
    .then(res => res.text())
    .then(data => {
        console.log("Server response:", data);
        window.location.href = "view_request.html";
    });
}