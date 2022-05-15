const jwt = require("jsonwebtoken");
const Users = require("./../models/usersModel");
const bcrypt = require("bcryptjs");

const tokenGenerator = (payload) => {
  return jwt.sign({ id: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    if (!newUser) throw new Error(`User already exists`);
    const token = tokenGenerator(newUser._id);
    res.cookie("jwt", token, {
      expiresIn: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60
      ),
      httpOnly: true,
    });
    res
      .status(201)
      .json({ status: "success", message: "Signup success", token, newUser });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if email and password is present and get the user
    if (!email || !password)
      return res.status(500).json({
        status: "error",
        message: "please enter the email and password",
      });
    const user = await Users.findOne({ email }).select("+password");
    //if user not present send error
    if (!user)
      return res
        .status(500)
        .json({ status: "error", message: "no user found for this email" });
    //if user present check the password
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      return res
        .status(500)
        .json({ status: "error", message: "incorrect email/password" });

    //if password matches send res and set cookie
    const token = tokenGenerator(user._id);
    res.cookie("jwt", token, {
      expiresIn: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60
      ),
      httpOnly: true,
    });
    res
      .status(200)
      .json({ status: "success", message: "logged in successfully!" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await Users.find();
    res.status(200).json({ status: "success", data });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
