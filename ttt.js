let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = ""; // 'solo' for solo play, 'bot' for playing against the bot

const statusDisplay = document.getElementById("status");
const boardElement = document.getElementById("board");
const gameModeSelectionElement = document.getElementById("game-mode-selection");
statusDisplay.innerHTML = "Select a game mode to start";

// Winning conditions
const winConditions = [
  [0, 1, 2], // horizontal top
  [3, 4, 5], // horizontal middle
  [6, 7, 8], // horizontal bottom
  [0, 3, 6], // vertical left
  [1, 4, 7], // vertical middle
  [2, 5, 8], // vertical right
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

// Start the game based on selected mode
function startGame(mode) {
  gameMode = mode;
  gameModeSelectionElement.style.display = "none";
  boardElement.style.display = "grid";
  statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

// Check win or draw
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
      gameActive = false;
      return;
    }
  }
  if (!board.includes("")) {
    statusDisplay.innerHTML = "Game ended in a tie!";
    gameActive = false;
  }
}

// Handle player moves
function makeMove(index) {
  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  const cellElement = document.getElementById(`cell-${index}`);
  cellElement.innerHTML = currentPlayer;
  cellElement.classList.add(currentPlayer);
  handleResultValidation();

  if (!gameActive) return;

  if (gameMode === "solo") {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  } else if (gameMode === "bot" && currentPlayer === "X") {
    currentPlayer = "O";
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn (Bot)`;
    setTimeout(botMove, 500);
  }

  if (gameActive && currentPlayer === "X") {
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
  }
}

// Bot makes a smarter move
function botMove() {
  // Check if the bot can win in the next move
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] === "O" && board[b] === "O" && board[c] === "") {
      board[c] = currentPlayer;
      const cellElement = document.getElementById(`cell-${c}`);
      cellElement.innerHTML = currentPlayer;
      cellElement.classList.add(currentPlayer);
      handleResultValidation();
      currentPlayer = "X";
      if (gameActive) {
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
      }
      return;
    }
    if (board[a] === "O" && board[c] === "O" && board[b] === "") {
      board[b] = currentPlayer;
      const cellElement = document.getElementById(`cell-${b}`);
      cellElement.innerHTML = currentPlayer;
      cellElement.classList.add(currentPlayer);
      handleResultValidation();
      currentPlayer = "X";
      if (gameActive) {
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
      }
      return;
    }
    if (board[b] === "O" && board[c] === "O" && board[a] === "") {
      board[a] = currentPlayer;
      const cellElement = document.getElementById(`cell-${a}`);
      cellElement.innerHTML = currentPlayer;
      cellElement.classList.add(currentPlayer);
      handleResultValidation();
      currentPlayer = "X";
      if (gameActive) {
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
      }
      return;
    }
  }

  // Check if the player could win in the next move and block them
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] === "X" && board[b] === "X" && board[c] === "") {
      board[c] = currentPlayer;
      const cellElement = document.getElementById(`cell-${c}`);
      cellElement.innerHTML = currentPlayer;
      cellElement.classList.add(currentPlayer);
      handleResultValidation();
      currentPlayer = "X";
      if (gameActive) {
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
      }
      return;
    }
    if (board[a] === "X" && board[c] === "X" && board[b] === "") {
      board[b] = currentPlayer;
      const cellElement = document.getElementById(`cell-${b}`);
      cellElement.innerHTML = currentPlayer;
      cellElement.classList.add(currentPlayer);
      handleResultValidation();
      currentPlayer = "X";
      if (gameActive) {
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
      }
      return;
    }
    if (board[b] === "X" && board[c] === "X" && board[a] === "") {
      board[a] = currentPlayer;
      const cellElement = document.getElementById(`cell-${a}`);
      cellElement.innerHTML = currentPlayer;
      cellElement.classList.add(currentPlayer);
      handleResultValidation();
      currentPlayer = "X";
      if (gameActive) {
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
      }
      return;
    }
  }

  // If no immediate win or block, pick a random available spot
  const availableSpots = board.reduce((acc, curr, idx) => {
    if (curr === "") acc.push(idx);
    return acc;
  }, []);

  if (availableSpots.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableSpots.length);
    const bestMove = availableSpots[randomIndex];
    board[bestMove] = currentPlayer;
    const cellElement = document.getElementById(`cell-${bestMove}`);
    cellElement.innerHTML = currentPlayer;
    cellElement.classList.add(currentPlayer);
    handleResultValidation();

    currentPlayer = "X";
    if (gameActive) {
      statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
    }
  }
}

// Check for a winning condition
function handleResult(board) {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] === "O" && board[b] === "O" && board[c] === "O") return 1; // Bot wins
    if (board[a] === "X" && board[b] === "X" && board[c] === "X") return -1; // Player wins
  }
  if (!board.includes("")) {
    return 0; // Tie
  }
  return null; // Game still ongoing
}

// Reset the game and ask for game mode again
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("X", "O");
  });
  boardElement.style.display = "none";
  gameModeSelectionElement.style.display = "block";
  statusDisplay.innerHTML = "Select a game mode to start";
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

