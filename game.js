document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const squares = document.getElementsByClassName('square');
    const players = ['X', 'O'];
    let currentPlayer = players[0];
    let movesCount = 0;

    const endMessage = document.createElement('h2');
    endMessage.textContent = `X's turn!`;
    endMessage.style.marginTop = '30px';
    endMessage.style.textAlign = 'center';
    board.after(endMessage);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Add click event listeners to each square
    Array.from(squares).forEach((box, idx) => {
        box.addEventListener('click', function () {
            if (box.textContent === '' && endMessage.textContent.indexOf('wins') === -1 && endMessage.textContent.indexOf('draw') === -1) {
                box.textContent = currentPlayer;
                movesCount++;
                if (checkWin()) {
                    endMessage.textContent = `${currentPlayer} wins!`;
                    disableAllSquares();
                } else if (movesCount === 9) {
                    endMessage.textContent = `It's a draw!`;
                    disableAllSquares();
                } else {
                    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
                    endMessage.textContent = `${currentPlayer}'s turn!`;
                }
            }
        });
    });

    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return (
                squares[a].textContent &&
                squares[a].textContent === squares[b].textContent &&
                squares[a].textContent === squares[c].textContent
            );
        });
    }

    function disableAllSquares() {
        Array.from(squares).forEach(square => {
            square.style.pointerEvents = 'none';
        });
    }

    // Restart button logic
    const restartBtn = document.getElementById('restartButton');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            Array.from(squares).forEach(square => {
                square.textContent = '';
                square.style.pointerEvents = 'auto';
            });
            currentPlayer = players[0];
            movesCount = 0;
            endMessage.textContent = `X's turn!`;
        });
    }
});