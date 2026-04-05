import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorProfile",
      required: true,
      index: true,
    },
    timeSlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeSlot",
      required: true,
      unique: true, // Prevent double booking
    },
    appointmentDate: {
      type: Date,
      required: true,
      index: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["BOOKED", "CANCELLED", "COMPLETED", "NO_SHOW"],
      default: "BOOKED",
      index: true,
    },
    reason: {
      type: String,
      maxlength: 300,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    cancellationReason: {
      type: String,
      maxlength: 300,
    },
    cancelledBy: {
      type: String,
      enum: ["PATIENT", "DOCTOR", "ADMIN"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Appointment", appointmentSchema);
