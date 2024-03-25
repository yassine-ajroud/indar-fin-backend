const WishList = require("../models/WishList");

const createWishList =async (req,res)=>{
    const newWishList = new WishList(req.body);
    try {
      const savedWishList = await newWishList.save();
      res.status(201).json(savedWishList);
    } catch (err) {
      res.status(500).json(err);
    }
  }
   
  const getWishListById =async (req,res)=>{
    var uid =req.body.userId
    try {
         await WishList.findOne({ userId:uid }).then(async wishlist=>{
          if(wishlist){
            res.status(200).json(wishlist);
          }else{
            res.status(404).json({msg:'wishlist not found'});
          }
        })
      } catch (err) {
        res.status(500).json(err);
      }
  }

  const updateWishList =async (req,res)=>{
    var id = req.body.id
    var products = req.body.products

    try {
      const updatedWishList = await WishList.findByIdAndUpdate(
        id,
        {
            products: products,
        },
        { new: true }
      );
      res.status(200).json(updatedWishList);
    } catch (err) {
      res.status(500).json(err);
    }
 
  }

  const deleteWishList =async (req,res)=>{
    var id  = req.body.id;
  
    try {
      const wishlist = await WishList.findByIdAndDelete(id);
      if (!wishlist) {
        return res.status(404).json({ message: 'wishlist not found' });
      }else{
                res.status(200).json({ message: 'wishlist deleted successfully' });

      }
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while deleting wishlist' });
    }
  }

module.exports = {
    createWishList,getWishListById,updateWishList,deleteWishList
}