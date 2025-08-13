import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Pagination = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = posts.slice(startIndex, startIndex + itemsPerPage);
  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleDropdownChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Posts - Page {currentPage}</h2>
      <ul>
        {currentItems.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* Numbered Pagination */}
        <div>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                style={{
                  margin: "0 5px",
                  padding: "5px 10px",
                  background: currentPage === pageNum ? "#4caf50" : "#ddd",
                  color: currentPage === pageNum ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {pageNum}
              </button>
            )
          )}
        </div>

        {/* Dropdown */}
        <select value={currentPage} onChange={handleDropdownChange}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <option key={pageNum} value={pageNum}>
                Page {pageNum}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
