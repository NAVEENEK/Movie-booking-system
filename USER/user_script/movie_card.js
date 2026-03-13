// MOVIE DATA (temporary - later this will come from database)

//for movie card on home page

const movies = [

{
id:1,
name:"Dune: Part Two",
genre:"Sci-Fi",
rating:4.8,
poster:"../IMAGE/download.jpg",
topRated:true
},

{
id:2,
name:"Oppenheimer",
genre:"Drama",
rating:4.7,
poster:"../IMAGE/download.jpg",
topRated:true
},

{
id:3,
name:"Avengers: Endgame",
genre:"Action",
rating:4.6,
poster:"../IMAGE/download.jpg",
topRated:false
},

{
id:4,
name:"Interstellar",
genre:"Sci-Fi",
rating:4.9,
poster:"../IMAGE/download.jpg",
topRated:true
},

{
id:5,
name:"Joker",
genre:"Drama",
rating:4.5,
poster:"../IMAGE/download.jpg",
topRated:false
}

];


/* ===============================
OPEN MOVIE PAGE
================================ */

function openMovie(id){

window.location.href = "movie_info.html?id=" + id;

}


/* ===============================
LOAD MOVIES
================================ */

const moviesContainer = document.getElementById("moviesContainer");
const topRatedContainer = document.getElementById("topRatedContainer");


function loadMovies(filter="All"){

moviesContainer.innerHTML="";
topRatedContainer.innerHTML="";

movies.forEach(movie =>{

if(filter==="All" || movie.genre===filter){

moviesContainer.innerHTML += `

<div class="movie-card" onclick="openMovie(${movie.id})">

<img src="${movie.poster}" alt="${movie.name}">

<div class="movie-info">

<h3>${movie.name}</h3>

<p>${movie.genre}</p>

<span>⭐ ${movie.rating}</span>

</div>

</div>

`;

}


if(movie.topRated){

topRatedContainer.innerHTML += `

<div class="movie-card" onclick="openMovie(${movie.id})">

<img src="${movie.poster}" alt="${movie.name}">

<div class="movie-info">

<h3>${movie.name}</h3>

<p>${movie.genre}</p>

<span>⭐ ${movie.rating}</span>

</div>

</div>

`;

}

});

}


/* ===============================
FILTER BUTTONS
================================ */

const filters = document.querySelectorAll(".filter");

filters.forEach(button =>{

button.addEventListener("click",()=>{

filters.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

loadMovies(button.innerText);

});

});


/* ===============================
INITIAL LOAD
================================ */

loadMovies();