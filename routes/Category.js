const express = require('express')
const router = express.Router()

const CategoryController = require ('../controllers/CategoryController')
const  authenticate = require('../middleware/authenticate')

router.post('/category/add', authenticate, CategoryController.createCategory)
router.get('/category/:id', authenticate,CategoryController.getCategoryById)
router.get('/category', authenticate,CategoryController.getAllCategories)
router.put('/category/:id', authenticate,CategoryController.updateCategory)
router.delete('/category/:id', authenticate,CategoryController.deleteCategory)

module.exports=router