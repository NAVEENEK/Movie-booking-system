<!-- for , theatre,show time, filter

<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require("../../db.php");

header("Content-Type: application/json");

$movie_id = $_GET['movie_id'] ?? '';
$district = $_GET['district'] ?? '';
$date = $_GET['date'] ?? '';

if(empty($movie_id)){
    echo json_encode(["error" => "movie_id missing"]);
    exit();
}

// QUERY
$sql = "
SELECT 
    t.theatre_id,
    t.theatre_name,
    t.theatre_type,
    t.ac_type,
    s.show_time
FROM `show` s
JOIN theatre t ON s.theatre_id = t.theatre_id
WHERE s.movie_id = '$movie_id'
";

// FILTERS
if(!empty($district)){
    $sql .= " AND t.district = '$district'";
}

if(!empty($date)){
    $sql .= " AND s.show_date = '$date'";
}

// SORT TIME
$sql .= " ORDER BY s.show_time";

$result = $conn->query($sql);

if(!$result){
    echo json_encode(["sql_error" => $conn->error]);
    exit();
}

$theatres = [];

while($row = $result->fetch_assoc()){

    $id = $row['theatre_id'];

    if(!isset($theatres[$id])){
        $theatres[$id] = [
            "theatre_id" => $id,
            "theatre_name" => $row['theatre_name'],
            "format" => $row['theatre_type'],
            "ac_type" => $row['ac_type'],
            "times" => []
        ];
    }

    $theatres[$id]["times"][] = $row['show_time'];
}

echo json_encode(array_values($theatres));