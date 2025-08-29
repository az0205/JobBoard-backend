const mongoose=require("mongoose")
const { Schema } = mongoose;
const applicationSchema=new mongoose.Schema({

  candidate: {
    type: Schema.Types.ObjectId,
    ref: 'Candidate',
    required: "true"
  },

  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: "true"
  },

  recruiter: {
    type: Schema.Types.ObjectId,
    ref: 'Recruiter',
    required: "true"
  },

  skills: { 
  type: String,
  required:"true"
  },

  resume: {
    type: String,
    required: "true"
  },

  status: {
    type: String,
    default: "Pending"
  },

  })
  const Application=mongoose.model("Application",applicationSchema)
  module.exports=Application