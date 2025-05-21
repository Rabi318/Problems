import React, { useEffect, useState } from "react";

const DailyQuote = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://zenquotes.io/api/random");
      const data = await res.json();
      console.log(data);
      setQuote({
        content: data[0].q,
        author: data[0].a,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white max-w-xl w-full p-8 rounded shadow-lg text-center relative">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Daily Quote Generator
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
          </div>
        ) : (
          quote && (
            <>
              <p className="text-lg text-gray-700 mb-4">{quote.content}</p>
              <p className="text-sm text-gray-500 italic">- {quote.author}</p>
            </>
          )
        )}
        <button
          onClick={fetchQuote}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get New Quote"}
        </button>
      </div>
    </div>
  );
};

export default DailyQuote;
