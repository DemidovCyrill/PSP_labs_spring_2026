export class ModalComponent {
    constructor() {
        if (!document.getElementById('global-modal')) {
            this.createModal();
        }
        this.modalElement = document.getElementById('global-modal');
        this.modalOverlay = document.getElementById('modalOverlay');
    }

    createModal() {
        const modalHTML = `
            <div class="modal-overlay" id="modalOverlay">
                <div class="modal-container" id="global-modal">
                    <div class="modal-header">
                        <h5 class="modal-title">🦕 Интересный факт</h5>
                        <button class="modal-close" id="modalCloseBtn">&times;</button>
                    </div>
                    <div class="modal-body" id="modalBodyContent">
                        Загрузка...
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const closeBtn = document.getElementById('modalCloseBtn');
        const overlay = document.getElementById('modalOverlay');
        if (closeBtn) {
            closeBtn.onclick = () => this.hide();
        }
        if (overlay) {
            overlay.onclick = (e) => {
                if (e.target === overlay) this.hide();
            };
        }
    }

    setContent(content) {
        const body = document.getElementById('modalBodyContent');
        if (body) {
            body.innerHTML = `<p class="lead">${content}</p>`;
        }
    }

    show(content) {
        this.setContent(content);
        const overlay = document.getElementById('modalOverlay');
        if (overlay) {
            overlay.classList.add('active');
        }
    }

    hide() {
        const overlay = document.getElementById('modalOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}
