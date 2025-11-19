
const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../Middlewares/auth');
const { validateProfileData} = require('../utils/validations');
const bcrypt = require('bcrypt');
const User = require('../models/user');

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
       if(!validateProfileData(req)){  
        throw new Error("Invalid updates!"); 
       }
        const loggedInUser=req.user;
        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key]=req.body[key];
        });
        await loggedInUser.save();
        res.json({message:`${loggedInUser.firstName+" "+loggedInUser.lastName}, your Profile updated successfully`,data:loggedInUser});
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});

profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try{
        const userId=req.user._id;
        const{oldPassword,newPassword}=req.body;
        if(!oldPassword || !newPassword){
            throw new Error("Both old and new passwords are required");
        }
        const user=await User.findById(userId); 
        if(!user){
            throw new Error("User not found");
        }
        const isMatch=await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            throw new Error("Old password is incorrect");
        }  
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        await user.save();
        res.json({message:"Password updated successfully"});
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});
module.exports = profileRouter;