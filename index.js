const express=require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://BP:BP@cluster0.uzohjbt.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        console.log("connected to db");
    })
    .catch((e)=>{
        console.log(e);
    })
}
connectDB();


app.post("/",async(req,res)=>{
    const {rfid}=req.body;
    console.log(rfid);
    try{
        const student=await Student.find({rfid:rfid});
        console.log(student);
        if(student.length>0){
            const studen=await Student.findByIdAndUpdate(student[0]._id,{number:student[0].number+1});
            res.send({message:"Success",student:studen});
        }else{
            await Student.create({rfid:rfid});
            res.send("Success");
        }
    }catch(e){
        console.log(e);
    }
    
})

app.get("/",async(req,res)=>{

    const students=await Student.find({});
    if(students.length>0){
        res.json(students);
    }else{
        res.json({message:"No Results"})
    }
    
})

app.post("/name",async(req,res)=>{
    const {rfid,name}=req.body;
    const student=await Student.find({rfid:rfid});
    if(student.length>0){
        await Student.findByIdAndUpdate(student[0]._id,{name:name});
        res.send("Success");
    }else{
        res.send("RFID NOT FOUND");
    }
})



app.listen(5000,(req,res)=>{
    console.log("listening");
})