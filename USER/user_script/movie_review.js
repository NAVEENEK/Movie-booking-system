const reviews = [

{
username:"Arjun",
review:"A masterpiece! The storytelling and visuals were incredible."
},

{
username:"Meera",
review:"Very intense movie. Cillian Murphy's performance was amazing."
},

{
username:"Rahul",
review:"A bit long but totally worth watching."
},

{
username:"Sneha",
review:"Excellent direction and cinematography. Highly recommended."
}

];



/* CREATE REVIEW CARD */

function createReviewCard(data){

return `

<div class="review-card">

<h3 class="username">${data.username}</h3>

<p class="review-text">${data.review}</p>

</div>

`;

}



/* DISPLAY REVIEWS */

function displayReviews(){

const container = document.getElementById("reviewList");

container.innerHTML = "";

reviews.forEach(r => {

container.innerHTML += createReviewCard(r);

});

}



displayReviews();