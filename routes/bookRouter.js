import express from "express";
import {
  createBook,
  DeleteBook,
  getALLBooks,
  searchForBook,
  searchForBookById,
  updateBook,
} from "../controllers/bookController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAdmin } from "../middleware/isAdmin.js";

import uploader from "../middleware/uploader.js";

const router = express.Router();
router.get("/searchById/:id", searchForBookById);
router.post(
  "/createBook",
  isAuthenticated,
  uploader.single("image"),
  createBook,
);
router.get("/getAllBooks", getALLBooks);
router.post("/search", searchForBook);
router.put("/update/:id", isAuthenticated, isAdmin, updateBook);
router.delete("/delete/:id", isAuthenticated, isAdmin, DeleteBook);

export default router;
