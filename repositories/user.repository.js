import User from "../models/user.model.js";

export const create = async (payload) => {
  return User.create(payload);
};
