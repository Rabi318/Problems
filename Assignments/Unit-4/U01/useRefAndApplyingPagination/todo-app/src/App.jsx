import React, { useEffect, useState, useRef } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [paginatedTodos, setPaginatedTodos] = useState([]);
  const currentPageRef = useRef(1);
  const ITEMS_PER_PAGE = 10;

  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setTodos(data);
      paginate(currentPageRef.current, data);
    };

    fetchTodos();
  }, []);

  const paginate = (page, source = todos) => {
    currentPageRef.current = page;
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setPaginatedTodos(source.slice(start, end));
  };

  const nextPage = () => {
    if (currentPageRef.current < totalPages) {
      paginate(currentPageRef.current + 1);
    }
  };

  const prevPage = () => {
    if (currentPageRef.current > 1) {
      paginate(currentPageRef.current - 1);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

      <ul className="mb-6 space-y-2">
        {paginatedTodos.map((todo) => (
          <li
            key={todo.id}
            className="border p-3 rounded shadow-sm flex justify-between items-center"
          >
            <span>{todo.title}</span>
            <span
              className={`text-xs px-2 py-1 rounded ${
                todo.completed
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center gap-2 flex-wrap">
        <button
          onClick={prevPage}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          disabled={currentPageRef.current === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`px-4 py-2 rounded ${
              currentPageRef.current === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={nextPage}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          disabled={currentPageRef.current === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
