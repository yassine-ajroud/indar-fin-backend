const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fournisseurSchema = new Schema({
  name: {
    required: true,
    type: String
  },
   email: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
  },

  
});

const fournisseur = mongoose.model('Fournisseur', fournisseurSchema);
module.exports = fournisseur;

