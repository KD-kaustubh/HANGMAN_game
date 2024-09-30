// Variables
const words = ['javascript', 'html', 'css', 'hangman', 'coding'];
let selectedWord = '';
let correctGuesses = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

// DOM Elements
const wordDisplay = document.getElementById('word');
const lettersDisplay = document.getElementById('letters');
const figureParts = document.querySelectorAll('.body-part');
const playerNameDisplay = document.getElementById('playerName');
const startButton = document.getElementById('startGame');
const nameInput = document.getElementById('name');
const gameSection = document.getElementById('game');
const resultDisplay = document.getElementById('result');

// Initialize Game
function init() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    correctGuesses = Array(selectedWord.length).fill('_');
    wrongGuesses = 0;
    wordDisplay.innerHTML = correctGuesses.join(' ');
    lettersDisplay.innerHTML = '';
    figureParts.forEach(part => part.style.display = 'none');
    generateLetters();
    resultDisplay.innerHTML = '';
}

// Create alphabet buttons
function generateLetters() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.classList.add('letter');
        button.innerText = letter;
        button.addEventListener('click', () => handleGuess(letter, button));
        lettersDisplay.appendChild(button);
    });
}

// Handle letter guess
function handleGuess(letter, button) {
    button.disabled = true;
    if (selectedWord.includes(letter)) {
        selectedWord.split('').forEach((char, index) => {
            if (char === letter) {
                correctGuesses[index] = letter;
            }
        });
        wordDisplay.innerHTML = correctGuesses.join(' ');
        if (!correctGuesses.includes('_')) {
            resultDisplay.innerHTML = `<h2>Congratulations ${nameInput.value}, You Won!</h2>`;
            disableLetters();
        }
    } else {
        wrongGuesses++;
        figureParts[wrongGuesses - 1].style.display = 'block';
        if (wrongGuesses === maxWrongGuesses) {
            resultDisplay.innerHTML = `<h2>Game Over! The word was: ${selectedWord}</h2>`;
            disableLetters();
        }
    }
}

// Disable letter buttons after game ends
function disableLetters() {
    document.querySelectorAll('.letter').forEach(button => {
        button.disabled = true;
    });
}

// Start Game Event
startButton.addEventListener('click', () => {
    const playerName = nameInput.value;
    if (playerName) {
        playerNameDisplay.textContent = playerName;
        gameSection.style.display = 'block';
        init();
    } else {
        alert('Please enter your name!');
    }
});
