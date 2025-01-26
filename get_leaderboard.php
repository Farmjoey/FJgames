<?php
$highScoresFile = 'highscores.txt';

// Read the high scores from the file
$highScoresJson = file_get_contents($highScoresFile);

// Parse the JSON data into an associative array
$highScores = json_decode($highScoresJson, true);

// Convert the associative array into a leaderboard array
$leaderboard = array();
foreach ($highScores as $username => $score) {
    $leaderboard[] = array(
        'username' => $username,
        'high_score' => intval($score)
    );
}

// Sort the leaderboard by high score in descending order
usort($leaderboard, function($a, $b) {
    return $b['high_score'] - $a['high_score'];
});

// Limit the leaderboard to the top 3 scores
$leaderboard = array_slice($leaderboard, 0, 10);

// Return the leaderboard as JSON
echo json_encode(array('status' => 'success', 'leaderboard' => $leaderboard));
?> 