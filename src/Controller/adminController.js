const Admin = require("../Model/adminModel.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();


//--register--
const adminRegister = async (req, res) => {

  const { email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({
        email,
        password: hashedPassword,
      });

  await newAdmin.save();

  return res.status(201).json({
        message: "Admin registered successfully!",
        status: "success",
        error: false,
        newAdmin,
      });
}

//--login--
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  const isPasswordValid = await bcrypt.compare(password, admin.password);
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
      adminId: admin._id,
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
    adminRegister,
    adminLogin
};