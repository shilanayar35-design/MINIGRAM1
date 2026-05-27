const bird = document.getElementById("bird");
const gameArea = document.getElementById("gameArea");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let birdY = 200;
let velocity = 0;

const gravity = 0.45;
const jumpPower = -7.5;

let gameRunning = false;
let gameStarted = false;

let score = 0;
let pipes = [];

let loopId = null;

function resetGame() {
  birdY = 200;
  velocity = 0;
  score = 0;
  pipes = [];

  scoreEl.innerText = score;

  document.querySelectorAll(".pipe").forEach(p => p.remove());

  bird.style.top = birdY + "px";
  bird.style.transform = "rotate(0deg)";
}

function startGame() {
  if (gameRunning) return;

  resetGame();

  gameRunning = true;
  gameStarted = true;

  spawnPipe();
  loop();
}

function flap() {
  if (!gameRunning) return;
  velocity = jumpPower;
}

document.addEventListener("keydown", (e) => {
  if (!gameStarted) startGame();
  flap();
});

document.addEventListener("touchstart", () => {
  if (!gameStarted) startGame();
  flap();
});

startBtn.addEventListener("click", startGame);

function updateBird() {
  velocity += gravity;
  birdY += velocity;

  bird.style.top = birdY + "px";

  bird.style.transform = `rotate(${velocity * 3}deg)`;

  if (birdY > 490 || birdY < 0) {
    gameOver();
  }
}

function spawnPipe() {
  if (!gameRunning) return;

  const gap = 135;
  const minTop = 60;
  const maxTop = 260;

  const topHeight = Math.random() * (maxTop - minTop) + minTop;

  const topPipe = document.createElement("div");
  const bottomPipe = document.createElement("div");

  topPipe.classList.add("pipe");
  bottomPipe.classList.add("pipe");

  topPipe.style.height = topHeight + "px";
  bottomPipe.style.height = (520 - topHeight - gap) + "px";

  let x = 340;

  topPipe.style.left = x + "px";
  bottomPipe.style.left = x + "px";

  topPipe.style.top = "0px";
  bottomPipe.style.bottom = "0px";

  gameArea.appendChild(topPipe);
  gameArea.appendChild(bottomPipe);

  pipes.push({
    x,
    topPipe,
    bottomPipe,
    topHeight,
    passed: false
  });

  setTimeout(spawnPipe, 1300);
}

function movePipes() {
  pipes.forEach(pipe => {
    pipe.x -= 2.7;

    pipe.topPipe.style.left = pipe.x + "px";
    pipe.bottomPipe.style.left = pipe.x + "px";

    // score
    if (!pipe.passed && pipe.x < 60) {
      score++;
      scoreEl.innerText = score;
      pipe.passed = true;
    }

    // collision (smooth)
    const birdTop = birdY;
    const birdBottom = birdY + 32;

    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + 52;

    if (pipeLeft < 90 && pipeRight > 60) {
      if (
        birdTop < pipe.topHeight ||
        birdBottom > pipe.topHeight + 135
      ) {
        gameOver();
      }
    }

    // cleanup
    if (pipe.x < -100) {
      pipe.topPipe.remove();
      pipe.bottomPipe.remove();
    }
  });

  pipes = pipes.filter(p => p.x > -150);
}

function loop() {
  if (!gameRunning) return;

  updateBird();
  movePipes();

  loopId = requestAnimationFrame(loop);
}

function gameOver() {
  gameRunning = false;

  cancelAnimationFrame(loopId);

  alert(" Game Over! Score: " + score);
}