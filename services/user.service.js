import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user.repository.js";

import bcrypt from "bcrypt";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/httpErrors.js";

/* ===========Auth=========== */

// Create user
export const createUser = async (payload) => {
  // Check if user already exists
  const existingUser = await userRepository.findByEmail(payload.email);
  if (existingUser) {
    throw new BadRequestError(400, "User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  payload.password = await bcrypt.hash(payload.password, salt);

  // Save user
  return await userRepository.create(payload);
};

// Login user
export const loginUser = async (email, password) => {
  const user = await userRepository.findByEmail(email).select("+password");
  if (!user) {
    throw new NotFoundError(404, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError(401, "Invalid credentials");
  }

  //create token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  return { user, token };
};

/* ======== Users ======== */

// Get user by ID
export const getUserById = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new NotFoundError(404, "User not found");
  }
  return user;
};

// Get all users
export const getAllUsers = async () => {
  return await userRepository.findAll();
};

// Delete user
export const deleteUser = async (id) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return await userRepository.deleteUser(id);
};

/* ===================== PROFILE ===================== */

// Get Profile (Logged-in user)
export const getProfile = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

// Update Profile (Logged-in user)
export const updateProfile = async (userId, data, file) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  // If image uploaded
  if (file) {
    data.image = file.path;
  }

  const updatedUser = await userRepository.update(userId, data);

  return updatedUser;
};

export const updateUser = async (id, data) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const updatedUser = await userRepository.update(id, data);

  return updatedUser;
};