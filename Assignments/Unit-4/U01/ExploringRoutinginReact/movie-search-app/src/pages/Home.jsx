import React from "react";
import { useState } from "react";
import { searchMovies } from "../api/omdb";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await searchMovies(query);
      if (data.Response === "True") {
        setResults(data.Search);
      } else {
        setError(data.Error || "No results found");
      }
    } catch (error) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex mb-6 gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Search movie title.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        {results.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
