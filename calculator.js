'use strict';

// get elements
const calcExpression = document.getElementById('calc_expression');
const calcResult = document.getElementById('calc__result');
const dynamicContainer = document.getElementById('calc__dynamic-keyboard');

//global variables
let result = 0;
let operator = '';
let num = '';
let expression = [];

const containerData = [ //for the dynamic btns
    [9, 8, 7],
    [6, 5, 4],
    [3, 2, 1],
    [0, '.', 'C']
];
                    
// Create buttons dynamically
containerData.forEach(row => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
                    
    row.forEach(item => {
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('calc__main-keyboard', 'col-4', 'p-1');
        buttonElement.textContent = ` ${item}`;
        rowElement.appendChild(buttonElement);
    });
                    
    dynamicContainer.appendChild(rowElement);
});

window.onload = function () {
    alert("Note! Only use the calculator's keyboard on the screen to input numbers or operators.");
};

function updateExpression(value) {
    if (value === 'C') {
        clearDisplay();
    } else {
        calculateResult(value);

        if (calcExpression.value.slice(-1) === value && (['+', '-', '*', '/'].includes(value))) {
            return;  // Prevent duplicate operators
        }

        calcExpression.value += value;
    }
}

function calculateResult(value) {
    if (calcExpression.value === '=') {
        clearDisplay();
    }

    if (['+', '-', '*', '/'].includes(value)) {
        // Save the current operator
        operator = value;

        // Update the result based on the previous operator and num
        if (num !== '') {
            expression.push(Number(num));
            expression.push(operator);
            // Reset num for the next number input
            num = '';
        }
    } else if (value === '=') {
        // Add the last number to the expression
        expression.push(Number(num));

        // Calculate the result
        result = expression[0];
        expression.forEach((_,i)=> {
            const currentOperator = expression[i];
            const nextNumber = expression[i + 1];

            if (currentOperator === '+') {
                result += nextNumber;
            } else if (currentOperator === '-') {
                result -= nextNumber;
            } else if (currentOperator === '*') {
                result *= nextNumber;
            } else if (currentOperator === '/') {
                result /= nextNumber;
            }
        });

        // Reset for the next calculation
        expression = [];
        num = '';
        operator = '';

        updateResult(result);
        return;
    } else {
        // Append the value to num to handle multiple digits
        num += value;
    }
}

function clearDisplay() {
    calcExpression.value = '';
    calcResult.textContent = '0';
    result = 0
}

function updateResult(result) {
    calcResult.textContent = result;
    calcExpression.value = '';
}
  
// Add event listeners to the dynamically created number buttons
const numberButtons = document.querySelectorAll('.calc__main-keyboard');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        updateExpression(button.textContent.trim());
    });
});