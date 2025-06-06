import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFeedback } from "../features/feedback/feedbackSlice";
import type { FeedbackEntry } from "../features/feedback/types";
import { v4 as uuidv4 } from "uuid";

const FeedbackForm: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: FeedbackEntry = {
      id: uuidv4(),
      name: form.name,
      email: form.email,
      rating: Number(form.rating),
      message: form.message,
      date: new Date().toISOString(),
    };
    dispatch(addFeedback(newFeedback));
    setForm({ name: "", email: "", rating: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 max-w-md mx-auto bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800">Feedback Form</h2>

      <input
        name="name"
        placeholder="Name"
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        type="email"
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.rating}
        onChange={handleChange}
        min={1}
        max={5}
        required
      />

      <textarea
        name="message"
        placeholder="Your feedback"
        className="w-full border border-gray-300 rounded px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.message}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;
