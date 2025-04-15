const express = require("express");
const route = express.Router();
const AdminControllers = require("../Controllers/AdminControllers")
const CustomerController = require("../Controllers/CustomerController")
const upload = require("../Middleware/Multer")

route.post("/admin",AdminControllers.admin)
route.post("/addproduct",upload.array('image', 6),AdminControllers.addproduct)
route.get("/displaydata",AdminControllers.displaydata)
route.post("/registration",CustomerController.Registration)
route.post("/customerlogin",CustomerController.customerlogin)
route.get("/userauthenticate",CustomerController.userauthenticate)
route.get("/getdata",CustomerController.getdata)
route.post("/shoppingdata",CustomerController.shoppingdata)
route.get("/getcustomerorder",AdminControllers.getcustomerorder)



module.exports = route