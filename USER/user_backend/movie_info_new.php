<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("../../db.php");

header("Content-Type: application/json");

$movie_id = $_GET['movie_id'] ?? '';
$date = $_GET['date'] ?? '';
$district = $_GET['district'] ?? '';

if(!$movie_id || !$date){
    echo json_encode([]);
    exit;
}

/* ================= QUERY ================= */

$sql = "SELECT 
            t.theatre_id,
            t.theatre_name,
            t.ac_type,
            s.show_id,
            s.show_time
        FROM shows s
        JOIN theatre t ON s.theatre_id = t.theatre_id
        WHERE s.movie_id = '$movie_id'
        AND s.show_date = '$date'";

if($district != ""){
    $sql .= " AND t.district = '$district'";
}

$sql .= " ORDER BY t.theatre_name, s.show_time";

/* ================= EXECUTE ================= */

$result = $conn->query($sql);

if(!$result){
    echo json_encode([
        "error" => $conn->error
    ]);
    exit;
}

/* ================= FORMAT ================= */

$theatres = [];

while($row = $result->fetch_assoc()){

    $tid = $row['theatre_id'];

    if(!isset($theatres[$tid])){
        $theatres[$tid] = [
            "theatre_id" => $tid,
            "theatre_name" => $row['theatre_name'],
            "ac_type" => $row['ac_type'],
            "shows" => []   // ✅ changed
        ];
    }

    $theatres[$tid]["shows"][] = [
        "show_id" => $row['show_id'],     // ✅ added
        "show_time" => $row['show_time']  // ✅ added
    ];
}

/* ================= OUTPUT ================= */

echo json_encode(array_values($theatres));

?>