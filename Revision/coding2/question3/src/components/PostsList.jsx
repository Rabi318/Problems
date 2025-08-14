import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/posts/postsSlice.js";

const PostsList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  return (
    <div style={{ padding: "20px" }}>
      <h2>Posts</h2>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p style={{ color: "red" }}>{error}</p>}

      {status === "succeeded" && (
        <>
          <ul>
            {currentItems.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div style={{ marginTop: "20px" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  margin: "0 5px",
                  padding: "5px 10px",
                  background: currentPage === i + 1 ? "blue" : "lightgray",
                  color: currentPage === i + 1 ? "white" : "black",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostsList;
