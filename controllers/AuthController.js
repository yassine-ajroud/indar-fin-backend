const User = require('../models/User')
const Fournisseur = require('../models/Fournisseur')

const bycrypt = require('bcryptjs')
const jwt  = require ('jsonwebtoken')
const moment = require('moment')
const nodemailer=require("nodemailer");
const OTP = require('../models/OTP');


const register =async (req,res)=> {
    var n = await User.countDocuments({email:req.body.email},{ limit: 1 });
    if(n==0){
        bycrypt.hash(req.body.password,10,function(err,hashedPass){
            if(err){
                res.status(500).json({
                    error :err
                })
            }
            let user = new User ({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                address : req.body.address,
                phone : req.body.phone,
                imageUrl:req.body.imageUrl,
                password: hashedPass,
                OAuth :req.body.OAuth, 
                gender : req.body.gender,
                birthDate : req.body.birthDate,
                role: req.body.role || 'user'
            })
            user.save().then(user => {
                res.status(201).json ({
                    message :"user Added Successfully",
                    "uId":user.id
                })
            })
            .catch (error =>{
                res.status(500).json({
                    message : "error occured"
                })
            })
        })
    }else{
        res.status(403).json({
            message : "user already exist"
        })
    }
}

  const registerFrourni =async (req,res)=> {
    var n = await Fournisseur.countDocuments({email:req.body.email},{ limit: 1 });
    if(n==0){
        bycrypt.hash(req.body.password,10,function(err,hashedPass){
            if(err){
                res.status(500).json({
                    error :err
                })
            }
            let fournisseur = new Fournisseur ({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            })
            fournisseur.save().then(fournisseur => {
                res.status(201).json ({
                    message :"user Added Successfully",
                    "uId":Fournisseur.id
                })
            })
            .catch (error =>{
                res.status(500).json({
                    message : "error occured"
                })
            })
        })
    }else{
        res.status(403).json({
            message : "Fournisseur already exist"
        })
    }
}



const login = (req, res) => {
   var email = req.body.email;
    var password = req.body.password;
   
    User.findOne({email:email})
    .then(user => {
        if (user) {
            bycrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    res.json({
                        error: err
                    });
                }
                if(user.ban){
                    return  res.status(401).json({
                        message: 'user banned'
                    });
                    
                }
                if (result) {
                    let token = jwt.sign({ email: user.email }, 'secretValue', { expiresIn: '15m' });
                    let refreshtoken = jwt.sign({ name: user.firstName }, 'refreshtokensecret', { expiresIn: '7d' });
                    // Calculate the expiration date of the token
                    const expirationDate = new Date();
                    expirationDate.setMinutes(expirationDate.getMinutes() + 15); 

                    res.status(200).json({
                        message: 'login successful',
                        token,
                        refreshtoken,
                        tokenExpiration: moment(expirationDate).format('YYYY-MM-DD HH:mm:ss'),
                        Uid:user._id
                    });
                } else {
                    res.status(202).json({
                        message: 'password does not match!'
                    });
                }
            });

        } else {
            res.status(404).json({
                message: 'no user found'
            });
        }
   });
};

const forgetPassword = async(req,res)=>{
    var emaill = req.body.email
    var  random=Math.floor(1000 + Math.random() * 9000);

   await User.findOne({email:emaill})
    .then(async user=>{
        if(user){
           
            let details={
                from:"ajroudyassine06@gmail.com",
                to:emaill,
                subject:"Please reset your password",
                text:`We heard that you lost your application password.\n Sorry about that! But don’t worry!\n You can use the following CODE to reset your password : \n  ${random}`
            
            };
            let  mailTransporter= nodemailer.createTransport({
                service:"gmail",auth:{user:"ajroudyassine06@gmail.com",pass:"lbma ovqq xhtdfihe",}
            }); 
                       mailTransporter.sendMail(details,(err)=>{ if(err){ 
                        console.status(500).log("it has an error",err) ;
                       } 
                        })
                    
                      let  date =new Date( Date.now())
                        date.setMinutes(date.getMinutes()+15)
                        let otp = new OTP({email:emaill,otp:random,expiry_date:date})
                        await OTP.findOne({email:emaill}).then(async oldOTP=>{
                            if(!oldOTP){
                                await otp.save()
                            }else{
                                oldOTP.expiry_date=otp.expiry_date
                                oldOTP.otp=otp.otp
                               await OTP.findByIdAndUpdate(oldOTP.id,oldOTP)
                            }
                            
                        })
                       
                    res.json({
                        message : `send email  suuccessful `,
                        
                    })
        }else{
            res.status(404).json({
                message : 'no email found'
            })
        }
    })
}

const profilgetById =async (req,res)=>{
    var id = req.body.id
     try {
      
       await User.findOne({_id :id},{password:0})
        .then(async user=>{
            if(user){
                        res.status(200).json({
                            message : `get user successful  `,
                            user,
                            
                        })
            }else{
                res.status(404).json({
                    message : 'no user found'
                })
            }
        })
     } catch (error) {
        res.status(404).json({
            message : 'no user found'
        })
     }
   
}

const VerifCode = (req,res,next)=>{
    var codee =req.body.otp
    var emaill = req.body.email

    OTP.findOne({$and:[{otp:codee},{email:emaill}]})
    .then(otp=>{
        if(otp){
            let  date =new Date( Date.now())
            date.setMinutes(date.getMinutes()+0)
           
            if(otp.expiry_date<date){
                return res.status(400).json({
                    message : `expired code`,
                })
            }else{
                res.json({
                        message : `code suuccessful`,
                     
                    })
            }

                        
        }else{
            return  res.status(404).json({
                message : 'no code found '
            })
        }
    })
}

const Resetpassword = async (req,res)=>{
    var passwordd = req.body.password
    var emaill = req.body.email

    bycrypt.hash(passwordd,10,async function(err,hashedPass){
        if(err){
            return  res.status(500).json({
                message : err
            })
        }
        await User.findOne({email:emaill})
        .then(async user=>{
            if(user){
                await User.findByIdAndUpdate(
                    user.id, { 
                    password: hashedPass });
                            res.json({
                            message : `password updated suuccessful`,
                         
                        })
            }else{
                return  res.status(404).json({
                    message : 'no user  found'
                })
            }
        })
    })

    
}


const UpdateProfil =async(req,res)=>{
    var usernamee = req.body.firstName
    var lastnamee = req.body.lastName
    var id = req.body.id
    var emaill = req.body.email
    var phone = req.body.phone
    var address  =req.body.address
    var image = req.body.imageUrl
    var gender = req.body.gender
    var birthDate = req.body.birthDate

    try {
        const userr = await User.findByIdAndUpdate(
            id, { 
               firstName : usernamee ,
               lastName :lastnamee,
               email : emaill ,
               phone:phone,
               address: address,
               imageUrl:image,
               gender : gender,
               birthDate : birthDate,
        },);

                    res.status(200).json({
                    message : `profil updated suuccessful`,
                    userr
                 
                })
    } catch (error) {
        res.status(500).json({
            message : 'profil no update'
        })
    }
}



const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY || '1';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '2';
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '3';

 Pay=async  (req , res)=>{
    // console.log(req.body.first_name);
    const body = {receiverWalletId: "6398f7a008ec811bcda49054",amount : req.body.prix,token : "TND",type : "immediate",
        description: "payment description",
        lifespan: 10,
        feesIncluded: true,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phoneNumber: "27840303",
        email: req.body.email,
        orderId: "1234657",
        webhook: "http://197.134.249.98:9090/payment/webhook",
        silentWebhook: true,
        successUrl: "https://dev.konnect.network/gateway/payment-success",
        failUrl: "https://dev.konnect.network/gateway/payment-failure",
        checkoutForm: true,
        acceptedPaymentMethods: [
            "wallet",
            "bank_card",
            "e-DINAR"
        ]  };

    const response = await fetch('https://api.preprod.konnect.network/api/v2/payments/init-payment', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json','x-api-key': '6398f7a008ec811bcda49053:9v1o3O7FjyG1KbjfVFw0D'}
    });
    const data = await response.json();
    console.log(data);
    res.status(200).json({message : "payment avec succeés",data});

}


// need to check
const refreshtoken = (req,res,next)=>{
    const refreshtoken = req.body.refreshtoken
    const uid = req.body.uid

    jwt.verify(refreshtoken,'refreshtokensecret',function(err,decode){
        if(err){
            res.status(400).json({
                err
            })
        } else{
            let token = jwt.sign ({email : decode.email},'secretValue' , {expiresIn : '15m'})
            let refreshtoken = req.body.refreshtoken
              // Calculate the expiration date of the token
              const expirationDate = new Date();
              expirationDate.setMinutes(expirationDate.getMinutes() + 15); 

            res.status(200).json({
                message : "Token refreshed",
                token : token,
                refreshtoken:refreshtoken,
                tokenExpiration: moment(expirationDate).format('YYYY-MM-DD HH:mm:ss'),
                Uid:uid
            })
        }
    })
}


const updatepassword = async (req,res)=>{
    var oldpasswordd = req.body.oldPassword
    var newpasswordd = req.body.newPassword
    var id = req.body.id
        
        await User.findOne({_id:id})
        .then(async user=>{
            if(user){
              
                bycrypt.compare(oldpasswordd,user.password,async function(err,result){
                    if(err){
                        return  res.status(500).json({
                            message : err
                        })
                    }
                    if(result){
                        bycrypt.hash(newpasswordd,10,async function(err,newhashedPass){
                            if(err){
                                return  res.status(500).json({
                                    message : err
                                })
                            }
                            await User.findOne({_id:id})
                            .then(async user=>{
                                if(user){
                                    await User.findByIdAndUpdate(
                                        user.id, { 
                                        password: newhashedPass });
                                                res.json({
                                                message : `password updated suuccessful`,
                                             
                                            })
                                }else{
                                    return  res.status(404).json({
                                        message : 'no user  found'
                                    })
                                }
                            })})
    
                    }else{
                        return  res.status(202).json({
                            message : 'wrong password'
                        })
                    }
                })
                
                
                
            }else{
                return  res.status(404).json({
                    message : 'no user  found'
                })
            }
      
        })


    }


    
  
    
// const updateRole = async (req, res, next) => {
//     const { id } = req.params;
//     const { newRole } = req.body;
  
//     try {
//       const user = await User.findById(id);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       if (user.role !== 'admin') {
//         return res.status(403).json({ message: 'Authorization needed' });
//       }
  
//       user.role = newRole;
//       await user.save();
//       res.json({ message: 'updated ' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };

  const banUser = async (req, res, next) => {
    var  id  = req.body.id;
    var  banned = req.body.ban;
  
    try {

        const userr = await User.findByIdAndUpdate(
            id, { 
              ban: banned 
        },)

        res.status(200).json({
            message : `user ${banned ? 'banned' : 'unbanned'} `,
        })

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({},{password:0}); // Exclude the password field
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while fetching users' });
    }
  };


  const deleteUser = async (req, res) => {
    var id  = req.body.id;
  
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }else{
                res.status(200).json({ message: 'User deleted successfully' });

      }
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while deleting user' });
    }
  };
  
module.exports = {
    register, login,forgetPassword,Pay,profilgetById,UpdateProfil,Resetpassword,VerifCode,refreshtoken,banUser,getAllUsers,deleteUser,updatepassword,registerFrourni
}