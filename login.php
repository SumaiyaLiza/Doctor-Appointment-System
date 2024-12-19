<?php
include('connect.php');
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize user input
    $email = $conn->real_escape_string(trim($_POST['email']));
    $password = $_POST['password']; // Don't sanitize password, it's used for comparison

    // Query to check if email exists
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch the user data
        $row = $result->fetch_assoc();
        
        // Verify the password
        if (password_verify($password, $row['password'])) {
            // Password is correct, login successful
            $_SESSION['user_id'] = $row['id']; // Store user ID in session
            $_SESSION['user_name'] = $row['firstname'] . ' ' . $row['lastname']; // Store user name
            header("Location: landingPage.html"); // Redirect to the dashboard or home page
            exit();
        } else {
            // Incorrect password
            echo "<script>alert('Incorrect password. Please try again.');</script>";
        }
    } else {
        // Email not found
        echo "<script>alert('No account found with that email.');</script>";
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
    <link rel="stylesheet" href="login.css">
    <title>Login</title>
</head>
<body>
    <form class="form" action="login.php" method="POST">
        <div class="flex-column">
            <label for="email">Email</label>
        </div>
        <div class="inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                <g data-name="Layer 3" id="Layer_3">
                    <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                </g>
            </svg>
            <input id="email" placeholder="Enter your Email" class="input" type="text" name="email" required />
        </div>

        <div class="flex-column">
            <label for="password">Password</label>
        </div>
        <div class="inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-64 0 512 512">
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
            </svg>
            <input id="password" placeholder="Enter your Password" class="input" type="password" name="password" required />
        </div>

        <div class="flex-row">
            <div>
                <input type="checkbox" name="remember" />
                <label>Remember me</label>
            </div>
            <span class="span">Forgot password?</span>
        </div>

        <button type="submit" class="button-submit">Sign In</button>

        <p class="p">Don't have an account? <span onclick="window.location.href='./register.php';" class="span">Sign Up</span></p>
        <p class="p line">Or With</p>

        <div class="flex-row">
            <button class="btn google">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                    <path d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z" style="fill:#FBBB00;"></path>
                    <path d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" style="fill:#518EF8;"></path>
                    <path d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" style="fill:#28B446;"></path>
                    <path d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z" style="fill:#F14336;"></path>
                </svg>
                Google
            </button>
            <button class="btn apple">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22.773 22.773">
                    <path d="M15.769,0c0.053,0,0.106,0,0.159,0c2.563,0,4.614,2.09,4.614,4.653c0,1.571-0.719,3.077-1.878,4.163c1.595,2.053,2.62,4.504,2.62,7.255c0,7.596-6.215,13.78-13.8,13.78c-7.588,0-13.8-6.184-13.8-13.78c0-3.377,1.347-6.45,3.532-8.74C0.393,6.808,1.27,3.295,3.442,1.566C4.907,0.055,6.95,0,8.09,0C9.746,0,11.266,0.764,12.353,2.067c0.897,1.303,1.395,3.007,1.242,4.667c1.768-0.344,3.53-1.465,4.66-2.79C16.81,1.351,16.273,0,15.769,0z" style="fill:#000000;"></path>
                </svg>
                Apple
            </button>
        </div>
    </form>
</body>
</html>
