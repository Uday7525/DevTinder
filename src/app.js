const express=require('express')

const app=express();
const port=3000;

app.use("/",(req,res)=>{
    res.send('hi')
});

app.use("/hello",(req,res)=>{
    res.send('Hello from the server')
});
app.use("/test",(req,res)=>{
    res.send('uday')
})

app.listen(port,()=>{
    console.log(`localhost:${port}`)
});