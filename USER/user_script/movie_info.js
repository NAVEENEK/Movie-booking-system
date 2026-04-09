const urlParams = new URLSearchParams(window.location.search);
const movie_id = urlParams.get("id");

console.log("Movie ID:", movie_id);

// 🚨 STOP if movie_id missing
if(!movie_id){
    alert("Invalid movie ID");
    throw new Error("movie_id is missing");
}

// DEFAULT DATE
document.getElementById("dateSelect").valueAsDate = new Date();


/* ================= MOVIE DETAILS ================= */

function loadMovieDetails(){

    fetch(`user_backend/movie_details.php?movie_id=${movie_id}`)
    .then(res => res.json())
    .then(data => {

        console.log("Movie Details:", data);

        if(!data || data.error){
            console.error("Movie not found");
            return;
        }

        document.getElementById("movieTitle").innerText = data.title;

        document.getElementById("movieMeta").innerText =
            `${data.duration} • ${data.genre}`;

        document.getElementById("movieDescription").innerText =
            data.description;

        document.getElementById("movieRating").innerText =
            `⭐ ${data.rating} / 5`;

        document.getElementById("moviePoster").src =
            `../IMAGE/${data.poster}`; // ⚠️ your folder is IMAGE not images
    })
    .catch(err => console.error("Movie details error:", err));
}


/* ================= TIME FORMAT ================= */

function formatTime(time){
    const [hour, minute] = time.split(":");
    let h = parseInt(hour);
    let ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    if(h === 0) h = 12;

    return `${h.toString().padStart(2, '0')}:${minute} ${ampm}`;
}


/* ================= FETCH THEATRES ================= */

function loadTheatres() {

    const district = document.getElementById("districtSelect").value;
    const rawDate = document.getElementById("dateSelect").value;
    const container = document.getElementById("theatreList");

    if(!rawDate){
        container.innerHTML = "<p>Please select a date</p>";
        return;
    }

    const date = new Date(rawDate).toISOString().split('T')[0];

    container.innerHTML = "<p>Loading...</p>";

    fetch(`user_backend/movie_info_new.php?movie_id=${movie_id}&district=${district}&date=${date}`)
    .then(res => res.json()) // ✅ FIXED
    .then(data => {

        console.log("Theatre Data:", data);

        displayTheatres(data);
    })
    .catch(err => {
        console.error("Theatre error:", err);
        container.innerHTML = "<p>Error loading theatres</p>";
    });
}


/* ================= DISPLAY ================= */

function displayTheatres(list){

    const container = document.getElementById("theatreList");
    container.innerHTML = "";

    if(!list || list.length === 0){
        container.innerHTML = "<p>No shows available</p>";
        return;
    }

    list.forEach(theatre => {

        if(!theatre.shows || theatre.shows.length === 0){
            return;
        }

        const timesHTML = theatre.shows.map(show =>
            `<span class="showtime" onclick="openBooking(${show.show_id})">
                ${formatTime(show.show_time)}
             </span>`
        ).join("");

        container.innerHTML += `
        <div class="theatre-card">
            <h3>${theatre.theatre_name}</h3>
            <p class="theatre-type">${theatre.ac_type}</p>
            <div class="showtimes">
                ${timesHTML}
            </div>
        </div>
        `;
    });
}


/* ================= EVENTS ================= */

document.getElementById("districtSelect").addEventListener("change", loadTheatres);
document.getElementById("dateSelect").addEventListener("change", loadTheatres);


/* ================= INIT ================= */

loadMovieDetails();
loadTheatres();


/* ================= NAV ================= */

function openBooking(show_id){
    console.log("Opening booking for show:", show_id);
    window.location.href = `booking.php?show_id=${show_id}`;
}