class Calculator {
    constructor() {
        // get elements
        this.calcExpression = document.getElementById('calc_expression');
        this.calcResult = document.getElementById('calc__result');

        // class variables
        this.result = 0;
        this.operator = '';
        this.num = '';
        this.expression = [];
    }

    updateExpression(value) {
        if (value === 'C') {
            this.clearDisplay();
        } else {
            this.calculateResult(value);

            if (this.calcExpression.value.slice(-1) === value && ['+', '-', '*', '/'].includes(value)) {
                return;  // Prevent duplicate operators
            }

            this.calcExpression.value += value;
        }
    }

    calculateResult(value) {
        if (this.calcExpression.value === '=') {
            this.clearDisplay();
        }

        if (['+', '-', '*', '/'].includes(value)) {
            // Save the current operator
            this.operator = value;

            // Update the result based on the previous operator and num
            if (this.num !== '') {
                this.expression.push(Number(this.num));
                this.expression.push(this.operator);
                // Reset num for the next number input
                this.num = '';
            }
        } else if (value === '=') {
            // Add the last number to the expression
            this.expression.push(Number(this.num));

            // Calculate the result
            this.result = this.expression[0];
            this.expression.forEach((_, i) => {
                const currentOperator = this.expression[i];
                const nextNumber = this.expression[i + 1];

                if (currentOperator === '+') {
                    this.result += nextNumber;
                } else if (currentOperator === '-') {
                    this.result -= nextNumber;
                } else if (currentOperator === '*') {
                    this.result *= nextNumber;
                } else if (currentOperator === '/') {
                    this.result /= nextNumber;
                }
            });

            // Reset for the next calculation
            this.expression = [];
            this.num = '';
            this.operator = '';

            this.updateResult(this.result);
            return;
        } else {
            // Append the value to num to handle multiple digits
            this.num += value;
        }
    }

    clearDisplay() {
        this.calcExpression.value = '';
        this.calcResult.textContent = '0';
        this.result = 0;
    }

    updateResult(result) {
        this.calcResult.textContent = result;
        this.calcExpression.value = '';
    }
}

export default Calculator;
