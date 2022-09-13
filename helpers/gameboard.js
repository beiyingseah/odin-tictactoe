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

    // FIX THE GLOBAL STATE
    const gameboardState = (() => {
        let circleTurn;
        return {circleTurn};
    })(); 

    // Gameboard Display
    const setBoardHoverClass = (circleTurn) => {
        console.log('SET BOARD HOVER CLASS');
        console.log(`circle turn is ${gameboardState.circleTurn}`);
        console.log(`gameboard.board.classList is ${gameboard.board.classList}`);
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

    const placeMark = (cell, currentClass) => {
        cell.classList.add(currentClass);
    }

    const swapTurns = (circleTurn) => {
        console.log('SWAP TURNS');
        gameboardState.circleTurn = !gameboardState.circleTurn;
        console.log(`circle turn is ${gameboardState.circleTurn}`);
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
        
        const endGame = (draw, p1Name, p2Name) => { //with 'draw' being a boolean, true or false
        if (draw) {
            modalDisplayController.resultMessage = `It's a draw!`
            modalDisplayController.openModal();
    
        } else {
            modalDisplayController.resultMessage = `${gameboardState.circleTurn ? `${p2Name}` : `${p1Name}`} wins this round!`
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
            endGame(false, player1.name, player2.name);
            console.log('A PLAYER WINS!');
            if (currentClass === player1.symbol) {
                player1.addScore;
                console.log(player1);
            } else {
                player2.addScore;
                console.log(player2);
            }
            updateScoreboard(player1.score, player2.score);
        }
        else if (checkDraw()) {
            console.log('DRAW!')
            endGame(true);
    
        } else {
            swapTurns(gameboardState.circleTurn); 
            setBoardHoverClass();
        }
    } 

    const clearGameboard = () => {
        gameboard.board.classList.remove(X_CLASS);
        gameboard.board.classList.remove(CIRCLE_CLASS);
        gameboard.cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(CIRCLE_CLASS);
        });
    }
    
    const renderScoreboard = (p1Name, p2Name, p1Score, p2Score) => {
        console.log('renderScoreboard');
        gameboard.p1NameElement.textContent = p1Name + " [X]";
        gameboard.p2NameElement.textContent = p2Name + " [O]";
        gameboard.xScoreElement.textContent = p1Score;
        gameboard.circleScoreElement.textContent = p2Score;
    }
    
    //TODO; to pass in player1.score, player2.score from player object instances created in setup.html
    const updateScoreboard = (p1Score, p2Score) => {
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
        console.log('Directed to setup.html');
        window.location='index.html';
        setBoardHoverClass();
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