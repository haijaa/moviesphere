const express = require('express')
const router = express.Router()
const actorController = require('../controllers/reviewController')

router.get('/reviews', actorController.getReviews)

module.exports = router
