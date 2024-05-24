const express = require('express')
const mongoose = require('mongoose')
const morgan = require ('morgan')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

const AuthRoute = require ('./routes/Auth')
const cartRoute = require("./routes/cart");
const listRoute = require("./routes/WishList")
const prodRoute = require('./routes/Product');
const RatingRoutes = require ('./routes/Rating')
const CategoryRoutes = require ('./routes/Category')
const SubCategoryRoutes = require ('./routes/SubCategory')
const SupplierRoutes = require('./routes/SupplierRoutes');
const PromotionRoutes = require('./routes/Promotion');
const ReviewRoute = require ('./routes/Review')
const ServiceCategory = require ('./routes/ServiceCategory')
 const SalesRoutes = require('./routes/Sales');
 const RecRoutes = require ('./routes/ReclamationRoutes')
 const Service = require ('./routes/Service')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors({origin: '*'}))
app.use("/uploads/images",express.static('uploads/images'));
app.use("/uploads/product_images",express.static('uploads/product_images'));
app.use("/uploads/color_images",express.static('uploads/color_images'));
app.use("/uploads/color_files", express.static('uploads/color_files'));
app.use("/uploads/suppliers",express.static('uploads/suppliers'));
app.use("/uploads/reviews",express.static('uploads/reviews'));
app.use("/uploads/category_image",express.static('uploads/category_image'));
app.use("/uploads/service_category_image",express.static('uploads/service_category_image'));
app.use("/uploads/subcategory_image",express.static('uploads/subcategory_image'));
app.use("/uploads/service_image",express.static('uploads/service_image'));




// cors for angular integration
// cors for angular integration

//::::::::::
mongoose
  .connect("mongodb://127.0.0.1:27017/V-Commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT, ()=>{
    console.log(`server run on port ${process.env.PORT}`)
})

app.use('/api', AuthRoute)
app.use('/api', cartRoute);
app.use('/api', listRoute);
app.use('/api', prodRoute);
app.use('/api', RatingRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', SubCategoryRoutes);
app.use('/api', SupplierRoutes);
app.use('/api', PromotionRoutes);
app.use('/api', ReviewRoute)
app.use('/api', SalesRoutes);
app.use('/api', ServiceCategory);
app.use('/api', RecRoutes);
app.use('/api', Service);