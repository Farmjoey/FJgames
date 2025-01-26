<?php
session_start(); // Start en session for at holde brugeren logget ind
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Clear any existing error messages
unset($_SESSION['error']);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    // Debug log the received data (remove in production)
    error_log("Login attempt - Username: $username");
    
    // Validate input
    if (empty($username) || empty($password)) {
        $_SESSION['error'] = "Udfyld venligst alle felter";
        header("Location: login.html");
        exit();
    }

    // Read users file
    $usersFile = 'users.txt';
    if (file_exists($usersFile)) {
        $users = file_get_contents($usersFile);
        $userLines = explode("\n", $users);
        
        foreach ($userLines as $line) {
            if (empty(trim($line))) continue;
            
            // Parse user data
            preg_match('/Brugernavn: (.*?), Email: (.*?), Adgangskode: (.*?)$/', $line, $matches);
            
            if ($matches && $matches[1] === $username) {
                $stored_hash = $matches[3];
                
                if (password_verify($password, $stored_hash)) {
                    $_SESSION['username'] = $username;
                    $_SESSION['logged_in'] = true;
                    header("Location: index.html");
                    exit();
                } else {
                    $_SESSION['error'] = "Forkert brugernavn eller adgangskode";
                    break;
                }
            }
        }
        
        if (!isset($_SESSION['logged_in'])) {
            $_SESSION['error'] = "Forkert brugernavn eller adgangskode";
        }
    } else {
        $_SESSION['error'] = "System fejl - kontakt administrator";
    }
    
    header("Location: login.html");
    exit();
} else {
    echo "Ugyldig anmodning!";
}

// If someone tries to access this file directly without POST
header("Location: login.html");
exit();
?>
