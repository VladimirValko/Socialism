import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    coverPicture: {
      type: String,
      default:
        "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
    },
    followers: {
      type: Array,
      default: [],
    },
    followins: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      max: 330,
    },
    hometown: {
      type: String,
    },
    relationship: {
      type: String,
    },
    birthday: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
