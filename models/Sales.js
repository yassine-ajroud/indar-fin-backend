const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: { type: String , required: true },
  fournisseurId: { type: String, required: true },
  UserId: { type: String,required: true  },
  modelId: { type: String,required: true  },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  status: [
      {
        index: { type: Number},
        status: { type: Number },
        date: { type: Date, default: null }
      },
  ],
  price:{ type: Number, required: true }
});

module.exports = mongoose.model('Sale', saleSchema);

