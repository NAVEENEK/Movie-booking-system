<?php 

include("../../db");

$name = $_POST["name"];
$owner = $_POST["owner"];
$license = =$_POST["license"];
$address = $_POST["address"];
$password = $_POST["password"];

//validation 
if(empty($name)||empty($owner)||empty($license)||empty($address)||empty($password)){
  echo "All fields are required ";
  exit();
}

// insert into db 
$sql = "INSERT INTO theatre (name,owner,license,address,password) VALUES ('$name','$owner','$license','$address','$password')";

//execute the query 
if(mysqli_query($conn, $sql)){
  header("Location:../../THEATRE/waiting.html");
  exit();
}
else{
  echo "Error:". mysqli_error($conn);
}

