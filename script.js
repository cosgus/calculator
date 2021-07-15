function getButtons() {
    const calcBody = document.querySelector(".calculator-body");
    const buttons = calcBody.querySelectorAll('button');

    return buttons;
}

function placeButtons() {
    
    // Assigns every button in calculator body a gridArea equal to its id

    const buttons = getButtons();

    buttons.forEach(button=>button.style.gridArea=button.id);

}

function clearScreen() {
    const screenInputContent = getScreenInputContent();
    const screenOutputContent = getScreenOutputContent();
    screenInputContent.innerText = "";
    screenOutputContent.innerText = "";
}

function getExpressionParts(expression) {
    expression = expression.replace(/\+/g,',+,');
    expression = expression.replace(/-/g,',-,');
    expression = expression.replace(/÷/g,',÷,');
    expression = expression.replace(/x/g,',x,');
    expression = expression.replace(/%/g,',%,');
    let parts = expression.split(',');
    return parts;
}


function operate(e) {

    const expression = getScreenInputContent().innerText;
    let parts = getExpressionParts(expression);

    console.log(`starting with ${parts}`)
    
    // The following loop and switch reduce the expression by calculating
    // each section untill the array is reduced to one element - the final answer

    let reducedExpression = [];

    for (let i = 0; i < parts.length; i++ ) {
        switch (parts[i]) {
            case 'x':
                prevNum = Number(reducedExpression[reducedExpression.length-1])
                nextNum = Number(parts[i+1])
                reducedExpression.pop()
                reducedExpression.push(prevNum * nextNum)
                i++;
                break;
            case '÷':
                prevNum = Number(reducedExpression[reducedExpression.length-1])
                nextNum = Number(parts[i+1])
                reducedExpression.pop()
                reducedExpression.push(prevNum / nextNum)
                i++;
                break;
            case '-':
                prevNum = Number(reducedExpression[reducedExpression.length-1])
                nextNum = Number(parts[i+1])
                reducedExpression.pop()
                reducedExpression.push(prevNum - nextNum)
                console.log(reducedExpression)
                i++;
                break;
            case '+':
                prevNum = Number(reducedExpression[reducedExpression.length-1])
                nextNum = Number(parts[i+1])
                reducedExpression.pop()
                reducedExpression.push(prevNum + nextNum)
                i++;
                break;
            case '%':
                prevNum = Number(reducedExpression[reducedExpression.length-1])
                nextNum = Number(parts[i+1])
                reducedExpression.pop()
                reducedExpression.push(prevNum % nextNum)
                i++;
                break;
            default:
                reducedExpression.push(parts[i]);
                break;
        }
    }

    console.log(reducedExpression)
    const screenOutput = document.querySelector('#screen-output');
    screenOutput.innerText = `= ${Math.round(reducedExpression[0]*1000000)/1000000}`;
}


function createButtonListeners() {
    const buttons = getButtons();
    for(let i=0; i < buttons.length; i++){
        if (buttons[i].id === 'equals') {
            buttons[i].addEventListener('click', operate);
        }
        else if (buttons[i].id === 'ac') {
            buttons[i].addEventListener('click', clearScreen);
        }
        else if (buttons[i].id === 'clear') {
            buttons[i].addEventListener('click', clearScreen);
        }
        else {
            buttons[i].addEventListener('click', updateScreenContent);
        }
        
    }
}

function getScreenInputContent() {
    const screenContent = document.querySelector('#screen-input')
    return screenContent
}

function getScreenOutputContent() {
    const screenContent = document.querySelector('#screen-output')
    return screenContent
}

function updateScreenContent(e) {

    let screenContent = getScreenInputContent()

    const expression = getScreenInputContent().innerText;
    const parts = getExpressionParts(expression);
    const lastPart = parts[parts.length-1]

    if (e.target.classList.contains("operator")){
        if (e.target.innerText != screenContent.innerText.charAt(screenContent.innerText)) {
            screenContent.innerText += `${e.target.innerText}`
        }
    }
    else if (!(e.target.innerText === '.' && lastPart.includes('.'))) {
        screenContent.innerText += e.target.innerText
    } 

}
placeButtons();
createButtonListeners();