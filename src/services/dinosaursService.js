const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

// GET /dinosaurs/ - список с фильтрацией по названию
const findAll = (title) => {
    const dinosaurs = fileService.readData(dataFilePath);
    if (title) {
        return dinosaurs.filter(dino =>
            dino.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return dinosaurs;
};

// GET /dinosaurs/:id - получение одного динозавра
const findOne = (id) => {
    const dinosaurs = fileService.readData(dataFilePath);
    return dinosaurs.find(dino => dino.id === id);
};

// POST /dinosaurs/ - добавление нового динозавра
const create = (dinoData) => {
    const dinosaurs = fileService.readData(dataFilePath);

    const newId = dinosaurs.length > 0
        ? Math.max(...dinosaurs.map(d => d.id)) + 1
        : 1;

    const newDinosaur = { id: newId, ...dinoData };
    dinosaurs.push(newDinosaur);
    fileService.writeData(dataFilePath, dinosaurs);

    return newDinosaur;
};

// PATCH /dinosaurs/:id - обновление динозавра
const update = (id, dinoData) => {
    const dinosaurs = fileService.readData(dataFilePath);
    const index = dinosaurs.findIndex(d => d.id === id);

    if (index === -1) return null;

    dinosaurs[index] = { ...dinosaurs[index], ...dinoData };
    fileService.writeData(dataFilePath, dinosaurs);

    return dinosaurs[index];
};

// DELETE /dinosaurs/:id - удаление динозавра
const remove = (id) => {
    const dinosaurs = fileService.readData(dataFilePath);
    const filteredDinosaurs = dinosaurs.filter(d => d.id !== id);

    if (filteredDinosaurs.length === dinosaurs.length) {
        return false;
    }

    fileService.writeData(dataFilePath, filteredDinosaurs);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
