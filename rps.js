function playGame(playerChoice) {
    const choices = ["Rock", "Paper", "Scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const resultDisplay = document.getElementById("result");
    const playerChoiceImg = document.getElementById("playerChoiceImg");
    const computerChoiceImg = document.getElementById("computerChoiceImg");

    // Set image URLs based on choices
    const imageUrls = {
        Rock: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/rock.png?v=1729429391131",
        Paper: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/paper.png?v=1729429393422",
        Scissors: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/scissors.png?v=1729429396366",
    };

    // Update images based on choices
    playerChoiceImg.src = imageUrls[playerChoice];
    computerChoiceImg.src = imageUrls[computerChoice];

    // Show images
    playerChoiceImg.style.display = "block";
    computerChoiceImg.style.display = "block";

    // Determine the result
    if (playerChoice === computerChoice) {
        resultDisplay.innerHTML = `It's a draw! Both chose ${playerChoice}.`;
    } else if (
        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Scissors" && computerChoice === "Paper") ||
        (playerChoice === "Paper" && computerChoice === "Rock")
    ) {
        resultDisplay.innerHTML = `You win! ${playerChoice} beats ${computerChoice}.`;

        // Trigger confetti effect
        confetti();
    } else {
        resultDisplay.innerHTML = `You lose! ${computerChoice} beats ${playerChoice}.`;
    }

    // Show result with animation
    resultDisplay.classList.add("show");
    document.getElementById("choices").style.display = "none";

    // Show restart button with animation
    const restartButton = document.getElementById("restartButton");
    restartButton.classList.add("show-restart");
}

function restartGame() {
    document.getElementById("result").innerHTML = ""; // Clear the result
    document.getElementById("restartButton").classList.remove("show-restart"); // Hide restart button
    document.getElementById("choices").style.display = "block"; // Show choices again
    document.getElementById("result").classList.remove("show"); // Hide result for next round
}

document.addEventListener("DOMContentLoaded", function () {
  // Hent sessionstatus fra PHP
  fetch('session_status.php')
    .then(response => response.json())
    .then(data => {
      const userInfo = document.getElementById('user-info');

      if (data.loggedIn) {
        // Hvis brugeren er logget ind, vis velkomstbesked og logout
        userInfo.innerHTML = `
          <a class="login" class="welcome-message">Velkommen, ${data.username}!</a>
          <a class="login" href="logout.php" class="logout-btn">Logout</a>
        `;
      } else {
        // Hvis ikke logget ind, vis login og signup knapperne
        userInfo.innerHTML = `
          <a class="login" href="/login.html" class="login-btn">Login</a>
          <a class="login" href="/signup.html" class="signup-btn">Sign up</a>
        `;
      }
    })
    .catch(error => {
      console.error('Error fetching session status:', error);
    });
});



// JavaScript for toggling the navigation menu on mobile
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });