<?php

session_start(); // ✅ VERY IMPORTANT

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("../../db.php");

// ✅ GET USER FROM SESSION
if(!isset($_SESSION['user_id'])){
    echo "User not logged in";
    exit;
}

$user_id = $_SESSION['user_id'];

$show_id = $_POST['show_id'] ?? '';
$seats = $_POST['seats'] ?? '';
$total = $_POST['total'] ?? '';

if(!$show_id || !$seats || !$total){
    echo "Missing data";
    exit;
}

// ================= INSERT =================
$stmt = $conn->prepare("INSERT INTO booking 
(user_id, show_id, seats, total_price, booking_date) 
VALUES (?, ?, ?, ?, NOW())");

$stmt->bind_param("iisd", $user_id, $show_id, $seats, $total);

if($stmt->execute()){
    echo "success";
} else {
    echo "Error: " . $stmt->error;
}