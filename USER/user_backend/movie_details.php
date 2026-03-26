
<?php

require("../../db.php");
header("Content-Type: application/json");

$movie_id = $_GET['movie_id'] ?? '';

if(empty($movie_id)){
    echo json_encode(["error" => "movie_id missing"]);
    exit();
}

$sql = "SELECT * FROM movie WHERE movie_id = '$movie_id'";
$result = $conn->query($sql);

if(!$result || $result->num_rows == 0){
    echo json_encode([]);
    exit();
}

echo json_encode($result->fetch_assoc());