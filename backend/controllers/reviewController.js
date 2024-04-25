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
