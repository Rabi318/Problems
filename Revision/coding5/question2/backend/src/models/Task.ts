import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  status: "pending" | "completed";
  order: number;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  order: { type: Number, default: 0 },
});

export default mongoose.model<ITask>("Task", TaskSchema);
