import * as userService from "../services/user.service.js";

export const createUser = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await userService.createUser(payload);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
