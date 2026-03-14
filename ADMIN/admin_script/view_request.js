// Dummy theatre request data (later from database)

const theatreRequests = [
{
id: "T001",
name: "CineWorld Multiplex"
},

{
id: "T002",
name: "Galaxy Cinemas"
},

{
id: "T003",
name: "Dream Screens"
},

{
id: "T004",
name: "Royal Theatre"
}

];


const requestList = document.getElementById("requestList");
const searchInput = document.getElementById("searchInput");


// Build request list
function loadRequests(data){

requestList.innerHTML = "";

data.forEach(theatre => {

const li = document.createElement("li");

li.textContent = theatre.name;

li.onclick = () => {
window.location.href = `request_detail.html?id=${theatre.id}`;
};

requestList.appendChild(li);

});

}


// Search functionality
searchInput.addEventListener("input", function(){

const searchText = this.value.toLowerCase();

const filtered = theatreRequests.filter(theatre =>
theatre.name.toLowerCase().includes(searchText)
);

loadRequests(filtered);

});


// Initial load
loadRequests(theatreRequests);