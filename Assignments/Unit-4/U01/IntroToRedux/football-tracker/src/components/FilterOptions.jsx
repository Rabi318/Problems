// components/FilterOptions.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const FilterOptions = () => {
  const dispatch = useDispatch();
  const [team, setTeam] = useState("");
  const [date, setDate] = useState("");

  const applyFilters = () => {
    dispatch({ type: "SET_FILTERS", payload: { team, date } });
  };

  const resetFilters = () => {
    setTeam("");
    setDate("");
    dispatch({ type: "SET_FILTERS", payload: {} });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Team"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={applyFilters}>Apply</button>
      <button onClick={resetFilters}>Reset</button>
    </div>
  );
};

export default FilterOptions;
