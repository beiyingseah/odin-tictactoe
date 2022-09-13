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
    // Initialise players
    let player1;
    let player2;

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

    // FIX THE GLOBAL STATE
    const gameboardState = (() => {
        let circleTurn;
        return {circleTurn};
    })(); 

    // GAMEBOARD LOGIC
    const placeMark = (cell, currentClass) => {
        cell.classList.add(currentClass);
    }

    const swapTurns = (circleTurn) => {
        console.log('SWAP TURNS');
        gameboardState.circleTurn = !circleTurn;
        console.log(`circle turn is ${circleTurn}`);
}

    // Results
    const checkWin = (currentClass) => {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return gameboard.cellElements[index].classList.contains(currentClass);
                }) 
            })
        };
        
        const checkDraw = () => {
            return [...gameboard.cellElements].every(cell => {
                return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
                });
        };
        
        const endGame = (draw, p1Name, p2Name, circleTurn) => { //with 'draw' being a boolean, true or false
            if (draw) {
                modalDisplayController.resultMessageElement.textContent = `It's a draw!`
                modalDisplayController.openModal();
        
            } else {
                modalDisplayController.resultMessageElement.textContent = `${circleTurn ? `${p2Name}` : `${p1Name}`} wins this round!`
                modalDisplayController.openModal();
                }      
        };
        
    // So much logic that goes into a click! :o
    const handleClick = (e) => { 
        const cell = e.target;
        console.log(`CELLL CLICKED: ${cell}`);
        console.log(`circle turn: ${gameboardState.circleTurn}`);
        const currentClass = gameboardState.circleTurn ? CIRCLE_CLASS : X_CLASS;
        console.log(`currentClass: ${currentClass}`);
        placeMark(cell, currentClass);
        // Check for Win
        if (checkWin(currentClass)) {
            highlightWinningCells(currentClass);
            setTimeout( function () {
                endGame(false, player1.name, player2.name, gameboardState.circleTurn)
            }, 1500);
            console.log('A PLAYER WINS!');
            if (currentClass === player1.symbol) {
                player1.addScore();
                console.log(player1);
            } else {
                player2.addScore();
                console.log(player2);
            }
            console.log(`player 1 score: ${player1.score}, player 2 score: ${player2.score}`);
            updateScoreboard(player1.score, player2.score);
        }
        else if (checkDraw()) {
            console.log('DRAW!')
            setTimeout( function () {
                endGame(true, null, null, gameboardState.circleTurn)
            }, 1500);
    
        } else {
            swapTurns(gameboardState.circleTurn); 
            setBoardHoverClass(gameboardState.circleTurn);
        }
    } 

    // GAMEBOARD DISPLAY
    const setBoardHoverClass = (circleTurn) => {
        console.log('SET BOARD HOVER CLASS');
        console.log(`PLAYER 1:`);
        console.log(player1);
        console.log(`PLAYER 2:`);
        console.log(player2);
        console.log(`circle turn is ${circleTurn}`);
        console.log(`gameboard.board.classList is ${circleTurn}`);
        gameboard.board.classList.remove(X_CLASS);
        gameboard.board.classList.remove(CIRCLE_CLASS);
        if (gameboardState.circleTurn) {
            console.log(`gameboardState.circleTurn = true, add circle_class, ${CIRCLE_CLASS}`);
            gameboard.board.classList.add(CIRCLE_CLASS);
        } else {
            console.log(`xTurn = true, add x_class, ${X_CLASS}`);
            gameboard.board.classList.add(X_CLASS);
        }
        console.log(`Board hover class: ${gameboard.board.classList}`);
    };  


    const clearGameboard = () => {
        console.log('CLEAR GAMEBOARD');
        gameboard.board.classList.remove(X_CLASS);
        gameboard.board.classList.remove(CIRCLE_CLASS);
        gameboard.cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(CIRCLE_CLASS);
        });
        console.log('player1name', player1.name);
    }
    
    const renderScoreboard = (p1Name, p2Name, p1Score, p2Score) => {
        console.log('renderScoreboard');
        gameboard.p1NameElement.textContent = p1Name + " [X]";
        gameboard.p2NameElement.textContent = p2Name + " [O]";
        gameboard.xScoreElement.textContent = p1Score;
        gameboard.circleScoreElement.textContent = p2Score;
    }

    const highlightWinningCells = (currentClass) => {
        let winningCells = WINNING_COMBINATIONS.find((combination) =>
        combination.every((index) => gameboard.cellElements[index].classList.contains(currentClass)))
        winningCells.forEach((index) => gameboard.cellElements[index].classList.add('win'));
      };

    
    //TODO; to pass in player1.score, player2.score from player object instances created in setup.html
    const updateScoreboard = (p1Score, p2Score) => {
        console.log(p1Score, p2Score);
        // Player 1 is X, player 2 is O
        // Mapping: Player 1 Name <> X symbol, when X wins, player's score increases, scoreboard renders accordingly to reflect the score.
        gameboard.xScoreElement.textContent = p1Score;
        gameboard.circleScoreElement.textContent = p2Score;
    } 
    
    const resetScoreboard = () => {
        gameboard.p1NameElement.textContent = "";
        gameboard.p2NameElement.textContent = "";
        gameboard.xScoreElement.textContent = 0;
        gameboard.circleScoreElement.textContent = 0;
    }

    const startGame = (player1Obj, player2Obj) => {
        player1 = player1Obj;
        player2 = player2Obj;
        console.log('START GAME');
        console.log(`circle turn is ${gameboardState.circleTurn}`);
        let playerFirstMove = !gameboardState.circleTurn;
        gameboardState.circleTurn = playerFirstMove;
        console.log(`circle turn is ${gameboardState.circleTurn}`);
        console.log(`startGame, gameboardState.circleTurn & player first move is: ${playerFirstMove}`);
        gameboard.cellElements.forEach(cell => {
            cell.addEventListener('click', handleClick, { once: true })
        })
        setBoardHoverClass(gameboardState.circleTurn);
    };
    
    const newGame = () => {
        console.log('clearboard');
        clearGameboard();
        console.log('clearScoreboard');
        resetScoreboard();
    };

    return {startGame, newGame, resetScoreboard, renderScoreboard, clearGameboard};
})();

export const modalDisplayController = (() => {
    const modal = document.getElementById('modalResult');
    const resultMessageElement = document.getElementById('resultMessage');
    const newGameBtn = document.getElementsByClassName('new-game-btn')[1];
    const playAgainBtn = document.getElementById('playAgainBtn');

    const openModal = () => {
        modal.style.display = 'flex';
    };
    
    const closeModal = () => {
        modal.style.display = 'none';
    };

    return {resultMessageElement, openModal, newGameBtn, playAgainBtn, closeModal};
})();