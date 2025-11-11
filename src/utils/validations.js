
const validator = require('validator');

const validateSignupData = (req) => {
    const { firstName,lastName,emailId,password } = req.body;
    if(!firstName || !lastName) {
        throw new Error("First name and last name are required");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email format");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }
}

const validateProfileData = (req) => {
try{
   const allowedUpdates = ['firstName', 'lastName', 'emailId', 'age', 'bio', 'skills', 'imageUrl',"gender"];
   const isEditAllowed=Object.keys(req.body).every((key)=>allowedUpdates.includes(key))
   return isEditAllowed;
}catch(err){
    throw new Error("Validation error: " + err.message);
}
}
module.exports = {
    validateSignupData,
    validateProfileData
};