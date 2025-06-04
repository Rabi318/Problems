import React from "react";

const InsightEngine = ({ logs }) => {
  if (logs.length < 7) {
    return <p>Log at least 7 days to see personalized insights.</p>;
  }

  const avg = (key) =>
    logs.reduce((sum, log) => sum + Number(log[key]), 0) / logs.length;

  const insights = [];

  if (avg("sleepHours") >= 8) {
    insights.push("You focus better after 8+ hours of sleep.");
  }

  if (avg("breakTime") >= 30) {
    insights.push("Longer breaks seem to reduce stress levels.");
  }

  if (avg("stressLevel") <= 4) {
    insights.push("Your stress levels have been well managed!");
  }

  if (avg("focusLevel") >= 7) {
    insights.push("You’ve been maintaining strong focus levels.");
  }

  return (
    <div className="insight-engine">
      <h2>📊 Your Insights</h2>
      <ul>
        {insights.length === 0 ? (
          <li>No specific insights yet. Keep logging!</li>
        ) : (
          insights.map((insight, index) => <li key={index}>{insight}</li>)
        )}
      </ul>
    </div>
  );
};

export default InsightEngine;
