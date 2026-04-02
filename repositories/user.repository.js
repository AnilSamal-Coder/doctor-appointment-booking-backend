import User from "../models/user.model.js";

/* ===================== CREATE ===================== */

// Create user
export const create = async (payload) => {
  return await User.create(payload);
};

/* ===================== READ ===================== */

// Find by email
export const findByEmail = (email) => {
  return User.findOne({ email });
};

// Find by ID
export const findById = async (id) => {
  return await User.findById(id);
};

// Get all users
export const findAll = async () => {
  return await User.find();
};

/* ===================== UPDATE ===================== */

// Update user
export const update = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/* ===================== DELETE ===================== */

// Delete user
export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
