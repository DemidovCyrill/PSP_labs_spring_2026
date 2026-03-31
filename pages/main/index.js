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
        return `
            <div id="main-page">
                <nav class="navbar">
                    <div class="nav-logo">
                        <span class="logo-text">Paleo<span class="logo-accent">Dem</span></span>
                    </div>
                    <div class="nav-actions">
                        <button id="globalThemeToggle" class="theme-toggle-btn">🌙</button>
                        <a href="https://github.com/DemidovCyrill/PSP_labs_spring_2026" target="_blank" class="github-btn">GitHub</a>
                    </div>
                </nav>

                <div class="main-container">
                    <div class="hero-section">
                        <img src="https://avatars.githubusercontent.com/u/118429206?s=400&u=0e12ad565d2eb9c71b521e49a74ab2061984a263&v=4" alt="Кирилл Демидов" class="hero-avatar">
                        <h1 class="hero-title">Paleo<span class="hero-accent">Dem</span></h1>
                        <p class="hero-subtitle">Палеонтологический гид от Кирилла Демидова</p>
                        <div class="hero-stats">
                            <div class="stat-item">
                                <span class="stat-number">24</span>
                                <span class="stat-label">Видов динозавров</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">200+</span>
                                <span class="stat-label">Миллионов лет</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">Данные</span>
                                <span class="stat-label">Брались из википедии</span>
                            </div>
                        </div>
                    </div>

                    <h2 class="section-title">Популярные динозавры</h2>
                    <div class="cards-grid" id="cards-container"></div>
                </div>

                <footer class="footer">
                    <p>© 2026 Кирилл Демидов | Лабораторная работа по программированию сетевых приложений</p>
                </footer>
            </div>
        `;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Tyrannosaurus-rex-Profile-steveoc86_%28flipped%29.png",
                title: "Тираннозавр Рекс",
                period: "Поздний мел (68-66 млн лет)",
                short_description: "Один из самых крупных хищных динозавров.",
                diet: "Хищник",
                length: "12,3 метра",
                weight: "до 8 тонн",
                description: "Тираннозавр был одним из самых крупных наземных хищников за всю историю Земли. Обладал мощнейшим укусом и маленькими, но сильными передними лапами.",
                funFact: "Зубы тираннозавра могли достигать 30 см в длину, включая корень!"
            },
            {
                id: 2,
                src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Triceratops_horridus.png",
                title: "Трицератопс",
                period: "Поздний мел (68-66 млн лет)",
                short_description: "Травоядный динозавр с тремя рогами.",
                diet: "Травоядный",
                length: "9 метров",
                weight: "6-12 тонн",
                description: "Трицератопс известен своим большим костяным воротником и тремя рогами на морде. Использовал их для защиты от хищников.",
                funFact: "Несмотря на грозный вид, трицератопсы были травоядными и паслись стадами, как современные бизоны."
            },
            {
                id: 3,
                src: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Stegosaurus_stenops_Life_Reconstruction_%28flipped%29.png",
                title: "Стегозавр",
                period: "Поздняя юра (155-145 млн лет)",
                short_description: "Динозавр с костяными пластинами на спине.",
                diet: "Травоядный",
                length: "9 метров",
                weight: "до 5 тонн",
                description: "Стегозавра легко узнать по характерным ромбовидным пластинам вдоль спины и шипам на хвосте.",
                funFact: "Пластины стегозавра использовались для регулирования температуры тела и привлечения партнеров."
            },
            {
                id: 4,
                src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Spinosaurus_mirabilis.png",
                title: "Спинозавр",
                period: "Поздний мел (112-93 млн лет)",
                short_description: "Крупнейший хищный динозавр с парусом на спине.",
                diet: "Хищник (рыба)",
                length: "15 метров",
                weight: "до 7 тонн",
                description: "Спинозавр известен своим длинным крокодилоподобным черепом и высоким парусом на спине. Вероятно, вёл полуводный образ жизни.",
                funFact: "Спинозавр — самый крупный из известных хищных динозавров, превосходивший по размеру даже тираннозавра."
            },
            {
                id: 5,
                src: "https://upload.wikimedia.org/wikipedia/commons/5/55/Velociraptor_Restoration.png",
                title: "Велоцираптор",
                period: "Поздний мел (75-71 млн лет)",
                short_description: "Небольшой, но очень ловкий хищник.",
                diet: "Хищник",
                length: "2 метра",
                weight: "15-20 кг",
                description: "Велоцирапторы охотились стаями и использовали большой изогнутый коготь на задней лапе для атаки.",
                funFact: "В отличие от фильма «Парк юрского периода», велоцирапторы были покрыты перьями."
            },
            {
                id: 6,
                src: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Brontosaurus_skeleton_1880s.jpg",
                title: "Брахиозавр",
                period: "Поздняя юра (154-153 млн лет)",
                short_description: "Гигантский длинношеий динозавр.",
                diet: "Травоядный",
                length: "25 метров",
                weight: "30-40 тонн",
                description: "Брахиозавр отличался очень длинной шеей и передними ногами, которые были длиннее задних.",
                funFact: "Шея брахиозавра могла достигать 9 метров в длину."
            },
            {
                id: 7,
                src: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Ankylosaurus_magniventris_by_sphenaphinae.png",
                title: "Анкилозавр",
                period: "Поздний мел (68-66 млн лет)",
                short_description: "Бронированный динозавр с булавой на хвосте.",
                diet: "Травоядный",
                length: "8-9 метров",
                weight: "4-6 тонн",
                description: "Тело анкилозавра было покрыто толстыми костными пластинами, а на конце хвоста находилась тяжёлая костяная булава.",
                funFact: "Булава на хвосте анкилозавра могла сломать ногу крупному хищнику."
            },
            {
                id: 8,
                src: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Life_reconstruction_of_Parasaurolophus_walkeri.png",
                title: "Паразауролоф",
                period: "Поздний мел (76-73 млн лет)",
                short_description: "Динозавр с трубчатым гребнем на голове.",
                diet: "Травоядный",
                length: "9-10 метров",
                weight: "2,5-3 тонны",
                description: "Гребень паразауролофа служил для издавания низких звуков для общения внутри стада.",
                funFact: "Гребень работал как музыкальный инструмент — динозавр мог издавать гудящие звуки."
            },
            {
                id: 9,
                src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Diplodocus_carnegii.jpg",
                title: "Диплодок",
                period: "Поздняя юра (154-152 млн лет)",
                short_description: "Длинношеий и длиннохвостый зауропод.",
                diet: "Травоядный",
                length: "27-35 метров",
                weight: "10-16 тонн",
                description: "Диплодок обладал одной из самых длинных шей и хлыстообразным хвостом для защиты.",
                funFact: "Хвост диплодока мог двигаться со сверхзвуковой скоростью, создавая эффект кнута."
            },
            {
                id: 10,
                src: "https://upload.wikimedia.org/wikipedia/commons/1/14/Mosasaurus_beaugei1DB.jpg",
                title: "Мозазавр",
                period: "Поздний мел (70-66 млн лет)",
                short_description: "Гигантский морской хищник-рептилия.",
                diet: "Хищник",
                length: "до 18 метров",
                weight: "до 20 тонн",
                description: "Мозазавр был доминирующим хищником морей позднего мелового периода. Он имел мощные челюсти с двойным рядом зубов и ластоподобные конечности.",
                funFact: "Мозазавры — не динозавры, а морские рептилии, ближайшие родственники современных варанов!"
            },
            {
                id: 11,
                src: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Pliosaurus_funkei21DB_2.jpg",
                title: "Плиозавр",
                period: "Поздняя юра (160-150 млн лет)",
                short_description: "Короткошеий морской хищник с огромной головой.",
                diet: "Хищник",
                length: "10-15 метров",
                weight: "до 10 тонн",
                description: "Плиозавры имели массивную голову, короткую шею и мощные ласты. Они были одними из самых опасных морских хищников своего времени.",
                funFact: "Плиозавры могли развивать скорость до 30 км/ч в воде благодаря своим мощным ластам."
            },
            {
                id: 12,
                src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Elasmosaurus_platyurus.jpg",
                title: "Эласмозавр",
                period: "Поздний мел (80-65 млн лет)",
                short_description: "Плезиозавр с невероятно длинной шеей.",
                diet: "Хищник (рыба, моллюски)",
                length: "10-14 метров",
                weight: "до 3 тонн",
                description: "Шея эласмозавра составляла больше половины длины тела — до 7 метров! Он использовал её как змею, чтобы ловить рыбу.",
                funFact: "У эласмозавра было 71 позвонок в шее — больше, чем у любого другого животного в истории!"
            },
            {
                id: 13,
                src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Liopleurodon_ferox_Tubingen_2.JPG",
                title: "Лиоплевродон",
                period: "Средняя юра (165-155 млн лет)",
                short_description: "Гигантский плиозавр с мощными челюстями.",
                diet: "Хищник",
                length: "7-10 метров",
                weight: "до 5 тонн",
                description: "Лиоплевродон имел огромные челюсти с зубами длиной до 30 см. Он питался крупными морскими рептилиями и акулами.",
                funFact: "Лиоплевродон мог нырять на глубину до 500 метров и оставаться под водой до часа."
            },
            {
                id: 14,
                src: "https://upload.wikimedia.org/wikipedia/commons/9/9f/D_Terrelli.png",
                title: "Дунклеостей",
                period: "Поздний девон (380-360 млн лет)",
                short_description: "Бронированная рыба-хищник с мощными пластинами.",
                diet: "Хищник",
                length: "до 10 метров",
                weight: "до 4 тонн",
                description: "Вместо зубов у дунклеостея были острые костяные пластины, которые действовали как гильотина. Это одна из первых сверххищников в истории Земли.",
                funFact: "Укус дунклеостея был одним из самых мощных в истории — около 5000 кг на квадратный сантиметр!"
            },
            {
                id: 15,
                src: "https://upload.wikimedia.org/wikipedia/commons/f/fb/USNM_PAL_57683_Opabinia_regalis_Image_3.jpg",
                title: "Опабиния",
                period: "Средний кембрий (505 млн лет)",
                short_description: "Странное членистоногое с пятью глазами.",
                diet: "Хищник (мелкая живность)",
                length: "4-7 см",
                weight: "несколько грамм",
                description: "Опабиния — одно из самых странных существ кембрийского взрыва. У неё было пять глаз на стебельках и хоботок с клешней на конце.",
                funFact: "Опабиния — живое доказательство того, что в кембрии эволюция экспериментировала с формами жизни!"
            },
            {
                id: 16,
                src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Iguanodon_NT.jpg",
                title: "Игуанодон",
                period: "Ранний мел (126-125 млн лет)",
                short_description: "Один из первых открытых динозавров.",
                diet: "Травоядный",
                length: "10 метров",
                weight: "3-5 тонн",
                description: "Игуанодон имел характерный шип на большом пальце, который служил для защиты от хищников.",
                funFact: "Игуанодон стал одним из первых динозавров, описанных учёными в XIX веке."
            },
            {
                id: 17,
                src: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Pachycephalosaurus_Reconstruction.jpg",
                title: "Пахицефалозавр",
                period: "Поздний мел (70-66 млн лет)",
                short_description: "Динозавр с утолщённым черепом.",
                diet: "Травоядный",
                length: "4,5-6 метров",
                weight: "450 кг",
                description: "Череп пахицефалозавра имел куполообразную форму толщиной до 25 см для внутривидовых боёв.",
                funFact: "Самцы пахицефалозавров бились головами, как современные бараны!"
            },
            {
                id: 18,
                src: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Deinonychus_Restoration.png",
                title: "Дейноних",
                period: "Ранний мел (115-108 млн лет)",
                short_description: "Активный хищник с серповидным когтем.",
                diet: "Хищник",
                length: "3,4 метра",
                weight: "70-100 кг",
                description: "Дейноних был быстрым охотником с огромным изогнутым когтем на втором пальце задней лапы.",
                funFact: "Дейноних считается одним из самых умных динозавров благодаря большому мозгу."
            },
            {
                id: 19,
                src: "https://upload.wikimedia.org/wikipedia/commons/8/81/Carnotaurus_Reconstruction_%282022%29.png",
                title: "Карнотавр",
                period: "Поздний мел (72-69 млн лет)",
                short_description: "Хищник с двумя рогами на голове.",
                diet: "Хищник",
                length: "7-8 метров",
                weight: "2-3 тонны",
                description: "Карнотавр был быстрым бегуном с короткой мордой и двумя рогами над глазами.",
                funFact: "Карнотавр — единственный хищный динозавр с рогами, похожими на коровьи!"
            },
            {
                id: 20,
                src: "https://upload.wikimedia.org/wikipedia/commons/8/84/Protoceratops_andrewsi_Restoration.png",
                title: "Протоцератопс",
                period: "Поздний мел (75-70 млн лет)",
                short_description: "Маленький предок трицератопса.",
                diet: "Травоядный",
                length: "1,8-2,5 метра",
                weight: "180-400 кг",
                description: "Протоцератопс имел небольшой костяной воротник на шее, но у него не было рогов, как у трицератопса.",
                funFact: "Окаменелости протоцератопса часто находят в «драке» с велоцирапторами — застывшими в битве!"
            },
            {
                id: 21,
                src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Life_restoration_of_a_group_of_giant_azhdarchids%2C_Quetzalcoatlus_northropi%2C_foraging_on_a_Cretaceous_fern_prairie.png",
                title: "Кетцалькоатль",
                period: "Поздний мел (68-66 млн лет)",
                short_description: "Крупнейшее летающее животное в истории.",
                diet: "Хищник (падальщик?)",
                length: "размах крыльев до 12 метров",
                weight: "200-250 кг",
                description: "Кетцалькоатль был птерозавром размером с небольшой самолёт. Он мог парить над землёй в поисках добычи.",
                funFact: "Кетцалькоатль был размером с жирафа на земле — его шея достигала 3 метров!"
            },
            {
                id: 22,
                src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Therizinosaurus_Restoration.png",
                title: "Теризинозавр",
                period: "Поздний мел (70-68 млн лет)",
                short_description: "Травоядный динозавр с огромными когтями.",
                diet: "Травоядный",
                length: "9-10 метров",
                weight: "3-5 тонн",
                description: "У теризинозавра были когти длиной до 1 метра! Несмотря на свой страшный вид, он был мирным травоядным.",
                funFact: "Теризинозавр — главный пример того, что внешность обманчива: огромные когти нужны были для срывания листьев!"
            },
            {
                id: 23,
                src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Gallimimus_Restoration.png",
                title: "Галлимим",
                period: "Поздний мел (70-66 млн лет)",
                short_description: "Страусоподобный динозавр-бегун.",
                diet: "Всеядный",
                length: "6-8 метров",
                weight: "440 кг",
                description: "Галлимим был одним из самых быстрых динозавров — он мог развивать скорость до 70 км/ч.",
                funFact: "Галлимим означает «имитирующий курицу» — из-за сходства его скелета со скелетом страуса."
            },
            {
                id: 24,
                src: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Compsognathus_BW.jpg",
                title: "Компсогнат",
                period: "Поздняя юра (150 млн лет)",
                short_description: "Один из самых маленьких динозавров.",
                diet: "Хищник (насекомые, ящерицы)",
                length: "1 метр",
                weight: "2-3 кг",
                description: "Компсогнат был размером с курицу и охотился на мелкую живность. Это один из самых маленьких нелетающих динозавров.",
                funFact: "Компсогнат долгое время считался самым маленьким динозавром, пока не нашли ещё более мелких!"
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

        // Инициализация темы после рендера
        this.initTheme();

        // Добавляем обработчик для кнопки темы
        const themeToggle = document.getElementById('globalThemeToggle');
        if (themeToggle) {
            // Удаляем старый обработчик, если есть
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

        const cardsContainer = document.getElementById('cards-container');
        const data = this.getData();

        data.forEach(item => {
            const card = new DinosaurCardComponent(cardsContainer);
            card.render(item, this.clickCard.bind(this));
        });
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
}
