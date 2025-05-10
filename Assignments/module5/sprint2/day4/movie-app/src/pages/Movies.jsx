import React, { useContext } from "react";
import { MovieContext } from "../context/movieContext";
import { useNavigate } from "react-router-dom";

function Movies() {
  const { movies, deleteMovie } = useContext(MovieContext);
  const navigate = useNavigate();

  return (
    <div className="mt-8 ml-2.5 mr-2.5">
      <h1 className="text-2xl font-bold mb-6">Movie List</h1>
      {movies.length === 0 ? (
        <p>No movies available</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <div key={movie.id} className="border rounded shadow p-4">
              <img
                src={movie.image}
                alt=""
                className="w-full max-h-60 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{movie.description}</p>
              <p className="text-sm text-gray-500">{movie.releaseYear}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => navigate(`/edit-movie/${movie.id}`)}
                  className="px-3 py-1 text-sm bg-yellow-400 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMovie(movie.id)}
                  className="px-3 py-1 text-sm bg-red-500 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;
