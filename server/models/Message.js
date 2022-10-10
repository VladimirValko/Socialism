import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({}, { timestamps: true });

export default mongoose.model("Message", MessageSchema);
