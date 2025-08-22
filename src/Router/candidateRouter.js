const express = require('express')
const router=express.Router()
const candidate=require("../Controller/candidateController.js")
const tryCatch=require('../Middleware/tryCatch')


router.route("/register")
.post(tryCatch(candidate.candidateRegister))

router.route("/login")
.post(tryCatch(candidate.candidateLogin))

module.exports=router;