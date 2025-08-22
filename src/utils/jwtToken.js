const jwt = require('jsonwebtoken')

module.exports={
    tokenVerifyRecruiter:(req,res,next)=>{
        const authHeader=req.headers.authorization
        if(!authHeader){
            return res.status(401).json({
                error:"Unauthorized"
            })
        }
        const token=authHeader.split(" ")[1]

        jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
            if(err){
                return res.status(403).json({ 
                    error:"Invalid token "
                })
            }
            req.recruiter=decoded

            next()
        }
        )
    }, 

    tokenVerifyCandidate:(req,res,next)=>{
        const authHeader=req.headers.authorization
        if(!authHeader){
            return res.status(401).json({
                error:"Unauthorized"
            })
        }
        const token=authHeader.split(" ")[1]

        jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
            if(err){
                return res.status(403).json({ 
                    error:"Invalid token "
                })
            }
            req.candidate=decoded

            next()
        }
        )
    },

    tokenVerifyAdmin:(req,res,next)=>{
        const authHeader=req.headers.authorization
        if(!authHeader){
            return res.status(401).json({
                error:"Unauthorized"
            })
        }
        const token=authHeader.split(" ")[1]

        jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
            if(err){
                return res.status(403).json({ 
                    error:"Invalid token "
                })
            }
            req.admin=decoded

            next()
        }
        )
    }
}