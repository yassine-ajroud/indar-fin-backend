const Cart = require("../models/Cart");

const createCart =async (req,res)=>{
    const newCart = new Cart(req.body);
    try {
      const savedCart = await newCart.save();
      res.status(201).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
   
  const getCartById =async (req,res)=>{
    var uid =req.body.userId
    try {
         await Cart.findOne({ userId:uid }).then(async cart=>{
          if(cart){
            res.status(200).json(cart);
          }else{
            res.status(404).json({msg:'cart not found'});
          }
        })
      } catch (err) {
        res.status(500).json(err);
      }
  }

  const updateCart =async (req,res)=>{
    var id = req.body.id
    var sales = req.body.sales

    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        id,
        {
         sales: sales,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
 
  }

  const deleteCart =async (req,res)=>{
    var id  = req.body.id;
  
    try {
      const cart = await Cart.findByIdAndDelete(id);
      if (!cart) {
        return res.status(404).json({ message: 'cart not found' });
      }else{
                res.status(200).json({ message: 'cart deleted successfully' });

      }
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while deleting cart' });
    }
  }

module.exports = {
    createCart,getCartById,updateCart,deleteCart
}