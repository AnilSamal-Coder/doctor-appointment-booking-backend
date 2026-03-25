import "dotenv/config";
import app from "./app.js";
import logger from "./config/logger.js";
import connectDB from "./config/mongodb.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async () => {
  await connectDB();
  logger.info(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
