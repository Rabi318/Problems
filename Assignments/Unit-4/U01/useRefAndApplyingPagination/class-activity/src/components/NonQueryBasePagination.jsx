import React, { useState, useEffect } from "react";

const NonQueryBasePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const postsPerPage = 5;

  async function fetchPosts() {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    let data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <h2>Posts (Page: {currentPage})</h2>
      <ul>
        {currentPosts.map((post) => (
          <p key={post.id}>
            ID: {post.id} <span>{post.title}</span>
          </p>
        ))}
      </ul>
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage >= Math.ceil(posts.length / postsPerPage)}
      >
        Next
      </button>
    </div>
  );
};

export default NonQueryBasePagination;
