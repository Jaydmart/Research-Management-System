import mongoose from "mongoose";

const PaperSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  abstract:   { type: String },
  authors:    [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt:  { type: Date, default: Date.now }
});

export default mongoose.model("Paper", PaperSchema);
