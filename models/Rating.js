const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  product: {
    type:String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;
