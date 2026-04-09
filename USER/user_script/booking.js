// =========================
// GET URL PARAMS
// =========================
const params = new URLSearchParams(window.location.search)
const show_id = params.get("show_id")

// 🚨 If show_id missing → stop everything
if(!show_id){
    alert("Invalid access! No show selected.")
    throw new Error("show_id is missing in URL")
}

// =========================
// DOM ELEMENTS
// =========================
const seatContainer = document.getElementById("seat-container")
const seatCount = document.getElementById("seat-count")
const totalPrice = document.getElementById("total-price")

let seatPrice = 150
let bookedSeats = []


// =========================
// FETCH BOOKED SEATS
// =========================
fetch(`user_backend/get_booked_seats.php?show_id=${show_id}`, {
    credentials: "include" // ✅ ensure session consistency
})
.then(res => res.json())
.then(data => {

    console.log("Booked Seats:", data)

    bookedSeats = data.map(Number)
    createSeats()

})
.catch(err => {
    console.error("Seat fetch error:", err)
    createSeats()
})


// =========================
// CREATE SEATS
// =========================
function createSeats(){

    seatContainer.innerHTML = ""

    for(let i=1; i<=60; i++){

        const seat = document.createElement("div")
        seat.classList.add("seat")

        const row = String.fromCharCode(65 + Math.floor((i-1)/10))
        const number = ((i-1)%10) + 1

        seat.innerText = row + number
        seat.dataset.seatId = i

        if(bookedSeats.includes(i)){
            seat.classList.add("booked")
        }

        seat.addEventListener("click", selectSeat)

        seatContainer.appendChild(seat)
    }
}


// =========================
// SELECT SEAT
// =========================
function selectSeat(){

    if(this.classList.contains("booked")) return

    this.classList.toggle("selected")

    updateSummary()
}


// =========================
// UPDATE SUMMARY
// =========================
function updateSummary(){

    const selectedSeats = document.querySelectorAll(".seat.selected")

    seatCount.innerText = selectedSeats.length
    totalPrice.innerText = selectedSeats.length * seatPrice
}


// =========================
// CONFIRM BOOKING
// =========================
document.getElementById("confirmBtn").addEventListener("click",()=>{

    const selectedSeats = document.querySelectorAll(".seat.selected")

    if(selectedSeats.length === 0){
        alert("Please select a seat")
        return
    }

    let seatsArray = []
    selectedSeats.forEach(seat => {
        seatsArray.push(seat.dataset.seatId)
    })

    let total = selectedSeats.length * seatPrice

    fetch("user_backend/book_ticket.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include", // ✅ FIX: send session cookie
        body: `show_id=${show_id}&seats=${seatsArray.join(",")}&total=${total}`
    })
    .then(res => res.text())
    .then(data => {

        console.log("Booking Response:", data)

        if(data.trim() === "success"){
            alert("Booking Confirmed!")
            location.reload()
        } else {
            alert(data) // ✅ SHOW REAL ERROR
        }

    })
    .catch(err => {
        console.error("Booking error:", err)
        alert("Something went wrong")
    })
})