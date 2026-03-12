const seatContainer = document.getElementById("seat-container")
const seatCount = document.getElementById("seat-count")
const totalPrice = document.getElementById("total-price")

let seatPrice = 150

const bookedSeats = [5,6,15,23]

function createSeats(){

for(let i=1;i<=60;i++){

const seat=document.createElement("div")
seat.classList.add("seat")

if(bookedSeats.includes(i)){
seat.classList.add("booked")
}

seat.addEventListener("click",selectSeat)

seatContainer.appendChild(seat)

}

}

function selectSeat(){

if(this.classList.contains("booked")) return

this.classList.toggle("selected")

updateSummary()

}

function updateSummary(){

const selectedSeats=document.querySelectorAll(".seat.selected")

seatCount.innerText=selectedSeats.length
totalPrice.innerText=selectedSeats.length * seatPrice

}

createSeats()



const formatBtns=document.querySelectorAll(".format-btn")

formatBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

formatBtns.forEach(b=>b.classList.remove("active"))
btn.classList.add("active")

const format=btn.dataset.format

if(format==="2D") seatPrice=150
if(format==="3D") seatPrice=200
if(format==="Standard") seatPrice=120

updateSummary()

})

})


document.getElementById("confirmBtn").addEventListener("click",()=>{

const selectedSeats=document.querySelectorAll(".seat.selected")

if(selectedSeats.length===0){
alert("Please select a seat")
return
}

alert("Booking Confirmed!")

})