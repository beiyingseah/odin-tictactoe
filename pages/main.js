import { gameboard, gameboardDisplayController, modalDisplayController} from '../helpers/gameboard.js';
import Player from '../helpers/players.js';

const player1 = Player(localStorage.getItem('p1Name'), 'x');
const player2 = Player(localStorage.getItem('p2Name'), 'o');

console.log(player1);
console.log(player2);

gameboardDisplayController.renderScoreboard(player1.name, player2.name, player1.score, player2.score);

startGame()

//renderScoreboard(p1NameValue, p2NameValue);