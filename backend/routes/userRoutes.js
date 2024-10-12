import express from "express";
import {
  loginUser,
  registerUser,
  loggedInUser,
  adminLogin,
} from "../controllers/userControllers.js";

import { authMiddleware } from "../Middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/registerUser", registerUser);
router.post("/loggedInUser", authMiddleware, loggedInUser);

export default router;
