import express from "express";
import { login, userSignUp } from "../controllers/userController.js";
import validate from "../middleware/validate.js";
import { UserLoginSchema } from "../validators/userValidator.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", validate(UserLoginSchema), login);

export default router;
