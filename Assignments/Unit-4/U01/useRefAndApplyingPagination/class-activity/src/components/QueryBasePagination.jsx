import React, { useEffect, useState } from "react";

const QueryBasePagination = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  async function fetchPosts() {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}`
    );
    let data = await response.json();
    setPosts(data);
  }
  useEffect(() => {
    fetchPosts();
  }, [page]);
  return (
    <div>
      <h2>Posts (Page: {page})</h2>
      <ul>
        {posts.map((post) => (
          <p key={post.id}>
            ID: {post.id} <span>{post.title}</span>
          </p>
        ))}
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </ul>
    </div>
  );
};

export default QueryBasePagination;
