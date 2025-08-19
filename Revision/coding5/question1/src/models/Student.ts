import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  age: number;
  course: "Web Dev" | "Data Science" | "App Dev";
}

const studentSchema: Schema = new Schema<IStudent>({
  name: {
    type: String,
    required: [true, "Name is requried"],
    minLength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is requried"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  age: {
    type: Number,
    required: [true, "Age is requried"],
    min: [15, "Age must be at least 18 years old"],
  },
  course: {
    type: String,
    required: [true, "Course is requried"],
    enum: ["Web Dev", "Data Science", "App Dev"],
  },
});

export default mongoose.model<IStudent>("Student", studentSchema);
