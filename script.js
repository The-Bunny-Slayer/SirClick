let score = 0;
let clickPower = 1;
let upgradeCost = 10;
let powerUpCost = 50;
let powerUpActive = false;

const scoreDisplay = document.getElementById("score");
const sprite = document.getElementById("sprite");
const upgradeButton = document.getElementById("upgrade-button");
const powerUpButton = document.getElementById("powerup-button");
const gameContainer = document.getElementById("game-container");

// Handle clicking the sprite
sprite.addEventListener("click", (event) => {
  score += clickPower;
  scoreDisplay.textContent = score;

  // Create a popup score animation
  const popup = document.createElement("div");
  popup.className = "score-popup";
  popup.textContent = `+${clickPower}`;
  popup.style.left = `${event.clientX - gameContainer.offsetLeft - 20}px`;
  popup.style.top = `${event.clientY - gameContainer.offsetTop - 40}px`;
  gameContainer.appendChild(popup);

  // Remove the popup after animation ends
  setTimeout(() => popup.remove(), 1000);
});

// Handle upgrading click power
upgradeButton.addEventListener("click", () => {
  if (score >= upgradeCost) {
    score -= upgradeCost;
    clickPower += 1;
    upgradeCost *= 2;
    scoreDisplay.textContent = score;
    upgradeButton.textContent = `Buy Upgrade (Cost: ${upgradeCost})`;
  }
});

// Handle power-up activation
powerUpButton.addEventListener("click", () => {
  if (score >= powerUpCost && !powerUpActive) {
    score -= powerUpCost;
    powerUpActive = true;
    clickPower *= 2;
    powerUpButton.classList.add("active");
    scoreDisplay.textContent = score;

    // Power-up lasts for 10 seconds
    setTimeout(() => {
      powerUpActive = false;
      clickPower /= 2;
      powerUpButton.classList.remove("active");
    }, 10000);
  }
});
