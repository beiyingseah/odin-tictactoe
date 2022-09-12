// Get display elements
const form = document.getElementById('playerForm');
const p1NameField = form.elements.p1Name;
const p2NameField = form.elements.p2Name;

let p1NameValue = p1NameField.value;
let p2NameValue = p2NameField.value;

// Add event listeners
p1NameField.oninput = (e) => {
    p1NameValue = e.target.value;
    player1Name = p1NameValue;
}

p2NameField.oninput = (e) => {
    p2NameValue = e.target.value;
    player2Name = p2NameValue;
}

// For submit button
form.onsubmit = (e) => {
    console.log('submit form');
    e.preventDefault(); //disabling the default submit behavior of the form because the form-data is being sent with ajax so that you can associate form submit to redirection of URL instead
    window.location='gameboard.html';
    console.log('directed to gameboard.html')
    renderScoreboard(p1NameValue, p2NameValue);
    console.log('renderScoreboard');
    startGame();
}
