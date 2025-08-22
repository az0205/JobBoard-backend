const express = require('express')
const router=express.Router()
const recruiter=require("../Controller/recruiterController")
const tryCatch=require('../Middleware/tryCatch')
const { tokenVerifyAdmin } = require('../utils/jwtToken')

router.route("/")
.get(tokenVerifyAdmin, tryCatch(recruiter.getAll))

router.route("/:id")
.delete(tokenVerifyAdmin, tryCatch(recruiter.deleteRecruiter))

router.route("/register")
.post(tryCatch(recruiter.recruiterRegister))

router.route("/login")
.post(tryCatch(recruiter.recruiterLogin))

module.exports=router;