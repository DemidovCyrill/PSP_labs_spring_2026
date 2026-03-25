import { DinosaurCardComponent } from "../../components/dinosaur-card/index.js";
import { DinosaurPage } from "../dinosaur/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `<div id="main-page" class="container py-4"><div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="cards-container"></div></div>`;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://dinofarm.ru/wp-content/uploads/2022/04/dinofarm-tarbosaurus-cover.jpg",
                title: "Тираннозавр Рекс",
                period: "Поздний мел (68-66 млн лет назад)",
                short_description: "Один из самых крупных хищных динозавров.",
                diet: "Мясо",
                length: "12,3 метра",
                weight: "до 8 тонн",
                description: "Тираннозавр был одним из самых крупных наземных хищников за всю историю Земли. Обладал мощнейшим укусом и маленькими, но сильными передними лапами.",
                funFact: "Зубы тираннозавра могли достигать 30 см в длину, включая корень!"
            },
            {
                id: 2,
                src: "https://dinofarm.ru/wp-content/uploads/2022/04/dinofarm-triceratops-cover.jpg",
                title: "Трицератопс",
                period: "Поздний мел (68-66 млн лет назад)",
                short_description: "Травоядный динозавр с тремя рогами.",
                diet: "Растения",
                length: "9 метров",
                weight: "6-12 тонн",
                description: "Трицератопс известен своим большим костяным воротником и тремя рогами на морде. Использовал их для защиты от хищников, таких как тираннозавр.",
                funFact: "Несмотря на свой грозный вид, трицератопсы были травоядными и паслись стадами, как современные бизоны."
            },
            {
                id: 3,
                src: "https://dinofarm.ru/wp-content/uploads/2022/04/dinofarm-stegosaurus-cover.jpg",
                title: "Стегозавр",
                period: "Поздняя юра (155-145 млн лет назад)",
                short_description: "Динозавр с костяными пластинами на спине.",
                diet: "Растения",
                length: "9 метров",
                weight: "до 5 тонн",
                description: "Стегозавра легко узнать по характерным ромбовидным пластинам вдоль спины и шипам на хвосте. Его мозг был размером с грецкий орех.",
                funFact: "Пластины стегозавра, скорее всего, использовались не для защиты, а для регулирования температуры тела и привлечения партнеров."
            }
        ];
    }

    clickCard(dinosaurId) {
        const dinosaurPage = new DinosaurPage(this.parent, dinosaurId);
        dinosaurPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const cardsContainer = document.getElementById('cards-container');
        const data = this.getData();

        data.forEach(item => {
            const card = new DinosaurCardComponent(cardsContainer);
            card.render(item, this.clickCard.bind(this));
        });
    }
}
