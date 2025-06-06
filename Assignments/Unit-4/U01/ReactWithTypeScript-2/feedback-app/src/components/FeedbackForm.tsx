import React, { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";
import { useNavigate } from "react-router-dom";

const FeedbackForm: React.FC = () => {
  const feedbackContext = useContext(FeedbackContext);
  const navigate = useNavigate();

  if (!feedbackContext) return null;
  const { feedbackData, setFeedbackData } = feedbackContext;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedbackData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, feedback, name, rating } = feedbackData;

    if (!email || !feedback || !name || !rating) {
      alert("All fields are required");
      return;
    }
    navigate("/summary");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Feedback Form</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={feedbackData.name}
        onChange={handleChange}
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={feedbackData.email}
        onChange={handleChange}
      />
      <br />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        min="1"
        max="5"
        value={feedbackData.rating}
        onChange={handleChange}
      />
      <br />
      <textarea
        name="feedback"
        placeholder="Feedback"
        value={feedbackData.feedback}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
