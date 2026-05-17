import Joi from "joi";

export const UserLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).max(255).required().messages({
    "string.min": "Password must be at least 10 characters",
    "string.empty": "Password is required",
  }),
});
