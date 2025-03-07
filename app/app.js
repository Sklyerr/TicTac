const cont = document.getElementsByClassName("board__empty"); //ищем элемент по классу
const restartBtn = document.getElementById("restartGame"); //ищем элемент по id
const buttonNew = document.getElementById("buttonNew");

let currentPlayer = "X";
let playerCross = [];
let playerZero = [];

const winCombinations = [
    ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],
    ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"],
    ["1", "5", "9"], ["3", "5", "7"]                 
];

function alertWin(playerSymbol) {
    setTimeout(() => console.log(playerSymbol), 200); 
    document.getElementsByClassName('result')[0].style = "opacity: 1; z-index: 1;";
    document.getElementsByClassName('result__title')[0].innerHTML = (playerSymbol + " " + "Win!");
    resetGame();
}

function checkWin(playerMoves, playerSymbol) {
    for (let combination of winCombinations) {
        if (combination.every(cell => playerMoves.includes(cell))) {
            alertWin(playerSymbol);
            return true;
        }
    }

    if (playerCross.length + playerZero.length === 9) {
        setTimeout(() => {
            document.getElementsByClassName('result')[0].style = "opacity: 1; z-index: 1;";
            document.getElementsByClassName('result__title')[0].innerHTML = ("Draw!");
        }, 200);
        return true;
    }

    return false;
}

function resetGame() {
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
}

for (let i = 0; i < cont.length; i++) {
    cont[i].addEventListener("click", function() {
        if (!this.classList.contains("cross") && !this.classList.contains("zero")) {
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
                if (!checkWin(playerZero, "O's")) {
                    currentPlayer = "X"; 
                }
            }
        }
    });
}

restartBtn.addEventListener("click", resetGame);
buttonNew.addEventListener("click", function() {
    document.getElementsByClassName('result')[0].style = "opacity: 0; z-index: -1;";
    resetGame();
});
