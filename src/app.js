const express=require('express')
const connectDB=require('./config/database');
const app=express();
const cookieParser=require('cookie-parser');
const cors=require('cors');

app.use(cors(
    {origin:"http://localhost:5173",credentials:true},
))
app.use(express.json());
app.use(cookieParser());

const authRouter=require('./routes/authRouter');
const profileRouter=require('./routes/profileRouter');
const requestRouter=require('./routes/requestRouter');  
const userRouter = require('./routes/userRouter');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter)

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log(`server is running on port 3000`);
});
}).catch((err) => {
    console.error("Database connection failed", err);
});

