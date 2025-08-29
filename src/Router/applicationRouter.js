const express = require('express')
const router=express.Router()
const {tokenVerifyCandidate, tokenVerifyRecruiter}=require('../utils/jwtToken')
const app=require("../Controller/applicationController.js")
const tryCatch=require('../Middleware/tryCatch')
const upload = require("../Middleware/multer");

router.route("/application")
.post(tokenVerifyCandidate, upload.single("resume"), tryCatch(app.createApplication))
.get(tokenVerifyRecruiter, tryCatch(app.getRecApps))

router.route("/candidate/application")
.get(tokenVerifyCandidate, tryCatch(app.getCandApps))


router.route("/application/:id")
.put(tokenVerifyRecruiter, tryCatch(app.updateApp));

module.exports=router;