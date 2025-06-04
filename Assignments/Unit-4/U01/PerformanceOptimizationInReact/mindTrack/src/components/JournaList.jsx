import React from "react";

const JournalList = ({ logs }) => {
  return (
    <div className="journal-list">
      <h2>Your Journal Entries</h2>
      {logs.length === 0 ? (
        <p>No entries yet. Start journaling today!</p>
      ) : (
        logs.map((log, index) => (
          <div className="journal-entry" key={index}>
            <h4>{log.date}</h4>
            <p>
              <strong>Study:</strong> {log.studyHours} hrs
            </p>
            <p>
              <strong>Sleep:</strong> {log.sleepHours} hrs
            </p>
            <p>
              <strong>Break Time:</strong> {log.breakTime} min
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
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default JournalList;
