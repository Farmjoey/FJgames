<?php
session_start();

if (isset($_SESSION['error'])) {
    echo htmlspecialchars($_SESSION['error']);
    // Ryd sessionen efter at fejlen er vist
    unset($_SESSION['error']);
}
?>
