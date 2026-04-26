const dinosaursService = require('../services/dinosaursService');

// GET /dinosaurs/
const getAllDinosaurs = (req, res) => {
    const { title } = req.query;
    const dinosaurs = dinosaursService.findAll(title);
    res.json(dinosaurs);
};

// GET /dinosaurs/:id
const getDinosaurById = (req, res) => {
    const id = parseInt(req.params.id);
    const dinosaur = dinosaursService.findOne(id);

    if (!dinosaur) {
        return res.status(404).json({ error: 'Динозавр не найден' });
    }

    res.json(dinosaur);
};

// POST /dinosaurs/
const createDinosaur = (req, res) => {
    const { title, period, short_description, diet, length, weight, description, funFact, images } = req.body;

    if (!title || !period || !short_description) {
        return res.status(400).json({ error: 'Не все обязательные поля заполнены' });
    }

    const newDinosaur = dinosaursService.create({
        title, period, short_description, diet, length, weight, description, funFact, images
    });
    res.status(201).json(newDinosaur);
};

// PATCH /dinosaurs/:id
const updateDinosaur = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedDinosaur = dinosaursService.update(id, req.body);

    if (!updatedDinosaur) {
        return res.status(404).json({ error: 'Динозавр не найден' });
    }

    res.json(updatedDinosaur);
};

// DELETE /dinosaurs/:id
const deleteDinosaur = (req, res) => {
    const id = parseInt(req.params.id);
    const success = dinosaursService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Динозавр не найден' });
    }

    res.status(204).send();
};

module.exports = {
    getAllDinosaurs,
    getDinosaurById,
    createDinosaur,
    updateDinosaur,
    deleteDinosaur
};
