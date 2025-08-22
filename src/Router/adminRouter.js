const express = require('express')
const router=express.Router()
const admin=require("../Controller/adminController.js")
const tryCatch=require('../Middleware/tryCatch')


router.route("/register")
.post(tryCatch(admin.adminRegister))

router.route("/login")
.post(tryCatch(admin.adminLogin))

module.exports=router;