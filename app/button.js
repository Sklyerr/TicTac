let resultBtn = document.getElementById("resultBtn");
let contactBtn = document.getElementById("contactBtn");
let contactResBtn = document.getElementById("contactResBtn");

let closeCtnBtn = document.getElementById("closeCtnBtn");
let closeResBtn = document.getElementById("closeResBtn");

export function visibleBlock(classBtn) {
    document.getElementsByClassName(classBtn)[0].style = "opacity: 1; z-index: 1";
}
export function invisibleBlock(classBtn) {
    document.getElementsByClassName(classBtn)[0].style = "opacity: 0; z-index: -1;"
}


resultBtn.addEventListener("click", function() {
    // Открывает статистику
    visibleBlock("result");
});
closeResBtn.addEventListener("click", function() {
    // закрывает статистику
    invisibleBlock("result")
})

contactBtn.addEventListener("click", function() {
    // Открывает контакты
    visibleBlock("contact");
})
contactResBtn.addEventListener("click", function () {
    // Открывает контакты из статистики
    invisibleBlock("result");
    visibleBlock("contact");
})
closeCtnBtn.addEventListener("click", function() {
    //закрывает статистику
    invisibleBlock("contact")
})