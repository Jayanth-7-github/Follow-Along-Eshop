
const { connect, connection } = require("mongoose")
const{app} = require("./app")
require("dotenv").config()

const port=process.env.PORT

const Connect=require("./db/connection")

app.get("/test",async(req,res)=>{

    res.send("hello.....")
})

app.listen(port,async()=>{
    try{
        await Connect
        console.log(`app is running on http://localhost:${port}`)
    }
    catch(err){
        console.log(err)
    }
    
 })