import mongoose from "mongoose";
import { userModel } from "../Models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateToken } from "../services/generateToken.js";
import cookieParser from "cookie-parser";

export async function registerUser(req, res) {
  try {
    const { firstname, lastname, email, role } = req.body;
    let { password } = req.body;

    // Check if the email already exists
    const checkEmail = await userModel.findOne({ email });

    if (checkEmail) {
      return res.status(409).json({ message: "Email Already Exists" }); // Use 409 for conflict
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const addUser = await new userModel({
      firstname,
      lastname,
      email,
      role,
      password: hashPassword, // Set the hashed password directly
    }).save();

    return res.status(201).json({ message: "User Created successfully" });
  } catch (err) {
    console.error("Error Registering the User:", err);
    return res.status(500).json({ message: "Internal Server Error" }); // Always send an error response
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password, role } = req.body;

    console.log({ email, password, role }); // Debugging: log incoming data

    const checkUser = await userModel.findOne({ email });

    console.log({ checkUser }); // Check if user is found

    if (!checkUser) {
      return res.status(401).json({ message: "Check Your Email" });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    console.log({ checkPassword }); // Check if password matches
    if (!checkPassword) {
      return res.status(401).json({ message: "Your Password is Incorrect!" });
    }

    if (checkUser.role !== role) {
      return res
        .status(401)
        .json({ message: "Ensure you are passing correct role" });
    }

    const token = generateToken(checkUser);

    return res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(201)
      .json({ message: "User Login Successfully", role: role });
  } catch (err) {
    res.status(400).json({ message: "There is some error in Login" });
    console.log(err);
  }
}

export async function adminLogin(req, res) {
  const { email, password, role } = req.body;

  try {
    const checkUser = await userModel.findOne({ email });

    // Check if user exists and verify password
    if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
      return res.status(401).json({
        message: "Invalid credentials. Please check your email and password.",
      });
    }

    // Check role after successful authentication
    if (role !== checkUser.role) {
      return res.status(403).json({ message: "You are not an Admin!" });
    }

    // Successful login
    return res.status(200).json({ message: "Admin login successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function loggedInUser(req, res) {
  try {
    const { user } = req.user;

    return res
      .status(200)
      .json({ message: "user is logged in with valid tokens", user });
  } catch (err) {
    console.log("There is some error", err);

    return res.status(400).json({
      message: "There is no user, or something error in loggedin User API",
    });
  }
}
