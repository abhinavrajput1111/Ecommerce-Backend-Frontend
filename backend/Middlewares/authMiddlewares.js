import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../Models/userModels.js";

export async function authMiddleware(req, res, next) {
  try {
    const { auth_token } = req.cookie;

    const decoded_token = jwt.verify(auth_token, process.env.SECRET);

    if (!decoded_token) return;

    const loggedInUser = await userModel.findOne({
      email: decoded_token.email,
    });

    if (!loggedInUser) {
      return res.status(401).json({ message: "User not logged in" });
    }

    req.user = loggedInUser;

    next();
  } catch (err) {
    console.log("there is some error", err);
    return res.status(401).json({
      message:
        "No user is logged in, No login token found or some issue from the authMiddleware",
    });
  }
}
