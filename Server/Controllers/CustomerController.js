const CustmoerModel= require("../Model/CustomerModel")
const ProductModel = require("../Model/ProductModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const Registration=async(req, res)=>{
 const    {name, address, city, contact,  email, password}=req.body;
 const saltRounds = 10; // 10 rounds is the default
 const salt = await bcrypt.genSalt(saltRounds);
 const hashedPassword = await bcrypt.hash(password, salt);         

 try {
     const Customer= await CustmoerModel.create({
        name:name,
    address:address, 
    city:city,
    contact:contact,
    email:email,
    password:hashedPassword
     })

     res.status(201).send({msg:"You are Succesfully Regtered!"});
 } catch (error) {
     console.log(error);
 }
}

const customerlogin = async (req,res) =>{
    const { email,password} = req.body;

    try {
        const customer = await CustmoerModel.findOne({email:email})

        if(!customer)
        {
            res.status(401).send({msg:"Please Enter Valid Email"})
        }

        const passwordMatch = await bcrypt.compare(password, customer.password);

        if(!passwordMatch)
        {
            res.status(401).send({msg:"Please Enter Valid Password"})
        }


        const token = jwt.sign({id:customer._id}, process.env.JWT_SECRET, {expiresIn:"1d"})

        res.status(201).send({msg1:"Succesfully Login",token:token})

    } catch (error) {
        res.status(500).send({msg:"Database not Respond"})
    }

}


const userauthenticate = async (req,res) =>{


     const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
     try {
        const decodedToken = jwt.verify(token,  process.env.JWT_SECRET);
        console.log(decodedToken.id);
      const Customer = await CustmoerModel.findById(decodedToken.id).select("-password");

      console.log(Customer);

      res.status(200).send(Customer);
     
    } catch (error) {
         console.log(error);
     }

}


const getdata = async (req,res) =>{
     const { userid} = req.query;
    try {
          const Customer = await CustmoerModel.findById(userid);
          res.status(200).send(Customer);
    } catch (error) {
        console.log(error);
    }
}

const shoppingdata = async(req,res) =>{
    const { id } = req.body;

    try {
        const Data = await ProductModel.findById(id);
        res.status(201).send(Data);
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    Registration,
    customerlogin,
    userauthenticate,
    getdata,
    shoppingdata
}