import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user.repository.js";
import * as mediaService from "./media.service.js";

import bcrypt from "bcrypt";
import { BadRequestError } from "../errors/httpErrors.js";

// Create user
export const createUser = async (payload) => {
  // Check if user already exists
  const existingUser = await userRepository.findByEmail(payload.email);
  if (existingUser) {
    throw new BadRequestError("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  payload.password = await bcrypt.hash(payload.password, salt);

  // Save user
  return await userRepository.create(payload);
};

// Login user
export const loginUser = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError("Invalid credentials");
  }

  //create token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  return { user, token };
};

// Get user by ID
export const getUserById = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

// Get all users
export const getAllUsers = async () => {
  return await userRepository.findAll();
};

// Delete user
export const deleteUser = async (id) => {
  return await userRepository.remove(id);
};

export const uploadAvatar = async (userId, buffer) => {
  const result = await mediaService.uploadImage(buffer, "users");
  // store avatar URL and public ID in user
  // first check public ID exists for user, if yes delete old avatar from cloudinary

  // await mediaService.deleteImage(user.avatarPublicId);

  //const user = await userRepository.updateAvatar(userId, result.secure_url, result.public_id);
  return user;
};
