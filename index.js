const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const moveLeftButton = document.getElementById("move-left");
const moveRightButton = document.getElementById("move-right");
const scoreDisplay = document.getElementById("score");

const containerWidth = gameContainer.offsetWidth;
const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;
let moveInterval;
let score = 0;

moveLeftButton.addEventListener("mousedown", startMoveLeft);
moveRightButton.addEventListener("mousedown", startMoveRight);

document.addEventListener("mouseup", stopMoving);

function startMoveLeft() {
    moveInterval = setInterval(() => {
        const currentLeft = parseInt(player.style.left) || 0;
        if (currentLeft > 0) {
            player.style.left = (currentLeft - 5) + "px";
        }
    }, 10);
}

function startMoveRight() {
    moveInterval = setInterval(() => {
        const currentLeft = parseInt(player.style.left) || 0;
        if (currentLeft < containerWidth - playerWidth) {
            player.style.left = (currentLeft + 5) + "px";
        }
    }, 10);
}

function stopMoving() {
    clearInterval(moveInterval);
}

function resetMovingDiv(div) {
    div.style.top = "0";
    
}

function autoDrop() {
    // Check for collisions with moving divs
    const playerRect = player.getBoundingClientRect();

    const movingDivs = document.querySelectorAll(".moving-div");
    let gameOver = false; 
    movingDivs.forEach((movingDiv) => {
        const movingDivRect = movingDiv.getBoundingClientRect();
        if (
            playerRect.left < movingDivRect.right &&
            playerRect.right > movingDivRect.left &&
            playerRect.top < movingDivRect.bottom &&
            playerRect.bottom > movingDivRect.top
        ) {
            // Collision detected, increment score and reset the moving div to the top
            score++;
            scoreDisplay.textContent = "Score: " + score;
          
            movingDiv.style.display = "none";
            
            setTimeout(() => {
                movingDiv.style.display = "block";
            }, 10); // Delay before the moving div reappears

            // Create a new copy of the moving div and reset its position
            const newMovingDiv = movingDiv.cloneNode(true);
            gameContainer.appendChild(newMovingDiv);

            resetMovingDiv(newMovingDiv);
            
        }})
}

const dropInterval = setInterval(autoDrop, 10);