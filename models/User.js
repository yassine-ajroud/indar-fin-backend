const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    required: true,
    type: String
  },
  lastName: {
    type: String,
    required: true,

  },
  imageUrl:{
    type: String,
  },
  email: {
    type: String,
    required: true,

  },
  OAuth: {
    type: String,
  },
  address: {
    type: String,

  },
  phone: {
    type: String,

  },
  password: {
    type: String,
    required: true,
  },
  ban: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'vendor','admin'],
    default: 'user'
  },
  gender: {
    type: String,
    enum: ['male', 'female',''],
    default:''
  },
  birthDate: {
    type: String,
  },
}, { timestamps: true });

const user = mongoose.model('User', userSchema);
module.exports = user;
