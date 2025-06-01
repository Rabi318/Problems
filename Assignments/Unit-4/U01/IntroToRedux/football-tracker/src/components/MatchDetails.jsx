// components/MatchDetails.jsx
import React from "react";

const MatchDetails = ({ match, onClose }) => {
  if (!match) return null;

  // Simulated stats (since API doesn't provide these)
  const fakeStats = {
    goalsTeam1: Math.floor(Math.random() * 5),
    goalsTeam2: Math.floor(Math.random() * 5),
    possessionTeam1: Math.floor(Math.random() * 50 + 50),
    possessionTeam2: 100 - Math.floor(Math.random() * 50 + 50),
    yellowCards: Math.floor(Math.random() * 4),
    redCards: Math.floor(Math.random() * 2),
  };

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}
    >
      <h2>
        {match.team1} vs {match.team2}
      </h2>
      <p>Date: {match.date}</p>
      <p>Venue: {match.venue}</p>

      <h4>Statistics (mocked)</h4>
      <ul>
        <li>
          {match.team1} Goals: {fakeStats.goalsTeam1}
        </li>
        <li>
          {match.team2} Goals: {fakeStats.goalsTeam2}
        </li>
        <li>
          {match.team1} Possession: {fakeStats.possessionTeam1}%
        </li>
        <li>
          {match.team2} Possession: {fakeStats.possessionTeam2}%
        </li>
        <li>Yellow Cards: {fakeStats.yellowCards}</li>
        <li>Red Cards: {fakeStats.redCards}</li>
      </ul>

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MatchDetails;
