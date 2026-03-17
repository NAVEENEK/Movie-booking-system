<?php
$passkey = $_POST['passkey'];

// Set admin password
$admin_pass = "admin123";

if ($passkey == $admin_pass) {
    // Redirect to admin dashboard
    header("Location: ../ADMIN/admin_home.html");
    exit();
} else {
    echo "<script>
            alert('Wrong Passkey!');
            window.location.href='admin_login.html';
          </script>";
}
?>