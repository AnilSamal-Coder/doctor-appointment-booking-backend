import * as userService from "../services/user.service.js";

// Create User Signup
export const createUser = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await userService.createUser(payload);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
// Login User
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await userService.loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/* ===================== USERS ===================== */

// Get All Users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// Get User by ID
export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file found",
      });
    }

    const user = await userService.uploadAvatar(req.params.id, req.file.buffer);

    return res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/* ========== PROFILES ========== */

//Get Profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Update Profile
export const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(
      req.user.id,
      req.body,
      req.file,
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/* ===================== APPOINTMENTS ===================== */

// Book Appointment
export const bookAppointment = async (req, res, next) => {
  try {
    const appointment = await userService.bookAppointment(
      req.user.id,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Get Appointments
export const listAppointment = async (req, res, next) => {
  try {
    const appointments = await userService.getAppointments(req.user.id);

    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel Appointment
export const cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await userService.cancelAppointment(
      req.params.id,
    );

    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user, 
    });
  } catch (error) {
    next(error);
  }
};
