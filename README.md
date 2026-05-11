# Лабораторная работа №1: Calculator. HTML/CSS

## Цель работы
Знакомство с инструментами построения пользовательских интерфейсов web-сайтов: HTML, CSS.

## План работы
1. HTML-разметка
2. Базовая структура HTML-документа
3. Создание проекта
4. Верстка калькулятора
5. CSS
6. Применение CSS к HTML-документу
7. Стилизация верстки калькулятора с помощью CSS

## Задания для самостоятельной проработки

В рамках выполнения лабораторной работы были реализованы следующие улучшения:

1. **Изменена цветовая палитра** калькулятора с оранжево-серой на альтернативную
2. **Реализован темный фон** калькулятора (ночная тема)
3. **Кнопки выполнены квадратными** вместо круглых
4. **Изменен цвет вывода** результата
5. **Окно вывода выполнено со скругленными краями**
6. **Изменен шрифт цифр**
7. **Шрифт сделан более толстым**
8. **Изменен цвет при наведении мышки на кнопку**
9. **Добавлена надпись** внизу "© 2026 Кирилл Демидов | Лабораторная работа по программированию сетевых приложений"
10. **Калькулятор выровнен по центру** страницы
11. **Увеличен размер окна вывода**
12. **Добавлена кнопка для смены темы** (смена цвета фона)
13. **Шрифт сделан более тонким** (альтернативный вариант)
14. **Изменен цвет шрифта**
15. **Добавлено изображение на фон**
16. **Добавлена кнопка со ссылкой на GitHub**
17. **Реализовано поле с выпадающим списком**
18. **Добавлено поле с целью ЛР**, где выделены ключевые слова: *знакомство*, *HTML*, *CSS*
19. **Разработан уникальный дизайн** калькулятора, вдохновленный современными веб-ресурсами Яндекс Маркет

## Скриншоты выполненного задания

![Страница "Главное", открывается при запуске приложения](скриншоты/Главная.png)
Страница "Главное", открывается при запуске приложения

### Базовая структура калькулятора (HTML)
```html
<div class="calculator-wrapper">
    <div id="result" class="result">0</div>
    <div class="buttons">
        <div class="button-row">
            <button class="my-btn secondary">C</button>
            <button class="my-btn secondary">⌫</button>
            <button class="my-btn secondary">+/-</button>
            <button class="my-btn primary">/</button>
            <button class="my-btn secondary">x!</button>
        </div>
        <div class="button-row">
            <button class="my-btn">7</button>
            <button class="my-btn">8</button>
            <button class="my-btn">9</button>
            <button class="my-btn primary">×</button>
            <button class="my-btn secondary">%</button>
        </div>
        <div class="button-row">
            <button class="my-btn">4</button>
            <button class="my-btn">5</button>
            <button class="my-btn">6</button>
            <button class="my-btn primary">-</button>
            <button class="my-btn secondary">√</button>
        </div>
        <div class="button-row">
            <button class="my-btn">1</button>
            <button class="my-btn">2</button>
            <button class="my-btn">3</button>
            <button class="my-btn primary">+</button>
            <button class="my-btn secondary">x²</button>
        </div>
        <div class="button-row">
            <button class="my-btn">0</button>
            <button class="my-btn">.</button>
            <button class="my-btn primary execute">=</button>
            <button class="my-btn secondary">10ⁿ</button>
        </div>
    </div>
</div>
```

![Страница "Инструкция", где описаны все функции и правила использования приложения](скриншоты/Инструкция.png)
Страница "Инструкция", где описаны все функции и правила использования приложения

![Старница "Калькулятор", где и находится дизайн основной части приложения](скриншоты/Калькулятор.png)
Старница "Калькулятор", где и находится дизайн основной части приложения

![Тёмная версия страницуы "Калькулятор"](скриншоты/Тёмный_калькулятор.png)
Тёмная версия страницуы "Калькулятор"

### Тёмная тема (через CSS класс)
```css
body.dark-theme {
    background: #121212;
    color: #e0e0e0;
}

body.dark-theme .navbar,
body.dark-theme .footer,
body.dark-theme .about-card,
body.dark-theme .hero-section,
body.dark-theme .calculator-wrapper {
    background: #1e1e2e;
    border-color: #2d2d44;
}

body.dark-theme .result {
    background: #0f0f1a;
    color: #b0e57c;
    border-color: #2d2d44;
}

body.dark-theme .my-btn {
    background: #2d2d44;
    color: #e0e0e0;
}

body.dark-theme .my-btn.primary {
    background: #ff7700;
}
```

## Автор
Демидов Кирилл Андреевич
ИУ5-43б
