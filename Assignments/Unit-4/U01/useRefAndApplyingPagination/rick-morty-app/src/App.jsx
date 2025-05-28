import React, { useEffect, useRef, useState } from "react";

function App() {
  const [characters, setCharacters] = useState([]);
  const [paginatedCharacters, setPaginatedCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const currentPageRef = useRef(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchCharacters = async () => {
      let allCharacters = [];
      let nextPage = "https://rickandmortyapi.com/api/character";

      while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        allCharacters = [...allCharacters, ...data.results];
        nextPage = data.info.next;
      }

      setCharacters(allCharacters);
      setTotalPages(Math.ceil(allCharacters.length / ITEMS_PER_PAGE));
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const start = (currentPageRef.current - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setPaginatedCharacters(characters.slice(start, end));
  }, [characters]);

  const goToPage = (page) => {
    currentPageRef.current = page;
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setPaginatedCharacters(characters.slice(start, end));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Rick and Morty Characters
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {paginatedCharacters.map((char) => (
          <div
            key={char.id}
            className="bg-white rounded-lg shadow-md p-4 text-center"
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="font-semibold">{char.name}</h2>
            <p className="text-sm text-gray-600">
              {char.status} - {char.species}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            defined
            above
            className={`px-4 py-2 rounded ${
              currentPageRef.current === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
