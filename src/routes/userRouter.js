
const express=require('express');
const userRouter=express.Router();
const { userAuth } = require('../Middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require('../models/user');

const POPULATE_DATA=['firstName', 'lastName','imageUrl','bio','skills','age','gender'];

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
    try{
        const loggedInUserId = req.user;
        
        const connectionRequests= await ConnectionRequestModel.find({toUserId: loggedInUserId._id, status:"interested"})
        .populate('fromUserId', POPULATE_DATA);
        res.status(200).json({requests: connectionRequests });
        

    } catch (error) {
        res.status(400).json({ message: error.message });
     }
    });

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedInUserId = req.user;
        const connections=await ConnectionRequestModel.find({$or:[
            {fromUserId: loggedInUserId._id, status:"accepted"},
            {toUserId: loggedInUserId._id, status:"accepted"}
        ]}).populate('fromUserId toUserId', POPULATE_DATA).populate('toUserId', POPULATE_DATA);  
        
        const data=connections.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUserId._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId
        })
        res.status(200).json({message:"Data fetched successfully", data});


    } catch (error) {  
        res.status(400).json({ message: error.message });
     }
    });

userRouter.get("/user/feed", userAuth,async (req, res) => {
    try{
        const loggedInUserId = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
        const connectionRequests=await ConnectionRequestModel.find({$or:[
            {fromUserId: loggedInUserId._id, status:"accepted"},
            {toUserId: loggedInUserId._id, status:"accepted"}
        ]}).select('fromUserId toUserId');
        
        const hideUserFromFeed= new Set();
        connectionRequests.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString())
            hideUserFromFeed.add(req.toUserId.toString())
        })

        const users= await User.find({
            $and:[
                {_id:{$nin: Array.from(hideUserFromFeed)}},
                {_id:{$ne: loggedInUserId._id}}
            ]
        }).select(POPULATE_DATA).skip(skip).limit(limit);
        res.status(200).json({ data: users});
    } catch (error) {
        res.status(400).json({ message: error.message });
     }  
    });

module.exports=userRouter;