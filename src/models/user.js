
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
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

userSchema.index({firstName:1});

userSchema.methods.getJWT=async function(){
    const user=this;
    const token= await Jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"7d"});
    
    return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}
const User = mongoose.model('User', userSchema);
module.exports = User;