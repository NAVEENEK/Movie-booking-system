<?php 

include("../../db.php");

$name = $_POST["name"];
$owner = $_POST["owner"];
$license = $_POST["license"];
$address = $_POST["address"];
$theatre_type = $_POST["theatre_type"];
$ac_type = $_POST["ac_type"];
$seats = $_POST["seats"];
$password = $_POST["password"];

//validation 
if(empty($name)||empty($owner)||empty($license)||empty($address)||empty($theatre_type)||empty($ac_type)||empty($seats)||empty($password)){
  echo "All fields are required ";
  exit();
}

// insert into db 
$sql = "INSERT INTO theatre (theatre_name,owner_name,license_number,address,password,theatre_type,ac_type,seats,status) VALUES ('$name','$owner','$license','$address','$password','$theatre_type','$ac_type','$seats','pending')";

//execute the query 
if(mysqli_query($conn, $sql)){
  header("Location:../../THEATRE/waiting.html");
  exit();
}
else{
  echo "Error:". mysqli_error($conn);
}

