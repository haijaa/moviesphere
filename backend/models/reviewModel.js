const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
})

module.exports = mongoose.model('review', reviewSchema)
