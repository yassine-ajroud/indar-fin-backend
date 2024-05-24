const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  userId: { type: String,required: true ,required:true },
  service: { type: String,required: true ,required:true },
  description:{ type: String,required: true  },
  images:[{ type: String }],
  courtesy:{type:Number,default:0},
  quality:{type:Number,default:0},
  cost:{type:Number,default:0},
  Punctuality:{type:Number,default:0},
  rate:{type:Number,default:0},
  experience:{type:Number,default:0},

});

module.exports = mongoose.model('Service', serviceSchema);

