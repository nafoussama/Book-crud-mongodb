import book from "../models/book/bookModel.js";

export const createBook = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title || !price) {
      res
        .status(401)
        .json({ message: "Obligatory fields (title and price) ! " });
    }
    const newBook = await book.create({ title, description, price });
    res
      .status(201)
      .json({ message: "Book created successfully ✅", book: newBook });
  } catch (err) {
    res.status(500).json({
      message: "Something was wrong, contact IT Support",
      error: err.message,
    });
  }
};

export const getALLBooks = async (req, res) => {
  try {
    const ALLbooks = await book.find();
    res.status(200).json({ books: ALLbooks });
  } catch (err) {
    res.status(500).json({
      message: "Something was wrong, contact IT Support",
      error: err.message,
    });
  }
};
