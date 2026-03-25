import express from "express";
import routes from "./routes/index.js";
import logger from "./config/logger.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base API Route
app.use("/api", routes);

// Health Check Route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      message: "Welcome to Doctor Appointment Booking API",
    });
});

// 404 Handler Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

//Global Error Handler
app.use((err, req, res, next) => {
  logger.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
