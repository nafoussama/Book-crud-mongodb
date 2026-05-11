import book from "../models/bookModel.js";
import cloudinary from "../config/cloudinary.js";

export const searchForBook = async (req, res) => {
  try {
    const { title } = req.body;
    const search = await book.findOne({ title: title });
    if (!search) return res.status(404).json({ message: "Book not found" });
    console.log(`user search for a book as title : ${title}`);
    res.status(200).json({ book: search });
  } catch (error) {
    res.status(500).json({
      message: "Something wrong with your request, contact the IT support",
      error: error.message,
    });
  }
};

export const searchForBookById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const search = await book.findOne({ _id: id });
    if (!search) return res.status(404).json({ message: "Book not found" });
    console.log(`user search for a book as id : ${id}`);
    res.status(200).json({ book: search });
  } catch (error) {
    res.status(500).json({
      message: "Something wrong with your request, contact the IT support",
      error: error.message,
    });
  }
};

// export const createBook = async (req, res) => {
//   console.log("body : ", req.body, "file : ", req.file);
//   try {
//     const { title, author, description, price } = req.body;
//     let imageUrl = "";

//     if (req.file) {
//       const result = await cloudinary.uploader.upload_stream(
//         {
//           folder: "books",
//         },
//         async (error, result) => {
//           if (error) throw error;
//           const newBook = await book.create({
//             title,
//             author,
//             description,
//             price,
//             imageURL: result.secure_url,
//           });
//         },
//       );
//       result.end(req.file.buffer);
//     } else {
//       const newBook = await Book.create({
//         title,
//         author,
//         description,
//         price,
//       });
//       return res
//         .status(201)
//         .json({ message: "Book created with no image ✅", newBook });
//       console.log(`user create new book as title : ${title} `);
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: "Something was wrong, contact IT Support",
//       error: err.message,
//     });
//   }
// };

export const createBook = async (req, res) => {
  console.log("body : ", req.body, "file : ", req.file);
  try {
    const { title, author, description, price } = req.body;
    let imageURL = "";
    if (req.file) {
      const dataURI = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "books",
      });
      imageURL = result.secure_url;
    }
    const newBook = await book.create({
      title,
      author,
      description,
      price,
      imageURL,
    });

    return res.status(201).json({ message: "Book created ✅", newBook });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

export const getALLBooks = async (req, res) => {
  try {
    const ALLbooks = await book.find();
    res.status(200).json({ books: ALLbooks });
    console.log(`user request all books`);
  } catch (err) {
    res.status(500).json({
      message: "Something was wrong, contact IT Support",
      error: err.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBook = await book.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    if (!updateBook) return res.status(404).json({ message: "Book not found" });
    console.log(`User update a book that has id : ${id}`);
    res.status(201).json({ message: "Book updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something was wrong, contact IT Support" });
  }
};

export const DeleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await book.findByIdAndDelete(id, {
      returnDocument: "after",
    });
    if (!updateBook) return res.status(404).json({ message: "Book not found" });
    console.log(
      `User delete a book that has id : ${id} , title : ${deletedBook.title}`,
    );
    res.status(201).json({ message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something was wrong, contact IT Support" });
  }
};
