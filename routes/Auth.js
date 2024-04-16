const express = require('express')
const router = express.Router()
const User = require('../models/User')

const AuthController = require ('../controllers/AuthController')
const  authenticate = require('../middleware/authenticate')
const multer = require('multer')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/forgetPassword', AuthController.forgetPassword)
router.post('/VerifCode', AuthController.VerifCode)
router.post('/Resetpassword', AuthController.Resetpassword)
router.post('/updatepassword',authenticate, AuthController.updatepassword)
router.get('/users/byId',authenticate, AuthController.profilgetById)
router.put('/UpdateProfil',authenticate, AuthController.UpdateProfil)
router.post('/refreshtoken', AuthController.refreshtoken)
router.put('/users/ban',authenticate, AuthController.banUser);
router.get('/users', authenticate,AuthController.getAllUsers);
router.delete('/users/delete',authenticate, AuthController.deleteUser);



filename=''
const mystorage= multer.diskStorage({
    destination : './uploads/images',
    filename : (req,file, redirect)=>{
        let date = Date.now();
        let f1 = date+'.'+file.mimetype.split('/')[1];
        redirect(null,f1);
        filename = f1;
    }
})

const upload = multer({storage:mystorage});

router.post('/updateImage',upload.any('image'),async (req, res) => {
    var  id  = req.body.id;
    try {

         await User.findByIdAndUpdate(
            id, { 
              imageUrl: 'http://192.168.1.20:8000/uploads/images/'+filename 
        },)
        res.status(200).json({
            message : `image updated `,
        })
        
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router