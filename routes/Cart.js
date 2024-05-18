const express = require('express')
const router = express.Router()

const CartController = require ('../controllers/CartController')
const  authenticate = require('../middleware/authenticate')

router.post('/cart/add', CartController.createCart)
router.get('/cart/get', authenticate,CartController.getCartById)
router.put('/cart/update', authenticate,CartController.updateCart)
router.delete('/cart/delete', authenticate,CartController.deleteCart)

module.exports=router