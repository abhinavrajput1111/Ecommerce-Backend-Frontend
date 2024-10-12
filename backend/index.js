import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import router from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

configDotenv();

const corsOptions = {
  httpOnly: true,
  secure: false,
  origin: "http://localhost:5173",
  credentials: true,
};
const app = express();

// CORS configuration (customize origins as needed)
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    `mongodb+srv://abhinavr1111:${process.env.DB_PASSWORD}@cluster0.e6gx3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(8282, () => {
      console.log("Server started at port 8282");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Simple route
app.use("/", router);
app.use("/api/product", productRouter);
