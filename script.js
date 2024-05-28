document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let operator = null;
    let previousValue = '';
    let currentValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.classList.contains('clear')) {
                operator = null;
                previousValue = '';
                currentValue = '';
                display.textContent = '0';
            } else if (button.classList.contains('operator')) {
                if (currentValue) {
                    operator = value;
                    display.textContent = currentValue + ' ' + operator;
                    previousValue = currentValue;
                    currentValue = '';
                }
            } else if (button.classList.contains('equal')) {
                if (operator && previousValue && currentValue) {
                    currentValue = calculate(previousValue, currentValue, operator);
                    display.textContent = currentValue;
                    operator = null;
                    previousValue = '';
                }
            } else {
                if (currentValue === '0' && value !== '.') {
                    currentValue = value;
                } else {
                    currentValue += value;
                }
                display.textContent = currentValue;
            }
        });
    });

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                if (b === 0) return 'Error';
                return (a / b).toString();
            default:
                return b;
        }
    }
});
