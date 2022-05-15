const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Users = require("./../models/usersModel");

exports.checkAuth = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const { id } = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET_KEY
      );
      const user = await Users.findById(id);
      if (!user) throw new Error(`User not found, please sign up`);
      next();
    } else {
      throw new Error(`You have to login to perforrm this operation`);
    }
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};
