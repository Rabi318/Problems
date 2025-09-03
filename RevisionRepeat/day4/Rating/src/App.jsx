import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const numberOfStars = 5;

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Stars Row */}
      <div className="flex flex-row space-x-2">
        {Array.from({ length: numberOfStars }, (_, index) => {
          const starValue = index + 1;
          return (
            <svg
              key={starValue}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={starValue <= (hover || rating) ? "gold" : "none"}
              stroke="gray"
              strokeWidth="1.5"
              className="w-8 h-8 cursor-pointer transition-colors duration-200"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499c.267-.753 1.28-.753 1.547 0l2.065 
                5.823a1 1 0 00.95.69h6.126c.798 0 
                1.131 1.021.486 1.49l-4.96 3.61a1 1 
                0 00-.364 1.118l1.89 5.664c.246.737-.61 
                1.345-1.243.892l-5.064-3.68a1 1 0 
                00-1.175 0l-5.064 3.68c-.633.453-1.49-.155-1.243-.892l1.89-5.664a1 
                1 0 00-.364-1.118l-4.96-3.61c-.645-.469-.312-1.49.486-1.49h6.126a1 
                1 0 00.95-.69l2.065-5.823z"
              />
            </svg>
          );
        })}
      </div>

      {/* Rating Display */}
      <p className="text-gray-700 text-lg font-medium">
        {rating
          ? `You rated: ${rating}/${numberOfStars}`
          : "No rating selected"}
      </p>
    </div>
  );
}

export default App;
