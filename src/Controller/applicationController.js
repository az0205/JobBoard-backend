const Application = require("../Model/applicationModel");
const Job = require("../Model/jobModel");

//----Adding -----
const createApplication = async (req, res) => {
try{

    console.log("req.file:", req.file); // should show the uploaded file
    console.log("req.body:", req.body); // jobId, skills, etc.
    console.log("req.candidate:", req.candidate);

    const candId = req.candidate.candId;

    const { jobId, skills } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = new Application({
      candidate: candId,
      recruiter: job.recId,
      job: jobId,
      skills,
      resume: req.file ? req.file.path : null,
      status: "Sent"
    });

    const appData = await application.save();

  return res.status(201).json({
    status: "success",
    message: "Application saved successfully",
    data: appData,
  });
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create application" });
  }
};


module.exports = {
    createApplication
};