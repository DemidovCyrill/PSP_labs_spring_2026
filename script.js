window.onload = function() {
    let a = '';
    let b = '';
    let selectedOperation = null;
    let expressionResult = '';

    const outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function onDigitButtonClicked(digit) {
        if (selectedOperation === null) {
            if (digit !== '.' || (digit === '.' && !a.includes('.'))) {
                a += digit;
                outputElement.innerHTML = a;
            }
        } else {
            if (digit !== '.' || (digit === '.' && !b.includes('.'))) {
                b += digit;
                outputElement.innerHTML = b;
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
    };

    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
    };

    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        selectedOperation = '-';
    };

    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
    };

    document.getElementById("btn_op_percent").onclick = function() {
        if (selectedOperation === null) {
            if (a !== '') {
                a = (a / 100).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (b / 100).toString();
                outputElement.innerHTML = b;
            }
        }
    };

    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0';
    };

    document.getElementById("btn_op_sign").onclick = function() {
        if (selectedOperation === null) {
            if (a !== '') {
                a = (+a * -1).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (+b * -1).toString();
                outputElement.innerHTML = b;
            }
        }
    };

    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || selectedOperation === null) {
            return;
        }

        const num1 = +a;
        const num2 = +b;

        switch(selectedOperation) {
            case 'x':
                expressionResult = num1 * num2;
                break;
            case '+':
                expressionResult = num1 + num2;
                break;
            case '-':
                expressionResult = num1 - num2;
                break;
            case '/':
                if (num2 === 0) {
                    outputElement.innerHTML = 'Ошибка';
                    return;
                }
                expressionResult = num1 / num2;
                break;
            default:
                return;
        }

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
    };

    //console.log("Калькулятор готов к работе!");
};
