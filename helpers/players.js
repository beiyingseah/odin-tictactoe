// factory function for players

function Player(name, symbol) {
    let score = 0; //modified accordingly based on game results  

    function addScore() {
        this.score++;
        console.log(`player score added, new score: ${this.score}`);
    };
    return {name, symbol, score, addScore};
};

export default Player;
