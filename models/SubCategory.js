const mongoose = require("mongoose");

const SubCategorytSchema = new mongoose.Schema(
  {
    title: 
       {
        type:String,
        required: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", SubCategorytSchema);