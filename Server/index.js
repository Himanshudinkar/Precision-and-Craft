const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require("path")
const EcommerceRoute = require("./Route/EcomerceRoute")
const paymentRoute = require("./Route/payment")


require("dotenv").config();
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

mongoose.connect(process.env.DBCON)
.then(()=>{console.log("connected database")})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use("/ecommerce",EcommerceRoute);
app.use("/api/payment/",paymentRoute);


const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log("server on")
})