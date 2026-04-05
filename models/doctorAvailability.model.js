import mongoose from "mongoose";

const doctorAvailabilitySchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorProfile",
      required: true,
      unique: true,
    },
    // 0 = Sunday, 6 = Saturday
    dayOfWeek: {
      type: Number,
      required: true,
      min: 0,
      max: 6,
    },
    // Format: "10:00", "20:30"
    startTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/, // HH:mm format
    },
    endTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    // Duration in minutes (e.g., 15, 30)
    slotDuration: {
      type: Number,
      required: true,
      min: 5,
      max: 120,
    },
    // break time (like lunch)
    breakStart: {
      type: String,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    breakEnd: {
      type: String,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("DoctorAvailability", doctorAvailabilitySchema);
