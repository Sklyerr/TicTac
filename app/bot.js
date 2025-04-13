import { checkWin, alertWin } from "./app.js";
import { invisibleBlock } from "./button.js";

let hardMode = document.getElementById("hardMode");
let easyMode = document.getElementById("easyMode");
let hard = true;
let easy = false;

let mesh = document.querySelectorAll(".board__empty");

let huPlayer = [];
let aiPlayer = [];
let player;

let win = false;

let currentMove = "X";

function resetGame() {
    for (let cell of mesh) {
        cell.classList.remove("cross", "zero");
    }
    aiPlayer = [];
    huPlayer = [];
    if (currentMove === "X") {
        currentMove = "X";
    } else {
        currentMove = "O"
    }
    document.getElementsByClassName('result__title')[0].innerHTML = ("Statistics");
    invisibleBlock("result");

    win = false;
    initGame();
}

restartGameBot.addEventListener("click", resetGame);
buttonNew.addEventListener("click", resetGame);

hardMode.addEventListener("click", function () {
    hard = true;
    easy = false;
    document.getElementsByClassName("difficulty__dropdown-btn")[0].innerHTML = "Hard";
    resetGame();
})
easyMode.addEventListener("click", function() {
    hard = false;
    easy = true;
    document.getElementsByClassName("difficulty__dropdown-btn")[0].innerHTML = "Easy";
    resetGame();
})

function virtualBoard() {
    return Array.from(mesh).map(cell => {
        if (cell.classList.contains("cross")) return "X";
        if (cell.classList.contains("zero")) return "O";
        return null;
    });
} 

function boardCheckWin(board) {
    let winCombo = [
        [0,1,2], [0,3,6],
        [6,7,8], [2,5,8],
        [1,4,7], [3,4,5],
        [0,4,8], [2,4,6]
    ];

    for (let combo of winCombo) {
        let [a, b, c] = combo;
        if (board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]) {
            return board[a];
        }
    }

    if (!board.includes(null)) return "draw";

    return null;
}

function miniMax(board, ai) {
    let winner = boardCheckWin(board);

    if (winner === "O") return {score: 1};
    if (winner === "X") return {score: -1};
    if (winner === "draw") return {score: 0};

    if (ai) {
        let best = {score: -Infinity};
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = "O";
                const sim = miniMax(board, false);
                board[i] = null;

                if (sim.score > best.score) {
                    best = {score: sim.score, index: i}
                }

            }
        }
        return best;
    } else {
        let best = {score: Infinity};
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = "X";
                const sim = miniMax(board, true);
                board[i] = null;

                if (sim.score < best.score) {
                    best = {score: sim.score, index: i}
                }
            }
        }
        return best;
    }
}

function botMove() {
    let board = virtualBoard();
    let move = miniMax(board, true);

    if (move.index !== undefined && win === false) {
        mesh[move.index].classList.add("zero");
        aiPlayer.push(Number(mesh[move.index].id));
        if (!win) currentMove = "X";
    }
}

function availMesh() {
    let availCell = [];

    for (let cell of mesh) {
        if (!cell.classList.contains("zero") && !cell.classList.contains("cross")) {
            availCell.push(Number(cell.id))
        }
    }
    console.log(availCell)
    return availCell;
}

function botMoveEasy() {
    if (win === false) {
        let availBoard = availMesh();
        let random = Math.floor(Math.random() * availBoard.length);

        mesh[availBoard[random]].classList.add("zero");
        aiPlayer.push(Number(mesh[availBoard[random]].id));
        currentMove = "X";    
    }
    
}

function initGame() {
    mesh.forEach(cell => {
        if (currentMove ==="O") {
            if (hard === true) {
                console.log("hard: " + hard)
                botMove();
            } else if (easy === true) {
                console.log("easy: " + easy)
                botMoveEasy();
            }
            player = aiPlayer
        }
        cell.addEventListener("click", function() {
            if (win === false) {
                let id = Number(this.id);
    
                if (currentMove === "X" &&
                !cell.classList.contains("cross") &&
                !cell.classList.contains("zero")) {
                    this.classList.add("cross");
                    huPlayer.push(id);
                    console.log(huPlayer);
                    player = huPlayer;
                    if (checkWin(player)) {
                        win = true;
                        alertWin("You");
                    } else if (huPlayer.length + aiPlayer.length === 9) {
                        win = true;
                        alertWin("Draw!");
                    }
                    currentMove = "O";
                    
                    setTimeout(() => {
                        if (hard === true) {
                            console.log("hard: " + hard)
                            botMove();
                        } else if (easy === true) {
                            console.log("easy: " + easy)
                            botMoveEasy();
                        }
                        console.log(aiPlayer)
                        player = aiPlayer
                        if (checkWin(player)) {
                            win = true;
                            alertWin("Bot");
                        } else if (huPlayer.length + aiPlayer.length === 9 && win !== true) {
                            win = true;
                            alertWin("Draw!");
                        };
                    }, 500);
                }
            }
        })
    })
}

initGame();