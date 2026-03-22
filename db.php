<?php

$host = "localhost";
$username = "root";
$pass = "";
$database = "movie_booking_system";

// connect to database 
$conn = new mysqli($host,$username,$pass,$database);

//check connection 
if($conn->connect_error){
  die("connection failed". $conn->connect_error);
}

?>