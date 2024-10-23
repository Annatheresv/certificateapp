const Express = require("express")
const Mongoose = require("mongoose")
const Bcrypt = require("bcrypt")
const Cors = require("cors")
const jwt = require("jsonwebtoken")
const userModel =require("./models/users")
let app= Express()
app.use(Express.json())
app.use(Cors())
Mongoose.connect("mongodb+srv://annatheresv:annatheresv@cluster0.qx162.mongodb.net/certificateDb?retryWrites=true&w=majority&appName=Cluster0")
app.post("/signup",async(req,res)=>{
    let input=req.body
    let hashedPassword=Bcrypt.hashSync(req.body.password,10)
    req.body.password=hashedPassword
    userModel.find({email:input.email}).then((items)=>{
    if(items.length>0){
     res.json({"status":"email Id already exists"})
    }
     else
    {
    let result=new userModel(input)
    result.save()
    res.json({"status":"success"})
   }}
).catch(
      (error) =>{} 
    )
        
})
app.listen(8080, () => {
    console.log("Server started");
})