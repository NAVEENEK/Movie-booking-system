// GET movie_id FROM URL
const urlParams = new URLSearchParams(window.location.search);
const movie_id = urlParams.get("id");


/* FETCH THEATRES FROM BACKEND */

function loadTheatres() {

    const district = document.getElementById("districtSelect").value;
    const date = document.getElementById("dateSelect").value;

    // API CALL
    fetch(`user_backend/movie_info.php?movie_id=${movie_id}&district=${district}&date=${date}`)
    .then(response => response.json())
    .then(data => {
        displayTheatres(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

}


/* CREATE THEATRE CARD */

function createTheatreCard(theatre){

    const formats = theatre.format;
    const timesHTML = theatre.times.map(time =>
        `<span class="showtime">${time}</span>`
    ).join("");

    return `
    <div class="theatre-card" onclick="openTheatre(${theatre.theatre_id})">

        <h3>${theatre.theatre_name}</h3>

        <p class="theatre-type">${formats} | ${theatre.ac_type}</p>

        <div class="showtimes">
            ${timesHTML}
        </div>

    </div>
    `;
}


/* DISPLAY */

function displayTheatres(list){

    const container = document.getElementById("theatreList");

    container.innerHTML = "";

    if(list.length === 0){
        container.innerHTML = "<p>No shows available</p>";
        return;
    }

    list.forEach(theatre => {
        container.innerHTML += createTheatreCard(theatre);
    });

}


/* EVENT LISTENERS */

document.getElementById("districtSelect")
.addEventListener("change", loadTheatres);

document.getElementById("dateSelect")
.addEventListener("change", loadTheatres);


/* INITIAL LOAD (optional) */
loadTheatres();


/* CLICK */

function openTheatre(id){
    window.location.href = `booking.html?theatre=${id}&movie=${movie_id}`;
}