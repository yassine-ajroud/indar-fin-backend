const express = require('express')
const router = express.Router()
const Review = require('../models/Review')
const multer = require('multer')
require('dotenv').config()



const ReviewController = require ('../controllers/ReviewController')
const  authenticate = require('../middleware/authenticate')

router.post('/products/:productId/reviews',authenticate,ReviewController.addComment )
router.get('/products/:productId/reviews',authenticate,ReviewController.getAllComments)
router.put('/reviews/:reviewId',authenticate,ReviewController.updateComment)
router.delete('/reviews/:reviewId',authenticate,ReviewController.deleteComment)


filename=''
const mystorage= multer.diskStorage({
    destination : './uploads/reviews',
    filename : (req,file, redirect)=>{
        let date = Date.now();
        let f1 = date+'.'+file.mimetype.split('/')[1];
        redirect(null,f1);
        filename = f1;
    }
})

const upload = multer({storage:mystorage});

router.put('/updateReviewimage',upload.any('image'),async (req, res) => {
    var  id  = req.body.id;
    try {

         await Review.findByIdAndUpdate(
            id, { 
              image: 'http://'+process.env.IP_ADDRESS+':'+process.env.PORT+'/uploads/reviews/'+filename 
        },)
        res.status(200).json({
            message : `image updated `,
        })
        
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


module.exports=router