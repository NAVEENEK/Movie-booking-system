const urlParams = new URLSearchParams(window.location.search);
const movie_id = urlParams.get("id");

// DEFAULT DATE
document.getElementById("dateSelect").valueAsDate = new Date();


/* ================= MOVIE DETAILS ================= */

function loadMovieDetails(){

    fetch(`user_backend/movie_details.php?movie_id=${movie_id}`)
    .then(res => res.json())
    .then(data => {

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
            `../images/${data.poster}`;
    })
    .catch(err => console.error(err));
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

    // ✅ FIXED DATE FORMAT
    const date = new Date(rawDate).toISOString().split('T')[0];

    container.innerHTML = "<p>Loading...</p>";

    fetch(`user_backend/movie_info_new.php?movie_id=${movie_id}&district=${district}&date=${date}`)
    .then(res => res.text()) // safer
    .then(text => {

        console.log("RAW RESPONSE:", text);

        if(!text){
            throw new Error("Empty response");
        }

        const data = JSON.parse(text);
        displayTheatres(data);
    })
    .catch(err => {
        console.error(err);
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

        const timesHTML = theatre.times.map(time =>
            `<span class="showtime">${formatTime(time)}</span>`
        ).join("");

        container.innerHTML += `
        <div class="theatre-card" onclick="openTheatre(${theatre.theatre_id})">

            <h3>${theatre.theatre_name}</h3>

            <!-- ❌ removed format -->
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

function openTheatre(id){
    window.location.href = `booking.html?theatre=${id}&movie=${movie_id}`;
}