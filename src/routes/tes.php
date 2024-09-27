<?php

if( isset($_POST["Login"]) ){

    $username = $_POST["username"];
    $username = $_POST["password"];

    $result =mysqli_query($conn,"SELECT * FROM user WHERE username = '$username'");

    //cek username
    if( mysqli_num_rows($result) === 1) {

        // cek password
        $row = mysqli_fetch_assoc($result);
        if( password_verify($password, $row["password"]) ) {
            header("location: index.php");
            exit();
        }
    }

}

?>


<!DOCTYPE html>
<html>
<head>
<title>Halaman login</title>
</head>
<body>

<h1>Halaman Login</h1>


<form action="" method="post">

    <ul>
        <li>
            <label for ="username">usernanme :</label>
            <input type="username" name="username" id="username
            ">
        </li>
        <li>
            <label for ="password">password :</label>
            <input type="password" name="password" id="password
            ">
        </li>
        <li>
            <button type="submit" name="login">Login</button>
        </li>
    </ul>
</form>



</body>
</html>