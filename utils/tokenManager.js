import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createToken = (id, email, role, expiresIn) => {
  const payload = { id, email, role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token;
};

export default createToken;
