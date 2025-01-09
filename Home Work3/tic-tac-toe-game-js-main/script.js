const gameBoard = document.getElementById('game-board');
const currentPlayerElement = document.getElementById('current-player').querySelector('span');
const resetButton = document.getElementById('reset-button');
const firstPlayerSelect = document.getElementById('first-player');

let currentPlayer = firstPlayerSelect.value;  
let boardState = new Array(16).fill(null);  
let isGameActive = true;

firstPlayerSelect.addEventListener('change', (event) => {
    currentPlayer = event.target.value;  
    resetGame();
});

function createCell(id) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.id = id;
    cell.addEventListener('click', handleCellClick);
    return cell;
}

function initializeBoard() {
    for (let i = 0; i < 16; i++) {
        const cell = createCell(i);
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const cellId = cell.dataset.id;

    if (boardState[cellId] || !isGameActive) {
        return; 
    }

    boardState[cellId] = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
    cell.textContent = currentPlayer;

    checkForWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  
    currentPlayerElement.textContent = currentPlayer;

    if (isDraw()) {
        alert('Ничья!');
        styleDrawCells();
        isGameActive = false;
    }
}

function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], 
        [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], 
        [0, 5, 10, 15], [3, 6, 9, 12]  
    ];

    for (const combination of winningCombinations) {
        const [a, b, c, d] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c] && boardState[a] === boardState[d]) {
            alert(`Победил игрок ${boardState[a]}!`);
            highlightWinningCells(combination);
            isGameActive = false;
            return;
        }
    }
}

function highlightWinningCells(combination) {
    combination.forEach(index => {
        const cell = gameBoard.children[index];
        cell.classList.add('win');
    });
}

function isDraw() {
    return boardState.every(cell => cell !== null);
}

function styleDrawCells() {
    boardState.forEach((cell, index) => {
        if (!cell) { 
            const cellDiv = gameBoard.children[index];
            cellDiv.classList.add('draw');
        }
    });
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    boardState.fill(null);
    isGameActive = true;
    currentPlayer = firstPlayerSelect.value; 
    currentPlayerElement.textContent = currentPlayer;

    Array.from(gameBoard.children).forEach(cell => {
        cell.classList.remove('x', 'o', 'win', 'draw');
        cell.textContent = '';
    });
}

initializeBoard();
currentPlayerElement.textContent = currentPlayer;

