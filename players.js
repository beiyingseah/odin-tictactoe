// factory function for players

const Player = (name, symbol) => {
    const name = name; //a const as it cannot be changed upon form submission
    const symbol = symbol; //a const as it cannot be changed upon form submission
    let score = 0; //modified accordingly based on game results  

    const addScore = () => {
        score++;
    }

    return {name, symbol, score, addScore};
};

