const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const attemptCounter = document.getElementById('attemptCounter');

let attempts = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Liste over farver til kortene
const colors = [
    '#FF0909', '#FF0909', '#FF6F09', '#FF6F09',
    '#FFC909', '#FFC909', '#A9FF09', '#A9FF09',
    '#26FF09', '#26FF09', '#09FFF7', '#09FFF7',
    '#0915FF', '#0915FF', '#FF09C5', '#FF09C5'
];

// Shuffle cards (same as before)
function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

// Update attempt counter
function updateAttemptCounter() {
    attemptCounter.textContent = `Attempts: ${attempts}`;
}

// Create game board
function createBoard() {
    gameBoard.innerHTML = ''; // Clear the board
    shuffle(colors); // Shuffle farverne

    colors.forEach((color) => {
        const card = document.createElement('div');
        card.classList.add('card', 'shuffle'); // Add shuffle class for animation

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.style.backgroundColor = '#4b4b4b'; // Neutral farve til forsiden

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.style.backgroundColor = color; // Sæt kortets farve

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('shuffle'); // Fjern shuffle-klasse efter animationen
        });
    }, 1000); // Animation varer 1 sekund

    attempts = 0;
    updateAttemptCounter();
}

// Flip card
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        attempts++;
        updateAttemptCounter();
        checkForMatch();
    }
}

// Check if two cards match
function checkForMatch() {
    let isMatch = firstCard.querySelector('.card-back').style.backgroundColor === secondCard.querySelector('.card-back').style.backgroundColor;
    isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reset board variables
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Reset game
function resetGame() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    createBoard(); // Rebuild the game board and reshuffle
}

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Initialize game
createBoard();

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

