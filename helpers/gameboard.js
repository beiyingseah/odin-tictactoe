// Main app
// Rest of the page elements controlled directly by user
const newGameBtn = document.getElementsByClassName('new-game-btn')[0];

newGameBtn.onclick = () => gameboardDisplayController.newGame();

// Modules
export const gameboard = (() => {
    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('board');

    const p1NameElement = document.getElementById('p1Name');
    const p2NameElement = document.getElementById('p2Name');
    const xScoreElement = document.getElementById('xScore');
    const circleScoreElement = document.getElementById('circleScore');
    
    return {cellElements, board, p1NameElement, p2NameElement, xScoreElement, circleScoreElement};
})();

export const gameboardDisplayController = (() => {
    // "Global" constants closed within this function
    const X_CLASS = 'x';
    const CIRCLE_CLASS = 'circle';

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
        modalDisplayController.resultMessage = `It's a draw!`
        modalDisplayController.openModal();

    } else {
        modalDisplayController.resultMessage = `${circleTurn ? 'O' : 'X'} wins this round!`
        modalDisplayController.openModal();
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
            if (currentClass === player1.symbol) {
                player1.addScore;
                updateScoreboard();
            } else {
                player2.addScore;
                updateScoreboard();
            }
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
    
    const renderScoreboard = (player1Name, player2Name, player1Score, player2Score) => {
        console.log('renderScoreboard');
        gameboard.p1NameElement.textContent = player1Name + " [X]";
        gameboard.p2NameElement.textContent = player2Name + " [O]";
        gameboard.xScoreElement.textContent = player1Score;
        gameboard.circleScoreElement.textContent = player2Score;
    }
    
    //TODO; to pass in player1.score, player2.score from player object instances created in setup.html
    const updateScoreboard = (player1Score, player2Score) => {
        // Player 1 is X, player 2 is O
        // Mapping: Player 1 Name <> X symbol, when X wins, player's score increases, scoreboard renders accordingly to reflect the score.
        gameboard.xScoreElement.textContent = player1Score;
        gameboard.circleScoreElement.textContent = player2Score;
    } 
    
    const resetScoreboard = () => {
        gameboard.p1NameElement.textContent = "";
        gameboard.p2NameElement.textContent = "";
        gameboard.xScoreElement.textContent = 0;
        gameboard.circleScoreElement.textContent = 0;
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

export const modalDisplayController = (() => {
    const modal = document.getElementById('modalResult');
    const resultMessage = document.getElementById('resultMessage').textContent;
    const newGameBtn = document.getElementsByClassName('new-game-btn')[1];
    const playAgainBtn = document.getElementById('playAgainBtn');

    const openModal = () => {
        modal.style.display = 'flex';
    };
    
    const closeModal = () => {
        modal.style.display = 'none';
    };

    playAgainBtn.onclick = () => {
        console.log("playAgainBtn clicked");
        closeModal();
        gameboardDisplayController.clearGameboard();
        console.log("clear gameboard");
        gameboardDisplayController.startGame();
        console.log("another round!");
    };

    newGameBtn.onclick = () => newGame();

    return {resultMessage, openModal};
})();