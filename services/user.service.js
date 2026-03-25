import * as userRepository from "../repositories/user.repository.js";

export const createUser = async (payload) => {
  return userRepository.create(payload);
};