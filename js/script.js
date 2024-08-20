const startGameButton = document.getElementById('start-game-button'); // Added Start Game button
const gameContainer = document.getElementById('game-container'); // Added game container

const wordLetters = document.getElementById('word-letters');
const inputField = document.getElementById('input-field');
const checkButton = document.getElementById('check-button');
const scoreValue = document.getElementById('score-value');
const gameOver = document.getElementById('game-over');
const finalScore = document.getElementById('final-score');
const newGameButton = document.getElementById('new-game-button');
const highScoreValue = document.getElementById('high-score-value');
const timeLeft = document.getElementById('time-left');

let score = 0;
let difficulty = 5; // Initial word length
let highScore = 0; // Initial high score
let timer;

function generateWord() {
    let letters = [];
    for (let i = 0; i < difficulty; i++) {
        letters.push(String.fromCharCode(Math.floor(Math.random() * 26) + 97)); // Generate random lowercase letter
    }
    wordLetters.textContent = letters.sort().join(''); // Scramble the letters
}

function checkAnswer() {
    const enteredWord = inputField.value.toLowerCase();
    const letters = wordLetters.textContent.split('');
    const word = letters.sort().join(''); // Sort the letters to check for valid words

    if (enteredWord === word) {
        score++;
        scoreValue.textContent = score;
        inputField.value = '';
        generateWord();
        resetTimer(); // Reset timer for the new word
        difficulty++; // Increase difficulty for the next word
        if (difficulty > 10) {
            difficulty = 10; // Maximum difficulty
        }
        if (score > highScore) {
            highScore = score;
            highScoreValue.textContent = highScore;
        }
    } else {
        gameOver.style.display = 'block';
        finalScore.textContent = score;
        checkButton.disabled = true;
        clearInterval(timer);
    }
}

function resetTimer() {
    let timeRemaining = 15; // Added let declaration
    timeLeft.textContent = timeRemaining;
    clearInterval(timer);
    timer = setInterval(() => {
        timeRemaining--;
        timeLeft.textContent = timeRemaining;
        if (timeRemaining <= 0){
            checkAnswer();
        }
    }, 1000); // Changed interval to 1000ms (1 second)
}

inputField.addEventListener('keyup', (event) => {
    if (event.key === 'Enter'){
        checkAnswer(); // Call the checkAnswer when enter is pressed
    }
});

checkButton.addEventListener('click', checkAnswer);
newGameButton.addEventListener('click', () => {
    score = 0;
    difficulty = 5;
    scoreValue.textContent = score;
    gameOver.style.display = 'none';
    checkButton.disabled = false;
    inputField.value = '';
    generateWord();
    resetTimer();
});

startGameButton.addEventListener('click', () => { // Added event listener for Start Game button
    gameContainer.style.display = 'block';
    startGameButton.style.display = 'none';
    generateWord();
    resetTimer();
});
