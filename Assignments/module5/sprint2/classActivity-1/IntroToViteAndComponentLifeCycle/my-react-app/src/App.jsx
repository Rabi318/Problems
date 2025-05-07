import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Middle from "./components/Middle";
import Display from "./components/Display";
import ButtonOne from "./components/ButtonOne";
import ButtonTwo from "./components/ButtonTwo";
function App() {
  const message = "Hello From Parent";
  const [count, setCount] = useState(0);
  const [season, setSeason] = useState("Spring");
  //Mount Phase
  useEffect(() => {
    console.log("Mount Phase");
    return () => {
      console.log("Unmount Phase");
    };
  }, []);
  useEffect(() => {
    console.log(`Update Phase - Season Changed to ${season}`);
  }, []);
  return (
    <>
      {/* <Header />
      <MainContent />
      <Footer /> */}

      {/* Props Drilling */}
      {/* <h1>I am Parent Component</h1>
      <Middle msg={message} /> */}

      {/* State upLifting */}
      {/* <Display count={count} />
      <ButtonOne setCount={setCount} />
      <ButtonTwo setCount={setCount} /> */}

      {/* Component LifeCycle */}
      <h1>Current Season: {season}</h1>
      <button onClick={() => setSeason("Summer")}>Change to Summer</button>
      <button onClick={() => setSeason("Winter")}>Change to Winter</button>
    </>
  );
}

export default App;
