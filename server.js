const express = require('express')
const mongoose = require('mongoose')
const morgan = require ('morgan')
const bodyParser = require('body-parser')
const app = express()

const AuthRoute = require ('./routes/Auth')
const cartRoute = require("./routes/cart");
const listRoute = require("./routes/WishList")
const prodRoute = require('./routes/Product');

// const ReviewRoute = require ('./routes/Review')
// const PromotionRoutes = require('./routes/Promotion');
// const SalesRoutes = require('./routes/Sales');
// const FournisseurRoutes = require('./routes/FournisseurRoutes');
// const RatingRoutes = require ('./routes/RatingRoutes')
// const RecRoutes = require ('./routes/ReclamationRoutes')


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/uploads/images",express.static('uploads/images'));
app.use("/uploads/product_images",express.static('/uploads/product_images'));
app.use("/uploads/color_images",express.static('/uploads/color_images'));
app.use("/uploads/color_images",express.static('/uploads/color_files'));



// cors for angular integration
// cors for angular integration
const cors = require('cors')
app.use(cors({origin: 'http://localhost:4200'}))
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


const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`server run on port ${PORT}`)
})

app.use('/api', AuthRoute)
app.use("/api", cartRoute);
app.use("/api", listRoute);
app.use('/api', prodRoute);

// app.use('/api', ReviewRoute)
// app.use('/api', PromotionRoutes);
// app.use('/api', SalesRoutes);
// app.use('/api', FournisseurRoutes);

// app.use('/api', RatingRoutes);
// app.use('/api', RecRoutes);