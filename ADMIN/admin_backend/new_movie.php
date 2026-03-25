<?php
include("../../db.php");

// Check connection
if (!$conn) {
    die("Connection failed");
}

// Get form data
$title = $_POST['title'];
$language = $_POST['language'];
$duration = $_POST['duration'];
$genre = $_POST['genre'];
$rating = $_POST['rating'];
$release_date = $_POST['release_date']; // ✅ corrected
$format = $_POST['format'];
$description = $_POST['description'];

// Image upload
$poster = $_FILES['poster']['name'];
$tmp = $_FILES['poster']['tmp_name'];

$uploadPath = "../../uploads/" . $poster;
move_uploaded_file($tmp, $uploadPath);

// Insert query
$sql = "INSERT INTO movie 
(title, language, duration, genre, poster, rating, release_date, format, description) 
VALUES 
('$title','$language','$duration','$genre','$poster','$rating','$release_date','$format','$description')";

if ($conn->query($sql)) {
    header("Location: ../new_movie.html?success=1");
    exit();
} else {
    echo "Error: " . $conn->error;
}
?>