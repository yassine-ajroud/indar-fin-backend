const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reclamationSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  sales:[ {
    type:String,
    required: true,
  }],
  completed: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  reference:{type:String,required:true},
  price:{
    type: Number, required: true 
  }
}, { timestamps: true });

const Reclamation = mongoose.model('Reclamation', reclamationSchema);
module.exports = Reclamation;