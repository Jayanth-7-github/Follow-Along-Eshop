const express = require("express");
const cors=require ("cors")
const app = express();
app.use(express.json());
const ErrorMiddleware = require("./middelware/error")
const path = require('path');



app.use(cors({
  origin: "*",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]

})
)

const {userRoute} = require("./controllers/userRoute")
const {productRoute}=require("./controllers/productRoutes")

app.get("/test", async (req, res) => {
  res.send("hello.....");
});


app.use('/profile-photo', express.static(path.join(__dirname, 'uploads')));
app.use('/products-photo', express.static(path.join(__dirname, 'uploadproducts')));

app.use("/user",userRoute)
app.use("/product",productRoute)



app.use(ErrorMiddleware)

module.exports = { app };
