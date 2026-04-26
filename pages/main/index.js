import { DinosaurCardComponent } from "../../components/dinosaur-card/index.js";
import { DinosaurPage } from "../dinosaur/index.js";
import { ThreeDViewer } from "../../components/3d-viewer/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.viewer = null;
        this.dinosaursData = [];
    }

    getHTML() {
        return `
            <div id="main-page">
                <nav class="navbar">
                    <div class="nav-logo">
                        <span class="logo-text">Палео<span class="logo-accent">Dem</span></span>
                    </div>
                    <div class="nav-center">
                        <button id="goToFunctionsBtn" class="functions-nav-btn">Работа с массивами</button>
                    </div>
                    <div class="nav-actions">
                        <button id="globalThemeToggle" class="theme-toggle-btn">🌙</button>
                        <a href="https://github.com/DemidovCyrill/PSP_labs_spring_2026" target="_blank" class="github-btn">GitHub</a>
                    </div>
                </nav>

                <div class="main-container">
                    <div class="hero-3d-section">
                        <div class="hero-3d-container">
                            <div id="modelViewer" class="model-viewer-hero"></div>
                        </div>
                    </div>

                    <h2 class="section-title">Самые популярные доисторические животные:</h2>
                    <div class="cards-grid" id="cards-container"></div>
                </div>

                <footer class="footer">
                    <p>© 2026 Кирилл Демидов | Лабораторная работа по программированию сетевых приложений</p>
                </footer>
            </div>
        `;
    }

    async loadData() {
        const jsonUrl = new URL('../../src/data/dinosaurs.json', import.meta.url).href;
        console.log('🔍 Загружаем JSON по пути:', jsonUrl);

        try {
            const response = await fetch(jsonUrl);
            if (response.ok) {
                const data = await response.json();
                console.log('✅ JSON загружен! Количество динозавров:', data.length);
                this.dinosaursData = data;
                return data;
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            console.error('❌ Ошибка загрузки JSON:', error);

            // Если JSON не загрузился, используем данные из вашего исходного файла
            console.log('📝 Используем встроенные данные');
            this.dinosaursData = [
                {
                    "id": 1,
                    "title": "Резервный Рекс",
                    "period": "Поздний мел (68-66 млн лет)",
                    "short_description": "Один из самых крупных хищных динозавров.",
                    "diet": "Хищник",
                    "length": "12,3 метра",
                    "weight": "до 8 тонн",
                    "description": "Тираннозавр был одним из самых крупных наземных хищников за всю историю Земли.",
                    "funFact": "Зубы тираннозавра могли достигать 30 см в длину!",
                    "images": ["https://upload.wikimedia.org/wikipedia/commons/b/bf/Tyrannosaurus-rex-Profile-steveoc86_%28flipped%29.png"]
                },
                {
                    "id": 2,
                    "title": "РезервныйТрицератопс",
                    "period": "Поздний мел (68-66 млн лет)",
                    "short_description": "Травоядный динозавр с тремя рогами.",
                    "diet": "Травоядный",
                    "length": "9 метров",
                    "weight": "6-12 тонн",
                    "description": "Трицератопс известен своим большим костяным воротником.",
                    "funFact": "Трицератопсы паслись стадами, как современные бизоны.",
                    "images": ["https://upload.wikimedia.org/wikipedia/commons/0/08/Triceratops_horridus.png"]
                },
                {
                    "id": 3,
                    "title": "Стегозавр",
                    "period": "Поздняя юра (155-145 млн лет)",
                    "short_description": "Динозавр с костяными пластинами на спине.",
                    "diet": "Травоядный",
                    "length": "9 метров",
                    "weight": "до 5 тонн",
                    "description": "Стегозавра легко узнать по характерным ромбовидным пластинам.",
                    "funFact": "Пластины стегозавра использовались для регулирования температуры тела.",
                    "images": ["https://upload.wikimedia.org/wikipedia/commons/5/5f/Stegosaurus_stenops_Life_Reconstruction_%28flipped%29.png"]
                }
            ];
            return this.dinosaursData;
        }
    }

    clickCard(dinosaurId) {
        console.log('Клик по карточке:', dinosaurId);
        if (this.dinosaursData && this.dinosaursData.length > 0) {
            const dinosaurPage = new DinosaurPage(this.parent, dinosaurId, this.dinosaursData);
            dinosaurPage.render();
        } else {
            console.error('Данные не загружены');
        }
    }

    initTheme() {
        const savedTheme = localStorage.getItem('paleoTheme');
        const themeToggle = document.getElementById('globalThemeToggle');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeToggle) themeToggle.textContent = '☀️';
        } else if (savedTheme === 'light') {
            document.body.classList.remove('dark-theme');
            if (themeToggle) themeToggle.textContent = '🌙';
        }
    }

    init3DViewer() {
        const container = document.getElementById('modelViewer');
        if (container && !this.viewer) {
            console.log('Инициализация 3D просмотрщика...');
            try {
                this.viewer = new ThreeDViewer(container, './models/dinosaur.glb');
                this.viewer.init();
            } catch (error) {
                console.error('3D ошибка:', error);
            }
        }
    }

    async render() {
        console.log('Запуск MainPage');

        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        this.initTheme();

        const themeToggle = document.getElementById('globalThemeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                const isDark = document.body.classList.contains('dark-theme');
                themeToggle.textContent = isDark ? '☀️' : '🌙';
                localStorage.setItem('paleoTheme', isDark ? 'dark' : 'light');
            });
        }

        const goToFunctionsBtn = document.getElementById('goToFunctionsBtn');
        if (goToFunctionsBtn) {
            goToFunctionsBtn.addEventListener('click', async () => {
                const module = await import('../functions/index.js');
                const functionsPage = new module.FunctionsPage(this.parent);
                functionsPage.render(this.dinosaursData);
            });
        }

        await this.loadData();

        this.init3DViewer();

        const cardsContainer = document.getElementById('cards-container');
        if (cardsContainer && this.dinosaursData.length > 0) {
            cardsContainer.innerHTML = '';
            this.dinosaursData.forEach(item => {
                const card = new DinosaurCardComponent(cardsContainer);
                card.render(item, this.clickCard.bind(this));
            });
            console.log(`Отрисовано ${this.dinosaursData.length} карточек`);
        } else if (cardsContainer) {
            cardsContainer.innerHTML = '<div style="text-align: center; padding: 40px;">Нет данных</div>';
        }
    }
}
