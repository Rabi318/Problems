import { useRef } from "react";

import "./App.css";

function App() {
  const videoRef = useRef(null);
  const handlePlay = () => {
    videoRef.current.play();
  };
  const handlePause = () => {
    videoRef.current.pause();
  };
  const handleRestart = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };
  return (
    <div>
      <video
        ref={videoRef}
        width="600"
        controls={false}
        style={{ border: "1px solid #ccc", marginBottom: "10px" }}
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
}

export default App;
