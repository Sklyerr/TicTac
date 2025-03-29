import { scaleWin } from "./scale.js";

const cont = document.getElementsByClassName("board__empty"); //ищем элемент по классу

let currentPlayer = "X";
let playerCross = [];
let playerZero = [];

let resultCross = 0;
let resultDraw = 0;
let resultZero = 0;

let win = false;

const winCombinations = [
    ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],
    ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"],
    ["1", "5", "9"], ["3", "5", "7"]                 
];

function alertWin(playerSymbol) {
    setTimeout(() => console.log(playerSymbol), 200); 
    if (playerSymbol == "Crosses") {
        resultCross = resultCross + 1;
    } else if (playerSymbol == "O,s") {
        resultZero = resultZero + 1;
    }

    scaleWin(resultCross, resultDraw, resultZero);

    document.getElementsByClassName('itemCross')[0].innerHTML = ("Cross: " + resultCross);
    document.getElementsByClassName('itemZero')[0].innerHTML = ("O's: " + resultZero);

    document.getElementsByClassName('result')[0].style = "opacity: 1; z-index: 1;";
    document.getElementsByClassName('result__title')[0].innerHTML = (playerSymbol + " " + "Win!");
}

function checkWin(playerMoves, playerSymbol) {
    for (let combination of winCombinations) {
        if (combination.every(cell => playerMoves.includes(cell))) {
            alertWin(playerSymbol);
            win = true;
            return true;
        }
    }

    if (playerCross.length + playerZero.length === 9) {
        setTimeout(() => {
            resultDraw = resultDraw + 1;
            scaleWin(resultCross, resultDraw, resultZero);
            document.getElementsByClassName('itemDraw')[0].innerHTML = ("Draw: " + resultDraw);

            document.getElementsByClassName('result')[0].style = "opacity: 1; z-index: 1;";
            document.getElementsByClassName('result__title')[0].innerHTML = ("Draw!");
        }, 200);
        win = true
        return true;
    }

    return false;
}

export function resetGame() {
    for (let cell of cont) {
        cell.classList.remove("cross", "zero");
    }
    playerCross = [];
    playerZero = [];
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X"
    }
    document.getElementsByClassName('result__title')[0].innerHTML = ("Statistics");

    win = false;
}

for (let i = 0; i < cont.length; i++) {
    cont[i].addEventListener("click", function() {
        if (!this.classList.contains("cross") && !this.classList.contains("zero") && win != true) {
            let id = this.id;

            if (currentPlayer === "X") {
                this.classList.add("cross");
                playerCross.push(id);
                if (!checkWin(playerCross, "Crosses")) {
                    currentPlayer = "O"; 
                }
            } else {
                this.classList.add("zero");
                playerZero.push(id);
                if (!checkWin(playerZero, "O,s")) {
                    currentPlayer = "X"; 
                }
            }
        }
    });
}

export {resultCross, resultDraw, resultZero};