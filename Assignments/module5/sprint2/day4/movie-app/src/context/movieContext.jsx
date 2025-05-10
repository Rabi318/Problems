import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const querySnapshot = await getDocs(collection(db, "movies"));
      const moviesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(moviesArray);
    };
    fetchMovies();
  }, []);

  const addMovie = async (movie) => {
    const docRef = await addDoc(collection(db, "movies"), movie);
    setMovies((prevMovies) => [...prevMovies, { id: docRef.id, ...movie }]);
  };

  const updateMovie = async (id, updatedMovie) => {
    const movieRef = doc(db, "movies", id);
    await updateDoc(movieRef, updatedMovie);
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, ...updatedMovie } : movie
      )
    );
  };
  const deleteMovie = async (id) => {
    const movieRef = doc(db, "movies", id);
    await deleteDoc(movieRef);
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };
  return (
    <MovieContext.Provider
      value={{ movies, addMovie, updateMovie, deleteMovie }}
    >
      {children}
    </MovieContext.Provider>
  );
};
