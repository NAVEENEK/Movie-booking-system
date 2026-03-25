<?php

include "../../db.php";

$license = $_POST['license'];
$password = $_POST['password'];

$sql = "SELECT * FROM theatre WHERE license_number='$license'";
$result = $conn->query($sql);

if($result->num_rows > 0){

    $row = $result->fetch_assoc();

    if($password == $row['password']){

        if($row['status'] == "pending"){
            header("Location: ../../THEATRE/waiting.html");
            exit();
        }

        elseif($row['status'] == "approved"){
            header("Location: ../../THEATRE/theatre_home.html");
            exit();
        }

        elseif($row['status'] == "rejected"){
            header("Location: ../../THEATRE/rejected.html");
            exit();
        }

    } else {
        echo "Invalid password";
    }

} else {
    echo "Invalid license number";
}
?>