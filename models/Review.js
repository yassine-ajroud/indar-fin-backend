const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {
    type:String,
    required: true,
  },
  product: {
    type:String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    required: false, 
  },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
