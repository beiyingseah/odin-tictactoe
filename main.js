// Global constants
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

// Global boolean variables
// Player turn? X or O? 1 or 0?
let playerTurn;
let playerFirstMove;

// Get display elements
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

function startGame() {
    playerFirstMove = !playerFirstMove;
    playerTurn = playerFirstMove;
    console.log(`startGame, player first move is: ${playerFirstMove}`);
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass();
}

function handleClick(e) { //so many logic that go into a click! :o
    const cell = e.target;
    console.log('clicked');
    const currentClass = playerTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    // Check for Win
    // Check for Draw 
    swapTurns();
    setBoardHoverClass();
} 

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    playerTurn = !playerTurn;
}

function setBoardHoverClass() { 
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (playerTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
    console.log(`Board hover class: ${board.classList}`);
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