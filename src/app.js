const express=require('express')
const connectDB=require('./config/database');
const app=express();
const User=require('./models/user');
const {validateSignupData}=require('./utils/validations');
const bcrypt=require('bcrypt');


app.use(express.json());

app.post("/signup",async(req,res)=>{
    //creating a new instance of User model
    try {
        validateSignupData(req);
        const {firstName,lastName,emailId,password}=req.body;
        
        const passwordHash=await bcrypt.hash(password,10)
        console.log(passwordHash);
    
        const user=new User(
            {firstName,lastName,emailId,password:passwordHash}
        );
    
        await user.save()
        res.send("User signed up successfully");
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});

app.post("/login",async(req,res)=>{
    
      
    try{
        const {emailId,password}=req.body; 
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials    ");
        }   
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            res.send("User logged in successfully");
        }  
        else{
            throw new Error("Invalid credentials");
        }

    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
});

//Get user by emailId
app.get("/user", async (req,res)=>{
    const userEmail=req.body.emailId;
    
    try{
        const user=await User.findOne({emailId:userEmail}) 
        if(!user){
            res.status(404).send("User not found");
        }else{
            res.send(user); 
        }
          
    }catch(err){
        res.status(400).send("Error fetching user data");
    }

})
//Feed API to get all users

app.get("/feed", async (req,res)=>{
    const userEmail=req.body.emailId;
    
    try{
        const user=await User.find() 
        if(!user){
            res.status(404).send("User not found");
        }else{
            res.send(user); 
        }
          
    }catch(err){
        res.status(400).send("Error fetching user data");
    }

})
//Delete user by userId
app.delete("/user", async (req,res)=>{
    const userId=req.body.userId;
    try{
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Error deleting user");
    }   
})
//Update user by userId
app.patch("/user/:userId", async (req,res)=>{
    
    const userId=req.params.userId;
    const data=req.body;
     
    try{
        const allowedUpdates=['imageUrl','bio','skills','gender','age'];
        const requestedUpdates=Object.keys(data);
        const isValidOperation=requestedUpdates.every((update)=>allowedUpdates.includes(update));
        if(!isValidOperation){
            return res.status(400).send("Invalid updates!");
        }
        if(data.skills.length>5){
            throw new Error("Skills cannot be more than 5");
        }
        const user=await User.findByIdAndUpdate({ _id: userId},data,{
            returnDocument:'after',
            runValidators:true,
        });
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send("Error updating user");
    }  
})

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log(`server is running on port 3000`);
});
}).catch((err) => {
    console.error("Database connection failed", err);
});

