import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

export async function generateToken(user) {
  const token = await jwt.sign(
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
  return token;
}
