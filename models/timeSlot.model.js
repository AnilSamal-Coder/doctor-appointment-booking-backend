import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorProfile",
    },

    date: Date,
    startTime: String,
    endTime: String,

    status: {
      type: String,
      enum: ["AVAILABLE", "BOOKED", "BLOCKED"],
      default: "AVAILABLE",
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  },
  { timestamps: true }
);

export default mongoose.model("TimeSlot", timeSlotSchema);