
const mongoose=require('mongoose');

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is not supported`
        },
    }
},{
    timestamps:true
});

connectionRequestSchema.pre('save',function(next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.toString()===connectionRequest.toUserId.toString()){
        return next(new Error('fromUserId and toUserId cannot be the same'));
    }
    next();
});

const ConnectionRequestModel=mongoose.model('ConnectionRequest',connectionRequestSchema);

module.exports=ConnectionRequestModel;