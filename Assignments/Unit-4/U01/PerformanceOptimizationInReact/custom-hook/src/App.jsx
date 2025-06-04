import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <>
      <div style={{ padding: "20px" }}>
        <LoginForm />
        <hr />
        <ContactForm />
      </div>
    </>
  );
}

export default App;
