<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("../../db.php");

header("Content-Type: application/json");

$user_id = $_GET['user_id'] ?? '';

if(!$user_id){
    echo json_encode([]);
    exit;
}

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