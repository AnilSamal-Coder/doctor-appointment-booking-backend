import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorProfile",
    },

    timeSlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      unique: true,
    },

    appointmentDate: Date,
    startTime: String,
    endTime: String,

    status: {
      type: String,
      enum: ["BOOKED", "CANCELLED", "COMPLETED", "NO_SHOW"],
      default: "BOOKED",
    },

    reason: String,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);