import React, { useState } from "react";
import CorrectedText from "./CorrectedText";

const AutoCorrect = () => {
  const [inputText, setInputText] = useState("");

  const corrections = {
    teh: "the",
    recieve: "receive",
    adress: "address",
    wierd: "weird",
    thier: "their",
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">AutoCorrect App</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
        rows={4}
      />
      <CorrectedText text={inputText} corrections={corrections} />
    </div>
  );
};

export default AutoCorrect;
