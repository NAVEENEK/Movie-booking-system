const moviesContainer = document.getElementById("moviesContainer");
const topRatedContainer = document.getElementById("topRatedContainer");

let allNowShowing = [];
let allTopRated = [];

/* ===============================
FETCH MOVIES FROM PHP
================================ */

async function fetchMovies() {
    try {
        const response = await fetch("user_backend/movie_card.php");
        const data = await response.json();

        console.log(data); // debug

        allNowShowing = data.nowShowing;
        allTopRated = data.topRated;

        loadMovies(allNowShowing, allTopRated);

    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}


/* ===============================
OPEN MOVIE PAGE
================================ */

function openMovie(id){
    window.location.href = "movie_info.html?id=" + id;
}


/* ===============================
LOAD MOVIES
================================ */

function loadMovies(nowShowing, topRated){

    moviesContainer.innerHTML="";
    topRatedContainer.innerHTML="";

    // NOW SHOWING
    nowShowing.forEach(movie => {
        moviesContainer.innerHTML += `
        <div class="movie-card" onclick="openMovie(${movie.show_id})">
            <img src="${movie.poster}">
            <div class="movie-info">
                <h3>${movie.movie_name}</h3>
                <p>${movie.genre}</p>
                <span>⭐ ${movie.rating}</span>
            </div>
        </div>
        `;
    });

    // TOP RATED
    topRated.forEach(movie => {
        topRatedContainer.innerHTML += `
        <div class="movie-card" onclick="openMovie(${movie.show_id})">
            <img src="${movie.poster}">
            <div class="movie-info">
                <h3>${movie.movie_name}</h3>
                <p>${movie.genre}</p>
                <span>⭐ ${movie.rating}</span>
            </div>
        </div>
        `;
    });

}


/* ===============================
FILTER BUTTONS (FIXED)
================================ */

const filters = document.querySelectorAll(".filter");

filters.forEach(button =>{

    button.addEventListener("click",()=>{

        filters.forEach(btn=>btn.classList.remove("active"));
        button.classList.add("active");

        const genre = button.innerText;

        if(genre === "All"){
            loadMovies(allNowShowing, allTopRated);
        } else {
            const filtered = allNowShowing.filter(movie => movie.genre === genre);
            loadMovies(filtered, allTopRated); // topRated stays same
        }

    });

});


/* ===============================
INITIAL LOAD
================================ */

fetchMovies();