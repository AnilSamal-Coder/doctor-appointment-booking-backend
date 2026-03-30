import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user.repository.js";

import bcrypt from "bcrypt";

// Create user
export const createUser = async (payload) => {
  // Check if user already exists
  const existingUser = await userRepository.findByEmail(payload.email);
  if (existingUser) {
    throw new Error("User already exists");
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
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  //create token
 const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { user, token };
};

// Get user by ID
export const getUserById = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found");
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