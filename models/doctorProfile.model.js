import { required } from "joi";
import mongoose from "mongoose";
const SPECIALIZATIONS = [
  "General Physician",
  "Gynaecologist",
  "Dermatologist",
  "Paediatrician",
  "Neurologist",
  "Gastroenterologist",
];
const doctorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      enum: SPECIALIZATIONS,
      required: true,
      index: true,
    },
    experienceYears: {
      type: Number,
      required: true,
      min: 0,
    },
    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    clinicAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    state: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    }
  },
  { timestamps: true },
);

export default mongoose.model("DoctorProfile", doctorProfileSchema);
