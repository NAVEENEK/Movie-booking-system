<?php
session_start(); // ✅ START SESSION

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

  $row=mysqli_fetch_assoc($result);

  //check password
  if($password==$row['password']){

    // ✅ STORE USER DATA IN SESSION
    $_SESSION['user_id'] = $row['user_id'];
    $_SESSION['user_name'] = $row['name'];

    //login successful
    header("Location: ../../USER/home.php");
    exit();

  } else {
    echo "invalid password";
  }

} else {
  echo "user not found";
}
?>