const mongoose=require("mongoose")
const candidateSchema=new mongoose.Schema({
    
    name: {
        type:String,
        required:"true"
    },
    
    email: {
        type:String,
        required:"true"
    },

    password: {
        type:String,
        required:"true"
    },

    shortlistedJobs: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Job" 
    }]
    
})
const Candidate=mongoose.model("Candidate",candidateSchema)
module.exports=Candidate