function placeButtons() {
    
    // Assigns every button in calculator body a gridArea equal to its id

    const calcBody = document.querySelector(".calculator-body");
    const buttons = calcBody.querySelectorAll('button');

    buttons.forEach(button=>button.style.gridArea=button.id);

}

placeButtons();