import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be at most 50 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "any.required": "Password is required",
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be at most 50 characters",
  }),
  email: Joi.string().email().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email cannot be empty",
  }),
  password: Joi.string().min(8).messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 8 characters",
  }),
});
