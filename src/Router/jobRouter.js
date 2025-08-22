const express = require('express')
const router=express.Router()
const {tokenVerifyRecruiter}=require('../utils/jwtToken')
const job=require("../Controller/jobController")
const tryCatch=require('../Middleware/tryCatch')

router.route("/jobs")
.post(tryCatch(job.createJob))
.get(tokenVerifyRecruiter, tryCatch(job.getAllJobs))

router.route("/recruiter/jobs")
.get(tokenVerifyRecruiter, tryCatch(job.getAllRecJobs))

router.route("/jobs/:id")
.get(tokenVerifyRecruiter, tryCatch(job.getJob))
.put(tokenVerifyRecruiter, tryCatch(job.updateJob))
.delete(tokenVerifyRecruiter, tryCatch(job.deleteJob))

module.exports=router;