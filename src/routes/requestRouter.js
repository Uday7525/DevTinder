
const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../Middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require('../models/user');


requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try{
       const fromUserId = req.user._id;
       const toUserId = req.params.toUserId;
       const status = req.params.status;

       const allowedStatuses = ["ignored", "interested"];
       if (!allowedStatuses.includes(status)) {
           return res.status(400).json({ message: `${status} is not supported` });
       }

       const toUser=User.findById(toUserId);
       console.log(toUser.firstName);
       if (!toUser) {
           return res.status(404).json({ message: 'user not found' });
       }
       const existingRequest = await ConnectionRequestModel.findOne({ $or:[
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
       ] });
        if (existingRequest) {
            return res.status(400).json({ message: 'Connection request already exists between these users' });
        }


       const newRequest = new ConnectionRequestModel({
           fromUserId,
           toUserId,
           status,
       });
    
       await newRequest.save();
       res.status(200).json({ message: req.user.firstName +" is "+status +" in "+toUser.firstName, request: newRequest });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = requestRouter;