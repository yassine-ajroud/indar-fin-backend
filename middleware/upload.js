        const multer = require('multer')

const upload = (req,res,next)=>{
    try{
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

    }
    catch(error){
      
            res.status(401).json({
                message :"upload error"
            })
    

    }
}

module.exports = upload