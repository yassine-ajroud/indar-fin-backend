const Sale = require('../models/Sales');
const Product = require('../models/Product'); 

exports.recordSale = async (req, res) => {
   try {
    const { productId, fournisseurId, UserId, quantity ,price,modelId} = req.body;

    const sale = new Sale({
      productId,
      fournisseurId,
      UserId,
      quantity,
      modelId,
      price
    });
    sale.status=
    [
      {
        index:0,
        status:1,
        date:null
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
    await sale.save();

    res.status(201).json({ message: 'success sale', sale });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSales = async (req, res) => {
  try {
   const {userId} = req.params;
   const sales=await Sale.find({UserId:userId});

   res.status(201).json(sales);
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
};

exports.getSaleById = async (req,res)=>{
  try {    
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found.' });
    }
    
    
    res.status(200).json(sale);

  } catch (error) {
    res.status(500).json({ error: 'Failed to record the sale.' });
  }
}

exports.deleteSale = async (req,res)=>{
  try {    
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found.' });
    }
    
    
    res.status(200).json(sale);

  } catch (error) {
    res.status(500).json({ error: 'Failed to record the sale.' });
  }}

  exports.updateSale = async (req,res)=>{
    try {    
      const sale = await Sale.findByIdAndUpdate(req.params.id,req.body,{new:true});      
      res.status(200).json(sale);
  
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the sale.' });
    }
  }
