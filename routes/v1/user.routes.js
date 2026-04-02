import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  uploadAvatar,
  bookAppointment,
  listAppointment,
  cancelAppointment
} from "../../controllers/user.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authUser } from "../../middlewares/authUser.middleware.js";
import { createUserSchema } from "../../validators/user.validator.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/", validate(createUserSchema), createUser);
router.post("/login", loginUser);
router.post("/upload-avatar", upload.single("file"), uploadAvatar);

// ================= PROTECTED ================= //
router.use(authUser);

// ================= PROFILE ================= //
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

// ================= USERS ================= //
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

// Appointment APIs
router.post("/appointment", bookAppointment);
router.get("/appointment", listAppointment);
router.delete("/appointment/:id", cancelAppointment);

export default router;
