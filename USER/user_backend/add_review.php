<?php

session_start();

/* ✅ CORRECT DB PATH (NO CONFUSION) */
include($_SERVER['DOCUMENT_ROOT'] . "/movie_booking/db.php");

header("Content-Type: application/json");

/* ✅ CHECK LOGIN */
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["message" => "Please login first"]);
    exit();
}

$user_id = $_SESSION['user_id'];

/* ✅ GET DATA */
$data = json_decode(file_get_contents("php://input"), true);

$movie_id = $data['movie_id'] ?? '';
$review_text = $data['review_text'] ?? '';

/* ✅ VALIDATION */
if (empty($movie_id) || empty($review_text)) {
    echo json_encode(["message" => "All fields required"]);
    exit();
}

/* 🔥 DEBUG: CHECK VALUES */
if (empty($user_id)) {
    echo json_encode(["message" => "Session user_id missing"]);
    exit();
}

/* ✅ INSERT QUERY */
$sql = "INSERT INTO review (user_id, movie_id, review_text)
        VALUES ('$user_id', '$movie_id', '$review_text')";

/* 🔥 FORCE ERROR CHECK */
$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "message" => "SQL FAILED",
        "error" => $conn->error
    ]);
    exit();
}

/* ✅ SUCCESS */
echo json_encode([
    "message" => "Review added successfully",
    "insert_id" => $conn->insert_id,
    "user_id" => $user_id,
    "movie_id" => $movie_id
]);

?>