const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier')
require('dotenv').config()

const supplierController = require('../controllers/SupplierController');

const  authenticate = require('../middleware/authenticate')
const multer = require('multer')

//fournisseur routes
router.post('/supplier', supplierController.createSupplier);
router.get('/supplier', authenticate,supplierController.getAllSuppliers);
router.get('/supplier/:id',authenticate ,supplierController.getSupplierById);
router.put('/supplier/:id',authenticate ,supplierController.updateSupplier);
router.delete('/supplier/:id',authenticate, supplierController.deleteSupplier);


filename=''
const mystorage= multer.diskStorage({
    destination : './uploads/suppliers',
    filename : (req,file, redirect)=>{
        let date = Date.now();
        let f1 = date+'.'+file.mimetype.split('/')[1];
        redirect(null,f1);
        filename = f1;
    }
})

const upload = multer({storage:mystorage});

router.put('/updatesupplierimage',upload.any('image'),async (req, res) => {
    var  id  = req.body.id;
    try {

         await Supplier.findByIdAndUpdate(
            id, { 
              image: 'http://'+process.env.IP_ADDRESS+':'+process.env.PORT+'/uploads/suppliers/'+filename 
        },)
        res.status(200).json({
            message : `image updated `,
        })
        
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
