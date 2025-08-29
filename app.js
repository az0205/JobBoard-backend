const express=require('express');
const mongoose=require("mongoose");
const cors = require("cors");
const app=express();
const path = require("path");
const port = 3200;
app.use(express.json());
require('dotenv').config();

app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
    .then(() => console.log("mongodb  connected"))
    .catch((e) => console.log("error found", e))
app.listen(port,()=>{
  console.log(`Server is running on ${port}`)
})

const authRec=require('./src/Router/recruiterRouter')
app.use('/api/recruiter', authRec)

const authJob=require('./src/Router/jobRouter')
app.use('/api', authJob)

const authApp=require('./src/Router/applicationRouter')
app.use('/api', authApp)

const authCand=require('./src/Router/candidateRouter')
app.use('/api/candidate', authCand)

const authAdmin=require('./src/Router/adminRouter')
app.use('/api/admin', authAdmin)