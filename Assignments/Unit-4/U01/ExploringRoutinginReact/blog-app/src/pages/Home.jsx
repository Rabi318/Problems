import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://dummyjson.com/posts").then((res) => {
      setPosts(res.data.posts);
    });
  }, []);
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
      <input
        type="text"
        placeholder="Search by title..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-6 p-2 border border-gray-300 w-full"
      />
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.id} className="mb-6 p-4 border rounded shadow">
            <Link to={`/post/${post.id}`}>
              <h3 className="text-xl font-bold hover:underline">
                {post.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-600">
              {post.body.slice(0, 100)}...
            </p>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Home;
