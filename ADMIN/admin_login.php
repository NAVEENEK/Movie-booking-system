<?php

$passkey = $_POST['passkey'] 
$admin_pass = "1234";

if ($passkey === "$admin_pass") {
    header("Location: admin_home.html");
    exit();
} else {
    echo "<script>
            alert('Wrong Password');
            window.location.href='../LOGIN/admin_login.html';
          </script>";
}

?>
