<?php

include("../../db.php");

//check is ID is provided 
if(!isset($_GET['id'])){
  echo json_encode(["error" => "no ID provided"]);
  exit();
}

$id = $_GET['id'];

//query to get theatre details
$sql = "SELECT * FROM theatre WHERE theatre_id = '$id' ";

$result = mysqli_query($conn,$sql);

//check if data found
if(mysqli_num_rows($result) > 0){
   $row = mysqli_fetch_assoc($result);

   //send data as JSON
   echo json_encode([
      "name" => $row['theatre_name'],
      "owner" => $row['owner_name'],
      "license" => $row['license_number'],
      "type" => $row['theatre_type'],
      "ac" => $row['ac_type'],
      "seats" => $row['seats'],
      "address" => $row['address']    
   ]);
}
else{
  echo json_encode(["error" => "no data found"]);
}
?>


