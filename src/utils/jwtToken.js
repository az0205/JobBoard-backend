const jwt = require('jsonwebtoken')

    const tokenVerifyRecruiter = (req,res,next)=>{
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
    }

    const tokenVerifyCandidate = (req,res,next)=>{
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
    }

    const tokenVerifyAdmin = (req,res,next)=>{
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

    const tokenVerifyRecruiterOrAdmin = (req, res, next) => {
        tokenVerifyRecruiter(req, res, (err) => {
            if (!err) return next(); // recruiter verified
        tokenVerifyAdmin(req, res, (err2) => {
            if (!err2) return next(); // admin verified
            return res.status(403).json({ message: "Access denied" });
            });
        });
    }

    
module.exports={
    tokenVerifyAdmin,
    tokenVerifyCandidate,
    tokenVerifyRecruiter,
    tokenVerifyRecruiterOrAdmin
}