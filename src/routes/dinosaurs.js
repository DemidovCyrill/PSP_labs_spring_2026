const express = require('express');
const router = express.Router();
const dinosaursController = require('../controllers/dinosaursController');

router.get('/', dinosaursController.getAllDinosaurs);      // GET /dinosaurs/ - список с фильтрацией
router.get('/:id', dinosaursController.getDinosaurById);   // GET /dinosaurs/:id - получение по ID
router.post('/', dinosaursController.createDinosaur);      // POST /dinosaurs/ - добавление
router.patch('/:id', dinosaursController.updateDinosaur);  // PATCH /dinosaurs/:id - обновление
router.delete('/:id', dinosaursController.deleteDinosaur); // DELETE /dinosaurs/:id - удаление

module.exports = router;
