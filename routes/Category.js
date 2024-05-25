const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const multer = require('multer')
require('dotenv').config()



const CategoryController = require ('../controllers/CategoryController')
const  authenticate = require('../middleware/authenticate')

router.post('/category/add', authenticate, CategoryController.createCategory)
router.get('/category/:id', authenticate,CategoryController.getCategoryById)
router.get('/category', authenticate,CategoryController.getAllCategories)
router.put('/category/:id', authenticate,CategoryController.updateCategory)
router.delete('/category/:id', authenticate,CategoryController.deleteCategory)

filename=''
const mystorage= multer.diskStorage({
    destination : './uploads/category_image',
    filename : (req,file, redirect)=>{
        let date = Date.now();
        let f1 = date+'.'+file.mimetype.split('/')[1];
        redirect(null,f1);
        filename = f1;
    }
})

const upload = multer({storage:mystorage});

router.put('/updatecategoryimage',upload.any('image'),async (req, res) => {
    var  id  = req.body.id;
    try {

         await Category.findByIdAndUpdate(
            id, { 
              image: 'http://'+process.env.IP_ADDRESS+':'+process.env.PORT+'/uploads/category_image/'+filename 
        },)
        res.status(200).json({
            message : `image updated `,
        })
        
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports=router