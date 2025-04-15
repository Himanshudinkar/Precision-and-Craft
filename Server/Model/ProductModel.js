const mongoose= require("mongoose")

const ProductModel= new mongoose.Schema({
    name:String,
    description:String, 
    brand:String,
    category:String,
    price:Number,
    dfaultImage:String,
    images:[String]

})

module.exports = mongoose.model("product", ProductModel);