const mongoose=require("mongoose")
const { Schema } = mongoose;
const jobSchema=new mongoose.Schema({

    title: {
        type: String,
        required: "true"
    },

    description: {
        type: String,
        required: "true"
    },

    salary: {
        type: Number
    },

    location: {
        type: String,
        required: "true"
    },

    type: {
        type: String,
    },

    recId: {
        type: Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: "true"
    },

})
const Job=mongoose.model("Job",jobSchema)
module.exports=Job