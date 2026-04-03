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

$stmt = $conn->prepare("SELECT seats FROM booking WHERE show_id = ?");
$stmt->bind_param("i", $show_id);
$stmt->execute();

$result = $stmt->get_result();

$bookedSeats = [];

while($row = $result->fetch_assoc()){

    $seats = explode(",", $row['seats']);

    foreach($seats as $seat){
        $seat = intval($seat);
        if($seat > 0){
            $bookedSeats[] = $seat;
        }
    }
}

$bookedSeats = array_values(array_unique($bookedSeats));

echo json_encode($bookedSeats);

?>