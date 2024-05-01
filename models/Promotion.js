const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  product: { type:String, required: true },
  discountPercentage: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  image :{ type: String, required: true },
  text :{ type: String, required: true }

});

module.exports = mongoose.model('Promotion', promotionSchema);
