export function scaleWin(resultCross, resultDraw, resultZero){
    let sumResult = resultCross + resultDraw + resultZero;
    console.log (sumResult);

    if (sumResult > 0) {
        let centCross = (resultCross * 100) / sumResult;
        let centZero = (resultZero * 100) / sumResult;

        let scaleElement = document.querySelector('.result__scale');
        if (scaleElement) {
            scaleElement.style.setProperty('--cross-width', `${centCross}%`);
            console.log(centCross);
            scaleElement.style.setProperty('--zero-width', `${centZero}%`);
            console.log(centZero)
        }
    }
}