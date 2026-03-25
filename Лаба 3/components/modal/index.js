export class ModalComponent {
    constructor() {
        // Проверяем, существует ли уже модальное окно на странице, чтобы не создавать дубликаты
        if (!document.getElementById('global-modal')) {
            this.createModal();
        }
        this.modalElement = document.getElementById('global-modal');
    }

    createModal() {
        const modalHTML = `
            <div class="modal fade" id="global-modal" tabindex="-1" aria-labelledby="global-modal-label" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="global-modal-label">🦖 Интересный факт</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="modal-body-content">
                            Загрузка...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    setContent(content) {
        const body = document.getElementById('modal-body-content');
        if (body) {
            body.innerHTML = content;
        }
    }

    show(content) {
        this.setContent(content);
        // Инициализация модального окна через Bootstrap JS API
        const modal = new bootstrap.Modal(this.modalElement);
        modal.show();
    }
}
