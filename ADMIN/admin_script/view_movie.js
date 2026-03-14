
// Dummy movie data (later from database)

const movies = [
{
id: "M001",
name: "Silent Echoes",
genre: "Thriller",
duration: "1h 45m"
},

{
id: "M002",
name: "Midnight Manor",
genre: "Horror",
duration: "2h"
},

{
id: "M003",
name: "Holiday Heist",
genre: "Comedy",
duration: "1h 50m"
}

];


const movieTableBody = document.getElementById("movieTableBody");
const searchInput = document.getElementById("searchInput");


// Build movie table
function loadMovies(data){

movieTableBody.innerHTML = "";

data.forEach(movie => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${movie.id}</td>
<td>${movie.name}</td>
<td>${movie.genre}</td>
<td>${movie.duration}</td>
<td>
<button class="delete-btn">
🗑
</button>
</td>
`;

movieTableBody.appendChild(row);

});

}


// Search functionality

searchInput.addEventListener("input", function(){

const searchText = this.value.toLowerCase();

const filteredMovies = movies.filter(movie =>
movie.name.toLowerCase().includes(searchText)
);

loadMovies(filteredMovies);

});


// Initial load

loadMovies(movies);