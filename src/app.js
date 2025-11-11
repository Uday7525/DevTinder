const express=require('express')
const connectDB=require('./config/database');
const app=express();
const User=require('./models/user');
const {validateSignupData}=require('./utils/validations');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const { userAuth } = require('./Middlewares/auth');

app.use(express.json());
app.use(cookieParser());

app.post("/signup",async(req,res)=>{
    //creating a new instance of User model
    try {
        validateSignupData(req);
        const {firstName,lastName,emailId,password}=req.body;
        
        const passwordHash=await bcrypt.hash(password,10)
    
        const user=new User(
            {firstName,lastName,emailId,password:passwordHash}
        );
    
        await user.save()
        res.send("User signed up successfully");
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});

app.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body; 
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }   
        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){
            const token= await user.getJWT();

            res.cookie("token",token,{expires:new Date(Date.now() + 8 * 3600000)});
            res.send("User logged in successfully");
        }  
        else{
            throw new Error("Invalid credentials");
        }

    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});

app.get("/profile",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user;
    console.log("Connection request endpoint hit");

    res.send(user.firstName+ " sent a connection request");
});




connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log(`server is running on port 3000`);
});
}).catch((err) => {
    console.error("Database connection failed", err);
});

