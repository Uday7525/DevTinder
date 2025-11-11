
const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../Middlewares/auth');
const { validateProfileData} = require('../utils/validations');

profileRouter.get("/profile",userAuth,async(req,res)=>{
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
module.exports = profileRouter;