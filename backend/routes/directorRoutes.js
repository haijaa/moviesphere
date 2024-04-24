const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController');

// Define the base route for directors
router.get('/directors', directorController.getDirectors);
router.get('/director/:id', directorController.getDirector);
router.post('/director', directorController.createDirector);
router.put('/director/:id', directorController.updateDirector);
router.delete('/director/:id', directorController.deleteDirector);

module.exports = router;
