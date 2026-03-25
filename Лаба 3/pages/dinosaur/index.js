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
        return `<div id="dinosaur-page" class="container py-4"></div>`;
    }

    getData() {
        const allDinosaurs = new MainPage().getData();
        return allDinosaurs.find(dino => dino.id === this.id);
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    showFunFact() {
        const data = this.getData();
        if (data && data.funFact) {
            this.modal.show(`<p class="lead">${data.funFact}</p>`);
        } else {
            this.modal.show(`<p>Интересных фактов об этом динозавре пока не найдено.</p>`);
        }
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        if (data) {
            const dinosaurInfo = new DinosaurInfoComponent(this.pageRoot);
            const factButton = dinosaurInfo.render(data);

            if (factButton) {
                factButton.addEventListener('click', () => {
                    this.showFunFact();
                });
            }
        } else {
            this.pageRoot.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Динозавр не найден!</div>');
        }
    }
}
