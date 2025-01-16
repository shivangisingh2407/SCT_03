let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

// Check for a winner
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            statusText.textContent = `Player ${board[a]} wins!`;
            return;
        }
    }

    // Check for a draw
    if (!board.includes('')) {
        gameOver = true;
        statusText.textContent = "It's a draw!";
    }
};

// Handle user clicks
const handleClick = (index) => {
    if (gameOver || board[index]) return;
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    checkWinner();

    if (!gameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        if (currentPlayer === 'O' && !gameOver) {
            setTimeout(computerMove, 500); // Let computer play
        }
    }
};

// Computer move (simple AI)
const computerMove = () => {
    const emptyCells = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell] = 'O';
    cells[randomCell].textContent = 'O';
    checkWinner();

    if (!gameOver) {
        currentPlayer = 'X';
        statusText.textContent = `Player X's turn`;
    }
};

// Initialize game
const initGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    statusText.textContent = "Player X's turn";
};

// Restart game
restartBtn.addEventListener('click', initGame);

// Event listeners for user clicks
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});

// Start the game
initGame();


// // script.js
// let board = ["", "", "", "", "", "", "", "", ""];
// let currentPlayer = "X";  // "X" is the human, "O" is the computer
// let gameOver = false;

// const cells = document.querySelectorAll(".cell");
// const message = document.getElementById("message");

// const winConditions = [
//     [0, 1, 2], // Row 1
//     [3, 4, 5], // Row 2
//     [6, 7, 8], // Row 3
//     [0, 3, 6], // Column 1
//     [1, 4, 7], // Column 2
//     [2, 5, 8], // Column 3
//     [0, 4, 8], // Diagonal 1
//     [2, 4, 6], // Diagonal 2
// ];

// function handleClick(event) {
//     const index = event.target.getAttribute("data-index");
    
//     if (board[index] !== "" || gameOver) return;

//     board[index] = currentPlayer;
//     event.target.textContent = currentPlayer;

//     if (checkWinner()) {
//         message.textContent = `${currentPlayer} Wins!`;
//         gameOver = true;
//         return;
//     }

//     currentPlayer = currentPlayer === "X" ? "O" : "X";
//     message.textContent = `Your turn! (${currentPlayer})`;

//     if (currentPlayer === "O" && !gameOver) {
//         computerMove();
//     }
// }

// function checkWinner() {
//     for (let condition of winConditions) {
//         const [a, b, c] = condition;
//         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//             return true;
//         }
//     }
//     if (board.every(cell => cell !== "")) {
//         message.textContent = "It's a tie!";
//         gameOver = true;
//     }
//     return false;
// }

// function computerMove() {
//     if (gameOver) return;

//     let availableMoves = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
//     let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

//     board[move] = "O";
//     cells[move].textContent = "O";

//     if (checkWinner()) {
//         message.textContent = "Computer (O) Wins!";
//         gameOver = true;
//     } else {
//         currentPlayer = "X";
//         message.textContent = "Your turn! (X)";
//     }
// }

// // Add event listeners to all cells
// cells.forEach(cell => {
//     cell.addEventListener("click", handleClick);
// });
