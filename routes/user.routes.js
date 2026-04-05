import express from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  getProfile,
  updateProfile,
  uploadAvatar,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  updateUser

} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/authUser.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createUserSchema,
  updateUserSchema,
  loginUserSchema
} from "../validators/user.validator.js";

const router = express.Router();

/* ================= PUBLIC ================= */
router.post("/", validate(createUserSchema), createUser);
router.post("/login", validate(loginUserSchema), loginUser);

/* ================= PROTECTED ================= */
router.use(authUser);

/* ===== PROFILE ===== */
router.get("/profile", getProfile);
router.put("/profile", validate(updateUserSchema), updateProfile);
router.post("/profile/avatar", upload.single("file"), uploadAvatar);
router.delete("/profile", deleteUser);


/* This endpoint not require for user, move to admin routes and also create these method in admin controller and admin service */
/* ===== USERS (ADMIN) ===== */
// router.get("/", getAllUsers);
// router.get("/:id", getUser);
// router.delete("/:id", deleteUser);

/* ===== APPOINTMENTS ===== */
router.post("/appointments", bookAppointment);
router.get("/appointments", listAppointment);
router.delete("/appointments/:id", cancelAppointment);
export default router;


