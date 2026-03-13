const theatres = [

{
id:1,
name:"Cinemark Central",
district:"Ernakulam",
format:["2D","3D"],
ac:"AC",
times:["01:00 PM","04:00 PM","09:00 PM"]
},

{
id:2,
name:"PVR Lulu Mall",
district:"Ernakulam",
format:["2D","IMAX"],
ac:"AC",
times:["11:00 AM","03:00 PM","07:00 PM"]
},

{
id:3,
name:"Kairali Theatre",
district:"Thiruvananthapuram",
format:["2D"],
ac:"Non AC",
times:["02:00 PM","06:00 PM"]
}

];


/* REUSABLE THEATRE CARD */

function createTheatreCard(theatre){

const formats = theatre.format.join(", ");

const timesHTML = theatre.times.map(time =>
`<span class="showtime">${time}</span>`
).join("");

return `

<div class="theatre-card" onclick="openTheatre(${theatre.id})">

<h3>${theatre.name}</h3>

<p class="theatre-type">${formats} | ${theatre.ac}</p>

<div class="showtimes">
${timesHTML}
</div>

</div>

`;

}



/* BUILD THE LIST */

function displayTheatres(list){

const container = document.getElementById("theatreList");

container.innerHTML = "";

list.forEach(theatre => {

container.innerHTML += createTheatreCard(theatre);

});

}



/* INITIAL LOAD */

displayTheatres(theatres);



/* DISTRICT FILTER */

document
.getElementById("districtSelect")
.addEventListener("change", filterTheatres);



function filterTheatres(){

const district = document.getElementById("districtSelect").value;

let filtered = theatres;

if(district !== ""){
filtered = theatres.filter(t => t.district === district);
}

displayTheatres(filtered);

}



/* CLICK THEATRE */

function openTheatre(id){

window.location.href = `booking.html?theatre=${id}`;

}