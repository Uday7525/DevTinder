const express=require('express')
const connectDB=require('./config/database');
const app=express();
const User=require('./models/user');


app.use(express.json());

app.post("/signup",async(req,res)=>{
    //creating a new instance of User model
    const user=new User(req.body);
    try {
        await user.save()
        res.send("User signed up successfully");
    }catch(err){
        res.status(400).send("Error signing up user");
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





connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log(`server is running on port 3000`);
});
}).catch((err) => {
    console.error("Database connection failed", err);
});

