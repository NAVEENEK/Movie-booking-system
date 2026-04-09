/* ✅ GET MOVIE ID FROM URL */
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

/* ✅ STOP IF MISSING */
if (!movieId) {
    alert("Movie ID missing");
    window.location.href = "/movie_booking/USER/home.php";
    throw new Error("Movie ID missing");
}

/* ✅ SUBMIT REVIEW */
document.getElementById("reviewForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const reviewText = document.getElementById("reviewText").value.trim();

    /* ✅ VALIDATION */
    if (!reviewText) {
        alert("Review cannot be empty");
        return;
    }

    fetch("/movie_booking/USER/user_backend/add_review.php", {  // 🔥 CORRECT PATH
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            movie_id: movieId,
            review_text: reviewText
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Server error (check PHP path)");
        }
        return res.json();
    })
    .then(data => {
        alert(data.message || "Review added");

        window.location.href = `/movie_booking/USER/movie_review.html?id=${movieId}`;
    })
    .catch(err => {
        console.error(err);
        alert("Something went wrong. Check console.");
    });
});