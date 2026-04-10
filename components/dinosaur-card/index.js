export class DinosaurCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Берём первое изображение из массива images
        const imageUrl = data.images && data.images.length > 0 ? data.images[0] : 'https://via.placeholder.com/300x200?text=No+Image';

        return `
            <div class="dino-card" id="dino-card-${data.id}" data-id="${data.id}">
                <img src="${imageUrl}" class="dino-card-image" alt="${data.title}" onerror="this.src='https://via.placeholder.com/300x200?text=${data.title}'">
                <div class="dino-card-content">
                    <h3 class="dino-card-title">${data.title}</h3>
                    <div class="dino-card-period">${data.period}</div>
                    <p class="dino-card-description">${data.short_description}</p>
                    <span class="dino-card-diet">${data.diet}</span>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document
            .getElementById(`dino-card-${data.id}`)
            .addEventListener("click", () => listener(data.id));
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
