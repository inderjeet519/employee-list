const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const path = require('path');
const employeeRoutes = require('./routes/employeeRoute');
const auth = require('./routes/authentication');
require('dotenv').config();
const app=express();

app.use(cors());
app.use(express.json());
express.urlencoded()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth',auth);
console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("connected")
}).catch((err)=>{
  console.log(err);
});

app.use('/employees', employeeRoutes);
app.listen(process.env.PORT,()=>{
    console.log("app running");
})