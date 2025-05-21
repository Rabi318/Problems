import { useState } from "react";
import "./App.css";
import ProfileCard from "./components/ProfileCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6">
      <ProfileCard
        name="Rabinarayan"
        age={25}
        bio="Jane is a full-stack developer with a passion for building scalable applications and clean user interfaces. She's currently exploring AI tools and serverless architectures."
      />

      <ProfileCard age={35} />
    </div>
  );
}

export default App;
