import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv(); // Load environment variables

export function generateToken(user) {
  try {
    // Ensure the SECRET is loaded correctly
    if (!process.env.SECRET) {
      throw new Error("JWT Secret is not defined in environment variables");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userEmail: user.email,
        userName: user.firstName,
        isVerified: true,
      },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    console.log("Generated Token:", token); // Log the token for debugging

    return token;
  } catch (err) {
    console.error("Error generating token:", err);
    throw new Error("Token generation failed");
  }
}
