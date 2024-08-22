const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//!User Registration

const usersController = {
  //!Register
  register: asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    //!Validate
    if (!userName || !email || !password) {
      throw new Error("Please all fields are required");
    }
    //!Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }
    //!Hash the user password password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //!Create user and save into db
    const userCreated = await User.create({
      email: email,
      password: hashedPassword,
      username: userName,
    });

    //!Send response
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  //!Login
  login: asyncHandler(async (req, res) => {
    //!Get the user data
    const { email, password } = req.body;
    //! if email is
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid login details");
    }

    //!Compare the user email and password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid login details");
    }

    //!Generate token
    const token = jwt.sign(
      {
        id: user._id,
      },
      "kanadKey",
      {
        expiresIn: "30d",
      }
    );

    //!Send the response
    res.json({
      message: "Login Successful",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),

  //!Profile
  profile: asyncHandler(async (req, res) => {
    //!Find the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    //!Send the response
    res.json({
      username: user.username,
      email: user.email,
    });
  }),

  //!Update or change password
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    //!Find the user
    const user = await User.findById(req.user);

    if (!user) {
      throw new Error("User not found");
    }

    //!Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    //!Resave
    await user.save({
      validateBeforeSave : false
    });

    //!Send the response
    res.json({
      message: "Password changed successfully",
    });
  }),

  //!Update user profile
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        email,
        username,
      },
      {
        new: true,
      }
    );

    res.json({
      message: "User profile updated successfully",
      updatedUser,
    });
  }),
};

module.exports = usersController;
