const express = require('express')
const router = express.Router()

const WishListController = require ('../controllers/WishListController')
const  authenticate = require('../middleware/authenticate')

router.post('/wishlist/add', WishListController.createWishList)
router.get('/wishlist/get', authenticate,WishListController.getWishListById)
router.put('/wishlist/update', authenticate,WishListController.updateWishList)
router.delete('/wishlist/delete', authenticate,WishListController.deleteWishList)

module.exports=router