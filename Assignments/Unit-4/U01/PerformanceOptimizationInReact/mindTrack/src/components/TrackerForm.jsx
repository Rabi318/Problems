import React, { useState } from "react";

function TrackerForm({ onSubmit }) {
  const [entry, setEntry] = useState({
    studyHours: "",
    breakTime: "",
    sleepHours: "",
    stressLevel: "",
    focusLevel: "",
    reflection: "",
  });

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(entry);
    setEntry({
      studyHours: "",
      breakTime: "",
      sleepHours: "",
      stressLevel: "",
      focusLevel: "",
      reflection: "",
    });
  };

  return (
    <form className="tracker-form" onSubmit={handleSubmit}>
      <h2>Daily Study & Wellness Log</h2>

      <label>Study Hours</label>
      <input
        name="studyHours"
        type="number"
        value={entry.studyHours}
        onChange={handleChange}
        required
      />

      <label>Break Time (minutes)</label>
      <input
        name="breakTime"
        type="number"
        value={entry.breakTime}
        onChange={handleChange}
      />

      <label>Sleep Hours</label>
      <input
        name="sleepHours"
        type="number"
        value={entry.sleepHours}
        onChange={handleChange}
        required
      />

      <label>Stress Level (1-10)</label>
      <input
        name="stressLevel"
        type="number"
        min="1"
        max="10"
        value={entry.stressLevel}
        onChange={handleChange}
      />

      <label>Focus Level (1-10)</label>
      <input
        name="focusLevel"
        type="number"
        min="1"
        max="10"
        value={entry.focusLevel}
        onChange={handleChange}
      />

      <label>Reflection</label>
      <textarea
        name="reflection"
        value={entry.reflection}
        onChange={handleChange}
        placeholder="Write a short reflection (supports markdown)..."
        rows="4"
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default TrackerForm;
