// Main app
// Rest of the page elements controlled directly by user
const newGameBtn = document.getElementsByClassName('new-game-btn')[0];

newGameBtn.onclick = () => gameboardDisplayController.newGame();

// Modules
const gameboard = (() => {
    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('board');

    const p1Name = document.getElementById('p1Name').textContent;
    const p2Name = document.getElementById('p2Name').textContent;
    const xScore = document.getElementById('xScore').textContent;
    const circleScore = document.getElementById('circleScore');
    
    return {cellElements, board, p1Name, p2Name, xScore, circleScore};
})();

const gameboardDisplayController = (() => {
    // "Global" constants closed within this function
    const X_CLASS = 'x';
    const CIRCLE_CLASS = 'circle';
    
    // initialise scoreboard
    const SCOREBOARD = {};

    // game logic
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

    let circleTurn;
    
    const swapTurns = () => {
        circleTurn = !circleTurn;
    }

    // Results
    const checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass) 
            }) 
        })
    };
    
    const checkDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
        });
    };
    
    const endGame = (draw) => {
    if (draw) {
        modalDisplayController.resultMessage.textContent = `It's a draw!`
        openModal();

    } else {
        modalDisplayController.resultMessage.textContent = `${circleTurn ? 'O' : 'X'} wins this round!`
        openModal();
        }      
    };

    // Gameboard Display
    const setBoardHoverClass = (circleTurn) => {
        board.classList.remove(X_CLASS);
        board.classList.remove(CIRCLE_CLASS);
        if (circleTurn) {
            board.classList.add(CIRCLE_CLASS);
        } else {
            board.classList.add(X_CLASS);
        }
        console.log(`Board hover class: ${board.classList}`);
    };  

    const placeMark = (cell, currentClass) => {
        cell.classList.add(currentClass);
    }
    
    // So much logic that goes into a click! :o
    const handleClick = (e) => { 
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

    const clearGameboard = () => {
        board.classList.remove(X_CLASS);
        board.classList.remove(CIRCLE_CLASS);
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(CIRCLE_CLASS);
        });
    }
    
    const renderScoreboard = (player1Name, player2Name) => {
        p1Name = player1Name + "[X]";
        p2Name = player2Name + "[O]";
        xScore = SCOREBOARD[X_CLASS];
        circleScore = SCOREBOARD[CIRCLE_CLASS];
    }
    
    const updateScoreboard = () => {
        xScore.textContent = SCOREBOARD[X_CLASS];
        circleScore.textContent = SCOREBOARD[CIRCLE_CLASS];
    } 
    
    const resetScoreboard = () => {
        p1Name = "";
        p2Name = "";
        SCOREBOARD[X_CLASS] = 0;
        SCOREBOARD[CIRCLE_CLASS] = 0;
    }

    const startGame = () => {
        playerFirstMove = !circleTurn;
        circleTurn = playerFirstMove;
        console.log(`startGame, player first move is: ${playerFirstMove}`);
        cellElements.forEach(cell => {
            cell.addEventListener('click', handleClick, { once: true })
        })
        setBoardHoverClass();
    };
    
    const newGame = () => {
        console.log('clearboard');
        clearGameboard();
        console.log('clearScoreboard');
        resetScoreboard();
        console.log('Directed to setup.html');
        window.location='index.html';
    };

    return {startGame, newGame, resetScoreboard, renderScoreboard};
})();

const modalDisplayController = (() => {
    const modal = document.getElementById('modalResult');
    const resultMessage = document.getElementById('resultMessage');
    const newGameBtn = document.getElementsByClassName('new-game-btn')[1];
    const playAgainBtn = document.getElementById('playAgainBtn');

    openModal = () => {
        modal.style.display = 'flex';
    };
    
    closeModal = () => {
        modal.style.display = 'none';
    };

    playAgainBtn.onclick = () => {
        console.log("playAgainBtn clicked");
        closeModal();
        gameboardDisplayController.clearGameboard();
        console.log("clear gameboard");
        gameboardDisplayController.startGame();
        console.log("another round!");
    }

    newGameBtn.onclick = () => newGame();

    return {resultMessage};
})();