import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  createAt: { type: Date, default: Date.now },
  imageURL: String,
});

const book = mongoose.model("book", userSchema);

export default book;
