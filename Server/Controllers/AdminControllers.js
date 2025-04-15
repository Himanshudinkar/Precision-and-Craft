const AdminModel = require("../Model/Adminmodel")
const ProductModel = require("../Model/ProductModel")
const OrderModel = require("../Model/orderModel")
const admin = async (req,res) =>{
    const { adminid,password} = (req.body)


   try {
    const Admin = await AdminModel.findOne({adminid:adminid});

    if(!Admin)
    {
        res.status(404).send({msg:"Invalid Admin Id"});
    }
    if(Admin.password != password)
    {
        res.status(404).send({msg:"Invalid Password"});
    }

    res.status(200).send({msg2:"Succesfully Login", Admin:Admin})

   } 
   
   
   catch (error) {
    
    res.status(400).send({msg:"Server Not Respond"})
   }
   
}

const addproduct = async(req,res) =>{
    const  {name, description,brand,categories,price} = req.body;
    const imageUrls = req.files.map(file=>file.path);

    try {

    const Data = await ProductModel.create({

    name:name,
    description:description, 
    brand:brand,
    category:categories,
    price:price,
    dfaultImage:imageUrls[0],
    images:imageUrls

    })

    res.status(201).send({msg:"Add Product Succsesfully"})
        
    } catch (error) {
        console.log(error)
    }
   
}


const displaydata = async (req,res) =>{
    try {
        const Data = await ProductModel.find();
        res.status(201).send(Data)
    } catch (error) {
        console.log(error)
    }
}


const getcustomerorder = async(req,res) =>{

    const Order= await OrderModel.find();
    res.status(200).send(Order);
}

module.exports = {
    admin,
    addproduct,
    displaydata,
    getcustomerorder
}