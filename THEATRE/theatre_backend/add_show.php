<?php
session_start();
require("../../db.php");

if (!isset($_SESSION['theatre_id'])) {
    die("Access denied. Please login.");
}

$theatre_id = $_SESSION['theatre_id'];

// GET DATA
$movie_id = $_POST['movie_id'] ?? '';
$show_time_input = $_POST['show_time'] ?? '';
$show_date_input = $_POST['show_date'] ?? '';
$price = $_POST['ticket_price'] ?? '';

// VALIDATION
if (
    empty($movie_id) ||
    empty($show_time_input) ||
    empty($show_date_input) ||
    empty($price)
) {
    die("All fields are required");
}

// FORMAT DATA
$show_time = date("H:i:s", strtotime($show_time_input)); // 24hr format
$show_date = date("Y-m-d", strtotime($show_date_input)); // safe date format

// INSERT QUERY
$sql = "INSERT INTO `shows`
(movie_id, theatre_id, show_time, show_date, ticket_price)
VALUES 
('$movie_id', '$theatre_id', '$show_time', '$show_date', '$price')";

// EXECUTE
if ($conn->query($sql)) {
    header("Location: ../theatre_home.php");
    exit();
} else {
    echo "Error: " . $conn->error;
}
?>