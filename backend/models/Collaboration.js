import mongoose from "mongoose";

const CollaborationSchema = new mongoose.Schema({
  paper:      { type: mongoose.Schema.Types.ObjectId, ref: "Paper", required: true },
  users:      [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status:     { type: String, enum: ["pending", "active", "completed"], default: "pending" },
  startedAt:  { type: Date, default: Date.now }
});

export default mongoose.model("Collaboration", CollaborationSchema);
