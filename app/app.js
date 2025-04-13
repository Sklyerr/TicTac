import { visibleBlock } from "./button.js";
let resultCross = 0;
let resultZero = 0;
let resultDraw = 0;

export function checkWin(cont){
    let winCombo = [
        [0,1,2], [0,3,6],
        [6,7,8], [2,5,8],
        [1,4,7], [3,4,5],
        [0,4,8], [2,4,6]
    ];

    for (let combo of winCombo) {
        if (combo.every(cell => cont.includes(cell))) {
            return true;
        }
    }

    return false;

};

export function scaleWin(){
    let sumResult = resultCross + resultDraw + resultZero;

    if (sumResult > 0) {
        let centCross = (resultCross * 100) / sumResult;
        let centZero = (resultZero * 100) / sumResult;

        let scaleElement = document.querySelector('.result__scale');
        if (scaleElement) {
            scaleElement.style.setProperty('--cross-width', `${centCross}%`);
            scaleElement.style.setProperty('--zero-width', `${centZero}%`);
        }
    }
}

export function alertWin (player) {
    visibleBlock("result");

    if (player === "You" || player === "Cross") {
        resultCross += 1;
        document.getElementsByClassName("itemCross")[0].innerHTML = "Cross: " + resultCross;
    } else if (player === "Bot" || player === "O's") {
        resultZero += 1;
        document.getElementsByClassName("itemZero")[0].innerHTML = "O's: " + resultZero;
    } else {
        resultDraw += 1;
        document.getElementsByClassName("itemDraw")[0].innerHTML = "Draw: " + resultDraw;
    }

    scaleWin();

    if (player === "Draw!") {
        document.getElementsByClassName("result__title")[0].innerHTML = "Draw!"
    } else {
        document.getElementsByClassName("result__title")[0].innerHTML = player + " Win"
    }
}