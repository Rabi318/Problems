import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Toggle from "./components/Toggle";
import WindowResize from "./components/WindowResize";
import CounterWithPrev from "./components/CounterWithPrev";
import SeachBox from "./components/SeachBox";
import UserList from "./components/UserList";
import ContactForm from "./components/ContactForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <WindowResize />
      <Toggle />
      <CounterWithPrev />
      <SeachBox />
      <UserList />
      <ContactForm />
    </>
  );
}

export default App;
