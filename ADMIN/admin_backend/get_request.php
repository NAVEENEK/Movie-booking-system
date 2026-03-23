<?php
include("../../db.php");

//query to get theatre with status=pending
$sql = "SELECT theatre_id, theatre_name FROM theatre WHERE status='pending' ";

$result = mysqli_query($conn, $sql);

//store data in array 
$data = [];

while($row=mysqli_fetch_assoc($result)){
  $data[]=$row;
}

//send json response to view_request.js 
echo json_encode($data);

?>