<?php

include("../../db.php");

// Debug (optional)
echo "POST DATA: ";
print_r($_POST);
echo "<br>";

if (!$conn) {
    die("DB connection failed");
}

if (isset($_POST['id']) && isset($_POST['status'])) {

    $id = $_POST['id'];
    $status = $_POST['status'];

    echo "ID: $id STATUS: $status<br>";

    if ($status === "approved") {

        $sql = "UPDATE theatre SET status='approved' WHERE theatre_id='$id'";

        if (mysqli_query($conn, $sql)) {
            echo "approved";
        } else {
            echo "SQL error: " . mysqli_error($conn);
        }

    } 
    elseif ($status === "rejected") {

        // ✅ FIXED LINE (added quotes)
        $sql = "UPDATE theatre SET status='rejected' WHERE theatre_id='$id'";

        if (mysqli_query($conn, $sql)) {
            echo "rejected";
        } else {
            echo "SQL error: " . mysqli_error($conn);
        }

    } 
    else {
        echo "invalid status";
    }

} else {
    echo "invalid request";
}

?>