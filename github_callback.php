<?php
session_start();
header('Content-Type: application/json');

if (isset($_GET['code'])) {
    $code = $_GET['code'];
    
    // Your GitHub OAuth App credentials
    $client_id = 'Ov23livP802DAkt3M7JY';
    $client_secret = 'fd32d304ebee9198d44104b5292251890d78f830';  // Removed extra space
    
    // Exchange code for access token
    $token_url = 'https://github.com/login/oauth/access_token';
    $data = array(
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'code' => $code
    );
    
    // Add error logging
    error_log("Attempting GitHub login with code: " . $code);
    
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n" .
                        "Accept: application/json\r\n", // Add JSON accept header
            'method'  => 'POST',
            'content' => http_build_query($data)
        )
    );
    
    try {
        $context = stream_context_create($options);
        $result = file_get_contents($token_url, false, $context);
        
        if ($result === FALSE) {
            error_log("Error getting access token from GitHub");
            throw new Exception("Failed to get access token");
        }
        
        // Decode JSON response
        $token_data = json_decode($result, true);
        error_log("Token response: " . print_r($token_data, true));
        
        if (isset($token_data['access_token'])) {
            // Get user data from GitHub
            $user_url = 'https://api.github.com/user';
            $options = array(
                'http' => array(
                    'header'  => "User-Agent: FJGames\r\n" . // Add proper user agent
                                "Authorization: Bearer " . $token_data['access_token'] . "\r\n" .
                                "Accept: application/json\r\n",
                    'method'  => 'GET'
                )
            );
            
            $context = stream_context_create($options);
            $user_response = file_get_contents($user_url, false, $context);
            
            if ($user_response === FALSE) {
                error_log("Error getting user data from GitHub");
                throw new Exception("Failed to get user data");
            }
            
            $user_data = json_decode($user_response, true);
            error_log("User data: " . print_r($user_data, true));
            
            if (isset($user_data['login'])) {
                // Create or update user in your system
                $username = $user_data['login'];
                
                // Set session
                $_SESSION['username'] = $username;
                $_SESSION['logged_in'] = true;
                
                // Redirect to home page
                header('Location: index.html');
                exit;
            } else {
                error_log("No login field in user data");
                throw new Exception("Invalid user data");
            }
        } else {
            error_log("No access token in response");
            throw new Exception("No access token received");
        }
    } catch (Exception $e) {
        error_log("GitHub login error: " . $e->getMessage());
        header('Location: login.html?error=' . urlencode($e->getMessage()));
        exit;
    }
} else {
    error_log("No code parameter received from GitHub");
    header('Location: login.html?error=no_code_received');
    exit;
}
?> 