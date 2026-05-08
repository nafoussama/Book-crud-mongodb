import express from "express";
import {
  createBook,
  DeleteBook,
  getALLBooks,
  searchForBook,
  searchForBookById,
  updateBook,
} from "../controllers/bookController.js";

import uploader from "../middleware/uploader.js";

const router = express.Router();
router.get("/searchById/:id", searchForBookById);
router.post("/createBook", uploader.single("image"), createBook);
router.get("/getAllBooks", getALLBooks);
router.post("/search", searchForBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", DeleteBook);

export default router;
