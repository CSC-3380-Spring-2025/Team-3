// GAME FOUR moving button 
// u have to click a certain amount 
//of times before time runs out



const targetNumberDisplay = document.getElementById('targetNumber') as HTMLSpanElement;
const timerDisplay = document.getElementById('timer') as HTMLSpanElement;
const scoreDisplay = document.getElementById('score') as HTMLSpanElement;
const movingButton = document.getElementById('movingButton') as HTMLButtonElement;
const gameContainer = document.querySelector('.game-container') as HTMLDivElement;

// Game status variables
let currentTarget: number;
let timeLeft: number;
let score: number = 0;
let isGameActive: boolean = false;
let countdownInterval: number;
let moveInterval: number;

//  game state
function initGame() {
    score = 0;
    updateScoreDisplay();
    startNewRound();
}

// start a new round with new target and timer
function startNewRound() {
    isGameActive = true;
    generateNewTarget();
    startCountdown();
    startButtonMovement();
}

// make new target number and countdown 
function generateNewTarget() {
    const countdownTime = Math.floor(Math.random() * 10 + 5); // 5-14 seconds
    currentTarget = Math.floor(Math.random() * countdownTime + 1); // 1 to countdownTime
    timeLeft = countdownTime;
    updateDisplays();
}

// Update all info
function updateDisplays() {
    targetNumberDisplay.textContent = currentTarget.toString();
    timerDisplay.textContent = timeLeft.toString();
}

//  countdown timer
function startCountdown() {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        timeLeft--;
        updateDisplays();
        
        if (timeLeft <= 0) {
            endRound(false);
        }
    }, 1000);
}

// move button randomly 
function startButtonMovement() {
    clearInterval(moveInterval);
    moveButton(); // Initial position
    moveInterval = setInterval(moveButton, 1000);
}

function moveButton() {
    const containerRect = gameContainer.getBoundingClientRect();
    const buttonRect = movingButton.getBoundingClientRect();
    
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    movingButton.style.transform = `translate(${newX}px, ${newY}px)`;
}

// button click 
function handleButtonClick() {
    if (!isGameActive) return;
    
    if (timeLeft === currentTarget) {
        score += 10;
        endRound(true);
    } else {
        score -= 5;
        endRound(false);
    }
    updateScoreDisplay();
}

// end round and ready for next
function endRound(success: boolean) {
    isGameActive = false;
    clearInterval(countdownInterval);
    clearInterval(moveInterval);
    
    //  pause before next round
    setTimeout(() => {
        startNewRound();
    }, 1000);
}

function updateScoreDisplay() {
    scoreDisplay.textContent = score.toString();
}


movingButton.addEventListener('click', handleButtonClick);
window.addEventListener('load', initGame);