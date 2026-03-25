import mongoose from "mongoose";
import logger from "./logger";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
    });

    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);

    // retry after delay
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;