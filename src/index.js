const express = require('express');
const path = require('path');
const cors = require('cors');
const dinosaursRouter = require('./routes/dinosaurs');
const dinosaursService = require('./services/dinosaursService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/dinosaurs.json');
dinosaursService.init(DATA_FILE_PATH);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/dinosaurs', dinosaursRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`Доступные эндпоинты:`);
    console.log(`   GET    /dinosaurs/           - получить всех динозавров`);
    console.log(`   GET    /dinosaurs/:id        - получить динозавра по ID`);
    console.log(`   GET    /dinosaurs/?title=... - фильтрация по названию`);
    console.log(`   POST   /dinosaurs/           - добавить динозавра`);
    console.log(`   PATCH  /dinosaurs/:id        - обновить динозавра`);
    console.log(`   DELETE /dinosaurs/:id        - удалить динозавра`);
});
