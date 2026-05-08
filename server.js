import express from "express";
import dotenv from "dotenv";
import bookRouter from "./routes/bookRouter.js";
import mongoose from "mongoose";
import connectionDatabase from "./db/connectionDb.js";

const app = express();
dotenv.config();
app.use(express.json());

// database connection
connectionDatabase();

//Book router
app.use("/api/v1", bookRouter);
//User router

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
