import { compare, hash } from "bcrypt";
import user from "../models/userModel.js";
import createToken from "../utils/tokenManager.js";

export const userSignUp = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    // * check the field if not empty | testing : passed
    if (!email || !password || !name)
      return res.status(400).json({ message: "You missed required fields !" });
    // * check if the email exist
    const isUserExist = await user.findOne({ email });
    if (isUserExist)
      return res
        .status(401)
        .json({ message: "this email already exist try an other email" });
    // * hash the password
    const hashPassword = await hash(password, 10);
    // * role
    role = role || "user";
    // * create user
    const newUser = await user.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    // * create token
    const token = createToken(
      newUser._id.toString(),
      newUser.email,
      newUser.role,
      "1d",
    );
    // ^ save cookie
    res.cookie("sign-token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "User created successfully ✅", newUser, token });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong ! contact IT support",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // & check for the inputs
    if (!email || !password)
      return res.status(400).json({ message: "Fields obligatory" });
    const userLogin = await user.findOne({ email });
    if (!userLogin)
      return res.status(404).json({ message: "User not found !" });
    // ^ verify the token then save cookie
    const isMatch = await compare(password, userLogin.password);
    if (!isMatch)
      return res.status(404).json({ message: "Invalid credentials" });
    // * create token
    const token = createToken(
      userLogin._id.toString(),
      userLogin.email,
      userLogin.role,
      "1h",
    );
    // * save the user in cookie
    res.cookie("login-token", token, {
      httpOnly: true,
      secure: false,
      domain: "localhost",
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong ! contact IT support",
      error: error.message,
    });
  }
};
