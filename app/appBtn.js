const restartBtn = document.getElementById("restartGame");

const buttonNew = document.getElementById("buttonNew");
const resultBtn = document.getElementById("resultBtn");
const closeResBtn = document.getElementById("closeResBtn")

const contactResBtn = document.getElementById("contactResBtn")
const contactBtn = document.getElementById("contactBtn");
const closeCtnBtn = document.getElementById("closeCtnBtn");

import { resetGame } from "./gameRule.js";

function invisibleBlock (className) {
    document.getElementsByClassName(className)[0].style = "opacity: 0; z-index: -1;";
}

function visibleBlock (className) {
    document.getElementsByClassName(className)[0].style = "opacity: 1; z-index: 1;";
}

restartBtn.addEventListener("click", resetGame); //Кнопка новой игры в меню

buttonNew.addEventListener("click", function() {
    //Кнопка новой игры в окне Результат
    invisibleBlock('result');
    resetGame();
});  

resultBtn.addEventListener("click", function() {
    //Открытие окна статистика из шапки
    visibleBlock('result');
})

closeResBtn.addEventListener("click", function(){
    invisibleBlock('result')
})

contactBtn.addEventListener("click", function() {
    //открытие окна контакты из шапки
    visibleBlock('contact');
})
contactResBtn.addEventListener("click", function() {
    //открытие окна контакты из окна результат
    invisibleBlock('result');
    visibleBlock('contact');
})

closeCtnBtn.addEventListener("click", function() {
    //Закрытие окна контакт
    invisibleBlock('contact');
})