import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function JokeCard() {
  const [joke, setJoke] = useState("");
  const fetchJoke = async () => {
    try {
      const res = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch joke");
      }
      const data = await res.json();
      setJoke(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white text-center">
      <h2 className="text-xl font-semibold mb-4">Random Joke</h2>
      {joke ? (
        <>
          <p className="mb-2 text-gray-800">
            <strong>Setup:</strong> {joke.setup}
          </p>
          <p className="mb-4 text-gray-600">
            <strong>Punchline:</strong> {joke.punchline}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={fetchJoke}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Get Another Joke
      </button>
    </div>
  );
}

export default JokeCard;
