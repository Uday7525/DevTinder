
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
        maxLength:30
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        lowercase:true, 
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            const allowedGenders=["male","female","other"];
            if(!allowedGenders.includes(value.toLowerCase())){
                throw new Error("Invalid gender value");
            }   
        }
    },
    imageUrl:{
        type:String,
        default:"https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"
    },
    bio:{
        type:String,
        default:"This is a default bio"
    },
    skills:{
        type:[String],
    }      
},{timestamps:true}); 

const User = mongoose.model('User', userSchema);
module.exports = User;