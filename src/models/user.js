
const mongoose = require('mongoose');
const validator = require('validator');
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
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid emailId");
            }   
        }

    },
    password:{
        type:String,
        required:true,
        validator(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough");
            }   
    },
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
        default:"https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL");
            }   
        }
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