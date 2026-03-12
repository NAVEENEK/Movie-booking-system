/* GET MOVIE ID FROM URL */

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");


/* FORM SUBMIT */

document
.getElementById("reviewForm")
.addEventListener("submit", function(e){

e.preventDefault();


const reviewText = document.getElementById("reviewText").value;


/* REVIEW OBJECT */

const reviewData = {

movie_id: movieId,
review_text: reviewText

};


/* FOR NOW JUST PRINT (LATER SEND TO PHP) */

console.log("Review Data:", reviewData);


/* SUCCESS MESSAGE */

alert("Review submitted successfully!");


/* REDIRECT TO REVIEW PAGE */

window.location.href = `movie_review.html?id=${movieId}`;

});