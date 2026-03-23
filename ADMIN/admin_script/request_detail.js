// Get ID from URL
const params = new URLSearchParams(window.location.search);
const theatreId = params.get("theatre_id");

// Fetch request data from PHP
fetch("../admin_backend/request_detail?id=" + theatreId)
.then(response => response.json())
.then(request => {

  if (!request) {
    alert("Request not found");
    return;
  }

  // Display data
  document.getElementById("theatreName").textContent = request.name;
  document.getElementById("ownerName").textContent = request.owner;
  document.getElementById("email").textContent = request.email;
  document.getElementById("type").textContent = request.type;
  document.getElementById("ac").textContent = request.ac;
  document.getElementById("capacity").textContent = request.capacity;
  document.getElementById("location").textContent = request.location;

})
.catch(error => {
  console.error("Error:", error);
});


// APPROVE REQUEST
function approveRequest(){

fetch("../../php/approve_theatre.php?id=" + theatreId)
.then(res => res.text())
.then(data => {

  alert("Theatre Approved");
  window.location.href = "../ADMIN/view_request.html";

})
.catch(error => console.error(error));

}


// REJECT REQUEST
function rejectRequest(){

fetch("../../php/reject_theatre.php?id=" + theatreId)
.then(res => res.text())
.then(data => {

  alert("Theatre Request Rejected");
  window.location.href = "../ADMIN/view_request.html";

})
.catch(error => console.error(error));

}