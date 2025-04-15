const mongoose = require("mongoose");

const AdminModel = new mongoose.Schema({
    name:String,
    adminid:String,
    password:String
})

module.exports = mongoose.model("admin", AdminModel);