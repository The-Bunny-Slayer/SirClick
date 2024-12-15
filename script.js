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

loadSavedValues();

// Calculate the value of a click at this current moment
function getClickValue(){
  // This can get fancier if the powerUp ever gets upgrades :D 
  const powerupMultiplier = powerUpActive ? 2 : 1;
  return clickPower * powerupMultiplier;
}

function loadSavedValues(){
  //set the values to the value saved in localStore if possible or keep its current (defualt) value
  setScore(storage.load("score", score));
  setUpgradeCost(storage.load("upgradeCost", upgradeCost));
  setClickPower(storage.load("clickPower", clickPower));
}

function setScore(value){
  score = value;
  storage.save("score", score);
  scoreDisplay.textContent = score;
}

function setUpgradeCost(value){
  upgradeCost = value;
  storage.save("upgradeCost", upgradeCost);
  upgradeButton.textContent = `Buy Upgrade (Cost: ${upgradeCost})`;
}

function setClickPower(value){
  clickPower = value;
  storage.save("clickPower", clickPower);
}

// Handle clicking the sprite
sprite.addEventListener("click", (event) => {
  const clickValue = getClickValue();
  setScore(score + clickValue);  

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
    setScore(score-upgradeCost);
    setClickPower(clickPower + 1);
    setUpgradeCost(upgradeCost * 2);
  }
});

// Handle power-up activation
powerUpButton.addEventListener("click", () => {
  if (score >= powerUpCost && !powerUpActive) {
    setScore(score-powerUpCost);
    powerUpActive = true;
    powerUpButton.classList.add("active");

    // Power-up lasts for 10 seconds
    setTimeout(() => {
      powerUpActive = false;
      powerUpButton.classList.remove("active");
    }, 10000);
  }
});
