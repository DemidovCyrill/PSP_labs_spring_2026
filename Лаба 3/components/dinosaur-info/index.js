export class DinosaurInfoComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-4">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${data.src}" class="img-fluid rounded-start" alt="${data.title}" style="height: 100%; object-fit: cover;">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h3 class="card-title">${data.title}</h3>
                            <p class="card-text"><strong>Эпоха:</strong> ${data.period}</p>
                            <p class="card-text"><strong>Рацион:</strong> ${data.diet}</p>
                            <p class="card-text"><strong>Длина:</strong> ${data.length}</p>
                            <p class="card-text"><strong>Вес:</strong> ${data.weight}</p>
                            <p class="card-text"><strong>Описание:</strong> ${data.description}</p>
                            <button id="fun-fact-btn" class="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#dinosaurModal">Интересный факт!</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        return document.getElementById('fun-fact-btn');
    }
}
