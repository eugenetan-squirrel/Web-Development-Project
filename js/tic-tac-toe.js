let turn = "X";
let gameOver = false;

function makeMove(cell) {
    if (gameOver || cell.textContent !== "") {
        return;
    }

    cell.textContent = turn;
    if (checkWin(turn)) {
        document.getElementById("gameStatus").textContent = turn + " wins!";
        document.getElementById("resetButton").style.display = "block";
        gameOver = true;
    } else if (isBoardFull()) {
        document.getElementById("gameStatus").textContent = "It's a draw!";
        document.getElementById("resetButton").style.display = "block";
        gameOver = true;
    } else {
        turn = turn === "X" ? "O" : "X";
    }
}

function checkWin(player) {
    const cells = document.getElementsByClassName("cell");
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    const cells = document.getElementsByClassName("cell");
    for (const cell of cells) {
        if (cell.textContent === "") {
            return false;
        }
    }
    return true;
}

function resetGame() {
    const cells = document.getElementsByClassName("cell");
    for (const cell of cells) {
        cell.textContent = "";
    }
    turn = "X";
    gameOver = false;
    document.getElementById("gameStatus").textContent = "";
    document.getElementById("resetButton").style.display = "none";
}