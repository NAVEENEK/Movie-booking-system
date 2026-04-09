<?php

session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("../../db.php");

header("Content-Type: application/json");

// ✅ USE SESSION
if(!isset($_SESSION['user_id'])){
    echo json_encode([]);
    exit;
}

$user_id = $_SESSION['user_id'];

$sql = "
SELECT 
    b.seats,
    b.total_price,
    b.booking_date,
    m.title AS movie_name,
    t.theatre_name AS theatre_name
FROM booking b
JOIN shows s ON b.show_id = s.show_id
JOIN movie m ON s.movie_id = m.movie_id
JOIN theatre t ON s.theatre_id = t.theatre_id
WHERE b.user_id = $user_id
ORDER BY b.booking_date DESC
";

$result = $conn->query($sql);

if(!$result){
    echo json_encode(["error"=>$conn->error]);
    exit;
}

$data = [];

while($row = $result->fetch_assoc()){
    $data[] = $row;
}

echo json_encode($data);