import React, { useEffect, useRef, useState } from "react";
import { base_img, swiggyApi } from "../utils/constant";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Section1 = () => {
  const [resList, setResList] = useState([]);
  const scrollRef = useRef(null);

  async function fetchData() {
    const data = await fetch(swiggyApi);
    const res = await data.json();
    setResList(res.data.cards[0].card.card.gridElements.infoWithStyle.info);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-6 py-4 max-w-[1200px] m-auto">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Whats on your mind?</h2>
        <div>
          <button
            className="w-8 h-8 bg-gray-300 rounded-full shadow-md flex justify-center items-center"
            onClick={() => scroll("left")}
          >
            <ArrowLeft />
          </button>
          <button
            className="w-8 h-8 bg-gray-300 rounded-full shadow-md flex justify-center items-center"
            onClick={() => scroll("right")}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="relative flex items-center bg-gray-100">
        <div
          className="flex overflow-x-auto gap-6 px-12 bg-gray-100"
          ref={scrollRef}
          style={{ scrollbarWidth: "none" }}
        >
          {resList.map((res) => (
            <div
              key={res.id}
              className="bg-gray-100 flex flex-col items-center flex-shrink-0"
            >
              <img
                src={`${base_img}${res.imageId}`}
                alt={res.action.title}
                className="w-40 h-auto mix-blend-multiply"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section1;
