import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz, incrementScore, nextQuestion } from "../redux/quizActions";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentIndex, score, loading } = useSelector(
    (state) => state.quiz
  );

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  if (loading) return <p>Loading quiz...</p>;

  if (currentIndex >= questions.length) {
    navigate("/result");
    return null;
  }

  const question = questions[currentIndex];

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === question.correctOptionIndex) {
      dispatch(incrementScore());
    }
    dispatch(nextQuestion());
  };

  return (
    <div className="quiz-container">
      <h2>Question {currentIndex + 1}</h2>
      <p>{question.question}</p>
      {question.options.map((option, index) => (
        <button
          key={index}
          className="option-button"
          onClick={() => handleAnswer(index)}
        >
          {option}
        </button>
      ))}
      <br />
      <button className="skip-button" onClick={() => dispatch(nextQuestion())}>
        Skip
      </button>
    </div>
  );
};
