import React, { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

const FeedbackSummary: React.FC = () => {
  const feedbackContext = useContext(FeedbackContext);
  if (!feedbackContext) return null;
  const { feedbackData } = feedbackContext;

  return (
    <div>
      <h2>Feedback Summary</h2>
      <p>
        <strong>Name:</strong> {feedbackData.name}
      </p>
      <p>
        <strong>Email:</strong> {feedbackData.email}
      </p>
      <p>
        <strong>Rating:</strong> {feedbackData.rating}
      </p>
      <p>
        <strong>Feedback:</strong> {feedbackData.feedback}
      </p>
    </div>
  );
};

export default FeedbackSummary;
