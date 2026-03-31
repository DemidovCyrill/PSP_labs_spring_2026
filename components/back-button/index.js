export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `<div class="dino-header"><button class="back-btn" id="back-button">← Вернуться на главную</button></div>`;
    }

    addListeners(listener) {
        const btn = document.getElementById("back-button");
        if (btn) {
            // Удаляем старый обработчик
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener("click", listener);
        }
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}
