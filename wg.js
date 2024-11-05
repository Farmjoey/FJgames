// Liste over mulige 4-bogstavsord og det rigtige ord for spillet
const wordList = [
  "able",
  "acid",
  "aged",
  "aide",
  "aqua",
  "area",
  "army",
  "arts",
  "atom",
  "aunt",
  "baby",
  "bake",
  "ball",
  "band",
  "bank",
  "bath",
  "beam",
  "beep",
  "bell",
  "bend",
  "bill",
  "blue",
  "boat",
  "bowl",
  "cake",
  "call",
  "card",
  "care",
  "case",
  "cast",
  "chat",
  "clam",
  "clay",
  "clip",
  "coat",
  "come",
  "cool",
  "cure",
  "dart",
  "date",
  "deed",
  "deep",
  "desk",
  "dial",
  "dirt",
  "dove",
  "drop",
  "dust",
  "each",
  "earn",
  "edge",
  "exit",
  "fair",
  "fake",
  "fast",
  "fate",
  "file",
  "film",
  "find",
  "fire",
  "fool",
  "fork",
  "frog",
  "gain",
  "gale",
  "game",
  "gaze",
  "gift",
  "glad",
  "glow",
  "grab",
  "grip",
  "hail",
  "half",
  "hand",
  "hard",
  "hate",
  "hear",
  "heel",
  "heat",
  "hero",
  "hide",
  "hike",
  "hole",
  "hope",
  "hunt",
  "idea",
  "inch",
  "iron",
  "joke",
  "jump",
  "kill",
  "kind",
  "lace",
  "lake",
  "land",
  "last",
  "like",
  "lift",
  "line",
  "link",
  "list",
  "look",
  "loop",
  "loud",
  "love",
  "luck",
  "made",
  "mail",
  "make",
  "meal",
  "meat",
  "meet",
  "melt",
  "mice",
  "milk",
  "mine",
  "moan",
  "more",
  "much",
  "name",
  "neck",
  "news",
  "note",
  "over",
  "pack",
  "pain",
  "pale",
  "park",
  "part",
  "pick",
  "pipe",
  "play",
  "poll",
  "pull",
  "rate",
  "read",
  "real",
  "rich",
  "rock",
  "role",
  "room",
  "root",
  "rush",
  "sail",
  "salt",
  "sand",
  "save",
  "seat",
  "ship",
  "shoe",
  "sing",
  "sink",
  "site",
  "slap",
  "slip",
  "snow",
  "soda",
  "soft",
  "soul",
  "spin",
  "stab",
  "star",
  "step",
  "stop",
  "sway",
  "tale",
  "team",
  "tear",
  "term",
  "that",
  "tide",
  "time",
  "tone",
  "turn",
  "type",
  "unit",
  "vast",
  "wait",
  "walk",
  "warm",
  "wear",
  "weed",
  "wave",
  "weak",
  "wind",
  "wish",
  "wolf",
  "yarn",
  "zone",
  "abbe",
  "abel",
  "able",
  "abri",
  "aces",
  "aqua",
  "aunt",
  "axis",
  "bald",
  "band",
  "bark",
  "bawl",
  "bead",
  "beef",
  "been",
  "belt",
  "bide",
  "bill",
  "bink",
  "bore",
  "bowl",
  "buds",
  "bump",
  "cafe",
  "cane",
  "cape",
  "cast",
  "clap",
  "clip",
  "cobs",
  "coil",
  "cold",
  "cone",
  "core",
  "cows",
  "crew",
  "dare",
  "deed",
  "dine",
  "dirt",
  "dome",
  "dove",
  "drip",
  "duck",
  "echo",
  "emit",
  "even",
  "face",
  "fame",
  "farm",
  "fate",
  "fawn",
  "fire",
  "fish",
  "flap",
  "flea",
  "flip",
  "flop",
  "flow",
  "fold",
  "free",
  "fume",
  "gear",
  "glad",
  "glow",
  "grab",
  "grim",
  "gush",
  "half",
  "hike",
  "hill",
  "hope",
  "idle",
  "inch",
  "iron",
  "item",
  "jail",
  "jeep",
  "joke",
  "jump",
  "just",
  "keen",
  "kill",
  "kite",
  "know",
  "lace",
  "leaf",
  "list",
  "loop",
  "loud",
  "mate",
  "meat",
  "mice",
  "mine",
  "mist",
  "moat",
  "more",
  "muff",
  "neck",
  "news",
  "nibs",
  "noon",
  "nose",
  "note",
  "oval",
  "pace",
  "part",
  "pick",
  "plow",
  "plum",
  "port",
  "pull",
  "pure",
  "quit",
  "quiz",
  "rake",
  "rate",
  "read",
  "risk",
  "roll",
  "room",
  "root",
  "sail",
  "salt",
  "seat",
  "sink",
  "slap",
  "slip",
  "smug",
  "snee",
  "soul",
  "step",
  "take",
  "tank",
  "tide",
  "tore",
  "turn",
  "urge",
  "vary",
  "view",
  "walk",
  "warp",
  "wave",
  "weir",
  "wist",
  "wrap",
  "yarn",
  "zone",
  "acre",
  "anti",
  "arch",
  "bark",
  "bear",
  "beat",
  "bowl",
  "card",
  "care",
  "cure",
  "dust",
  "earn",
  "fawn",
  "firm",
  "flip",
  "fold",
  "glue",
  "gold",
  "grid",
  "hack",
  "hero",
  "idle",
  "iron",
  "join",
  "joke",
  "kind",
  "kill",
  "lamp",
  "lack",
  "made",
  "meal",
  "mild",
  "mine",
  "mute",
  "nail",
  "neat",
  "nook",
  "open",
  "pale",
  "part",
  "park",
  "rate",
  "rain",
  "root",
  "rose",
  "sail",
  "salt",
  "seal",
  "site",
  "sink",
  "star",
  "swan",
  "tame",
  "tone",
  "tree",
  "tide",
  "vain",
  "warp",
  "wean",
  "wide",
  "year",
  "zone",
  "acid",
  "area",
  "bore",
  "bark",
  "clue",
  "crow",
  "edge",
  "foul",
  "gaze",
  "hawk",
  "loud",
  "mule",
  "peep",
  "plum",
  "rate",
  "root",
  "seat",
  "swan",
  "turn",
  "vast",
  "view",
  "wish",
  "yell",
  "zone",
  "bark",
  "blow",
  "bump",
  "call",
  "coat",
  "coin",
  "dark",
  "deal",
  "deer",
  "dine",
  "done",
  "dust",
  "fine",
  "flee",
  "fold",
  "gaze",
  "give",
  "hard",
  "high",
  "kite",
  "lace",
  "lamp",
  "lure",
  "mesh",
  "mint",
  "mute",
  "name",
  "neat",
  "news",
  "nook",
  "pick",
  "poll",
  "rape",
  "rock",
  "room",
  "rude",
  "sail",
  "sink",
  "slap",
  "slip",
  "smug",
  "snee",
  "soul",
  "step",
  "take",
  "team",
  "that",
  "tick",
  "tide",
  "turn",
  "veal",
  "view",
  "vile",
  "wait",
  "wave",
  "wist",
  "yarn",
  "zero",
  "bark",
  "bake",
  "bold",
  "calm",
  "dear",
  "dupe",
  "foam",
  "gaze",
  "haze",
  "idea",
  "iron",
  "jeep",
  "kilt",
  "lame",
  "lean",
  "line",
  "loud",
  "maze",
  "mile",
  "moat",
  "nary",
  "peep",
  "pick",
  "rain",
  "rock",
  "sake",
  "seam",
  "shep",
  "slug",
  "stir",
  "take",
  "that",
  "thou",
  "tiny",
  "veil",
  "warp",
  "wash",
  "year",
  "zeal",
  "zero",
  "back",
  "bark",
  "bite",
  "boat",
  "cool",
  "cure",
  "draw",
  "ever",
  "game",
  "goal",
  "hand",
  "heel",
  "hope",
  "keen",
  "king",
  "land",
  "loud",
  "mask",
  "neat",
  "pore",
  "rare",
  "risk",
  "rose",
  "snug",
  "stop",
  "turn",
  "well",
  "zone",
  "also",
  "aqua",
  "bare",
  "bell",
  "cane",
  "deer",
  "dirt",
  "Aqua",
  "Blue",
  "Cyan",
  "Gold",
  "Gray",
  "Jade",
  "Lime",
  "pink",
  "Plum",
  "Mint",
  "Rose",
  "Ruby",
  "Sand",
  "Wine",
  "Pear",
];
let correctWord = wordList[Math.floor(Math.random() * wordList.length)];
let currentRow = 0;
let maxAttempts = 6;

const input = document.getElementById("input");
const submitButton = document.getElementById("submit");
const grid = document.getElementById("grid");
const message = document.getElementById("message");

function createGrid() {
  for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < 4; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.id = `tile-${i}-${j}`;
      grid.appendChild(tile);
    }
  }
}

function checkGuess(guess) {
  if (guess.length !== 4) {
    message.textContent = "Word must be 4 letters.";
    return;
  }

  if (!wordList.includes(guess)) {
    message.textContent = "Invalid word.";
    return;
  }

  message.textContent = "";

  for (let i = 0; i < 4; i++) {
    const tile = document.getElementById(`tile-${currentRow}-${i}`);
    tile.textContent = guess[i];

    if (guess[i] === correctWord[i]) {
      tile.classList.add("correct");
    } else if (correctWord.includes(guess[i])) {
      tile.classList.add("present");
    } else {
      tile.classList.add("absent");
    }
  }

  if (guess === correctWord) {
    message.textContent = "Congratulations! You guessed the word!";
    input.disabled = true;
    submitButton.disabled = true;
  } else {
    currentRow++;
    if (currentRow >= maxAttempts) {
      message.textContent = `Game over! The word was ${correctWord}.`;
      input.disabled = true;
      submitButton.disabled = true;
    }
  }
}

submitButton.addEventListener("click", () => {
  const guess = input.value.toLowerCase();
  checkGuess(guess);
  input.value = "";
});

function resetGame() {
  currentRow = 0;
  message.textContent = "";
  document.getElementById(
    "message"
  ).innerText = `Det korrekte ord var: ${correctWord}`;

  // Opdater korrekt ord
  correctWord = wordList[Math.floor(Math.random() * wordList.length)];

  // Tøm input og grid
  input.value = "";
  grid.innerHTML = "";

  // Opret et nyt grid
  createGrid();

  // Aktiver knapper
  input.disabled = false;
  submitButton.disabled = false;

  // Fjern beskeden efter 3 sekunder
  setTimeout(() => {
    document.getElementById("message").innerText = "";
  }, 3000);
}

document.getElementById("reset").addEventListener("click", resetGame);

// Kald createGrid ved indlæsning af siden
createGrid();

const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("click", () => {
    let letter = key.textContent.toLowerCase();

    if (letter === "del") {
      input.value = input.value.slice(0, -1);
    } else {
      if (input.value.length < 4) {
        input.value += letter;
      }
    }
  });
});


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


