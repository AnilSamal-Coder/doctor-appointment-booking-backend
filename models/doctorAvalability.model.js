import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorProfile",
    },

    dayOfWeek: { type: Number, min: 0, max: 6 },

    startTime: String,
    endTime: String,

    slotDuration: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Availability", availabilitySchema);