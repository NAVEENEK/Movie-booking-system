fetch('admin_backend/get_request.php')
.then(response => response.json())
.then(data => {
    displayTheatres(data);

    // attach search after data is loaded
    setupSearch(data);
});


const requestList = document.getElementById("requestList");
const searchInput = document.getElementById("searchInput");


// Build request list
function displayTheatres(data){

    requestList.innerHTML = ""; // clear old content

    if(data.length === 0){
        requestList.innerHTML = "No pending requests";
        return;
    }

    data.forEach(theatre => {

        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${theatre.theatre_name}</h3>
            <button onclick="goToDetails(${theatre.theatre_id})">
                View
            </button>
        `;

        requestList.appendChild(div);
    });
}


// Navigation
function goToDetails(id){
    window.location.href = `request_detail.html?id=${id}`;
}


// Search 
function setupSearch(originalData){

    searchInput.addEventListener("input", function(){

        const searchText = this.value.toLowerCase();

        const filtered = originalData.filter(theatre =>
            theatre.theatre_name.toLowerCase().includes(searchText)
        );

        displayTheatres(filtered);
    });
}