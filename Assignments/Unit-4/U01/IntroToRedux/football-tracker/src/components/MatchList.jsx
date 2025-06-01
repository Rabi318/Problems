// components/MatchList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MatchDetails from "./MatchDetails";

const MatchList = () => {
  const dispatch = useDispatch();
  const { footballMatches, isLoading, isError, searchTerm, filters } =
    useSelector((state) => state);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      dispatch({ type: "FETCH_MATCHES_REQUEST" });
      try {
        const res = await axios.get(
          "https://jsonmock.hackerrank.com/api/football_matches?page=2"
        );
        dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: res.data.data });
      } catch {
        dispatch({ type: "FETCH_MATCHES_FAILURE" });
      }
    };

    fetchMatches();
  }, [dispatch]);

  const filtered = footballMatches
    .filter((m) =>
      `${m.team1} ${m.team2} ${m.venue} ${m.date}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((m) => {
      if (
        filters.team &&
        !(m.team1 === filters.team || m.team2 === filters.team)
      )
        return false;
      if (filters.date && m.date !== filters.date) return false;
      return true;
    });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading matches.</p>;

  return (
    <div>
      {filtered.map((match, index) => (
        <div key={index}>
          <p>
            <strong>
              {match.team1} vs {match.team2}
            </strong>
          </p>
          <p>
            Year: {match.year} | Round: {match.round}
          </p>
          <button
            onClick={() => dispatch({ type: "ADD_FAVORITE", payload: match })}
          >
            Favorite
          </button>
          <button onClick={() => setSelectedMatch(match)}>View Details</button>
        </div>
      ))}

      {selectedMatch && (
        <MatchDetails
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
};

export default MatchList;
