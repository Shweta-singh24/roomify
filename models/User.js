import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "manager"],
      default: "user",
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    refreshToken: {
      type: [String],
      default: [],
    },
    passwordHash: {
      type: [String],
      required: [true, "password is reqired"],
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("User", userSchema);
