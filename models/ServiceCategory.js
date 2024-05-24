const mongoose = require("mongoose");

const ServiceCategorytSchema = new mongoose.Schema(
  {
    title: 
       {
        type:String,
        required: true,
      },
      image: 
      {
       type:String,
     },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceCategory", ServiceCategorytSchema);