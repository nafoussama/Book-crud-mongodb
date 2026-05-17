import express from "express";
import dotenv from "dotenv";
import bookRouter from "./routes/bookRouter.js";
import userRouter from "./routes/userRoutes.js";
import mongoose from "mongoose";
import connectionDatabase from "./db/connectionDb.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();
dotenv.config();
app.use(helmet());
app.use(express.json());

app.use(cookieParser(process.env.JWT_SECRET));

// database connection
connectionDatabase();

//Book router
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/user", userRouter);
//User router

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
