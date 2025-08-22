const Candidate = require("../Model/candidateModel.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();


//--register--
const candidateRegister = async (req, res) => {

  const { name, email, password } = req.body;

  const existingCandidate = await Candidate.findOne({ email });

    if (existingCandidate) {
      return res.status(404).json({
        message: "Candidate with this email already exists.",
        status: "failure",
        error: true,
      });
    }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const newCandidate = new Candidate({
        name,
        email,
        password: hashedPassword,
      });

  await newCandidate.save();

  return res.status(201).json({
        message: "Candidate registered successfully!",
        status: "success",
        error: false,
        newCandidate,
      });
}

//--login--
const candidateLogin = async (req, res) => {
  const { email, password } = req.body;

  const cand = await Candidate.findOne({ email });
  if (!cand) {
    return res.status(404).json({
      message: "Candidate not found.",
      status: "failure",
      error: true,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, cand.password);
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
      candId: cand._id,
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

module.exports = {
    candidateRegister,
    candidateLogin
};