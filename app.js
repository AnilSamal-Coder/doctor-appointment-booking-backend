import express from "express";
import routes from "./routes/index.js";
import logger from "./config/logger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running",
  });
});

// ROUTES
app.use("/", routes);

// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});


// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
