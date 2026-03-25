import express from "express";
import { createUser } from "../../controllers/user.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createUserSchema } from "../../validators/user.validator.js";

const router = express.Router();

router.post("/", validate(createUserSchema), createUser);

export default router;