import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Result = () => {
  const { score, questions } = useSelector((state) => state.quiz);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="result-container">
      <h2>Quiz Completed!</h2>
      <p>
        Your Score: {score} / {questions.length} 🎉
      </p>
      <button onClick={handleBack}>Back </button>
    </div>
  );
};
