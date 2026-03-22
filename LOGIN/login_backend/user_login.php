<?php
include("../../db.php");

//get data from user
$email = $_POST["email"];
$password = $_POST["password"];

//validation
if(empty($email)||empty($password)){
  echo "All fields are required";
  exit();
}

//fetch user by email
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $sql);

//check if user exists
if(mysqli_num_rows($result)==1){
  //take the row from the query result and convert it into an associative array
  $row=mysqli_fetch_assoc($result);

  //check password
  if($password==$row['password']){

  //login successful
  header("Location: ../../USER/home.html");
  exit();
  }
  else{
    echo "invalid password";
  }

}
else{
    echo "user not found ";
  }

  ?>