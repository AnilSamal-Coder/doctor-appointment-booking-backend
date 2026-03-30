import User from "../models/user.model.js";

// Create user
export const create = async (payload) => {
  return await User.create(payload);
};

// Find user by email
export const findByEmail = async (email) => {
  return await User.findOne({ email });
};

// Find user by ID
export const findById = async (id) => {
  return await User.findById(id);
};

// Get all users
export const findAll = async () => {
  return await User.find();
};

// Delete user
export const remove = async (id) => {
  return await User.findByIdAndDelete(id);
};