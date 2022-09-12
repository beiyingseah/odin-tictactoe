// factory function for players

const Player = (name, symbol) => {
    let score = 0; //modified accordingly based on game results  

    const addScore = () => {
        score++;
    }

    return {name, symbol, score, addScore};
};

export default Player;
