import React from "react";
import { base_img } from "../utils/constant";

const ResturantCard = ({ res }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, sla, areaName } =
    res?.info;
  return (
    <div className="resturant-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="relative h-52 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={`${base_img + cloudinaryImageId}`}
          alt=""
        />
        <div className="absolute insert-0 bg-gradient-to-t from-black/70 to-transparent">
          {res?.info?.aggregatedDiscountInfoV3?.header && (
            <div className="absolute bottom-3 left-3 text-white font-bold text-xl">
              {res?.info?.aggregatedDiscountInfoV2?.header}
            </div>
          )}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-xl truncate" title={name}>
          {name}
        </h3>
        <div className="flex items-center mt-1 mb-2">
          <div className="flex items-center gap-1">
            <div className="bg-green-600 text-white p-1 rounded-full w-6 h-6 flex items-center ">
              <span className="">★ </span>
            </div>
            <span className="ml-0.5">{avgRating}</span>
          </div>
          <span>.</span>
          <span className="text-gray-600 font-semibold">{sla.slaString}</span>
        </div>
        <p className="text-gray-600 text-sm truncate">{cuisines.join(", ")}</p>
        <p className="text-gray-500 text-sm mt-1">{areaName}</p>
      </div>
    </div>
  );
};

//HOC for promoted Resturant
export const withResturantPromotedLabel = (ResturantCard) => {
  return (props) => (
    <div className="relative">
      <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 z-10 m-2 rounded text-sm ">
        Promoted
      </div>
      <ResturantCard {...props} />
    </div>
  );
};

export default ResturantCard;
