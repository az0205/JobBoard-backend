const Job = require("../Model/jobModel");
const Recruiter = require("../Model/recruiterModel.js");

//----Adding -----
const createJob = async (req, res) => {
  const { title,
        description,
        salary,
        location,
        type } = req.body;
  const recId = req.recruiter.recId;

  const recruiter = await Recruiter.findById(recId);
    if (!recruiter) {
      return res.status(400).json({
        message: "No recruiter found",
        status: "failure",
      });
    }

    const newJob = new Job({
        title,
        description,
        salary,
        location,
        type,
        recId
    });

  const jobData = await newJob.save();

  return res.status(201).json({
    status: "success",
    message: "Task saved successfully",
    data: jobData,
  });
};

//----Updating Job-----
const updateJob = async (req, res) => {
  const jobid = req.params.id;
  const recId = req.recruiter.recId;
  const editedJob = req.body;

  const job = await Job.findById(jobid);

  if (job.recId.toString() !== recId) {
    return res.status(403).json({
      message: "You are not authorized to update this job.",
      status: "failure",
      error: true,
    });
  }

  job = await Job.findByIdAndUpdate(jobid, editedJob, { new: true });

  if (job) {
    const jobData = {
        _id: job._id,
        title: job.title,
        description: job.description,
        salary: job.salary,
        location: job.location,
        type: job.type,
        recId: job.recId,
    };

    res.status(200).json({
      status: "success",
      message: "Job data updated successfully",
      data: jobData,
    });
  } else {
    res.status(400).json({
      message: "Job not found",
      status: "failure",
    });
  }
};

//--------Deleting Job----
const deleteJob = async (req, res) => {

    const jobId = req.params.id;
    const recId = req.recruiter.recId;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        status: "failure",
        error: true,
      });
    }

    if (job.recId.toString() !== recId) {
      return res.status(403).json({
        message: "You are not authorized to delete this job.",
        status: "failure",
        error: true,
      });
    }

    const deletedJob = await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      message: "Job deleted successfully!",
      status: "success",
      error: false,
      task: {
        _id: deletedJob._id,
        title: deletedJob.title,
        description: deletedJob.description,
        salary: deletedJob.salary,
        location: deletedJob.location,
        type: deletedJob.type,
        recId: deletedJob.recId,
      },
    });
};

//--------Get all jobs specifically for the recruiter-------
const getAllRecJobs = async (req, res) => {
  
  let jobs;

  const recId = req.recruiter.recId;
  jobs = await Job.find({recId: recId});

  if(jobs){

  return res.status(200).json({
    status: "success",
    message: "listed all jobs",
    data: jobs,
  });
}
else{
  res.status(404).json({
        status: "failure",
        message: "Jobs not found",
      });
}
};

//--------Get all jobs-------
const getAllJobs = async (req, res) => {
  
  const  jobs = await Job.find();
  if(jobs){

  return res.status(200).json({
    status: "success",
    message: "listed all jobs",
    data: jobs,
  });
}
else{
  res.status(404).json({
        status: "failure",
        message: "Jobs not found",
      });
}
};


//----get job by id----
const getJob = async (req, res) => {
    const jobId = req.params.id;
    const recId = req.recruiter.recId;

    const job = await Job.findById(jobId)

    /*if (job.recId.toString() !== recId) {
      return res.status(403).json({
        message: "You are not authorized to view this Job.",
        status: "failure",
        error: true,
      });
    }*/

  if (job) {
      res.status(200).json({
        status: "success",
        message: "Job found",
        data: job,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message: "Job not found",
      });
    }
};

module.exports = {
    createJob,
    updateJob,
    deleteJob,
    getAllRecJobs,
    getAllJobs,
    getJob
};