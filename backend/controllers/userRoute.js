let express = require("express");
const { UserModel } = require("../model/userModel");
const catchAsyncError = require("../middelware/catchAsyncError");
const Errorhadler = require("../utils/errorhadler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail");
let userRoute = express.Router();
const {upload }= require("../middelware/multer");
require("dotenv").config()

const port=process.env.PORT









// userRoute.post("/login", async (req, res) => {
//   console.log(req.body);

//   try {
//     const { email, password } = req.body;

//     if (email && password) {
//       let nweUser = new UserModel({ email, password });
//       await nweUser.save();
//       res.status(200).send({ message: "login is success" });
//     } else {
//       res.status(400).send({ message: "🤞invalid" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "internal server error" });
//   }
// });









userRoute.post(
  "/signup",
  catchAsyncError(async (req, res, next) => {
    console.log(req.body);

    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      next(new Errorhadler("name,email and passwordword required", 400));
    }
    let user = await UserModel.findOne({ email: email });
    if (user) {
      next(new Errorhadler("user is already exist", 400));
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        next(new Errorhadler("server error", 500));
      }
      let newUser = new UserModel({ name, email, password: hash });

      let token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 60 * 5,
      });
      let PORT = process.env.PORT;
      let activation_url = `http://localhost:${PORT}/user/activation/${token}`;
      try {
        await sendMail({
          email: newUser.email,
          subject: "Activate your account",
          message: `Hello ${newUser.name},please click the link to activate your account:${activation_url}`,
        });
        await newUser.save();
        res
          .status(200)
          .json({ status: true, message: "registration sucessfull" });
      } catch (error) {
        next(new Errorhadler("internal server error", 500));
        console.log(error);
      }
    });
  })
);







userRoute.get(
  "/activation/:token",
  catchAsyncError(async (req, res, next) => {
    let token = req.params.token;
    if (!token) {
      next(new Errorhadler("token not found", 404));
    }
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        next(new Errorhadler("token is not valid", 400));
      }

      let id = decoded.id;
      await UserModel.findByIdAndUpdate(id, { isActivated: true });

      res.redirect(`http://localhost:5173/login`)
    
    });
  })
);







userRoute.post(
  "/upload",
  upload.single("photo"),
  catchAsyncError(async (req, res, next) => {
    if (!req.file) {
      next(new Errorhadler("File not found", 400));
    }

    res.status(200).json("Uploaded");
  })
);





userRoute.post(
  "/login",
  catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new Errorhadler("email and passwordword are reqires", 400));
    }
    
    let user =await UserModel.findOne({ email });
    if (!user) {
      next(new Errorhadler("pls signup", 400));
    }
   
    if(!user.isActivated){
      next(new Errorhadler("pls signup", 400));
    }
    let isMatching = await bcrypt.compare(password, user.password);
  
    
    if (!isMatching) {
      next(new Errorhadler("passwordword is incorrect", 400));
    }
     

    let token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 5 * 60 * 60 * 60 * 1000,
    });
    res.cookie("accesstoken", token, {
      httpOnly: true,
      maxAge: 5 * 60 * 60 * 60 * 1000, 
    });
    
    res.status(200).json({status:true,message:"login successful",user:{name:user.name,id:user._id}})
  })
);



module.exports = { userRoute };
