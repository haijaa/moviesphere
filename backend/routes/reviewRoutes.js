const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')

router.get('/reviews', reviewController.getReviews)
router.get('/movie/:movieId/reviews', reviewController.getReviewsByMovieId)
router.post('/reviews', reviewController.createReview)
router.put('/reviews', reviewController.updateReview)
router.delete('/reviews', reviewController.deleteReview)

module.exports = router
