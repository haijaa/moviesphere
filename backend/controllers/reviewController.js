const reviewModel = require('../models/reviewModel')

exports.getReviews = async (req, res) => {
  try {
    const allReviews = await reviewModel.find()
    return res.status(200).json(allReviews)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.getReviewsByMovieId = async (req, res) => {
  const { movieId } = req.params
  try {
    const review = await reviewModel.find({ movieId: movieId })
    return res.status(200).json(review)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.createReview = async (req, res) => {
  const { author, comment, movieId, rating } = req.body

  try {
    const newReview = new reviewModel({
      author: author,
      comment: comment,
      movieId: movieId,
      rating: rating,
    })
    if (!author) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a username',
      })
    }
    const insertedReview = await newReview.save()
    return res.status(201).json(insertedReview)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.updateReview = async (req, res) => {
  const { _id, author, comment, movieId, rating } = req.body

  try {
    await reviewModel.updateOne(
      { _id: _id },
      {
        _id: _id,
        author: author,
        comment: comment,
        movieId: movieId,
        rating: rating,
      }
    )
    const updatedReview = await reviewModel.find({ _id: _id })
    return res.status(200).json(updatedReview)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.deleteReview = async (req, res) => {
  const { _id } = req.body

  try {
    const deletedReview = await reviewModel.deleteOne({ _id: _id })
    return res.status(200).json(deletedReview)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}
