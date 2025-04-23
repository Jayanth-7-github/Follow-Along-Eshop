const express = require("express");
const cors=require ("cors")
const app = express();
app.use(express.json());
const ErrorMiddleware = require("./middelware/error")
const path = require('path');
const cookieparser=require("cookie-parser")

app.use(cookieparser())


app.use(cors({
  origin: "http://localhost:5173" ,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]

})
)

const {userRoute} = require("./controllers/userRoute")
const {productRouter}=require("./controllers/productRoutes")
const {orderRouter} =require("./controllers/orderRoute")

app.get("/test", async (req, res) => {
  res.send("hello user, welcome to ecommerce");
});


app.use('/profile-photo', express.static(path.join(__dirname, 'upload')));
app.use('/products-photo', express.static(path.join(__dirname, 'uploadproducts')));

app.use("/user",userRoute)
app.use("/product",productRouter)
app.use("/order",orderRouter)



app.use(ErrorMiddleware)

module.exports = { app };
