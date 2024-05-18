const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: { type: String , required: true },
  fournisseurId: { type: String, required: true },
  UserId: { type: String, ref: 'User' },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  status: [
      {
        index: { type: Number, required: true },
        status: { type: Number, required: true },
        date: { type: Date, default: null }
      },
      {
        index:1,
        status:2,
        date:null
      },
      {
        index:2,
        status:3,
        date:null
      },
      {
        index:3,
        status:4,
        date:null
      }
  ],
  price:{ type: Number, required: true }
});

module.exports = mongoose.model('Sale', saleSchema);

