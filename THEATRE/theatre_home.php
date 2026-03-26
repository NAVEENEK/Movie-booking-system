<?php
session_start();

if (!isset($_SESSION['theatre_id'])) {
    die("Please login first");
}
?>

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Theatre Dashboard</title>

<link rel="stylesheet" href="Theatre_stylesheet/theatre_home.css">

</head>

<body>

<header>

<h1>Theatre Dashboard</h1>

<div class="nav-buttons">
<button onclick="location.href='update_details.html'">Update Theatre Details</button>
<button onclick="location.href='add_movie.php'">Add New Show</button>
</div>

</header>

<div class="container">

<h2>Shows Currently Running</h2>

<div class="show-list">

<div class="show-card">

<h3>Avengers: Endgame</h3>

<p><strong>Screen:</strong> Screen 1</p>
<p><strong>Format:</strong> IMAX</p>
<p><strong>Time:</strong> 10:00 AM</p>

<button class="remove-btn">Remove Show</button>

</div>

<div class="show-card">

<h3>Oppenheimer</h3>

<p><strong>Screen:</strong> Screen 2</p>
<p><strong>Format:</strong> 3D</p>
<p><strong>Time:</strong> 1:30 PM</p>

<button class="remove-btn">Remove Show</button>

</div>

<div class="show-card">

<h3>Spider-Man: No Way Home</h3>

<p><strong>Screen:</strong> Screen 3</p>
<p><strong>Format:</strong> 2D</p>
<p><strong>Time:</strong> 7:00 PM</p>

<button class="remove-btn">Remove Show</button>

</div>

</div>

</div>

</body>

</html>
