// src/Post.js
import React, { useState, useMemo, useCallback } from "react";

const Post = ({ id, title, body }) => {
  const [verified, setVerified] = useState(false);

  // Memoize background color once per mount
  const backgroundColor = useMemo(() => {
    return `hsl(${Math.random() * 360}, 80%, 85%)`;
  }, []);

  // Memoize toggle function
  const toggleVerified = useCallback(() => {
    setVerified((prev) => !prev);
  }, []);

  return (
    <div
      style={{
        backgroundColor,
        padding: 10,
        margin: "10px 0",
        borderRadius: "8px",
      }}
    >
      <h3>
        #{id}: {title}
      </h3>
      <p>{body}</p>
      <p>Status: {verified ? "✅ Verified" : "❌ Not Verified"}</p>
      <button onClick={toggleVerified}>
        {verified ? "Unverify" : "Verify"}
      </button>
    </div>
  );
};

export default React.memo(Post);
