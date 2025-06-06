import React, { useState } from "react";

interface FeedbackFormState {
  name: string;
  email: string;
  rating: number | "";
  feedback: string;
}

interface SubmissionMessage {
  submitted: boolean;
  message: string;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackFormState>({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });
  const [submission, setSubmission] = useState<SubmissionMessage>({
    submitted: false,
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, rating, feedback } = formData;

    if (!name || !email || !rating || !feedback) {
      setSubmission({
        submitted: false,
        message: "All fields are required",
      });
    }
    setSubmission({
      submitted: true,
      message: "Thank you for your feedback",
    });
    setFormData({
      name: "",
      email: "",
      rating: "",
      feedback: "",
    });
  };
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Customer Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Rating (1-5):</label>
          <br />
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
          />
        </div>

        <div>
          <label>Feedback:</label>
          <br />
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {submission.message && (
        <p
          style={{
            marginTop: "20px",
            color: submission.submitted ? "green" : "red",
          }}
        >
          {submission.message}
        </p>
      )}
    </div>
  );
};

export default FeedbackForm;
