const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reference: {type: String,required: true},
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category:{ 
    id :{ type: String, required: true  },
    title : { type: String, required: true  }},
  dimensions: { 
    height :{ type: Number },
    width : { type: Number },
    thickness: { type: Number }},
  subCategory: { 
    id :{ type: String, required: true  },
    title : { type: String, required: true  }},
  image: { type: String , required: true},
  provider: { 
    id :{ type: String, required: true  },
    name : { type: String, required: true  }},
  materials:{type:String, required: true},
  promotion:{ type: Boolean,
    default: false},
sales:{ type: Number , default:0},
rate: { type: Number , default:0},
},
{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);