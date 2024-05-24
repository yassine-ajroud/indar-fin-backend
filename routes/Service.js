const express = require('express')
const router = express.Router()
const Service = require('../models/Service')
const multer = require('multer')
require('dotenv').config()



const ServiceController = require ('../controllers/ServiceController')
const  authenticate = require('../middleware/authenticate')

router.post('/service/add', ServiceController.createService)
router.get('/service/:id', authenticate,ServiceController.getServiceById)
router.get('/service', authenticate,ServiceController.getAllServices)
router.put('/service/:id', authenticate,ServiceController.updateService)
router.delete('/service/:id', authenticate,ServiceController.deleteService)




filename=''
const mystorage= multer.diskStorage({
    destination : './uploads/service_image',
    filename : (req,file, redirect)=>{
        let date = Date.now();
        let f1 = date+'.'+file.mimetype.split('/')[1];
        redirect(null,f1);
        filename = f1;
    }
})

const upload = multer({storage:mystorage});

router.put('/addserviceimage',upload.any('image'),async (req, res) => {
    var  id  = req.body.id;
    try {
         service= await Service.findOne({'_id':id});
         list=Array.from( service.images)
         list.push('http://'+process.env.IP_ADDRESS+':'+process.env.IP_ADDRESS+'/uploads/service_image/'+filename)
         console.log(list)
         await Service.findByIdAndUpdate(
            id, { 
              images: list
        },)
        res.status(200).json({
            message : `image updated `,
        })
        
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  filename1=''
const mystorage1= multer.diskStorage({
    destination : './uploads/service_image',
    filename : (req,file, redirect)=>{
        let date = Date.now();
        let f1 = date+'.'+file.mimetype.split('/')[1];
        redirect(null,f1);
        filename1 = f1;
    }
})

const upload1 = multer({storage:mystorage1});

router.put('/updateserviceimage',upload1.any('image'),async (req, res) => {
    var  id  = req.body.id;
    var oldimg= req.body.oldImage;
    try {
         service= await Service.findOne({'_id':id});
         list=Array.from( service.images)
         index=list.indexOf(oldimg)
         list[index]='http://'+process.env.IP_ADDRESS+':'+process.env.IP_ADDRESS+'/uploads/service_image/'+filename1
         console.log(list)
         await Service.findByIdAndUpdate(
            id, { 
              images: list
        },)
        res.status(200).json({
            message : `image updated `,
        })
        
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
module.exports=router
