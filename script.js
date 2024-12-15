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

// Calculate the value of a click at this current moment
function getClickValue(){
  // This can get fancier if the powerUp ever gets upgrades :D 
  const powerupMultiplier = powerUpActive ? 2 : 1;
  return clickPower * powerupMultiplier;
}

// Enhanced Random Number Generator with Smart Precision
function rng(low, high, decimals = null) {
  const lowDecimals = (low.toString().split(".")[1] || "").length;
  const highDecimals = (high.toString().split(".")[1] || "").length;
  const derivedDecimals = Math.max(lowDecimals, highDecimals); // Derive max precision
  
  const randomValue = Math.random() * (high - low) + low;
  
  // If decimals is explicitly set, use it; otherwise, use derived precision
  return decimals !== null 
    ? parseFloat(randomValue.toFixed(decimals)) 
    : parseFloat(randomValue.toFixed(derivedDecimals));
}

// Handle clicking the sprite
sprite.addEventListener("click", (event) => {
  const clickValue = getClickValue();
  score += clickValue
  scoreDisplay.textContent = score;

  // Create a popup score animation
  const popup = document.createElement("div");
  popup.className = "score-popup";
  popup.textContent = `+${clickValue}`;
  popup.style.left = `${event.clientX - gameContainer.offsetLeft + rng(-40,40)}px`;
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
    powerUpButton.classList.add("active");
    scoreDisplay.textContent = score;

    // Power-up lasts for 10 seconds
    setTimeout(() => {
      powerUpActive = false;
      powerUpButton.classList.remove("active");
    }, 10000);
  }
});
