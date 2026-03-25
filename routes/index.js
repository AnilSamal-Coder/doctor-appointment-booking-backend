import express from "express";

import userRoutes from "./v1/user.routes.js";

const router = express.Router();

router.use("/v1/users", userRoutes);

router.get("/health", (req, res) => {
  res.json({ success: true, message: "OK" });
});

router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default router;
