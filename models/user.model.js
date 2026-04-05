import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // hide password by default
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    age: {
      type: Number,
      min: 1,
      max: 120,
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Phone must be 10 digits"],
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      default: "user",
    },


  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
