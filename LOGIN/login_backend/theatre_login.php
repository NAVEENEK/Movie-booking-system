<?php
session_start();
include("../../db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $license = $_POST['license'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM theatre WHERE license_number='$license'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();

        // check password
        if ($password == $row['password']) {

            // check approval
            if ($row['status'] == "approved") {

                // ✅ STORE theatre_id IN SESSION
                $_SESSION['theatre_id'] = $row['theatre_id'];
                $_SESSION['theatre_name'] = $row['name'];

                // redirect to dashboard
                header("Location: ../../THEATRE/theatre_home.php");
                exit();

            } else {
                echo "Your account is not approved yet.";
            }

        } else {
            echo "Invalid password.";
        }

    } else {
        echo "Theatre not found.";
    }
}
?>