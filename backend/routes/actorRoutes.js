const express = require('express')
const router = express.Router()
const actorController = require('../controllers/actorControllers')

router.get('/actors', actorController.getActors)
router.post('/actors', actorController.createActor)
router.put('/actors', actorController.updateActor)
router.delete('/actors', actorController.deleteActor)

module.exports = router
