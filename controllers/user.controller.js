import * as userService from "../services/user.service.js"
// Create User Signup
export const createUser = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await userService.createUser(payload);
    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
// Login User
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await userService.loginUser(email, password);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    //hide password
    user.password = undefined;

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

// Get user by ID
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

// Get all users
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

// Delete user
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