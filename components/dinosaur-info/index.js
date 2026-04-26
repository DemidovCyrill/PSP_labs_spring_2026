import { ThreeDViewer } from '../3d-viewer/index.js';

export class DinosaurInfoComponent {
    constructor(parent) {
        this.parent = parent;
        this.currentImageIndex = 0;
        this.images = [];
        this.isFullscreen = false;
    }

    getHTML(data) {
        return `
            <div class="dino-detail-card">
                <div class="gallery-container">
                    <!-- Миниатюры слева с прокруткой -->
                    <div class="thumbnail-column-wrapper">
                        <div class="thumbnail-column" id="thumbnailColumn">
                            ${this.getThumbnailsHTML(data.images)}
                        </div>
                    </div>

                    <!-- Основное изображение -->
                    <div class="main-image-container">
                        <div class="main-image-wrapper">
                            <img src="${data.images[0]}" alt="${data.title}" class="main-gallery-image" id="mainGalleryImage">
                            <button class="gallery-nav prev" id="prevImageBtn">❮</button>
                            <button class="gallery-nav next" id="nextImageBtn">❯</button>
                            <button class="fullscreen-btn" id="fullscreenBtn">⛶</button>
                        </div>
                    </div>

                    <!-- Информация о динозавре -->
                    <div class="dino-info-sidebar">
                        <h1 class="dino-detail-title">${data.title}</h1>
                        <div class="dino-detail-period">${data.period}</div>

                        <div class="dino-detail-info">
                            <div class="info-item">
                                <div class="info-label">🍽️ Рацион</div>
                                <div class="info-value">${data.diet}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">📏 Длина</div>
                                <div class="info-value">${data.length}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">⚖️ Вес</div>
                                <div class="info-value">${data.weight}</div>
                            </div>
                        </div>

                        <p class="dino-detail-description">${data.description}</p>

                        <button class="fun-fact-btn" id="funFactBtn">💡 Интересный факт</button>
                    </div>
                </div>
            </div>
        `;
    }

    getThumbnailsHTML(images) {
        return images.map((img, index) => `
            <div class="thumbnail-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${img}" alt="Thumbnail ${index + 1}" class="thumbnail-image">
            </div>
        `).join('');
    }

    updateMainImage(index) {
        this.currentImageIndex = index;
        const mainImage = document.getElementById('mainGalleryImage');
        if (mainImage && this.images[index]) {
            mainImage.src = this.images[index];
        }

        // Обновляем активный класс у миниатюр
        const thumbnails = document.querySelectorAll('.thumbnail-item');
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    nextImage() {
        if (this.images.length === 0) return;
        let newIndex = this.currentImageIndex + 1;
        if (newIndex >= this.images.length) newIndex = 0;
        this.updateMainImage(newIndex);
    }

    prevImage() {
        if (this.images.length === 0) return;
        let newIndex = this.currentImageIndex - 1;
        if (newIndex < 0) newIndex = this.images.length - 1;
        this.updateMainImage(newIndex);
    }

    openFullscreen() {
        this.isFullscreen = true;
        const container = document.querySelector('.gallery-container');

        // Создаём полноэкранный режим
        const fullscreenDiv = document.createElement('div');
        fullscreenDiv.className = 'fullscreen-gallery';
        fullscreenDiv.id = 'fullscreenGallery';
        fullscreenDiv.innerHTML = `
            <div class="fullscreen-content">
                <button class="fullscreen-close" id="fullscreenCloseBtn">✕</button>
                <div class="fullscreen-main-area">
                    <div class="fullscreen-thumbnails-wrapper">
                        <div class="fullscreen-thumbnails" id="fullscreenThumbnails">
                            ${this.getThumbnailsHTML(this.images)}
                        </div>
                    </div>
                    <div class="fullscreen-main-image-container">
                        <img src="${this.images[this.currentImageIndex]}" class="fullscreen-main-image" id="fullscreenMainImage">
                        <button class="gallery-nav fullscreen-prev" id="fullscreenPrevBtn">❮</button>
                        <button class="gallery-nav fullscreen-next" id="fullscreenNextBtn">❯</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(fullscreenDiv);
        document.body.style.overflow = 'hidden';

        // Добавляем обработчики для полноэкранного режима
        const fullscreenMainImage = document.getElementById('fullscreenMainImage');
        const fullscreenPrevBtn = document.getElementById('fullscreenPrevBtn');
        const fullscreenNextBtn = document.getElementById('fullscreenNextBtn');
        const fullscreenCloseBtn = document.getElementById('fullscreenCloseBtn');
        const fullscreenThumbnails = document.getElementById('fullscreenThumbnails');

        let fullscreenIndex = this.currentImageIndex;

        const updateFullscreenImage = (index) => {
            fullscreenIndex = index;
            fullscreenMainImage.src = this.images[index];
            const thumbs = fullscreenThumbnails.querySelectorAll('.thumbnail-item');
            thumbs.forEach((thumb, i) => {
                if (i === index) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
        };

        // Обработчики кнопок
        fullscreenPrevBtn.onclick = () => {
            let newIndex = fullscreenIndex - 1;
            if (newIndex < 0) newIndex = this.images.length - 1;
            updateFullscreenImage(newIndex);
        };

        fullscreenNextBtn.onclick = () => {
            let newIndex = fullscreenIndex + 1;
            if (newIndex >= this.images.length) newIndex = 0;
            updateFullscreenImage(newIndex);
        };

        fullscreenCloseBtn.onclick = () => {
            this.closeFullscreen();
        };

        // Обработчики для миниатюр
        fullscreenThumbnails.querySelectorAll('.thumbnail-item').forEach((thumb, idx) => {
            thumb.onclick = () => {
                updateFullscreenImage(idx);
            };
        });

        // Клавиатурные стрелки для полноэкранного режима
        this.handleFullscreenKeydown = (e) => {
            if (e.key === 'ArrowLeft') {
                let newIndex = fullscreenIndex - 1;
                if (newIndex < 0) newIndex = this.images.length - 1;
                updateFullscreenImage(newIndex);
            } else if (e.key === 'ArrowRight') {
                let newIndex = fullscreenIndex + 1;
                if (newIndex >= this.images.length) newIndex = 0;
                updateFullscreenImage(newIndex);
            } else if (e.key === 'Escape') {
                this.closeFullscreen();
            }
        };
        document.addEventListener('keydown', this.handleFullscreenKeydown);

        fullscreenDiv.onclick = (e) => {
            if (e.target === fullscreenDiv) {
                this.closeFullscreen();
            }
        };
    }

    closeFullscreen() {
        const fullscreenDiv = document.getElementById('fullscreenGallery');
        if (fullscreenDiv) {
            fullscreenDiv.remove();
        }
        document.body.style.overflow = '';
        this.isFullscreen = false;
        if (this.handleFullscreenKeydown) {
            document.removeEventListener('keydown', this.handleFullscreenKeydown);
        }
    }

    addListeners(data, callback) {
        // Сохраняем массив изображений
        this.images = data.images;

        // Обработчики для миниатюр
        const thumbnails = document.querySelectorAll('.thumbnail-item');
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                this.updateMainImage(index);
            });
        });

        // Обработчики для стрелок
        const prevBtn = document.getElementById('prevImageBtn');
        const nextBtn = document.getElementById('nextImageBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevImage());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextImage());
        }

        // Полноэкранный режим
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const mainImage = document.getElementById('mainGalleryImage');

        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.openFullscreen());
        }
        if (mainImage) {
            mainImage.addEventListener('click', () => this.openFullscreen());
        }

        // Кнопка интересного факта
        const funFactBtn = document.getElementById('funFactBtn');
        if (funFactBtn) {
            funFactBtn.addEventListener('click', () => {
                callback(data.funFact);
            });
        }

        // Клавиатурные стрелки для обычного режима
        this.handleKeydown = (e) => {
            if (this.isFullscreen) return;
            if (e.key === 'ArrowLeft') {
                this.prevImage();
            } else if (e.key === 'ArrowRight') {
                this.nextImage();
            }
        };
        document.addEventListener('keydown', this.handleKeydown);
    }

    render(data, callback) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, callback);
    }
}
