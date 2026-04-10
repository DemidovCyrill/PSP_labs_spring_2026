export class FunctionsPage {
    constructor(parent) {
        this.parent = parent;
        this.currentArray = ['Тираннозавр', 'Трицератопс', 'Стегозавр', 'Тираннозавр', 'Велоцираптор'];
        this.originalArray = ['Тираннозавр', 'Трицератопс', 'Стегозавр', 'Тираннозавр', 'Велоцираптор'];
        this.isNumericMode = false;

        this.secondArray = ['Тираннозавр', 'Велоцираптор', 'Спинозавр'];
        this.testArrayForErase = [0, 1, false, 2, undefined, '', 3, null, 'Тираннозавр', '', 5];
        this.secondArrayForDiff = ['Тираннозавр', 'Велоцираптор', 'Спинозавр'];
        this.obj1 = { name: 'Тираннозавр', period: 'Мел', weight: 8000 };
        this.obj2 = { name: 'Тираннозавр', period: 'Мел', weight: 8000 };
    }

    getHTML() {
        return `
            <div id="functions-page">
                <nav class="navbar">
                    <div class="nav-logo">
                        <span class="logo-text">Палео<span class="logo-accent">Wise</span></span>
                    </div>
                    <div class="nav-actions">
                        <button id="globalThemeToggle" class="theme-toggle-btn">🌙</button>
                        <a href="https://github.com/DemidovCyrill/PSP_labs_spring_2026" target="_blank" class="github-btn">GitHub</a>
                    </div>
                </nav>

                <div class="main-container">
                    <div class="functions-header">
                        <h1 class="functions-main-title">Домашнее задание: Работа с коллекциями</h1>
                        <p class="functions-subtitle">Реализация функций для работы с массивами на примере данных о динозаврах</p>
                        <button id="backToMainBtn" class="back-to-main-btn">← Вернуться к динозаврам</button>
                    </div>

                    <!-- Рабочая область с массивом -->
                    <div class="array-workspace">
                        <h3 class="workspace-title">Текущий массив данных</h3>

                        <div class="array-visual-container">
                            <div class="array-indices" id="arrayIndices"></div>
                            <div class="array-values" id="arrayValues"></div>
                        </div>

                        <div class="array-controls-panel">
                            <div class="controls-row">
                                <div class="control-group">
                                    <label>➕ Добавить элемент</label>
                                    <div class="control-input-group">
                                        <input type="text" id="addValueInput" placeholder="Название или число" class="array-input">
                                        <button id="addToArrayBtn" class="array-btn primary-btn">Добавить</button>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label>➖ Удалить по индексу</label>
                                    <div class="control-input-group">
                                        <input type="number" id="removeIndexInput" placeholder="Индекс" class="array-input" min="0">
                                        <button id="removeFromArrayBtn" class="array-btn danger-btn">Удалить</button>
                                    </div>
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="control-group">
                                    <label>🎲 Случайный числовой массив</label>
                                    <div class="control-input-group">
                                        <button id="randomNumericBtn" class="array-btn success-btn">Создать случайный числовой</button>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label>🔄 Сброс</label>
                                    <div class="control-input-group">
                                        <button id="resetArrayBtn" class="array-btn warning-btn">Вернуть исходный</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="array-info">
                            <span class="array-length">Длина массива: <strong id="arrayLength">${this.currentArray.length}</strong></span>
                            <span class="array-type" id="arrayType">Тип: строковый</span>
                        </div>
                    </div>

                    <!-- Сетка функций -->
                    <div class="functions-grid">
                        <!-- 1.1 concatenate -->
                        <div class="func-card">
                            <h3>1.1 concatenate(массив, разделитель)</h3>
                            <p class="func-desc">Склеивает массив строк с указанным разделителем</p>
                            <div class="func-params">
                                <label>Разделитель:</label>
                                <input type="text" id="concatSeparator" value=" → " class="func-input">
                            </div>
                            <div class="func-demo">
                                <strong>Результат:</strong> <span id="concatResult" class="func-result">-</span>
                            </div>
                            <button class="func-run-btn" data-func="concat">▶ Выполнить</button>
                        </div>

                        <!-- 1.2 countIdentic -->
                        <div class="func-card">
                            <h3>1.2 countIdentic(массив)</h3>
                            <p class="func-desc">Возвращает количество повторяющихся элементов</p>
                            <div class="func-demo">
                                <strong>Результат:</strong> <span id="countIdenticResult" class="func-result">-</span>
                            </div>
                            <button class="func-run-btn" data-func="countIdentic">▶ Выполнить</button>
                        </div>

                        <!-- 1.3 sumOfSquares -->
                        <div class="func-card">
                            <h3>1.3 sumOfSquares(массив)</h3>
                            <p class="func-desc">Сумма квадратов чисел (нужны числовые значения)</p>
                            <div class="func-demo">
                                <strong>Результат:</strong> <span id="sumSquaresResult" class="func-result">-</span>
                            </div>
                            <button class="func-run-btn" data-func="sumSquares">▶ Выполнить</button>
                        </div>

                        <!-- 1.4 getSumAndMultOfArray -->
                        <div class="func-card">
                            <h3>1.4 getSumAndMultOfArray(массив)</h3>
                            <p class="func-desc">Сумма и произведение числовых значений</p>
                            <div class="func-demo">
                                <strong>Сумма:</strong> <span id="sumResult" class="func-result">-</span><br>
                                <strong>Произведение:</strong> <span id="multResult" class="func-result">-</span>
                            </div>
                            <button class="func-run-btn" data-func="sumMult">▶ Выполнить</button>
                        </div>

                        <!-- 1.5 moveElement -->
                        <div class="func-card">
                            <h3>1.5 moveElement(массив, from, to)</h3>
                            <p class="func-desc">Перемещает элемент из позиции from в позицию to</p>
                            <div class="func-params-row">
                                <div class="func-param">
                                    <label>From (индекс):</label>
                                    <input type="number" id="moveFrom" value="0" class="func-input-small">
                                </div>
                                <div class="func-param">
                                    <label>To (индекс):</label>
                                    <input type="number" id="moveTo" value="2" class="func-input-small">
                                </div>
                            </div>
                            <div class="func-demo">
                                <strong>Результат:</strong> <span id="moveResult" class="func-result">-</span>
                            </div>
                            <button class="func-run-btn" data-func="move">▶ Выполнить</button>
                        </div>

                        <!-- 1.6 isEqualArrays -->
                        <div class="func-card">
                            <h3>1.6 isEqualArrays(массив1, массив2)</h3>
                            <p class="func-desc">Сравнивает текущий массив с указанным ниже</p>
                            <div class="func-params">
                                <label>Второй массив (через запятую):</label>
                                <input type="text" id="secondArrayInput" value="${this.secondArray.join(', ')}" class="func-input">
                            </div>
                            <div class="func-demo">
                                <strong>Результат:</strong> <span id="equalArraysResult" class="func-result">-</span>
                            </div>
                            <button class="func-run-btn" data-func="equalArrays">▶ Выполнить</button>
                        </div>

                        <!-- 1.7 isEqualObj -->
                        <div class="func-card">
                            <h3>1.7 isEqualObj(объект1, объект2)</h3>
                            <p class="func-desc">Сравнивает два JSON объекта</p>
                            <div class="func-params">
                                <label>Объект 1 (JSON):</label>
                                <textarea id="obj1Input" rows="2" class="func-textarea">${JSON.stringify(this.obj1, null, 2)}</textarea>
                            </div>
                            <div class="func-params">
                                <label>Объект 2 (JSON):</label>
                                <textarea id="obj2Input" rows="2" class="func-textarea">${JSON.stringify(this.obj2, null, 2)}</textarea>
                            </div>
                            <div class="func-demo">
                                <strong>Результат:</strong> <span id="equalObjResult" class="func-result">-</span>
                            </div>
                            <button class="func-run-btn" data-func="equalObj">▶ Выполнить</button>
                        </div>

                        <!-- 1.8 average -->
                        <div class="func-card">
                            <h3>1.8 average(массив)</h3>
                            <p class="func-desc">Среднее арифметическое числовых значений</p>
                            <div class="func-demo">
                                <strong>Результат:</strong> <span id="avgResult" class="func-result">-</span>
                            </div>
                            <button class="func-run-btn" data-func="average">▶ Выполнить</button>
                        </div>

                        <!-- 1.9 fill -->
                        <div class="func-card">
                            <h3>1.9 fill(размер, значение)</h3>
                            <p class="func-desc">Заполняет новый массив указанным значением</p>
                            <div class="func-params-row">
                                <div class="func-param">
                                    <label>Размер массива:</label>
                                    <input type="number" id="fillSize" value="5" class="func-input-small" min="1" max="20">
                                </div>
                                <div class="func-param">
                                    <label>Значение:</label>
                                    <input type="text" id="fillValue" value="🦕" class="func-input-small">
                                </div>
                            </div>
                            <div class="func-demo">
                                <strong>Результат:</strong> <span id="fillResult" class="func-result">-</span>
                            </div>
                            <button class="func-run-btn" data-func="fill">▶ Выполнить</button>
                        </div>

                        <!-- 1.10 erase -->
                        <div class="func-card">
                            <h3>1.10 erase(массив)</h3>
                            <p class="func-desc">Очищает массив от ложных значений (false, undefined, null, 0, '')</p>
                            <div class="func-params">
                                <label>Тестовый массив (через запятую):</label>
                                <input type="text" id="eraseArrayInput" value="${this.testArrayForErase.map(v => v === '' ? "''" : v).join(', ')}" class="func-input">
                                <p class="func-hint">* false, undefined, null, 0, '' будут удалены</p>
                            </div>
                            <div class="func-demo">
                                <strong>Результат:</strong> <span id="eraseResult" class="func-result">-</span>
                            </div>
                            <button class="func-run-btn" data-func="erase">▶ Выполнить</button>
                        </div>

                        <!-- 2.4 diff -->
                        <div class="func-card">
                            <h3>2.4 diff(массив1, массив2)</h3>
                            <p class="func-desc">Возвращает элементы первого массива, которых нет во втором</p>
                            <div class="func-params">
                                <label>Второй массив (через запятую):</label>
                                <input type="text" id="diffArrayInput" value="${this.secondArrayForDiff.join(', ')}" class="func-input">
                            </div>
                            <div class="func-demo">
                                <strong>Результат:</strong> <span id="diffResult" class="func-result">-</span>
                            </div>
                            <button class="func-run-btn" data-func="diff">▶ Выполнить</button>
                        </div>
                    </div>
                </div>

                <footer class="footer">
                    <p>© 2026 Кирилл Демидов | Лабораторная работа по программированию сетевых приложений</p>
                </footer>
            </div>
        `;
    }

    // ===== РЕАЛИЗАЦИЯ ФУНКЦИЙ =====
    concatenate(arr, separator) {
        return arr.join(separator);
    }

    countIdentic(arr) {
        const counts = {};
        arr.forEach(item => {
            const key = String(item);
            counts[key] = (counts[key] || 0) + 1;
        });
        let duplicates = 0;
        for (let key in counts) {
            if (counts[key] > 1) duplicates++;
        }
        return duplicates;
    }

    sumOfSquares(arr) {
        const numbers = arr.filter(item => !isNaN(parseFloat(item)) && isFinite(item)).map(Number);
        return numbers.reduce((sum, num) => sum + num * num, 0);
    }

    getSumAndMultOfArray(arr) {
        const numbers = arr.filter(item => !isNaN(parseFloat(item)) && isFinite(item)).map(Number);
        const sum = numbers.reduce((s, n) => s + n, 0);
        const mult = numbers.reduce((m, n) => m * n, 1);
        return { sum, mult };
    }

    moveElement(arr, from, to) {
        const result = [...arr];
        if (from < 0 || from >= result.length || to < 0 || to >= result.length) {
            return { error: `Индекс вне диапазона (0-${result.length - 1})` };
        }
        const element = result[from];
        result.splice(from, 1);
        result.splice(to, 0, element);
        return result;
    }

    isEqualArrays(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((item, index) => String(item) === String(arr2[index]));
    }

    isEqualObj(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    average(arr) {
        const numbers = arr.filter(item => !isNaN(parseFloat(item)) && isFinite(item)).map(Number);
        if (numbers.length === 0) return 0;
        return numbers.reduce((s, n) => s + n, 0) / numbers.length;
    }

    fill(arraySize, data) {
        return new Array(arraySize).fill(data);
    }

    erase(arr) {
        return arr.filter(item =>
            item !== false &&
            item !== undefined &&
            item !== null &&
            item !== 0 &&
            item !== ''
        );
    }

    diff(arr1, arr2) {
        return arr1.filter(item => !arr2.includes(item));
    }

    // ===== ПАРСИНГ ВВОДА ПОЛЬЗОВАТЕЛЯ =====
    parseArrayFromString(str) {
        return str.split(',').map(s => {
            const trimmed = s.trim();
            // Пытаемся распарсить число
            if (!isNaN(parseFloat(trimmed)) && isFinite(trimmed)) {
                return parseFloat(trimmed);
            }
            // Убираем кавычки если есть
            if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
                return trimmed.slice(1, -1);
            }
            if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                return trimmed.slice(1, -1);
            }
            return trimmed;
        });
    }

    // ===== ГЕНЕРАЦИЯ СЛУЧАЙНОГО ЧИСЛОВОГО МАССИВА =====
    generateRandomNumericArray() {
        const length = Math.floor(Math.random() * 5) + 3;
        const newArray = [];
        for (let i = 0; i < length; i++) {
            newArray.push(Math.floor(Math.random() * 50) + 1);
        }
        return newArray;
    }

    // ===== ОБНОВЛЕНИЕ ОТОБРАЖЕНИЯ МАССИВА =====
    updateArrayDisplay() {
        const indicesDiv = document.getElementById('arrayIndices');
        const valuesDiv = document.getElementById('arrayValues');
        const lengthSpan = document.getElementById('arrayLength');
        const typeSpan = document.getElementById('arrayType');

        if (indicesDiv) {
            indicesDiv.innerHTML = this.currentArray.map((_, index) =>
                `<div class="array-index">${index}</div>`
            ).join('');
        }

        if (valuesDiv) {
            valuesDiv.innerHTML = this.currentArray.map((item) =>
                `<div class="array-value ${!isNaN(parseFloat(item)) && isFinite(item) ? 'numeric' : 'string'}">${item}</div>`
            ).join('');
        }

        if (lengthSpan) {
            lengthSpan.textContent = this.currentArray.length;
        }

        if (typeSpan) {
            const isAllNumeric = this.currentArray.length > 0 &&
                this.currentArray.every(item => !isNaN(parseFloat(item)) && isFinite(item));
            this.isNumericMode = isAllNumeric;
            typeSpan.innerHTML = isAllNumeric ? 'Тип: числовой' : 'Тип: строковый';
            typeSpan.className = `array-type ${isAllNumeric ? 'numeric-type' : 'string-type'}`;
        }

        const removeInput = document.getElementById('removeIndexInput');
        if (removeInput) {
            removeInput.placeholder = `Индекс (0-${this.currentArray.length - 1})`;
            removeInput.max = this.currentArray.length - 1;
        }
    }

    // ===== ИНИЦИАЛИЗАЦИЯ ОБРАБОТЧИКОВ =====
    initEventListeners() {
        // Кнопка "Вернуться к динозаврам"
        const backBtn = document.getElementById('backToMainBtn');
        if (backBtn) {
            backBtn.onclick = () => {
                import('./main/index.js').then(module => {
                    const MainPage = module.MainPage;
                    const mainPage = new MainPage(this.parent);
                    mainPage.render();
                }).catch(err => {
                    console.error('Error loading MainPage:', err);
                    window.location.reload();
                });
            };
        }

        // Добавление элемента
        document.getElementById('addToArrayBtn').onclick = () => {
            const input = document.getElementById('addValueInput');
            const value = input.value.trim();
            if (value) {
                this.currentArray.push(value);
                this.updateArrayDisplay();
                input.value = '';
            }
        };

        // Удаление по индексу
        document.getElementById('removeFromArrayBtn').onclick = () => {
            const input = document.getElementById('removeIndexInput');
            const index = parseInt(input.value);
            if (!isNaN(index) && index >= 0 && index < this.currentArray.length) {
                this.currentArray.splice(index, 1);
                this.updateArrayDisplay();
                input.value = '';
            } else {
                alert(`Введите корректный индекс (0-${this.currentArray.length - 1})`);
            }
        };

        // Сброс к исходному
        document.getElementById('resetArrayBtn').onclick = () => {
            this.currentArray = [...this.originalArray];
            this.updateArrayDisplay();
        };

        // Создание случайного числового массива
        document.getElementById('randomNumericBtn').onclick = () => {
            this.currentArray = this.generateRandomNumericArray();
            this.updateArrayDisplay();
        };

        // Вспомогательная функция проверки на число
        const isNumeric = (value) => {
            return !isNaN(parseFloat(value)) && isFinite(value);
        };

        // 1.1 concatenate
        document.querySelector('[data-func="concat"]').onclick = () => {
            const separator = document.getElementById('concatSeparator').value;
            const result = this.concatenate(this.currentArray, separator);
            document.getElementById('concatResult').textContent = result;
        };

        // 1.2 countIdentic
        document.querySelector('[data-func="countIdentic"]').onclick = () => {
            const result = this.countIdentic(this.currentArray);
            document.getElementById('countIdenticResult').textContent = result;
        };

        // 1.3 sumOfSquares
        document.querySelector('[data-func="sumSquares"]').onclick = () => {
            if (this.currentArray.length > 0 && this.currentArray.every(isNumeric)) {
                const result = this.sumOfSquares(this.currentArray);
                document.getElementById('sumSquaresResult').textContent = `${result}`;
            } else {
                document.getElementById('sumSquaresResult').textContent = `❌ Массив не числовой`;
            }
        };

        // 1.4 getSumAndMultOfArray
        document.querySelector('[data-func="sumMult"]').onclick = () => {
            if (this.currentArray.length > 0 && this.currentArray.every(isNumeric)) {
                const { sum, mult } = this.getSumAndMultOfArray(this.currentArray);
                document.getElementById('sumResult').textContent = sum;
                document.getElementById('multResult').textContent = mult;
            } else {
                document.getElementById('sumResult').textContent = `❌ Массив не числовой`;
                document.getElementById('multResult').textContent = `❌ Массив не числовой`;
            }
        };

        // 1.5 moveElement
        document.querySelector('[data-func="move"]').onclick = () => {
            const from = parseInt(document.getElementById('moveFrom').value);
            const to = parseInt(document.getElementById('moveTo').value);
            const result = this.moveElement(this.currentArray, from, to);
            if (result.error) {
                document.getElementById('moveResult').textContent = result.error;
            } else {
                document.getElementById('moveResult').textContent = `[${result.join(', ')}]`;
            }
        };

        // 1.6 isEqualArrays
        document.querySelector('[data-func="equalArrays"]').onclick = () => {
            const secondArrayStr = document.getElementById('secondArrayInput').value;
            const secondArray = this.parseArrayFromString(secondArrayStr);
            const result = this.isEqualArrays(this.currentArray, secondArray);
            document.getElementById('equalArraysResult').innerHTML = result ?
                '✅ Массивы одинаковы' : '❌ Массивы разные';
        };

        // 1.7 isEqualObj
        document.querySelector('[data-func="equalObj"]').onclick = () => {
            try {
                const obj1Str = document.getElementById('obj1Input').value;
                const obj2Str = document.getElementById('obj2Input').value;
                const obj1 = JSON.parse(obj1Str);
                const obj2 = JSON.parse(obj2Str);
                const result = this.isEqualObj(obj1, obj2);
                document.getElementById('equalObjResult').innerHTML = result ?
                    '✅ Объекты идентичны' : '❌ Объекты разные';
            } catch (e) {
                document.getElementById('equalObjResult').innerHTML = `❌ Ошибка JSON: ${e.message}`;
            }
        };

        // 1.8 average
        document.querySelector('[data-func="average"]').onclick = () => {
            if (this.currentArray.length > 0 && this.currentArray.every(isNumeric)) {
                const result = this.average(this.currentArray);
                document.getElementById('avgResult').textContent = `${result}`;
            } else {
                document.getElementById('avgResult').textContent = `❌ Массив не числовой`;
            }
        };

        // 1.9 fill
        document.querySelector('[data-func="fill"]').onclick = () => {
            const size = parseInt(document.getElementById('fillSize').value);
            const value = document.getElementById('fillValue').value;
            if (size > 0 && size <= 20) {
                const result = this.fill(size, value);
                document.getElementById('fillResult').textContent = `[${result.join(', ')}]`;
            } else {
                document.getElementById('fillResult').textContent = `❌ Размер должен быть от 1 до 20`;
            }
        };

        // 1.10 erase
        document.querySelector('[data-func="erase"]').onclick = () => {
            const arrayStr = document.getElementById('eraseArrayInput').value;
            const parsedArray = this.parseArrayFromString(arrayStr);
            const result = this.erase(parsedArray);
            document.getElementById('eraseResult').innerHTML = `[${result.map(v => v === '' ? "''" : v).join(', ')}]`;
        };

        // 2.4 diff
        document.querySelector('[data-func="diff"]').onclick = () => {
            const secondArrayStr = document.getElementById('diffArrayInput').value;
            const secondArray = this.parseArrayFromString(secondArrayStr);
            const result = this.diff(this.currentArray, secondArray);
            document.getElementById('diffResult').innerHTML = result.length ?
                `[${result.join(', ')}]` : '❌ Нет уникальных элементов';
        };
    }

    // ===== ТЕМА =====
    initTheme() {
        const savedTheme = localStorage.getItem('paleoTheme');
        const themeToggle = document.getElementById('globalThemeToggle');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeToggle) themeToggle.textContent = '☀️';
        } else if (savedTheme === 'light') {
            document.body.classList.remove('dark-theme');
            if (themeToggle) themeToggle.textContent = '🌙';
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
            if (themeToggle) themeToggle.textContent = '☀️';
        }

        if (themeToggle) {
            themeToggle.onclick = () => {
                if (document.body.classList.contains('dark-theme')) {
                    document.body.classList.remove('dark-theme');
                    themeToggle.textContent = '🌙';
                    localStorage.setItem('paleoTheme', 'light');
                } else {
                    document.body.classList.add('dark-theme');
                    themeToggle.textContent = '☀️';
                    localStorage.setItem('paleoTheme', 'dark');
                }
            };
        }
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.initTheme();
        this.initEventListeners();
        this.updateArrayDisplay();
    }
}
