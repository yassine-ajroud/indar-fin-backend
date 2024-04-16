const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reference: {type: String,required: true},
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  dimensions: { 
    height :{ type: Number },
    width : { type: Number },
    thickness: { type: Number }},
  subCategory: { type: String, required: true },
  image: { type: String , required: true},
  provider: { type: String , required: true}, 
  materials:{type:String, required: true},
  promotion:{ type: Boolean,
    default: false}
});

module.exports = mongoose.model('Product', productSchema);