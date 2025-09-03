import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageGallery from "./components/ImageGallery";
import useFetch from "./hooks/useFetch";

function App() {
  const { loading, error, data } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      {/* <ImageGallery /> */}
      <div>
        {data?.slice(1, 5).map((post) => (
          <div key={post.id}>
            <li>{post.title}</li>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
