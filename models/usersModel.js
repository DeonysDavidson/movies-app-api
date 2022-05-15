const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is mandatory"],
    unique: [true, "email already in use"],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "password is mandatory"],
    trim: true,
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "password is mandatory"],
    trim: true,
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "The passwords did not match",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

Users = mongoose.model("Users", userSchema);

module.exports = Users;
