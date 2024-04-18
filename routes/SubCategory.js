const express = require('express')
const router = express.Router()

const SubCategoryController = require ('../controllers/SubCategoryController')
const  authenticate = require('../middleware/authenticate')

router.post('/subcategory/add', authenticate, SubCategoryController.createSubCategory)
router.get('/subcategory/:id', authenticate,SubCategoryController.getSubCategoryById)
router.get('/subcategory', authenticate,SubCategoryController.getAllSubCategories)
router.put('/subcategory/:id', authenticate,SubCategoryController.updateSubCategory)
router.delete('/subcategory/:id', authenticate,SubCategoryController.deleteSubCategory)

module.exports=router