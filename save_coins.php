<?php
session_start();

$file = 'coins.txt';  // Filen til at gemme mønter

// Tjek om brugeren er logget ind
if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $newCoins = intval($_POST['coins']);  // Nye mønter sendt fra klienten

    // Læs de aktuelle mønter fra filen
    $coinsData = [];
    if (file_exists($file)) {
        $fileContent = file_get_contents($file);
        $coinsData = json_decode($fileContent, true);
    }

    // Opdater brugerens mønter, kun hvis de nye mønter er højere end de tidligere
if (!isset($coinsData[$username]) || $newCoins > $coinsData[$username]) {
    $coinsData[$username] = $newCoins;
}

// Skriv de opdaterede mønter tilbage til filen
file_put_contents($file, json_encode($coinsData));


    echo json_encode(['status' => 'success', 'new_coins' => $coinsData[$username]]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
}
?>
