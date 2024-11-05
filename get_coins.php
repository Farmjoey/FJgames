<?php 
session_start();

$file = 'coins.txt';  // Filen til at gemme mønter

if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];

    // Læs de aktuelle mønter fra filen
    $coinsData = [];
    if (file_exists($file)) {
        $fileContent = file_get_contents($file);
        $coinsData = json_decode($fileContent, true);
    }

    // Hvis brugeren har mønter gemt, returnér dem; ellers 0 mønter
    $userCoins = isset($coinsData[$username]) ? $coinsData[$username] : 0;

    echo json_encode(['status' => 'success', 'coins' => $userCoins]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
}
?>
