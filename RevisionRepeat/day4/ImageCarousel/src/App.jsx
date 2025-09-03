import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageCarousel from "./components/ImageCarousel";

function App() {
  const images = [
    "https://picsum.photos/id/1015/800/400",
    "https://picsum.photos/id/1016/800/400",
    "https://picsum.photos/id/1018/800/400",
    "https://picsum.photos/id/1020/800/400",
  ];

  return (
    <>
      <div className="p-6">
        <ImageCarousel images={images} />
      </div>
    </>
  );
}

export default App;
