const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const hackMenu = document.getElementById("hackMenu");

// Load images for textures
const birdImage = new Image();
birdImage.src =
  "https://cdn.glitch.global/a183a6a6-887a-4df5-b377-4bacac1507ed/bird.png?v=1728644673480";

const pipeImageTop = new Image();
pipeImageTop.src =
  "https://cdn.glitch.global/a183a6a6-887a-4df5-b377-4bacac1507ed/pipe2.png?v=1728645111818";

const pipeImageBottom = new Image();
pipeImageBottom.src =
  "https://cdn.glitch.global/a183a6a6-887a-4df5-b377-4bacac1507ed/pipe.png?v=1728644672719";

const backgroundImage = new Image();
backgroundImage.src =
  "https://cdn.glitch.global/a183a6a6-887a-4df5-b377-4bacac1507ed/dg34rsu-29a3d144-dc3f-473e-a949-f73a4ba1ef7c.png?v=1729071989488";

// Game Variables
const birdWidth = 34;
const birdHeight = 24;
let birdX = 50;
let birdY = 400;
let birdVelocity = 0;
const gravity = 0.25;
const jump = -5;
const mobileJump = -5;
const pipeWidth = 70;
let pipeGap = 150;
let pipeSpeed = 3.5;
let pipes = [];
let score = 0;
let highScore = 0;
let gameRunning = false;
let gameOver = false;
let birdAngle = 0;
let keepInMiddle = false;
let godMode = false;
let backgroundX = 0;
const backgroundSpeed = 2.5;
let coins = 0;

const keybinds = {
  keepInMiddle: "KeyK",
  godMode: "KeyG",
  increaseScore: "KeyI",
};

const minY = 100;
const maxY = canvas.height - pipeGap - 150;

// Create pipes at random height within min/max Y
function createPipe() {
  const pipeHeight = Math.random() * (maxY - minY) + minY;
  pipes.push({
    x: canvas.width,
    y: pipeHeight,
    passed: false,
  });
}

function checkCoins() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "get_coins.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        coins = response.coins;
        console.log("Coins loaded:", coins);
      } else {
        console.error("Error loading coins:", response.message);
      }
    }
  };
  xhr.send();
}


function saveCoins() {
  const xhr = new XMLHttpRequest();
  const data = new FormData();
  data.append("coins", coins);

  xhr.open("POST", "save_coins.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        console.log("Coins saved successfully!");
      } else {
        console.error("Error saving coins:", response.message);
      }
    }
  };
  xhr.send(data);
}


// Fetch high score from the server when the game starts
function checkHighScore() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "get_score.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        highScore = response.high_score;
        console.log("High score loaded:", highScore);
      } else {
        console.error("Error loading high score:", response.message);
      }
    }
  };
  xhr.send();
}

// Save high score to the server
function saveHighScore() {
  const xhr = new XMLHttpRequest();
  const data = new FormData();
  data.append("high_score", score);

  xhr.open("POST", "save_score.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        console.log("High score saved successfully!");
      } else {
        console.error("Error saving high score:", response.message);
      }
    }
  };
  xhr.send(data);
}

function resetGame() {
  birdX = 50;
  birdY = 400;
  birdVelocity = 0;
  pipes = [];
  score = 0;
  gameOver = false;
  gameRunning = true;
  birdAngle = 0;
  keepInMiddle = false;
  godMode = false;
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    handleJump();
  } else if (e.code === "Digit0") {
    toggleHackMenu();
  } else if (e.code === keybinds.keepInMiddle) {
    toggleKeepInMiddle();
  } else if (e.code === keybinds.godMode) {
    toggleGodMode();
  } else if (e.code === keybinds.increaseScore) {
    increaseScore();
  }
});

canvas.addEventListener("touchstart", function () {
  handleJump();
});

function handleJump() {
  if (!gameRunning && !gameOver) {
    gameRunning = true;
    birdVelocity = mobileJump;
  } else if (gameRunning) {
    birdVelocity = mobileJump;
  } else if (gameOver) {
    resetGame();
  }
}

function drawBackground() {
  ctx.drawImage(backgroundImage, backgroundX, 0, canvas.width, canvas.height);
  ctx.drawImage(
    backgroundImage,
    backgroundX + canvas.width,
    0,
    canvas.width,
    canvas.height
  );

  backgroundX -= backgroundSpeed;
  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }
}

function drawBird() {
  ctx.save();
  ctx.translate(birdX + birdWidth / 2, birdY + birdHeight / 2);
  ctx.rotate(birdAngle);
  ctx.drawImage(
    birdImage,
    -birdWidth / 2,
    -birdHeight / 2,
    birdWidth,
    birdHeight
  );
  ctx.restore();
}

function drawPipes() {
  pipes.forEach((pipe) => {
    ctx.drawImage(pipeImageTop, pipe.x, 0, pipeWidth, pipe.y);
    ctx.drawImage(
      pipeImageBottom,
      pipe.x,
      pipe.y + pipeGap,
      pipeWidth,
      canvas.height - (pipe.y + pipeGap)
    );
  });
}

function updatePipes() {
  pipes.forEach((pipe) => {
    pipe.x -= pipeSpeed;
  });

  pipes = pipes.filter((pipe) => pipe.x + pipeWidth > 0);

  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
    createPipe();
  }
}

function checkCollision() {
  if (!godMode) {
    pipes.forEach((pipe) => {
      if (
        birdX < pipe.x + pipeWidth &&
        birdX + birdWidth > pipe.x &&
        (birdY < pipe.y || birdY + birdHeight > pipe.y + pipeGap)
      ) {
        gameOver = true;
      }
    });
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`High Score: ${highScore}`, 10, 60);
  ctx.fillText(`Coins: ${coins}`, 10, 90); // Tilføjet visning af mønter
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  if (gameRunning) {
    if (!keepInMiddle) {
      birdVelocity += gravity;
      birdY += birdVelocity;
    } else {
      birdY = canvas.height / 2 - birdHeight / 2;
    }

    if (birdVelocity < 0) {
      birdAngle = -Math.min(-birdVelocity / 10, Math.PI / 4);
    } else {
      birdAngle = Math.min(birdVelocity / 10, Math.PI / 2);
    }

    drawBird();
    updatePipes();
    drawPipes();
    checkCollision();

    pipes.forEach((pipe) => {
      if (pipe.x + pipeWidth < birdX && !pipe.passed) {
        score++;
        coins++;
        pipe.passed = true;
      }
    });

    drawScore();
  }

  if (gameOver) {
    gameRunning = false;

    if (score > highScore) {
      highScore = score;
      saveHighScore(); // Save the new high score when game is over
    }
    
      saveCoins(); // Gemmer mønterne ved game over

    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    const gameOverText = "Game Over";
    const finalScoreText = `Final Score: ${score}`;
    const highScoreText = `High Score: ${highScore}`;
    const restartText = "Press SPACE to Restart";

    const gameOverTextWidth = ctx.measureText(gameOverText).width;
    const finalScoreTextWidth = ctx.measureText(finalScoreText).width;
    const highScoreTextWidth = ctx.measureText(highScoreText).width;
    const restartTextWidth = ctx.measureText(restartText).width;

    ctx.fillText(
      gameOverText,
      (canvas.width - gameOverTextWidth) / 2,
      canvas.height / 2 - 80
    );
    ctx.fillStyle = "black";
    ctx.fillText(
      finalScoreText,
      (canvas.width - finalScoreTextWidth) / 2,
      canvas.height / 2 - 40
    );
    ctx.fillText(
      highScoreText,
      (canvas.width - highScoreTextWidth) / 2,
      canvas.height / 2 + 20
    );
    ctx.fillText(
      restartText,
      (canvas.width - restartTextWidth) / 2,
      canvas.height / 2 + 100
    );
  }

  if (!gameRunning && !gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    const startText = "Press SPACE to Start";
    const startTextWidth = ctx.measureText(startText).width;
    ctx.fillText(
      startText,
      (canvas.width - startTextWidth) / 2,
      canvas.height / 2 - 20
    );
  }

  requestAnimationFrame(gameLoop);
}

// Start the game and check for high score when the game is loaded
document.addEventListener("DOMContentLoaded", function () {
  checkHighScore(); // Load the high score from server
  checkCoins();
  gameLoop();
});

// Toggle the hack menu
function toggleHackMenu() {
  hackMenu.style.display = hackMenu.style.display === "none" ? "block" : "none";
}

// Hack functions
function toggleGodMode() {
  godMode = !godMode;
  alert(godMode ? "God Mode Activated" : "God Mode Deactivated");
}

function increaseScore() {
  score += 100;
}

// Allow custom keybind changes via hack menu inputs
const keybindInputs = document.querySelectorAll(".keybind-input");
keybindInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.value = ""; // Clear current value
    document.addEventListener("keydown", function keyHandler(e) {
      input.value = e.code;
      const keybindAction = input.id.replace("Key", "");
      keybinds[keybindAction] = e.code; // Update the keybind
      document.removeEventListener("keydown", keyHandler);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Hent sessionstatus fra PHP
  fetch("session_status.php")
    .then((response) => response.json())
    .then((data) => {
      const userInfo = document.getElementById("user-info");

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
    .catch((error) => {
      console.error("Error fetching session status:", error);
    });
});

// JavaScript for toggling the navigation menu on mobile
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
