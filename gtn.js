let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guess = Number(guessInput.value);
  const resultDisplay = document.getElementById("result");

  attempts++;

  if (guess === randomNumber) {
    resultDisplay.innerHTML = `Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts!`;
    document.getElementById("restartButton").style.display = "block"; // Show restart button
    document.getElementById("guessInput").style.display = "none"; // Hide input field
    document.querySelector('button[onclick="checkGuess()"]').style.display =
      "none"; // Hide submit button
  } else if (guess < randomNumber) {
    resultDisplay.innerHTML = "Too low! Try again.";
  } else if (guess > randomNumber) {
    resultDisplay.innerHTML = "Too high! Try again.";
  }

  guessInput.value = ""; // Clear the input after each guess
}

function restartGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById("result").innerHTML = ""; // Clear the result
  document.getElementById("restartButton").style.display = "none"; // Hide restart button

  // Show input field and button again
  document.getElementById("guessInput").style.display = "block"; // Show input field
  document.querySelector('button[onclick="checkGuess()"]').style.display =
    "inline-block"; // Show submit button

  // Clear the input field
  document.getElementById("guessInput").value = "";
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
          <a class="welcome-message">Velkommen, ${data.username}!</a>
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

