const express = require('express')
const router = express.Router()
const ServiceCategory = require('../models/ServiceCategory')
const multer = require('multer')
require('dotenv').config()



const ServiceCategoryController = require ('../controllers/serviceCategoryController')
const  authenticate = require('../middleware/authenticate')

router.post('/service_category/add', authenticate, ServiceCategoryController.createServiceCategory)
router.get('/service_category/:id', authenticate,ServiceCategoryController.getServiceCategoryById)
router.get('/service_category',ServiceCategoryController.getAllServiceCategories)
router.put('/service_category/:id', authenticate,ServiceCategoryController.updateServiceCategory)
router.delete('/service_category/:id', authenticate,ServiceCategoryController.deleteServiceCategory)

filename=''
const mystorage= multer.diskStorage({
    destination : './uploads/service_category_image',
    filename : (req,file, redirect)=>{
        let date = Date.now();
        let f1 = date+'.'+file.mimetype.split('/')[1];
        redirect(null,f1);
        filename = f1;
    }
})

const upload = multer({storage:mystorage});

router.put('/updateservicecategoryimage',upload.any('image'),async (req, res) => {
    var  id  = req.body.id;
    try {

         await ServiceCategory.findByIdAndUpdate(
            id, { 
              image: 'http://'+process.env.IP_ADDRESS+':'+process.env.IP_ADDRESS+'/uploads/service_category_image/'+filename 
        },)
        res.status(200).json({
            message : `image updated `,
        })
        
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports=router