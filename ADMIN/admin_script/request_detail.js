// Dummy request data (later from database)

let theatreRequests = [

{
id:"T001",
name:"CineWorld Multiplex",
owner:"Rahul Menon",
email:"rahul@email.com",
type:"2D",
ac:"AC",
capacity:120,
location:"Kochi"
},

{
id:"T002",
name:"Galaxy Cinemas",
owner:"Arjun Nair",
email:"arjun@email.com",
type:"3D",
ac:"AC",
capacity:150,
location:"Thrissur"
}

];


// Get ID from URL

const params = new URLSearchParams(window.location.search);
const requestId = params.get("id");


// Find the request

const request = theatreRequests.find(r => r.id === requestId);


// Display data

document.getElementById("theatreName").textContent = request.name;
document.getElementById("ownerName").textContent = request.owner;
document.getElementById("email").textContent = request.email;
document.getElementById("type").textContent = request.type;
document.getElementById("ac").textContent = request.ac;
document.getElementById("capacity").textContent = request.capacity;
document.getElementById("location").textContent = request.location;



// APPROVE REQUEST

function approveRequest(){

console.log("Approve request:", requestId);

/*
DATABASE PLAN (later)

1. Insert theatre into theatre table
2. Delete request from request table

Example PHP call later:

fetch("approve_theatre.php?id="+requestId)
*/

alert("Theatre Approved");

window.location.href="../ADMIN/view_request.html";

}



// REJECT REQUEST

function rejectRequest(){

console.log("Reject request:", requestId);

/*
DATABASE PLAN (later)

Delete request only

Example:

fetch("reject_theatre.php?id="+requestId)
*/

alert("Theatre Request Rejected");

window.location.href="../ADMIN/view_request.html";

}