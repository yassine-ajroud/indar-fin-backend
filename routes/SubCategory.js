const express = require('express')
const router = express.Router()
const multer = require('multer')
require('dotenv').config()


const SubCategoryController = require ('../controllers/SubCategoryController')
const  authenticate = require('../middleware/authenticate')

router.post('/subcategory/add', authenticate, SubCategoryController.createSubCategory)
router.get('/subcategory/:id', authenticate,SubCategoryController.getSubCategoryById)
router.get('/subcategory', authenticate,SubCategoryController.getAllSubCategories)
router.put('/subcategory/:id', authenticate,SubCategoryController.updateSubCategory)
router.delete('/subcategory/:id', authenticate,SubCategoryController.deleteSubCategory)




filename=''
const mystorage= multer.diskStorage({
    destination : './uploads/subcategory_image',
    filename : (req,file, redirect)=>{
        let date = Date.now();
        let f1 = date+'.'+file.mimetype.split('/')[1];
        redirect(null,f1);
        filename = f1;
    }
})

const upload = multer({storage:mystorage});

router.put('/updatesubcategoryimage',upload.any('image'),async (req, res) => {
    var  id  = req.body.id;
    try {

         await SubCategory.findByIdAndUpdate(
            id, { 
              image: 'http://'+process.env.IP_ADDRESS+':'+process.env.IP_ADDRESS+'/uploads/subcategory_image/'+filename 
        },)
        res.status(200).json({
            message : `image updated `,
        })
        
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports=router