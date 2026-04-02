import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  uploadAvatar,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/authUser.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema, updateUserSchema } from "../validators/user.validator.js";

const router = express.Router();

router.post("/", validate(createUserSchema), createUser);

router.use(authUser);

router.get("/me", getUser);

router.patch("/me", validate(updateUserSchema), updateUser);

router.post('/me/avatar', upload.single("file"), uploadAvatar);

router.delete("/me", deleteUser);

export default router;
