
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
]

// Globa l boolean variables
// Player turn? X or O? 1 or 0?
let circleTurn;
let playerFirstMove;

// Get display elements
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const modal = document.getElementById('modalResult');
const resultMessage = document.getElementById('resultMessage');


// Game logic
function startGame() {
    playerFirstMove = !playerFirstMove;
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