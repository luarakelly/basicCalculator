'use strict';

import CalculatorDOM from './calculatorDOM.js';
import Calculator from './calculator.js';

const calculatorDOM = new CalculatorDOM();
calculatorDOM.createButtons();

const calculator = new Calculator();

const calcButtons = document.querySelectorAll('.add-operator, .sub-operator, .mul-operator, .div-operator, .equal-operator, .calc__main-keyboard');
calcButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        calculator.updateExpression(event.target.textContent.trim());
    });
});

window.onload = () => {
    alert("Note! Only use the calculator's keyboard on the screen to input numbers or operators.");
};
