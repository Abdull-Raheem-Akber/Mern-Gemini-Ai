import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

// Internal Files
import UserRoutes from "./routes/user.route.js";
import promptRoutes from "./routes/prompt.route.js";

const app = express();
app.use(helmet());
const port = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Db Connection Code

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Db Connection Succe....");
  })
  .catch((error) => {
    console.log(`Db Error is ${error}`);
  });

app.use("/api/user", UserRoutes);
app.use("/api/deepseek", promptRoutes);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server chal gaya hai on port ${port}`);
  });
}

export default app;
