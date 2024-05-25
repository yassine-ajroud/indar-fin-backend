const express = require('express');
const router = express.Router();
const Promotion = require('../models/Promotion')
const multer = require('multer')
require('dotenv').config()


const PromotionController = require ('../controllers/PromotionController')
const  authenticate = require('../middleware/authenticate')


router.post('/promotions',authenticate,PromotionController.createPromotion )
router.get('/promotions',authenticate,PromotionController.getAllPromotions)
router.get('/promotions/:id',authenticate,PromotionController.getPromotionById)
router.put('/promotions/:id', authenticate,PromotionController.updatePromotion)
router.delete('/promotions/:id', authenticate,PromotionController.deletePromotion)


filename=''
const mystorage= multer.diskStorage({
    destination : './uploads/promotions',
    filename : (req,file, redirect)=>{
        let date = Date.now();
        let f1 = date+'.'+file.mimetype.split('/')[1];
        redirect(null,f1);
        filename = f1;
    }
})

const upload = multer({storage:mystorage});

router.put('/updatepromotionimage',upload.any('image'),async (req, res) => {
    var  id  = req.body.id;
    try {

         await Promotion.findByIdAndUpdate(
            id, { 
              image: 'http://'+process.env.IP_ADDRESS+':'+process.env.PORT+'/uploads/promotions/'+filename 
        },)
        res.status(200).json({
            message : `image updated `,
        })
        
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
