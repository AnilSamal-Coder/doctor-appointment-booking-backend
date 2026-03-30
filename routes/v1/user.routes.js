import express from "express";
import {
    createUser,
    loginUser,
    getUser,
    getAllUsers,
    deleteUser,
} from "../../controllers/user.controller.js"
import { validate } from "../../middlewares/validate.middleware.js";

import { authUser } from "../../middlewares/authUser.middleware.js";

import { createUserSchema } from "../../validators/user.validator.js";

const router = express.Router();

// Signup
router.post("/", validate(createUserSchema), createUser);

// Login
router.post("/login", loginUser);


// Protected routes
router.get("/", authUser, getAllUsers);
router.get("/:id", authUser, getUser);
router.delete("/:id", authUser, deleteUser);

export default router;