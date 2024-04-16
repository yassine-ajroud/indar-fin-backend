const mongoose = require('mongoose');

const product3DSchema = new mongoose.Schema({
  prodId:{type:String,required:true},
  image3D: { type: String ,required:true},
  imageCouleurs: { type: String ,required:true},
  quantity: {type:Number,required:true}
});

module.exports = mongoose.model('Product3D', product3DSchema);

