<?php
include("../db.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Add Show</title>

<link rel="stylesheet" href="theatre_stylesheet/add_movie.css">
</head>

<body>

<header class="header">
<h2>Add Show</h2>
<a href="theatre_home.html" class="back-btn">← Back</a>
</header>

<div class="container">

<form class="show-form" action="theatre_backend/add_show.php" method="POST">

<!-- Movie Dropdown -->
<div class="input-group">
<label>Select Movie</label>

<select name="movie_id" required>
<option value="">Select Movie</option>

<?php
$result = $conn->query("SELECT movie_id, title FROM movie");

while($row = $result->fetch_assoc()){
    echo "<option value='".$row['movie_id']."'>".$row['title']."</option>";
}
?>

</select>
</div>

<!-- Show Date -->
<div class="input-group">
<label>Show Date</label>
<input type="date" name="show_date" required>
</div>

<!-- Show Time -->
<div class="input-group">
<label>Show Time</label>
<input type="time" name="show_time" required>
</div>

<!-- Ticket Price -->
<div class="input-group">
<label>Ticket Price</label>
<input type="number" name="ticket_price" required>
</div>

<!-- Total Seats -->
<div class="input-group">
<label>Total Seats</label>
<input type="number" name="total_seat" required>
</div>

<!-- Format -->
<div class="input-group">
<label>Format</label>
<select name="format">
<option>2D</option>
<option>3D</option>
<option>IMAX</option>
<option>4DX</option>
</select>
</div>

<button type="submit">Add Show</button>

</form>

</div>

</body>
</html>