class CalculatorDOM {
    constructor() {
        this.dynamicContainer = document.getElementById('calc__dynamic-keyboard');
        this.containerData = [
            [9, 8, 7],
            [6, 5, 4],
            [3, 2, 1],
            [0, '.', 'C']
        ];
    }

    createButtons() {
        this.containerData.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');

            row.forEach(item => {
                const buttonElement = document.createElement('button');
                buttonElement.classList.add('calc__main-keyboard', 'col-4', 'p-1');
                buttonElement.textContent = ` ${item}`;
                rowElement.appendChild(buttonElement);
            });

            this.dynamicContainer.appendChild(rowElement);
        });
    }
}
export default CalculatorDOM;