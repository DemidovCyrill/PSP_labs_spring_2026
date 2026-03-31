import { BackButtonComponent } from "../../components/back-button/index.js";
import { DinosaurInfoComponent } from "../../components/dinosaur-info/index.js";
import { MainPage } from "../main/index.js";
import { ModalComponent } from "../../components/modal/index.js";

export class DinosaurPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
        this.modal = new ModalComponent();
    }

    get pageRoot() {
        return document.getElementById('dinosaur-page');
    }

    getHTML() {
        return `
            <div id="dinosaur-page">
                <nav class="navbar">
                    <div class="nav-logo">
                        <span class="logo-text">Палео<span class="logo-accent">Dem</span></span>
                    </div>
                    <div class="nav-actions">
                        <button id="globalThemeToggle" class="theme-toggle-btn">🌙</button>
                        <a href="https://github.com/DemidovCyrill/PSP_labs_spring_2026" target="_blank" class="github-btn">GitHub</a>
                    </div>
                </nav>

                <div class="main-container">
                    <div class="dinosaur-page-container"></div>
                </div>

                <footer class="footer">
                    <p>© 2026 Кирилл Демидов | Лабораторная работа по программированию сетевых приложений</p>
                </footer>
            </div>
        `;
    }

    getData() {
        const allDinosaurs = new MainPage().getData();
        return allDinosaurs.find(dino => dino.id === this.id);
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
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
            if (themeToggle) themeToggle.textContent = '☀️';
        }
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.initTheme();

        const themeToggle = document.getElementById('globalThemeToggle');
        if (themeToggle) {
            const newToggle = themeToggle.cloneNode(true);
            themeToggle.parentNode.replaceChild(newToggle, themeToggle);

            newToggle.addEventListener('click', (e) => {
                e.preventDefault();
                if (document.body.classList.contains('dark-theme')) {
                    document.body.classList.remove('dark-theme');
                    newToggle.textContent = '🌙';
                    localStorage.setItem('paleoTheme', 'light');
                } else {
                    document.body.classList.add('dark-theme');
                    newToggle.textContent = '☀️';
                    localStorage.setItem('paleoTheme', 'dark');
                }
            });
        }

        const container = document.querySelector('.dinosaur-page-container');

        const backButton = new BackButtonComponent(container);
        backButton.render(() => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });

        const data = this.getData();
        if (data) {
            const dinosaurInfo = new DinosaurInfoComponent(container);
            dinosaurInfo.render(data, (fact) => {
                this.modal.show(fact);
            });
        } else {
            container.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Динозавр не найден!</div>');
        }
    }
}
