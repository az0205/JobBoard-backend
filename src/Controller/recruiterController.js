const Recruiter = require("../Model/recruiterModel.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();


//--register--
const recruiterRegister = async (req, res) => {

  const { name, email, password, company } = req.body;

  const existingRecruiter = await Recruiter.findOne({ email });

    if (existingRecruiter) {
      return res.status(404).json({
        message: "Recruiter with this email already exists.",
        status: "failure",
        error: true,
      });
    }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const newRecruiter = new Recruiter({
        name,
        email,
        password: hashedPassword,
        company
      });

  await newRecruiter.save();

  return res.status(201).json({
        message: "Recruiter registered successfully!",
        status: "success",
        error: false,
        newRecruiter,
      });
}

//--login--
const recruiterLogin = async (req, res) => {
  const { email, password } = req.body;

  const rec = await Recruiter.findOne({ email });
  if (!rec) {
    return res.status(404).json({
      message: "Recruiter not found.",
      status: "failure",
      error: true,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, rec.password);
  if (!isPasswordValid) {
    return res.status(404).json({
      message: "Invalid password.",
      status: "failure",
      error: true,
    });
  }

  const secret = process.env.SECRET_KEY;
  const token = jwt.sign(
    {
      recId: rec._id,
    },
    secret,
    { expiresIn: "24h" }
  );

  res.status(200).json({
    message: "Login successful!",
    status: "success",
    error: false,
    token,
  });
}

//--delete recruiter--
const deleteRecruiter = async (req, res) => {

    const recId = req.params.id;

    const rec = await Recruiter.findById(recId);
    if (!rec) {
      return res.status(404).json({
        message: "Recruiter not found.",
        status: "failure",
        error: true,
      });
    }

    const deletedRec = await Recruiter.findByIdAndDelete(recId);

    return res.status(200).json({
      message: "Recruiter deleted successfully!",
      status: "success",
      error: false,
      task: {
        _id: deletedRec._id,
        name: deletedRec.name,
        email: deletedRec.email,
        password: deletedRec.password,
        company: deletedRec.company,
      },
    });
};

//--get all recruiters--
const getAll = async (req, res) => {
  const recruiters = await Recruiter.find();

  return res.status(200).json({
    status: "success",
    message: "listed all recruiters",
    data: recruiters,
  });
};

module.exports = {
    recruiterRegister,
    recruiterLogin,
    deleteRecruiter,
    getAll
};