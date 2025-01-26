<?php
session_start(); // Start en session til at gemme fejlbeskeder
$error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    // Debug log
    error_log("Signup attempt - Username: $username, Email: $email");

    // Validate passwords match
    if ($password !== $confirmPassword) {
        $_SESSION['error'] = "Adgangskoderne stemmer ikke overens!";
        header('Location: signup.html');
        exit;
    }

    // Load existing users
    $usersFile = 'users.txt';
    $users = '';
    
    if (file_exists($usersFile)) {
        $users = file_get_contents($usersFile);
    }

    // Debug log existing users
    error_log("Existing users before adding new user: " . $users);

    // Check if username exists
    if (strpos($users, "Brugernavn: " . $username . ",") !== false) {
        $_SESSION['error'] = "Brugernavnet er allerede i brug";
        header('Location: signup.html');
        exit;
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Debug log the hash
    error_log("Generated hash for $username: $hashedPassword");

    // Create new user entry in old format
    $newUser = "Brugernavn: " . $username . ", Email: " . $email . ", Adgangskode: " . $hashedPassword . "\n";

    // Add to existing users or create new file
    if (file_put_contents($usersFile, $newUser, FILE_APPEND)) {
        // Set session variables to log in the user
        $_SESSION['username'] = $username;
        $_SESSION['logged_in'] = true;
        
        error_log("User created successfully: $username");
        
        // Redirect to index page
        header("Location: index.html");
        exit();
    } else {
        error_log("Failed to save user data for: $username");
        $_SESSION['error'] = "Kunne ikke gemme oplysninger!";
        header('Location: signup.html');
        exit;
    }
}
?>
