import React from "react";
import { Link } from "react-router-dom";
const MovieCard = ({ movie }) => {
  console.log(movie);
  return (
    <Link
      key={movie.imdbID}
      to={`/movie/${movie.imdbID}`}
      className="border p-2 rounded shadow hover:bg-gray-100"
    >
      <img
        src={movie.Poster}
        alt={movie.title}
        className="w-full h-64 object-cover mb-2"
      />
      <h2 className="font-semibold">{movie.Title}</h2>
      <p className="text-sm text-gray-600">{movie.Year}</p>
    </Link>
  );
};

export default MovieCard;
