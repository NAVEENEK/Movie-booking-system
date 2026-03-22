<?php

include ("../../db.php");
//get form data 


$name = $_POST['name'];
$dob = $_POST['dob'];
$gender = $_POST['gender'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$password = $_POST['password'];

// validation 
if(empty($name)||empty($dob)||empty($gender)||empty($email)||empty($phone)||empty($password)){
  echo "All fields are required";
  exit();
}

 

//insert into DB
$sql="INSERT INTO users (name, dob, gender, email, phone, password) VALUES ('$name','$dob','$gender','$email','$phone','$password')";

//execute the query 
if(mysqli_query($conn, $sql)){
  header("Location:../../USER/home.html");
  exit();
}
else{
  echo "Error:". mysqli_error($conn);
}

?>