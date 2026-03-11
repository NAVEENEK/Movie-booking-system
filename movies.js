// -----------------------------
// NOW SHOWING MOVIES
// -----------------------------

const nowShowingMovies = [

{
name:"Silent Echoes",
rating:"7.2",
genre:"Thriller • 1h 45m",
poster:"poster2"
},

{
name:"Shadow Strike",
rating:"8.1",
genre:"Action • 2h 10m",
poster:"poster3"
},

{
name:"Cosmic Drift",
rating:"7.8",
genre:"Sci-Fi • 2h",
poster:"poster4"
},

{
name:"Hidden Truth",
rating:"7.5",
genre:"Drama • 1h 55m",
poster:"poster1"
}

];


// -----------------------------
// TOP RATED MOVIES
// -----------------------------

const topRatedMovies = [

{
name:"The Last Horizon",
rating:"7.2",
genre:"Thriller • 1h 45m",
poster:"poster1"
},

{
name:"Pixel Adventures",
rating:"6.5",
genre:"Adventure • 1h 50m",
poster:"poster2"
},

{
name:"Midnight Manor",
rating:"6.0",
genre:"Horror • 1h 40m",
poster:"poster3"
},

{
name:"Holiday Heist",
rating:"5.2",
genre:"Comedy • 1h 45m",
poster:"poster4"
}

];


// -----------------------------
// CARD GENERATOR FUNCTION
// -----------------------------

function createMovieCard(movie){

return `
<a href="movie_card.html" class="movie-link">

<div class="movie-card">

<div class="movie-poster ${movie.poster}">
<span class="rating">⭐ ${movie.rating}</span>
</div>

<h3>${movie.name}</h3>

<p class="genre">${movie.genre}</p>

<div class="tags">
<span class="tag">2D</span>
<span class="tag">DOLBY</span>
</div>

</div>

</a>
`;

}


// -----------------------------
// LOAD NOW SHOWING MOVIES
// -----------------------------

const nowContainer = document.getElementById("moviesContainer");

nowShowingMovies.forEach(movie => {

nowContainer.innerHTML += createMovieCard(movie);

});


// -----------------------------
// LOAD TOP RATED MOVIES
// -----------------------------

const topRatedContainer = document.getElementById("topRatedContainer");

topRatedMovies.forEach(movie => {

topRatedContainer.innerHTML += createMovieCard(movie);

});