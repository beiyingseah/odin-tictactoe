import { gameboard, gameboardDisplayController, modalDisplayController} from '../helpers/gameboard.js';
import Player from '../helpers/players.js';

// Main app
// Player inputs from setup.html
const player1 = Player(localStorage.getItem('p1Name'), 'x');
const player2 = Player(localStorage.getItem('p2Name'), 'o');

console.log(player1);
console.log(player2);

gameboardDisplayController.renderScoreboard(player1.name, player2.name, player1.score, player2.score);
gameboardDisplayController.startGame(player1, player2);

// Rest of the page elements controlled directly by user
const newGameBtn = document.getElementsByClassName('new-game-btn')[0];

newGameBtn.onclick = () => gameboardDisplayController.newGame();

//renderScoreboard(p1NameValue, p2NameValue);