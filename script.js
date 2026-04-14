window.onload = function() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('calculatorTheme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        } else if (savedTheme === 'light') {
            document.body.classList.remove('dark-theme');
            themeToggle.textContent = '🌙';
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        }

        themeToggle.onclick = function() {
            if (document.body.classList.contains('dark-theme')) {
                document.body.classList.remove('dark-theme');
                themeToggle.textContent = '🌙';
                localStorage.setItem('calculatorTheme', 'light');
            } else {
                document.body.classList.add('dark-theme');
                themeToggle.textContent = '☀️';
                localStorage.setItem('calculatorTheme', 'dark');
            }
        };
    }

    const outputElement = document.getElementById("result");
    if (!outputElement) return; // Выход, если это не страница калькулятора

    let currentExpression = ''; // Строка, которая отображается на экране (например, "4+4+6")
    let currentResult = null;   // Результат последнего вычисления (для продолжений)
    let lastOperator = null;     // Последний нажатый оператор
    let waitingForOperand = false; // Ожидание ввода второго операнда после оператора
    let historyList = [];

    const historyContainer = document.getElementById('historyList');
    const historyToggle = document.getElementById('historyToggle');
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function formatDisplay(value) {
        if (isNaN(value) || !isFinite(value)) return value.toString();
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (Math.abs(num) > 1e12 || (Math.abs(num) < 1e-12 && num !== 0)) {
            return num.toExponential(7);
        }
        return parseFloat(num.toPrecision(12)).toString();
    }

    function updateDisplay() {
        if (currentExpression === '') {
            outputElement.innerHTML = '0';
        } else {
            outputElement.innerHTML = currentExpression;
        }
    }

    function addToHistory(expression, result) {
        const formattedResult = formatDisplay(result);
        historyList.unshift({ expression, result: formattedResult, timestamp: new Date().toLocaleTimeString() });
        if (historyList.length > 20) historyList.pop();
        updateHistoryDisplay();
    }

    function updateHistoryDisplay() {
        if (!historyContainer) return;
        if (historyList.length === 0) {
            historyContainer.innerHTML = '<div class="history-empty">Пока нет истории</div>';
            return;
        }
        historyContainer.innerHTML = historyList.map(item =>
            `<div class="history-item">${item.expression} = ${item.result}</div>`
        ).join('');

        const isCollapsed = historyContainer.classList.contains('collapsed');
        if (isCollapsed && historyList.length > 0) {
            const allItems = historyContainer.querySelectorAll('.history-item');
            allItems.forEach((item, index) => {
                if (index !== 0) item.style.display = 'none';
                else item.style.display = 'block';
            });
        }
    }

    function calculateExpression(expr) {
        // Заменяем '×' на '*' для вычислений
        let calculationExpr = expr.replace(/×/g, '*');
        try {
            if (/[^0-9+\-*/^().%!√]/.test(calculationExpr)) {
                return null;
            }
            const result = Function('"use strict";return (' + calculationExpr + ')')();
            if (isNaN(result) || !isFinite(result)) {
                return null;
            }
            return result;
        } catch (e) {
            console.error("Ошибка вычисления:", e);
            return null;
        }
    }

    function onDigitButtonClicked(digit) {
        if (waitingForOperand) {
            if (digit === '.' && currentExpression.endsWith('.')) return;
            currentExpression += digit;
            waitingForOperand = false;
        } else {
            if (digit === '.' && currentExpression.split(/[\+\-\*\/×]/).pop().includes('.')) return;
            currentExpression += digit;
        }
        updateDisplay();
    }

    function handleOperator(op) {
        if (currentExpression === '') {
            if (op === '-') {
                currentExpression = '-';
                waitingForOperand = false;
                updateDisplay();
            }
            return;
        }

        const lastChar = currentExpression.slice(-1);
        if (['+', '-', '×', '/'].includes(lastChar)) {
            currentExpression = currentExpression.slice(0, -1) + op;
            updateDisplay();
            return;
        }

        currentExpression += op;
        waitingForOperand = true;
        updateDisplay();
    }

    function calculateResult() {
        if (currentExpression === '' || waitingForOperand) return;

        const exprToCalculate = currentExpression;
        const result = calculateExpression(exprToCalculate);

        if (result === null) {
            outputElement.innerHTML = 'Ошибка';
            currentExpression = '';
            waitingForOperand = false;
            return;
        }

        const formattedResult = formatDisplay(result);
        addToHistory(exprToCalculate, formattedResult);

        currentExpression = formattedResult;
        waitingForOperand = true;
        updateDisplay();
    }

    function applyUnaryOperation(operation, symbol) {
        if (currentExpression === '') return;

        const match = currentExpression.match(/[\d\.]+(?!.*[\d\.])/);
        if (!match) return;

        const lastNumber = match[0];
        const lastNumberIndex = currentExpression.lastIndexOf(lastNumber);
        let num = parseFloat(lastNumber);
        let result;
        let newNumberStr;

        switch(operation) {
            case 'sqrt':
                if (num < 0) {
                    outputElement.innerHTML = 'Ошибка';
                    return;
                }
                result = Math.sqrt(num);
                newNumberStr = formatDisplay(result);
                break;
            case 'square':
                result = num * num;
                newNumberStr = formatDisplay(result);
                break;
            case 'factorial':
                if (num < 0 || !Number.isInteger(num)) {
                    outputElement.innerHTML = 'Ошибка';
                    return;
                }
                let fact = 1;
                for (let i = 2; i <= num; i++) fact *= i;
                result = fact;
                newNumberStr = formatDisplay(result);
                break;
            case 'percent':
                result = num / 100;
                newNumberStr = formatDisplay(result);
                break;
            default:
                return;
        }

        const before = currentExpression.substring(0, lastNumberIndex);
        const after = currentExpression.substring(lastNumberIndex + lastNumber.length);
        currentExpression = before + newNumberStr + after;
        waitingForOperand = false;
        updateDisplay();
    }

    function clearAll() {
        currentExpression = '';
        waitingForOperand = false;
        updateDisplay();
    }

    function deleteLastChar() {
        if (currentExpression.length > 0) {
            currentExpression = currentExpression.slice(0, -1);
            updateDisplay();
        }
    }

    // --- Смена знака у последнего числа ---
    function toggleSign() {
        if (currentExpression === '') return;

        // Находим последнее число в выражении
        const match = currentExpression.match(/-?[\d\.]+(?!.*[+\-×/])/);
        if (!match) return;

        const lastNumber = match[0];
        const lastNumberIndex = currentExpression.lastIndexOf(lastNumber);
        let newNumber;

        if (lastNumber.startsWith('-')) {
            newNumber = lastNumber.substring(1);
        } else {
            newNumber = '-' + lastNumber;
        }

        const before = currentExpression.substring(0, lastNumberIndex);
        const after = currentExpression.substring(lastNumberIndex + lastNumber.length);
        currentExpression = before + newNumber + after;
        updateDisplay();
    }

    // === НАЗНАЧЕНИЕ ОБРАБОТЧИКОВ ===
    digitButtons.forEach(button => {
        button.onclick = () => onDigitButtonClicked(button.innerHTML);
    });

    document.getElementById("btn_op_mult").onclick = () => handleOperator('×');
    document.getElementById("btn_op_plus").onclick = () => handleOperator('+');
    document.getElementById("btn_op_minus").onclick = () => handleOperator('-');
    document.getElementById("btn_op_div").onclick = () => handleOperator('/');
    document.getElementById("btn_op_pow10").onclick = () => handleOperator('^'); // 10^n как бинарная операция

    document.getElementById("btn_op_equal").onclick = calculateResult;
    document.getElementById("btn_op_clear").onclick = clearAll;
    document.getElementById("btn_op_del").onclick = deleteLastChar;
    document.getElementById("btn_op_sign").onclick = toggleSign;

    document.getElementById("btn_op_percent").onclick = () => applyUnaryOperation('percent', '%');
    document.getElementById("btn_op_sqrt").onclick = () => applyUnaryOperation('sqrt', '√');
    document.getElementById("btn_op_deg").onclick = () => applyUnaryOperation('square', 'x²');
    document.getElementById("btn_op_fuck").onclick = () => applyUnaryOperation('factorial', 'x!');

    // Обработка клавиатуры
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            event.preventDefault();
            onDigitButtonClicked(key);
        } else if (key === '.') {
            event.preventDefault();
            onDigitButtonClicked('.');
        } else if (key === '+') {
            event.preventDefault();
            handleOperator('+');
        } else if (key === '-') {
            event.preventDefault();
            handleOperator('-');
        } else if (key === '*') {
            event.preventDefault();
            handleOperator('×');
        } else if (key === '/') {
            event.preventDefault();
            handleOperator('/');
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            calculateResult();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            event.preventDefault();
            clearAll();
        } else if (key === 'Backspace') {
            event.preventDefault();
            deleteLastChar();
        } else if (key === 'r' || key === 'R') {
            event.preventDefault();
            applyUnaryOperation('sqrt', '√');
        } else if (key === 's' || key === 'S') {
            event.preventDefault();
            applyUnaryOperation('square', 'x²');
        } else if (key === '!') {
            event.preventDefault();
            applyUnaryOperation('factorial', 'x!');
        }
    });

    const colorOptions = document.querySelectorAll('.color-option');
    const resetColorBtn = document.getElementById('resetColorBtn');
    function applyButtonColor(color) {
        document.querySelectorAll('.my-btn.primary').forEach(btn => {
            btn.style.backgroundColor = color;
        });
        localStorage.setItem('buttonColor', color);
    }
    if (colorOptions.length) {
        const savedColor = localStorage.getItem('buttonColor');
        if (savedColor) applyButtonColor(savedColor);
        colorOptions.forEach(option => {
            option.onclick = () => applyButtonColor(option.getAttribute('data-color'));
        });
        if (resetColorBtn) {
            resetColorBtn.onclick = () => {
                document.querySelectorAll('.my-btn.primary').forEach(btn => {
                    btn.style.backgroundColor = '';
                });
                localStorage.removeItem('buttonColor');
            };
        }
    }

    if (historyToggle) {
        let collapsed = true;
        const historyListEl = document.getElementById('historyList');
        const toggleBtn = document.querySelector('.history-toggle-btn');

        if (historyListEl) {
            historyListEl.classList.add('collapsed');
            toggleBtn.textContent = '▼';

            historyToggle.onclick = () => {
                collapsed = !collapsed;
                if (collapsed) {
                    historyListEl.classList.add('collapsed');
                    toggleBtn.textContent = '▼';
                    const allItems = historyListEl.querySelectorAll('.history-item');
                    allItems.forEach((item, index) => {
                        if (index !== 0) item.style.display = 'none';
                        else item.style.display = 'block';
                    });
                } else {
                    historyListEl.classList.remove('collapsed');
                    toggleBtn.textContent = '▲';
                    const allItems = historyListEl.querySelectorAll('.history-item');
                    allItems.forEach(item => {
                        item.style.display = 'block';
                    });
                }
            };
        }
    }
};
