<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("../../db.php");

header("Content-Type: application/json");

$show_id = $_GET['show_id'] ?? '';

if(!$show_id){
    echo json_encode([]);
    exit;
}

// ==========================
// JOIN QUERY
// ==========================
$sql = "SELECT 
            m.title,
            m.rating,
            m.language,
            m.genre,
            m.poster,
            t.name AS theatre_name,
            s.show_time,
            s.show_date
        FROM shows s
        JOIN movie m ON s.movie_id = m.movie_id
        JOIN theatre t ON s.theatre_id = t.theatre_id
        WHERE s.show_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $show_id);
$stmt->execute();

$result = $stmt->get_result();

if($row = $result->fetch_assoc()){
    echo json_encode($row);
} else {
    echo json_encode([]);
}

?>