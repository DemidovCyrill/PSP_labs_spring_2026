export class FunctionsPanelComponent {
    constructor(parent) {
        this.parent = parent;
        this.dinosaursData = null;
    }

    setData(data) {
        this.dinosaursData = data;
        this.render();
    }

    getHTML() {
        return `
            <div class="functions-panel">
                <h3 class="functions-title">🛠️ Инструменты для работы с данными</h3>
                <p class="functions-subtitle">Функции для обработки информации о динозаврах</p>

                <div class="functions-grid">
                    <!-- 1.1 concatenate -->
                    <div class="function-card">
                        <h4>1.1 concatenate</h4>
                        <p>Склеивает массив строк с разделителем</p>
                        <div class="function-demo">
                            <span class="demo-label">Пример:</span>
                            <span class="demo-value" id="concatDemo">-</span>
                        </div>
                        <button class="func-btn" id="runConcat">Выполнить</button>
                    </div>

                    <!-- 1.2 countIdentic -->
                    <div class="function-card">
                        <h4>1.2 countIdentic</h4>
                        <p>Количество повторяющихся элементов</p>
                        <div class="function-demo">
                            <span class="demo-label">Результат:</span>
                            <span class="demo-value" id="countIdenticDemo">-</span>
                        </div>
                        <button class="func-btn" id="runCountIdentic">Выполнить</button>
                    </div>

                    <!-- 1.3 sumOfSquares -->
                    <div class="function-card">
                        <h4>1.3 sumOfSquares</h4>
                        <p>Сумма квадратов весов динозавров</p>
                        <div class="function-demo">
                            <span class="demo-label">Результат:</span>
                            <span class="demo-value" id="sumSquaresDemo">-</span>
                        </div>
                        <button class="func-btn" id="runSumSquares">Выполнить</button>
                    </div>

                    <!-- 1.4 getSumAndMultOfArray -->
                    <div class="function-card">
                        <h4>1.4 sumAndMult</h4>
                        <p>Сумма и произведение длин динозавров</p>
                        <div class="function-demo">
                            <span class="demo-label">Сумма:</span>
                            <span class="demo-value" id="sumDemo">-</span>
                            <span class="demo-label">Произведение:</span>
                            <span class="demo-value" id="multDemo">-</span>
                        </div>
                        <button class="func-btn" id="runSumMult">Выполнить</button>
                    </div>

                    <!-- 1.5 moveElement -->
                    <div class="function-card">
                        <h4>1.5 moveElement</h4>
                        <p>Переместить элемент в массиве динозавров</p>
                        <div class="function-demo">
                            <span class="demo-label">До:</span>
                            <span class="demo-value" id="moveBefore">-</span>
                            <span class="demo-label">После:</span>
                            <span class="demo-value" id="moveAfter">-</span>
                        </div>
                        <button class="func-btn" id="runMoveElement">Переместить (0→2)</button>
                    </div>

                    <!-- 1.6 isEqualArrays -->
                    <div class="function-card">
                        <h4>1.6 isEqualArrays</h4>
                        <p>Сравнение массивов названий</p>
                        <div class="function-demo">
                            <span class="demo-label">Результат:</span>
                            <span class="demo-value" id="equalArraysDemo">-</span>
                        </div>
                        <button class="func-btn" id="runEqualArrays">Сравнить</button>
                    </div>

                    <!-- 1.7 isEqualObj -->
                    <div class="function-card">
                        <h4>1.7 isEqualObj</h4>
                        <p>Сравнение двух объектов динозавров:</p>
                        <div class="function-demo">
                            <span class="demo-label">Результат:</span>
                            <span class="demo-value" id="equalObjDemo">-</span>
                        </div>
                        <button class="func-btn" id="runEqualObj">Сравнить</button>
                    </div>

                    <!-- 1.8 average -->
                    <div class="function-card">
                        <h4>1.8 average</h4>
                        <p>Средний вес динозавров</p>
                        <div class="function-demo">
                            <span class="demo-label">Результат:</span>
                            <span class="demo-value" id="avgDemo">-</span>
                        </div>
                        <button class="func-btn" id="runAverage">Вычислить</button>
                    </div>

                    <!-- 1.9 fill -->
                    <div class="function-card">
                        <h4>1.9 fill</h4>
                        <p>Заполнить массив значением</p>
                        <div class="function-demo">
                            <span class="demo-label">Результат:</span>
                            <span class="demo-value" id="fillDemo">-</span>
                        </div>
                        <button class="func-btn" id="runFill">Заполнить (5, '🦕')</button>
                    </div>

                    <!-- 1.10 erase -->
                    <div class="function-card">
                        <h4>1.10 erase</h4>
                        <p>Очистка массива от ложных значений</p>
                        <div class="function-demo">
                            <span class="demo-label">Результат:</span>
                            <span class="demo-value" id="eraseDemo">-</span>
                        </div>
                        <button class="func-btn" id="runErase">Очистить</button>
                    </div>

                    <!-- 2.4 diff -->
                    <div class="function-card">
                        <h4>2.4 diff</h4>
                        <p>Разница массивов динозавров</p>
                        <div class="function-demo">
                            <span class="demo-label">Результат:</span>
                            <span class="demo-value" id="diffDemo">-</span>
                        </div>
                        <button class="func-btn" id="runDiff">Найти разницу</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Реализация функций
    concatenate(arr, separator) {
        return arr.join(separator);
    }

    countIdentic(arr) {
        const counts = {};
        let duplicates = 0;
        arr.forEach(item => {
            counts[item] = (counts[item] || 0) + 1;
        });
        for (let key in counts) {
            if (counts[key] > 1) duplicates++;
        }
        return duplicates;
    }

    sumOfSquares(arr) {
        return arr.reduce((sum, num) => sum + num * num, 0);
    }

    getSumAndMultOfArray(arr) {
        const sum = arr.reduce((s, n) => s + n, 0);
        const mult = arr.reduce((m, n) => m * n, 1);
        return { sum, mult };
    }

    moveElement(arr, from, to) {
        const result = [...arr];
        const element = result[from];
        result.splice(from, 1);
        result.splice(to, 0, element);
        return result;
    }

    isEqualArrays(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((item, index) => item === arr2[index]);
    }

    isEqualObj(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    average(arr) {
        if (arr.length === 0) return 0;
        return arr.reduce((s, n) => s + n, 0) / arr.length;
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

    initEventListeners() {
        // Получаем данные о динозаврах для демонстрации
        const names = this.dinosaursData.map(d => d.title);
        const weights = this.dinosaursData.map(d => {
            const weightStr = d.weight;
            const match = weightStr.match(/\d+(?:[.,]\d+)?/);
            return match ? parseFloat(match[0].replace(',', '.')) : 0;
        });
        const lengths = this.dinosaursData.map(d => {
            const lengthStr = d.length;
            const match = lengthStr.match(/\d+(?:[.,]\d+)?/);
            return match ? parseFloat(match[0].replace(',', '.')) : 0;
        });

        // 1.1 concatenate
        document.getElementById('runConcat').onclick = () => {
            const result = this.concatenate(['Тираннозавр', 'Трицератопс', 'Стегозавр', 'Спинозавр'], ' → ');
            document.getElementById('concatDemo').textContent = result;
        };

        // 1.2 countIdentic
        document.getElementById('runCountIdentic').onclick = () => {
            const testArr = ['Тираннозавр', 'Трицератопс', 'Тираннозавр', 'Стегозавр', 'Трицератопс', 'Трицератопс'];
            const result = this.countIdentic(testArr);
            document.getElementById('countIdenticDemo').textContent = `${result} повторяющихся названий`;
        };

        // 1.3 sumOfSquares
        document.getElementById('runSumSquares').onclick = () => {
            const result = this.sumOfSquares(weights.filter(w => w > 0));
            document.getElementById('sumSquaresDemo').textContent = result.toFixed(2);
        };

        // 1.4 getSumAndMultOfArray
        document.getElementById('runSumMult').onclick = () => {
            const { sum, mult } = this.getSumAndMultOfArray(lengths.filter(l => l > 0));
            document.getElementById('sumDemo').textContent = sum.toFixed(2);
            document.getElementById('multDemo').textContent = mult.toExponential(4);
        };

        // 1.5 moveElement
        document.getElementById('runMoveElement').onclick = () => {
            const before = ['Тираннозавр', 'Трицератопс', 'Стегозавр', 'Спинозавр'];
            document.getElementById('moveBefore').textContent = before.join(', ');
            const after = this.moveElement(before, 0, 2);
            document.getElementById('moveAfter').textContent = after.join(', ');
        };

        // 1.6 isEqualArrays
        document.getElementById('runEqualArrays').onclick = () => {
            const arr1 = ['Тираннозавр', 'Трицератопс'];
            const arr2 = ['Тираннозавр', 'Трицератопс'];
            const arr3 = ['Тираннозавр', 'Стегозавр'];
            const result1 = this.isEqualArrays(arr1, arr2);
            const result2 = this.isEqualArrays(arr1, arr3);
            document.getElementById('equalArraysDemo').innerHTML = `[Тираннозавр, Трицератопс] vs [Тираннозавр, Трицератопс]: ${result1}<br> vs [Тираннозавр, Стегозавр]: ${result2}`;
        };

        // 1.7 isEqualObj
        document.getElementById('runEqualObj').onclick = () => {
            const dino1 = { name: 'Тираннозавр', period: 'Мел' };
            const dino2 = { name: 'Тираннозавр', period: 'Мел' };
            const dino3 = { name: 'Трицератопс', period: 'Мел' };
            const result1 = this.isEqualObj(dino1, dino2);
            const result2 = this.isEqualObj(dino1, dino3);
            document.getElementById('equalObjDemo').innerHTML = `Тираннозавр vs Тираннозавр: ${result1}<br> Тираннозавр vs Трицератопс: ${result2}`;
        };

        // 1.8 average
        document.getElementById('runAverage').onclick = () => {
            const avgWeight = this.average(weights.filter(w => w > 0));
            document.getElementById('avgDemo').textContent = `${avgWeight.toFixed(2)} тонн`;
        };

        // 1.9 fill
        document.getElementById('runFill').onclick = () => {
            const result = this.fill(5, '🦕');
            document.getElementById('fillDemo').textContent = result.join(', ');
        };

        // 1.10 erase
        document.getElementById('runErase').onclick = () => {
            const testArr = [0, 1, false, 2, undefined, '', 3, null, 'Тираннозавр', '', 5];
            const result = this.erase(testArr);
            document.getElementById('eraseDemo').textContent = result.join(', ');
        };

        // 2.4 diff
        document.getElementById('runDiff').onclick = () => {
            const хищники = this.dinosaursData.filter(d => d.diet === 'Хищник').map(d => d.title);
            const травоядные = this.dinosaursData.filter(d => d.diet === 'Травоядный').map(d => d.title);
            const хищникиНачало = хищники.slice(0, 5);
            const травоядныеНачало = травоядные.slice(0, 5);
            const result = this.diff(хищникиНачало, травоядныеНачало);
            document.getElementById('diffDemo').innerHTML = `Хищники (первые 5): ${хищникиНачало.join(', ')}<br>Травоядные (первые 5): ${травоядныеНачало.join(', ')}<br>Разница: ${result.join(', ')}`;
        };
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.initEventListeners();
    }
}
