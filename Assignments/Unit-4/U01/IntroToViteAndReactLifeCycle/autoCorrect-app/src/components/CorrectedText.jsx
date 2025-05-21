import React from "react";

function CorrectedText({ text, corrections }) {
  const words = text.split(" ");
  let correctionCount = 0;

  const correctedWords = words.map((word) => {
    const lowerWord = word.toLowerCase();
    if (corrections[lowerWord]) {
      correctionCount++;
      return corrections[lowerWord];
    }
    return word;
  });

  return (
    <div className="mt-4">
      <p className="text-lg text-green-700 font-medium">
        {correctedWords.join(" ")}
      </p>
      <p className="text-sm text-gray-600 mt-1">
        Words corrected: {correctionCount}
      </p>
    </div>
  );
}

export default CorrectedText;
