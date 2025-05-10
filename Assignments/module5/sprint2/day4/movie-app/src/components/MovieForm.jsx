import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MovieContext } from "../context/movieContext";

function MovieForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { movies, addMovie, updateMovie } = useContext(MovieContext);

  const [movie, setMovie] = useState({
    image: "",
    title: "",
    description: "",
    releaseYear: "",
  });
  useEffect(() => {
    if (id) {
      const movieToEdit = movies.find((m) => m.id === id);
      if (movieToEdit) setMovie(movieToEdit);
    }
  }, [id, movies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateMovie(id, movie);
    } else {
      addMovie(movie);
    }
    setMovie({
      image: "",
      title: "",
      description: "",
      releaseYear: "",
    });
    navigate("/movies");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 border rounded shadow-md"
    >
      <h2 className="text-xl mb-4">{id ? "Edit Movie" : " Add Movie"}</h2>
      <input
        type="text"
        name="title"
        value={movie.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        name="image"
        value={movie.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        name="releaseYear"
        value={movie.releaseYear}
        onChange={handleChange}
        placeholder="Release Year"
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <textarea
        name="description"
        value={movie.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        {id ? "Update Movie" : "Add Movie"}
      </button>
    </form>
  );
}

export default MovieForm;
