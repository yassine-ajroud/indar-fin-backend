const Promotion = require('../models/Promotion');
const Product = require('../models/Product');


// Create a new promotion
const createPromotion =async (req,res)=>{
  try {
    const newPromotion = new Promotion(req.body);
    const savedPromotion = await newPromotion.save();
    await Product.findByIdAndUpdate(newPromotion.product,{"promotion":true});
    res.status(201).json(savedPromotion);
  } catch (error) {
    next(error);
  }
};

// Get all promotions
const getAllPromotions =async (req,res)=>{
  try {
    const promotions = await Promotion.find()
    res.status(200).json(promotions);
  } catch (error) {
    next(error);
  }
};

// Get promotion by id
const getPromotionById =async (req,res)=>{
    try {
      const promotions = await Promotion.findById(req.params.id)
      res.status(200).json(promotions);
    } catch (error) {
      next(error);
    }
  };                                                    

// Update a promotion
const updatePromotion =async (req,res)=>{
    try {
    const promotionId = req.params.id;

    const updatedPromotion = await Promotion.findByIdAndUpdate(
      promotionId,
      req.body
    );

    if (!updatedPromotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    res.status(200).json(updatedPromotion);
  } catch (error) {
    next(error);
  }
};

// Delete a promotion
const deletePromotion =async (req,res)=>{
    try {
    const promotionId = req.params.id;
    const deletedPromotion = await Promotion.findByIdAndDelete(promotionId);
    if (!deletedPromotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }else{
      await Product.findByIdAndUpdate(deletedPromotion.product,{"promotion":false});
      return res.status(200).json({message:"Promotion deleted"})
    }

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
    createPromotion,getAllPromotions,updatePromotion,deletePromotion,getPromotionById
}