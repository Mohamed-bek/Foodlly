import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import PlatRouter from "./routes/PlatRouter.js";
import AdminRouter from "./routes/AdminRouter.js";
import cookieParser from "cookie-parser";
import OrderRouter from "./routes/OrderRouter.js";

import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import ReservationRouter from "./routes/ReservationRouter.js";

// Use CORS middleware

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUD_API_NAME,
  api_secret: process.env.CLOUDE_KEY,
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // Enable credentials (cookies) to be sent
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(AdminRouter);
app.use(PlatRouter);
app.use(ReservationRouter);
app.use(OrderRouter);

// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
