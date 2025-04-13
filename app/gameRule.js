import { checkWin, alertWin } from "./app.js";
import { invisibleBlock } from "./button.js";

let cont = document.querySelectorAll(".board__empty");

let currentPlayer = "X";

let crossPlayer = [];
let zeroPlayer = [];

let winner = false;

let restartGame = document.getElementById("restartGame")

function resetGame() {
    for (let cell of cont) {
        cell.classList.remove("cross", "zero");
    }
    crossPlayer = [];
    zeroPlayer = [];
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X"
    }
    document.getElementsByClassName('result__title')[0].innerHTML = ("Statistics");
    invisibleBlock("result")

    winner = false;
}

restartGame.addEventListener("click", resetGame);
buttonNew.addEventListener("click", resetGame);

cont.forEach(cell => {
    cell.addEventListener("click", function() {
        if (!cell.classList.contains("cross") && !cell.classList.contains("zero") && winner !=true) {
            let id = Number(this.id);
    
            if (currentPlayer === "X") {
                cell.classList.add("cross");
                crossPlayer.push(id);
                if (checkWin(crossPlayer)) {
                    winner = true;
                    alertWin("Cross");
                } else if (crossPlayer.length + zeroPlayer.length === 9){
                    winner = true;
                    alertWin("Draw!")
                } else {
                    currentPlayer = "O";
                }
            } else if (currentPlayer === "O") {
                cell.classList.add("zero");
                zeroPlayer.push(id);
                if (checkWin(zeroPlayer)) {
                    winner = true;
                    alertWin("O's");
                } else if (crossPlayer.length + zeroPlayer.length === 9){
                    winner = true;
                    alertWin("Draw!");
                } else {
                    currentPlayer = "X"
                }
            }
        }
    })

})