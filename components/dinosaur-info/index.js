export class DinosaurInfoComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="dino-detail-card">
                <img src="${data.src}" class="dino-detail-image" alt="${data.title}" onerror="this.src='https://via.placeholder.com/800x300?text=${data.title}'">
                <div class="dino-detail-content">
                    <h1 class="dino-detail-title">${data.title}</h1>
                    <div class="dino-detail-period">${data.period}</div>

                    <div class="dino-detail-info">
                        <div class="info-item">
                            <div class="info-label">Рацион</div>
                            <div class="info-value">${data.diet}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Длина</div>
                            <div class="info-value">${data.length}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Вес</div>
                            <div class="info-value">${data.weight}</div>
                        </div>
                    </div>

                    <p class="dino-detail-description">${data.description}</p>

                    <button class="fun-fact-btn" id="funFactBtn">Интересный факт</button>
                </div>
            </div>
        `;
    }

    addListeners(data, callback) {
        document.getElementById('funFactBtn').addEventListener('click', () => {
            callback(data.funFact);
        });
    }

    render(data, callback) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, callback);
    }
}
