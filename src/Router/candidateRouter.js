const express = require('express')
const router=express.Router()
const candidate=require("../Controller/candidateController.js")
const tryCatch=require('../Middleware/tryCatch')
const { tokenVerifyAdmin } = require('../utils/jwtToken.js')


router.route("/register")
.post(tryCatch(candidate.candidateRegister))

router.route("/login")
.post(tryCatch(candidate.candidateLogin))

router.route("/")
.get(tryCatch(candidate.getAllCands))

router.route("/:id")
.delete(tokenVerifyAdmin, tryCatch(candidate.deleteCandidate))

module.exports=router;