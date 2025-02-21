let express = require("express");
const { ProuductModel } = require("../model/productModel");
const catchAsyncError = require("../middelware/catchAsyncError");
const Errorhadler = require("../utils/errorhadler");
const {UserModel} = require("../model/userModel");
const mongoose = require("mongoose");
const productRouter = express.Router();


app.post("/create",catchAsyncErrors(async(req,res,next)=>{
    
  }))
