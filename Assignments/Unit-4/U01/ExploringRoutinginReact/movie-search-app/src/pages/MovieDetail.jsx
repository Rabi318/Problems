import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/omdb";
const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError("Movie not found.");
        }
      } catch (error) {
        setError("Failed to fetch movie.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  return (
    <div className="max-w-3xl mx-auto border p-6 shadow">
      <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <img src={movie.Poster} alt={movie.Title} className="w-64 h-auto" />
        <div>
          <p>
            <strong>Year:</strong> {movie.Year}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
