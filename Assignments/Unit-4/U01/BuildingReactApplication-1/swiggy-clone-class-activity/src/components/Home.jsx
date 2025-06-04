import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Section1 from "./Section1";
import Body from "./Body";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="h-screen">
      <Section1 />
      <hr className="border-t-2 border-gray-300 w-[90%] m-auto mt-6" />
      <Body />
    </div>
  );
};

export default Home;
