document.addEventListener('DOMContentLoaded', function () {
    const screen = document.querySelector('.calc-screen');
    let currentInput = '';
    let currentOperator = '';
    let currentResult = null;

    function updateScreen() {
        screen.textContent = currentInput || '0';
    }

    function clearCalculator() {
        currentInput = '';
        currentOperator = '';
        currentResult = null;
    }

    function handleNumberClick(value) {
        currentInput += value;
    }

    function handleDecimalClick() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function handleOperatorClick(value) {
        if (currentOperator === '' || currentInput === '') {
            currentOperator = value;
            if (currentResult === null) {
                currentResult = parseFloat(currentInput);
            }
            currentInput = '';
        } else {
            evaluateExpression();
            currentOperator = value;
        }
    }

    function evaluateExpression() {
        const num = parseFloat(currentInput);
        if (currentOperator === '+') {
            currentResult += num;
        } else if (currentOperator === '-') {
            currentResult -= num;
        } else if (currentOperator === 'x') {
            currentResult *= num;
        } else if (currentOperator === '/') {
            if (num !== 0) {
                currentResult /= num;
            } else {
                alert("Cannot divide by zero");
                clearCalculator();
                return;
            }
        }
        currentInput = currentResult.toString();
        currentOperator = '';
    }

    document.querySelectorAll('.btn').forEach((button) => {
        button.addEventListener('click', function () {
            const value = button.textContent;

            if (value >= '0' && value <= '9') {
                handleNumberClick(value);
            } else if (value === '.') {
                handleDecimalClick();
            } else if (value === 'c') {
                clearCalculator();
            } else if (value === '=') {
                if (currentOperator && currentInput !== '') {
                    evaluateExpression();
                }
            } else {
                handleOperatorClick(value);
            }

            updateScreen();
        });
    });
});