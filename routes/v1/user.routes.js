import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  uploadAvatar,
} from "../../controllers/user.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authUser } from "../../middlewares/authUser.middleware.js";
import { createUserSchema } from "../../validators/user.validator.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/", validate(createUserSchema), createUser);
router.post("/login", loginUser);
router.post("/upload-avatar", upload.single("file"), uploadAvatar);

// Protected routes
router.get("/", authUser, getAllUsers);
router.get("/:id", authUser, getUser);
router.delete("/:id", authUser, deleteUser);

export default router;
