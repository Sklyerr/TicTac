let dropdownBtn = document.getElementById("dropdownBtn");
let dropdownBtnCond = false;

dropdownBtn.addEventListener("click", function() {

    if (dropdownBtnCond === false) {
        document.getElementsByClassName("difficulty__dropdown-content")[0].style = "display: block;";
        dropdownBtnCond = true;
    } else {
        document.getElementsByClassName("difficulty__dropdown-content")[0].style = "display: none;";
        dropdownBtnCond = false;
    }
})

window.onclick = function (event) {
    let content = document.getElementById("dropdownContent");
    if (event.target !== content && event.target !== dropdownBtn) {
        document.getElementsByClassName("difficulty__dropdown-content")[0].style = "display: none;";
        dropdownBtnCond = false;
    }
}