
const express = require('express');
const authRouter = express.Router();

const { validateSignupData } = require('../utils/validations');
const User = require('../models/user');
const bcrypt = require('bcrypt');



authRouter.post("/signup",async(req,res)=>{
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

authRouter.post("/login",async(req,res)=>{
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

authRouter.post("/logout", async (req,res)=>{
    res.clearCookie("token");
    res.send("User logged out successfully");
});

module.exports = authRouter;