import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    specialization: String,
    experienceYears: Number,
    consultationFee: Number,
    bio: String,
    clinicAddress: String,
    city: String,
    state: String,
  },
  { timestamps: true }
);

export default mongoose.model("DoctorProfile", doctorProfileSchema);