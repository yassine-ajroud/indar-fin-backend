const mongoose = require("mongoose");

const CategorytSchema = new mongoose.Schema(
  {
    title: 
       {
        type:String,
        required: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorytSchema);