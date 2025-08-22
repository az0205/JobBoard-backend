const express = require('express')
const router=express.Router()
const {tokenVerifyCandidate}=require('../utils/jwtToken')
const app=require("../Controller/applicationController.js")
const tryCatch=require('../Middleware/tryCatch')
const upload = require("../Middleware/multer");

router.route("/application")
.post(tokenVerifyCandidate, upload.single("resume"), tryCatch(app.createApplication));

module.exports=router;