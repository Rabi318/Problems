import React from "react";

const MentorDashboard = ({ studentLogs }) => {
  return (
    <div className="mentor-dashboard">
      <h2>Mentor Dashboard</h2>
      {studentLogs.length === 0 ? (
        <p>No student entries available.</p>
      ) : (
        studentLogs.map((log, index) => (
          <div className="student-entry" key={index}>
            <h4>
              Student #{index + 1} – {log.date}
            </h4>
            <p>
              <strong>Study:</strong> {log.studyHours} hrs
            </p>
            <p>
              <strong>Sleep:</strong> {log.sleepHours} hrs
            </p>
            <p>
              <strong>Stress:</strong> {log.stressLevel}
            </p>
            <p>
              <strong>Focus:</strong> {log.focusLevel}
            </p>
            <p>
              <strong>Reflection:</strong> <em>{log.reflection}</em>
            </p>

            <div className="mentor-actions">
              <label>💬 Positive Comment:</label>
              <input type="text" placeholder="e.g. Great consistency!" />
              <label>🎯 Suggest Focus Area:</label>
              <select>
                <option>Maintain sleep cycle</option>
                <option>Reduce screen time</option>
                <option>Take regular breaks</option>
                <option>Exercise regularly</option>
              </select>
              <button>Send Feedback</button>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default MentorDashboard;
