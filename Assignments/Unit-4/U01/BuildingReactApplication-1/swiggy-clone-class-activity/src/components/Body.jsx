import React, { useEffect, useState } from "react";
import { swiggyApi } from "../utils/constant";
import { Filter, Search } from "lucide-react";
import ResturantCard, { withResturantPromotedLabel } from "./ResturantCard";

const Body = () => {
  const [resList, setResList] = useState([]);
  const [filterResList, setFilterResList] = useState([]);
  const [search, setSearch] = useState("");
  const ResturantPromoted = withResturantPromotedLabel(ResturantCard);

  async function fetchData() {
    const data = await fetch(swiggyApi);
    const res = await data.json();
    setResList(
      res.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilterResList(
      res.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">
          Hungry? We got you covered
        </h1>
        <p className="text-gray-600">
          Discouver the best food & drinks in Banalore
        </p>
      </div>
      {/* Search and filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="w-full md:w-1/2 relative">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <div className="pl-4">
              <Search />
            </div>
          </div>
          <input
            type="text"
            className="w-full p-3 text-gray-700 border"
            placeholder="Enter Something"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              const filterRes = resList.filter((ele) =>
                ele.info.name.toLowerCase()
              );
              setFilterResList(filterRes);
            }}
            className="bg-orange-500 text-white px-6 py-3 rounded"
          >
            Search
          </button>
        </div>
      </div>
      <div className="w-full md:w-auto">
        <button
          className="flex items-center gap-2 bg-white  border border-gray-300 font-semibold px-6 py-3 rounded-lg cursor-pointer"
          onClick={() => {
            const filterRes = resList.filter((ele) => ele.info.avgRating > 4);
            setFilterResList(filterRes);
          }}
        >
          <Filter size={16} />
          <span>Top Rated Resturants</span>
        </button>
      </div>
      {/* Resturant Grid */}

      {filterResList.length === 0 ? (
        <p>No Resturants Found</p>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {filterResList.length} Resturants to Explore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filterResList.map((ele) => (
              <Link>{}</Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
