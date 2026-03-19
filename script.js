window.onload = function() {
    let a = '';
    let b = '';
    let selectedOperation = null;

    const outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function onDigitButtonClicked(digit) {
        if (selectedOperation === null) {
            if (digit !== '.' || (digit === '.' && !a.includes('.'))) {
                a += digit;
                outputElement.innerHTML = formatDisplay(a);
            }
        } else {
            if (digit !== '.' || (digit === '.' && !b.includes('.'))) {
                b += digit;
                outputElement.innerHTML = formatDisplay(b);
            }
        }
    }

    function formatDisplay(value) {
    if (isNaN(value) || !isFinite(value)) {
        return value.toString();
    }

    const num = typeof value === 'string' ? parseFloat(value) : value;

    if (Math.abs(num) > 1e12 || (Math.abs(num) < 1e-12 && num !== 0)) {
        return num.toExponential(8);
    }

    return parseFloat(num.toPrecision(12)).toString();
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

    document.getElementById("btn_op_pow10").onclick = function() {
        if (a === '') return;
        selectedOperation = '^';
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

    document.getElementById("btn_op_del").onclick = function() {
        if (selectedOperation === null) {
            if (a.length > 0) {
                a = a.slice(0, -1);
                outputElement.innerHTML = a || '0';
            }
        } else {
            if (b.length > 0) {
                b = b.slice(0, -1);
                outputElement.innerHTML = b || '0';
            }
        }
    };

    document.getElementById("btn_op_sqrt").onclick = function() {
        let number = '';

        if (selectedOperation === null) {
            number = a;
        } else {
            number = b;
        }

        if (number !== '') {
            const num = parseFloat(number);

            if (num < 0) {
                outputElement.innerHTML = 'Ошибка';
                return;
            }

            const result = Math.sqrt(num);

            if (selectedOperation === null) {
                a = result.toString();
                outputElement.innerHTML = formatDisplay(a);
            } else {
                b = result.toString();
                outputElement.innerHTML = formatDisplay(b);
            }
        }
    };

    document.getElementById("btn_op_deg").onclick = function() {
        let number = '';

        if (selectedOperation === null) {
            number = a;
        } else {
            number = b;
        }

        if (number !== '') {
            const num = parseFloat(number);
            const result = num * num;

            if (selectedOperation === null) {
                a = result.toString();
                outputElement.innerHTML = formatDisplay(a);
            } else {
                b = result.toString();
                outputElement.innerHTML = formatDisplay(b);
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

    document.getElementById("btn_op_fuck").onclick = function() {
        let number = '';

        if (selectedOperation === null) {
            number = a;
        } else {
            number = b;
        }

        if (number !== '') {
            const num = +number;

            if (num < 0 || !Number.isInteger(num)) {
                outputElement.innerHTML = 'Ошибка';
                return;
            }

            let result = 1;
            for (let i = 2; i <= num; i++) {
                result *= i;
            }

            if (selectedOperation === null) {
                a = result.toString();
                outputElement.innerHTML = a;
            } else {
                b = result.toString();
                outputElement.innerHTML = b;
            }
        }
    };

    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || selectedOperation === null) {
            return;
        }

        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        let result;

        switch(selectedOperation) {
            case 'x':
                result = num1 * num2;
                break;
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '/':
                if (num2 === 0) {
                    outputElement.innerHTML = 'Ошибка';
                    return;
                }
                result = num1 / num2;
                break;
            case '^':
                result = num1 * Math.pow(10, num2);
                break;
            default:
                return;
        }

        a = result.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = formatDisplay(a);
    };


    document.addEventListener('keydown', function(event) {
        const key = event.key;

        if (key >= '0' && key <= '9') {
            event.preventDefault();
            onDigitButtonClicked(key);
        }

        else if (key === '.') {
            event.preventDefault();
            onDigitButtonClicked('.');
        }

        else if (key === '+') {
            event.preventDefault();
            document.getElementById("btn_op_plus").onclick();
        }
        else if (key === '-') {
            event.preventDefault();
            document.getElementById("btn_op_minus").onclick();
        }
        else if (key === '*') {
            event.preventDefault();
            document.getElementById("btn_op_mult").onclick();
        }
        else if (key === '/') {
            event.preventDefault();
            document.getElementById("btn_op_div").onclick();
        }

        else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            document.getElementById("btn_op_equal").onclick();
        }

        else if (key === 'Escape' || key === 'c' || key === 'C') {
            event.preventDefault();
            document.getElementById("btn_op_clear").onclick();
        }

        else if (key === 'Backspace') {
            event.preventDefault();
            const backspaceBtn = document.getElementById("btn_op_backspace");
            if (backspaceBtn) {
                backspaceBtn.onclick();
            }
        }

        else if (key === 'r' || key === 'R') {
            event.preventDefault();
            const sqrtBtn = document.getElementById("btn_op_sqrt");
            if (sqrtBtn) {
                sqrtBtn.onclick();
            }
        }

        else if (key === 's' || key === 'S') {
            event.preventDefault();
            const squareBtn = document.getElementById("btn_op_square");
            if (squareBtn) {
                squareBtn.onclick();
            }
        }

        else if (key === '!') {
            event.preventDefault();
            const factBtn = document.getElementById("btn_op_factorial");
            if (factBtn) {
                factBtn.onclick();
            }
        }

        console.log("Нажата клавиша:", key);
    });
};
