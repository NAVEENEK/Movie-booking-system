// Dummy theatre data (later will come from database)

const theatres = [

{
id: "T001",
name: "CineMax",
location: "Kochi",
screens: 3
},

{
id: "T002",
name: "Galaxy Cinemas",
location: "Thrissur",
screens: 4
},

{
id: "T003",
name: "Dream Screens",
location: "Calicut",
screens: 2
},

{
id: "T004",
name: "Royal Theatre",
location: "Ernakulam",
screens: 5
}

];


const theatreTableBody = document.getElementById("theatreTableBody");
const searchInput = document.getElementById("searchInput");


// Build theatre table
function loadTheatres(data){

theatreTableBody.innerHTML = "";

data.forEach(theatre => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${theatre.id}</td>
<td>${theatre.name}</td>
<td>${theatre.location}</td>
<td>${theatre.screens}</td>
<td>
<button class="view-btn"
onclick="viewTheatre('${theatre.id}')">
View
</button>
</td>
`;

theatreTableBody.appendChild(row);

});

}


// Button redirect
function viewTheatre(theatreId){

window.location.href = `../THEATRE/theatre_details.html?id=${theatreId}`;

}


// Search functionality
searchInput.addEventListener("input", function(){

const searchText = this.value.toLowerCase();

const filtered = theatres.filter(theatre =>
theatre.name.toLowerCase().includes(searchText)
);

loadTheatres(filtered);

});


// Initial load
loadTheatres(theatres);