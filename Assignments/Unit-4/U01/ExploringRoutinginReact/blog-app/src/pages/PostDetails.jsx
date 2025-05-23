import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="mb-4">{post.body}</p>
      <div className="mt-4">
        <h4 className="font-semibold">Tags:</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-sm">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
