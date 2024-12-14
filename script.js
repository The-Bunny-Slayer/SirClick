let score = 0;
let clickPower = 1;
let upgradeCost = 10;

const scoreDisplay = document.getElementById("score");
const clickImage = document.getElementById("click-image");
const upgradeButton = document.getElementById("upgrade-button");
const gameContainer = document.getElementById("game-container");

clickImage.addEventListener("click", (event) => {
  score += clickPower;
  scoreDisplay.textContent = score;

  // Create a popup score animation
  const popup = document.createElement("div");
  popup.className = "score-popup";
  popup.textContent = `+${clickPower}`;
  popup.style.left = `${event.clientX - gameContainer.offsetLeft - 20}px`;
  popup.style.top = `${event.clientY - gameContainer.offsetTop - 80}px`;
  gameContainer.appendChild(popup);

  // Remove the popup after animation ends
  setTimeout(() => popup.remove(), 1000);
});

upgradeButton.addEventListener("click", () => {
  if (score >= upgradeCost) {
    score -= upgradeCost;
    clickPower += 1;
    upgradeCost *= 2;
    scoreDisplay.textContent = score;
    upgradeButton.textContent = `Buy Upgrade (Cost: ${upgradeCost})`;
  }
});
