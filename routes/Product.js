const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Product3D = require('../models/Product3D')
const multer = require('multer')
require('dotenv').config()


const productController = require ('../controllers/ProductController')
const  authenticate = require('../middleware/authenticate')


router.post('/products' ,authenticate,productController.createProduct);
router.get('/products', authenticate,productController.getAllProducts);
router.get('/products/sorted', authenticate,productController.getSortedProducts);
router.get('/products/:id', authenticate,productController.getProductById);
router.put('/products/:id', authenticate,productController.updateProduct);
router.delete('/products/:id', authenticate,productController.deleteProduct);
router.get('/products/category/:category',authenticate, productController.getProductsByCategory);
router.get('/products/category/:category/subcategory/:subCategory', authenticate,productController.getProductsByCategoryAndSubcategory);

router.post('/3Dproducts' , authenticate,productController.create3DProduct);
router.get('/3Dproducts/:id', authenticate,productController.get3DProductById);
router.get('/3Dproducts/all/:id', authenticate,productController.getAll3DProducts);

colorname=''
const mystorage1= multer.diskStorage({
    destination : './uploads/color_images',
    filename : (req,file, redirect)=>{
        let date = Date.now();
        let f1 = date+'.'+file.mimetype.split('/')[1];
        redirect(null,f1);
        colorname = f1;
    }
})
const upload1= multer({storage:mystorage1});

router.put('/uploadcolorimage',upload1.any('image'),async (req, res) => {
  var  id  = req.body.id;
  try {
       await Product3D.findByIdAndUpdate(
          id, { 
            imageCouleurs: 'http://'+process.env.IP_ADDRESS+':'+process.env.PORT+'/uploads/color_images/'+colorname 
      },)
      res.status(200).json({
          message : `image added `,
      })

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

colorfile=''
const mystorage2= multer.diskStorage({
  destination : './uploads/color_file',
  filename : (req,file, redirect)=>{
      let date = Date.now();
      let f1 = date+'.'+file.mimetype.split('/')[1];
      redirect(null,f1);
      colorname = f1;
  }
})
const upload2= multer({storage:mystorage2});

router.put('/uploadcolorfile',upload2.any('file'),async (req, res) => {
  var  id  = req.body.id;
  try {
       await Product3D.findByIdAndUpdate(
          id, { 
            image3D: 'http://'+process.env.IP_ADDRESS+':'+process.env.PORT+'/uploads/color_images/'+colorfile 
      },)
      res.status(200).json({
          message : `file added `,
      })

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

filename=''
const mystorage= multer.diskStorage({
    destination : './uploads/product_images',
    filename : (req,file, redirect)=>{
        let date = Date.now();
        let f1 = date+'.'+file.mimetype.split('/')[1];
        redirect(null,f1);
        filename = f1;
    }
})

const upload = multer({storage:mystorage});

router.put('/uploadprodcutsimage',upload.any('image'),async (req, res) => {
    var  id  = req.body.id;
    try {

         await Product.findByIdAndUpdate(
            id, { 
              image: 'http://'+process.env.IP_ADDRESS+':'+process.env.PORT+'/uploads/product_images/'+filename 
        },)
        res.status(200).json({
            message : `image added `,
        })

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router