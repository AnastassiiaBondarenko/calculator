document.addEventListener('DOMContentLoaded', function () {
    const screen = document.querySelector('.calc-screen');
    let currentInput = '';
    let currentOperator = '';
    let currentResult = null;

    function updateScreen() {
        screen.textContent = currentInput;
    }

    document.querySelectorAll('.btn').forEach((button) => {
        button.addEventListener('click', function () {
            const value = button.textContent;

            if (value >= '0' && value <= '9') {
                currentInput += value;
            } else if (value === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += value;
                }
            } else if (value === 'c') {
                currentInput = '';
                currentOperator = '';
                currentResult = null;
            } else if (value === '=') {
                if (currentOperator && currentInput !== '') {
                    if (currentResult === null) {
                        currentResult = parseFloat(currentInput);
                    } else {
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
                                currentInput = '';
                                currentOperator = '';
                                currentResult = null;
                                updateScreen();
                                return;
                            }
                        }
                    }
                    currentInput = currentResult.toString();
                    currentOperator = '';
                }
            } else {
                if (currentOperator === '') {
                    currentOperator = value;
                    if (currentResult === null) {
                        currentResult = parseFloat(currentInput);
                    }
                    currentInput = '';
                }
            }

            updateScreen();
        });
    });
});