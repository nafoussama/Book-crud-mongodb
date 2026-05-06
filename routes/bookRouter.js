import express from "express";
import { createBook, getALLBooks } from "../controllers/bookController.js";

const router = express.Router();

router.post("/createBook", createBook);
router.get("/getAllBooks", getALLBooks);

export default router;
