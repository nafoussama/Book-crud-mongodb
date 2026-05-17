import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  price: { type: Number, required: true },
  createAt: { type: Date, default: Date.now },
  imageURL: String,
});

const book = mongoose.model("book", bookSchema);

export default book;
