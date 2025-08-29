const Application = require("../Model/applicationModel");
const Job = require("../Model/jobModel");
const Candidate = require("../Model/candidateModel")
const nodemailer = require("nodemailer");

//----Adding -----
const createApplication = async (req, res) => {
try{

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
      status: "Pending"
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

//--getting applications--
const getRecApps = async (req, res) => {
  const recId = req.recruiter.recId;
  const apps = await Application.find({recruiter: recId});

  if(apps){

    return res.status(200).json({
      status: "success",
      message: "listed all applications",
      data: apps,
    });
  }
  else{
  res.status(404).json({
        status: "failure",
        message: "Applications not found",
      });
  }

}

//--get candidate specific applications--
const getCandApps = async (req, res) => {
  const candId = req.candidate.candId;
  const apps = await Application.find({candidate: candId});

  if(apps){

    return res.status(200).json({
      status: "success",
      message: "listed all candidate applications",
      data: apps,
    });
  }
  else{
  res.status(404).json({
        status: "failure",
        message: "Applications not found",
      });
  }

}

//----Updating Application-----
const updateApp = async (req, res) => {
  const appId = req.params.id;
  const recId = req.recruiter.recId;
  const { status } = req.body;

  const app = await Application.findById(appId);

  if (app.recruiter.toString() !== recId) {
    return res.status(403).json({
      message: "You are not authorized to update this application.",
      status: "failure",
      error: true,
    });
  }

  const newApp = await Application.findByIdAndUpdate(appId, { status }, { new: true });

  const cand = await Candidate.findById(app.candidate);
    if (!cand) {
      return res.status(404).json({ message: "Candidate not found" });
    }

  const job = await Job.findById(app.job);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

  if (status == "Accepted"){
    try {
      let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: cand.email,
      subject: "Interview Invitation",
      text: `Hello ${cand.name}, \n\nCongratulations! You have been accepted for your interview at ${job.company} for the position ${job.title}. We will contact you with further information. \n\n Best Regards,\n\n Recruitment Team`
    };

    await transporter.sendMail(mailOptions);
      console.log(` Acceptance email sent to ${cand.email}`);
    }
    catch (err) {
      console.error("Failed to send email: ", err);
    }

    }
    

  if (newApp) {
    const appData = {
        _id: newApp._id,
        candidate: newApp.candidate,
        recruiter: newApp.recruiter,
        job: newApp.job,
        skills: newApp.skills,
        resume: newApp.resume,
        status: newApp.status
    };

    res.status(200).json({
      status: "success",
      message: "Job data updated successfully",
      data: appData,
    });
  } else {
    res.status(400).json({
      message: "Job not found",
      status: "failure",
    });
  }
};


module.exports = {
    createApplication,
    getRecApps,
    getCandApps,
    updateApp,
};