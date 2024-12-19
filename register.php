<?php
// Include the database connection
include('connect.php');

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $firstname = $conn->real_escape_string(trim($_POST['firstname']));
    $lastname = $conn->real_escape_string(trim($_POST['lastname']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $password = $_POST['password'];

    // Check if email already exists in the database
    $sql_check_email = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql_check_email);
    if ($result->num_rows > 0) {
        echo "";
    } else {
        // Securely hash the password
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        // Insert into database
        $sql = "INSERT INTO users (firstname, lastname, email, password) VALUES ('$firstname', '$lastname', '$email', '$hashed_password')";

        if ($conn->query($sql) === TRUE) {
            echo "<script>alert('Registration successful!');</script>";
        } else {
            
        }
    }
}

// Close the database connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./registration.css">
    <title>Registration Form</title>
</head>
<body>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./registration.css">
    <title>Registration Form</title>
</head>
<body>
<div class="form">
    <!-- Disable autocomplete for the entire form -->
    <form method="POST" autocomplete="off">
        <div class="subtitle">Let's create your account!</div>
        
        <!-- First Name -->
        <div class="input-container ic1">
            <input id="firstname" name="firstname" class="input" type="text" placeholder="" required>
            <div class="cut"></div>
            <label for="firstname" class="placeholder">First name</label>
        </div>
        
        <!-- Last Name -->
        <div class="input-container ic2">
            <input id="lastname" name="lastname" class="input" type="text" placeholder="" required>
            <div class="cut"></div>
            <label for="lastname" class="placeholder">Last name</label>
        </div>
        
        <!-- Email -->
        <div class="input-container">
            <input id="email" name="email" class="input" type="email" placeholder="" required autocomplete="off">
            <div class=""></div>
            <label for="email" class="placeholder">Email</label>
        </div>
        
        <!-- Password -->
        <div class="input-container ic2">
            <input id="password" name="password" class="input" type="password" placeholder="" required autocomplete="new-password">
            <div class="cut"></div>
            <label for="password" class="placeholder">Password</label>
        </div>
        
        <!-- Submit Button -->
        <button type="submit" class="submit">Submit</button>
    </form>
</div>
</body>
</html>

</body>
</html>
