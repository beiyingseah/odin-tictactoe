
// Global constants
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
// initialise scoreboard
const SCOREBOARD = {};

// Globa l variables
let circleTurn;
let player1Name = "";
let player2Name = "";


// gameboard.html
const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const modal = document.getElementById('modalResult');
const resultMessage = document.getElementById('resultMessage');
const p1Name = document.getElementById('p1Name');
const p2Name = document.getElementById('p2Name');
const xScore = document.getElementById('xScore');
const circleScore = document.getElementById('circleScore');
const newGameBtnCollection = document.getElementsByClassName('new-game-btn');
const playAgainBtn = document.getElementById('playAgainBtn');
const startGameBtn = document.getElementById('startGameBtn');


//gameboard.html
for (newGameBtn of newGameBtnCollection) {
    newGameBtn.onclick = () => newGame();
}


//TODO:FIGURE OUT WHY FORM UPON 'ONSUBMIT' NAVIGATES TO A NEW URL WITH THE PLAYER NAMES INSTEAD OF GAMEBOARD.HTML. CODE IS THE SAME AS ODIN-LIBRARY FORM?? onclick for startgameBtn -> startGame(), gameboard.html, update textContent of Scoreboard

// Game logic
function newGame() {
    console.log('clearboard');
    clearGameboard();
    console.log('clearScoreboard');
    resetScoreboard();
    console.log('Directed to setup.html');
    window.location='index.html';
}

function clearGameboard() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
    });
}

function renderScoreboard(player1Name, player2Name) {
    p1Name.textContent = player1Name + "[X]";
    p2Name.textContent = player2Name + "[O]";
    xScore.textContent = SCOREBOARD[X_CLASS];
    circleScore.textContent = SCOREBOARD[CIRCLE_CLASS];
}

function updateScoreboard() {
    xScore.textContent = SCOREBOARD[X_CLASS];
    circleScore.textContent = SCOREBOARD[CIRCLE_CLASS];
} 

function resetScoreboard() {
    SCOREBOARD[X_CLASS] = 0;
    SCOREBOARD[CIRCLE_CLASS] = 0;
}

function startGame() {
    playerFirstMove = !circleTurn;
    circleTurn = playerFirstMove;
    console.log(`startGame, player first move is: ${playerFirstMove}`);
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass();
}

function handleClick(e) { //so many logic that go into a click! :o
    const cell = e.target;
    console.log('clicked');
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    // Check for Win
    if (checkWin(currentClass)) {
        console.log('winner');
        endGame(false);
        SCOREBOARD[currentClass]++;
        updateScoreboard();
    }
    else if (checkDraw()) {
        console.log('draw')
        endGame(true);

    } else {
        console.log('next turn');
        swapTurns(); 
        setBoardHoverClass();
    }
} 

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() { 
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
    console.log(`Board hover class: ${board.classList}`);
}

// Results
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass) 
        }) 
    })
}

function checkDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function endGame(draw) {
    if (draw) {
        resultMessage.textContent = `It's a draw!`
        openModal();

    } else {
        resultMessage.textContent = `${circleTurn ? 'O' : 'X'} wins this round!`
        openModal();
        // TODO: Logic for clicking 'play again' and 'new game' respectively
    }
}

// Modal Message
// Open modal 
function openModal() {
    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// PlayAgainBtn
playAgainBtn.onclick = () => {
    console.log("playAgainBtn clicked");
    closeModal();
    clearGameboard();
    startGame();
}

// Model layer
function gameBoard() {
    return null;
}

// View layer: Object that controls the flow of the game
function displayController() {
    return null;
}
 
// Controller layer: Object that describes our players and encapsulate all of the things our players can do (functions!).
function Players() {
    return null;
}