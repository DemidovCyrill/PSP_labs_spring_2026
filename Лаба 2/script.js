window.onload = function() {
    // ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (РАБОТАЕТ НА ВСЕХ СТРАНИЦАХ) =====
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

    // ===== КОД КАЛЬКУЛЯТОРА (РАБОТАЕТ ТОЛЬКО НА СТРАНИЦЕ С КАЛЬКУЛЯТОРОМ) =====
    const outputElement = document.getElementById("result");
    if (!outputElement) return;  // Если нет элемента result — выходим (это не страница калькулятора)

    let a = '';
    let b = '';
    let selectedOperation = null;
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

    function addToHistory(expression, result) {
        historyList.unshift({ expression, result, timestamp: new Date().toLocaleTimeString() });
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

    digitButtons.forEach(button => {
        button.onclick = () => onDigitButtonClicked(button.innerHTML);
    });

    document.getElementById("btn_op_mult").onclick = () => {
        if (a === '') return;
        selectedOperation = 'x';
    };
    document.getElementById("btn_op_plus").onclick = () => {
        if (a === '') return;
        if (selectedOperation && b !== '') document.getElementById("btn_op_equal").onclick();
        selectedOperation = '+';
    };
    document.getElementById("btn_op_minus").onclick = () => {
        if (a === '') return;
        if (selectedOperation && b !== '') document.getElementById("btn_op_equal").onclick();
        selectedOperation = '-';
    };
    document.getElementById("btn_op_div").onclick = () => {
        if (a === '') return;
        selectedOperation = '/';
    };
    document.getElementById("btn_op_pow10").onclick = () => {
        if (a === '') return;
        selectedOperation = '^';
    };

    document.getElementById("btn_op_percent").onclick = () => {
        if (selectedOperation === null) {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                outputElement.innerHTML = formatDisplay(a);
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) / 100).toString();
                outputElement.innerHTML = formatDisplay(b);
            }
        }
    };

    document.getElementById("btn_op_del").onclick = () => {
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

    document.getElementById("btn_op_sqrt").onclick = () => {
        let number = selectedOperation === null ? a : b;
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
            addToHistory(`√(${number})`, formatDisplay(result));
        }
    };

    document.getElementById("btn_op_deg").onclick = () => {
        let number = selectedOperation === null ? a : b;
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
            addToHistory(`${number}²`, formatDisplay(result));
        }
    };

    document.getElementById("btn_op_clear").onclick = () => {
        a = '';
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = '0';
    };

    document.getElementById("btn_op_sign").onclick = () => {
        if (selectedOperation === null) {
            if (a !== '') {
                a = (parseFloat(a) * -1).toString();
                outputElement.innerHTML = formatDisplay(a);
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) * -1).toString();
                outputElement.innerHTML = formatDisplay(b);
            }
        }
    };

    document.getElementById("btn_op_fuck").onclick = () => {
        let number = selectedOperation === null ? a : b;
        if (number !== '') {
            const num = parseFloat(number);
            if (num < 0 || !Number.isInteger(num)) {
                outputElement.innerHTML = 'Ошибка';
                return;
            }
            let result = 1;
            for (let i = 2; i <= num; i++) result *= i;
            if (selectedOperation === null) {
                a = result.toString();
                outputElement.innerHTML = formatDisplay(a);
            } else {
                b = result.toString();
                outputElement.innerHTML = formatDisplay(b);
            }
            addToHistory(`${number}!`, formatDisplay(result));
        }
    };

    document.getElementById("btn_op_equal").onclick = () => {
        if (a === '' || b === '' || selectedOperation === null) return;
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        let result;
        let expressionStr = `${num1} `;
        switch(selectedOperation) {
            case 'x':
                result = num1 * num2;
                expressionStr += `× ${num2}`;
                break;
            case '+':
                result = num1 + num2;
                expressionStr += `+ ${num2}`;
                break;
            case '-':
                result = num1 - num2;
                expressionStr += `- ${num2}`;
                break;
            case '/':
                if (num2 === 0) {
                    outputElement.innerHTML = 'Ошибка';
                    return;
                }
                result = num1 / num2;
                expressionStr += `/ ${num2}`;
                break;
            case '^':
                result = num1 * Math.pow(10, num2);
                expressionStr += `× 10^${num2}`;
                break;
            default: return;
        }
        a = result.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = formatDisplay(a);
        addToHistory(expressionStr, formatDisplay(result));
    };

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
            document.getElementById("btn_op_plus").onclick();
        } else if (key === '-') {
            event.preventDefault();
            document.getElementById("btn_op_minus").onclick();
        } else if (key === '*') {
            event.preventDefault();
            document.getElementById("btn_op_mult").onclick();
        } else if (key === '/') {
            event.preventDefault();
            document.getElementById("btn_op_div").onclick();
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            document.getElementById("btn_op_equal").onclick();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            event.preventDefault();
            document.getElementById("btn_op_clear").onclick();
        } else if (key === 'Backspace') {
            event.preventDefault();
            document.getElementById("btn_op_del").onclick();
        } else if (key === 'r' || key === 'R') {
            event.preventDefault();
            document.getElementById("btn_op_sqrt").onclick();
        } else if (key === 's' || key === 'S') {
            event.preventDefault();
            document.getElementById("btn_op_deg").onclick();
        } else if (key === '!') {
            event.preventDefault();
            document.getElementById("btn_op_fuck").onclick();
        } else if (key === 'e' || key === 'E') {
            event.preventDefault();
            document.getElementById("btn_op_pow10").onclick();
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
};
