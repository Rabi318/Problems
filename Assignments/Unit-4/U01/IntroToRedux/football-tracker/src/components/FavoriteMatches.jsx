// components/FavoriteMatches.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const FavoriteMatches = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Favorite Matches</h3>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((match, index) => (
          <div key={index}>
            <p>
              {match.team1} vs {match.team2}
            </p>
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_FAVORITE", payload: match })
              }
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoriteMatches;
