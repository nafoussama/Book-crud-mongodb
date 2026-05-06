import express from "express";
import dotenv from "dotenv";
import bookRouter from "./routes/bookRouter.js";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDb Connected ✅✅"))
  .catch((err) => console.log("MongoDb not connected ❌❌", err));

//Book router
app.use("/api/v1", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
