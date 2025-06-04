import React, { useEffect, useState } from "react";
import Post from "./Post";

let postId = 1;

const App = () => {
  const [timer, setTimer] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addPost = () => {
    if (!title || !body) {
      alert("Both Title and Body are required!");
      return;
    }
    const newPost = {
      id: postId++,
      title,
      body,
    };
    setPosts((prev) => [...prev, newPost]);
    setTitle("");
    setBody("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🕒 Timer: {timer}</h1>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Post Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <br />
      <button onClick={addPost}>Add Post</button>

      <div style={{ marginTop: 30 }}>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
