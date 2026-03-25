<?php
session_start();
include("../../db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $movie_id = $_POST['movie_id'];
    $show_date = $_POST['show_date'];
    $show_time = $_POST['show_time'];
    $ticket_price = $_POST['ticket_price'];
    $total_seat = $_POST['total_seat'];
    $format = $_POST['format'];

    // TEMP (later replace with session)
    $theatre_id = 2;

    // Check theatre exists
    $checkTheatre = $conn->query("SELECT theatre_id FROM theatre WHERE theatre_id = '$theatre_id'");
    if ($checkTheatre->num_rows == 0) {
        die("Invalid theatre_id");
    }

    // Check movie exists
    $checkMovie = $conn->query("SELECT movie_id FROM movie WHERE movie_id = '$movie_id'");
    if ($checkMovie->num_rows == 0) {
        die("Invalid movie_id");
    }

    // Insert into `show`
    $sql = "INSERT INTO `show`
    (movie_id, theatre_id, show_date, show_time, ticket_price, total_seat, format)
    VALUES
    ('$movie_id', '$theatre_id', '$show_date', '$show_time', '$ticket_price', '$total_seat', '$format')";

    if ($conn->query($sql)) {
        header("Location: ../add_movie.php?success=1");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }

} else {
    echo "Invalid request";
}
?>