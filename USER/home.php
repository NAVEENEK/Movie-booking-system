<?php
session_start();

if(!isset($_SESSION['user_id'])){
    header("Location: ../LOGIN/user_login.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CineMax - Book Movie Tickets</title>

<link rel="stylesheet" href="user_stylesheet/style2.css">

</head>

<body>

<!-- NAVBAR -->


<nav class="navbar">
<div class="logo">🎬 Movie</div>

<a href="tickets.php" class="btn-signin">Tickets</a>
</nav>

<!-- NOW SHOWING -->

<section class="section">

<div class="section-header">

<h2>Now Showing</h2>

<!-- ✅ NEW VIEW ALL BUTTON -->
<a href="view_all_now_showing.html" class="view-all">View all →</a>

<div class="filters">
<button class="filter active">All</button>
<button class="filter">Action</button>
<button class="filter">Drama</button>
<button class="filter">Comedy</button>
<button class="filter">Sci-Fi</button>
</div>

</div>

<div class="movies-grid" id="moviesContainer"></div>

</section>





<!-- TOP RATED -->

<section class="section">

<div class="section-header">

<h2>Top Rated ⭐</h2>

<a href="#" class="view-all">View all →</a>

</div>
<div class="movies-grid" id="topRatedContainer"></div>


</section>



<script src="user_script/movie_card.js"></script>

</body>
</html>