// Constants
const SPEED_SCALE = 0.001;
const GROUND_SPEED = 0.1;
const JUMP_SPEED = 0.4;
const GRAVITY = 0.002;
const CACTUS_SPEED = 0.1;
const CACTUS_INTERVAL_MIN = 1000;
const CACTUS_INTERVAL_MAX = 3000;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

// Game elements
const game = document.querySelector("#root");
const scoreDisplay = document.createElement("div");
const startMessage = document.createElement("div");
const gameoverMessage = document.createElement("div");
game.appendChild(scoreDisplay);
game.appendChild(startMessage);
game.appendChild(gameoverMessage);

// Game state variables
let lastTime;
let speedScale;
let score;
let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;
let nextCactusTime;

// Initialize game
document.addEventListener("keydown", startGame, { once: true });

function startGame() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  nextCactusTime = CACTUS_INTERVAL_MIN;

  scoreDisplay.textContent = "Score: 0";
  startMessage.textContent = "Press any key to start";
  gameoverMessage.innerHTML = `<p>Game over</p><span>Press any key to restart</span>`;
  startMessage.classList.remove("hide");
  gameoverMessage.classList.add("hide");

  setupGround();
  setupDino();
  setupCactus();

  document.addEventListener("keydown", onJump);
}

// Frame update
function update(time) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;
  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  if (checkGameOver()) {
    handleGameOver();
    return;
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE;
}

function updateScore(delta) {
  score += delta * 0.1;
  scoreDisplay.textContent = `Score: ${Math.floor(score)}`;
}

function updateGround(delta, speedScale) {
  const grounds = document.querySelectorAll(".ground");
  grounds.forEach((ground) => {
    const left = parseFloat(getComputedStyle(ground).getPropertyValue("--left")) || 0;
    const newLeft = left - delta * speedScale * GROUND_SPEED;
    ground.style.setProperty("--left", `${newLeft}px`);

    if (newLeft <= -300) {
      ground.style.setProperty("--left", `${600}px`);
    }
  });
}

function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    return;
  }

  currentFrameTime += delta * speedScale;
  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    const dino = document.querySelector("#dino");
    dino.src = `offline-game/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
}

function setupDino() {
  const dino = document.createElement("img");
  dino.id = "dino";
  dino.src = "offline-game/dino-stationary.png";
  dino.classList.add("dino");
  game.appendChild(dino);
}

function handleJump(delta) {
  if (!isJumping) {
    return;
  }

  const dino = document.querySelector("#dino");
  const bottom = parseFloat(getComputedStyle(dino).getPropertyValue("--bottom")) || 0;
  const newBottom = bottom + yVelocity * delta;
  dino.style.setProperty("--bottom", `${newBottom}px`);

  if (newBottom <= 0) {
    dino.style.setProperty("--bottom", `0px`);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) {
    return;
  }

  isJumping = true;
  yVelocity = JUMP_SPEED;
}

function setupGround() {
  for (let i = 0; i < 2; i++) {
    const ground = document.createElement("img");
    ground.src = "offline-game/ground.png";
    ground.classList.add("ground");
    ground.style.setProperty("--left", `${i * 300}px`);
    game.appendChild(ground);
  }
}

function setupCactus() {
  const cactus = document.createElement("img");
  cactus.src = "offline-game/cactus.png";
  cactus.classList.add("cactus");
  cactus.style.setProperty("--left", `${600}px`);
  game.appendChild(cactus);
}

function updateCactus(delta, speedScale) {
  const cactus = document.querySelector(".cactus");
  const left = parseFloat(getComputedStyle(cactus).getPropertyValue("--left")) || 0;
  const newLeft = left - delta * speedScale * CACTUS_SPEED;
  cactus.style.setProperty("--left", `${newLeft}px`);

  if (newLeft <= -50) {
    cactus.style.setProperty("--left", `${600}px`);
    nextCactusTime = getRandomInt(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX);
  }
}

function checkGameOver() {
  const dino = document.querySelector("#dino");
  const dinoRect = dino.getBoundingClientRect();
  const cactus = document.querySelector(".cactus");
  const cactusRect = cactus.getBoundingClientRect();

  return dinoRect.left < cactusRect.left + cactusRect.width &&
    dinoRect.left + dinoRect.width > cactusRect.left &&
    dinoRect.top < cactusRect.top + cactusRect.height &&
    dinoRect.top + dinoRect.height > cactusRect.top;
}

function handleGameOver() {
  gameoverMessage.classList.remove("hide");
  startMessage.classList.add("hide");
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", startGame, { once: true });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Start the game
startGame();
window.requestAnimationFrame(update);
