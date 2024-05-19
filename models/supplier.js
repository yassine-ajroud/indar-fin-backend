const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true  },
  phone: { type: String, required: true },
  marque :{type:String ,required : true},
  rib :{type:String ,required : true},
  image: {type:String,default:null},
  webSite: { type: String,default:null},
  userId: {type:String,default:null},


});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;