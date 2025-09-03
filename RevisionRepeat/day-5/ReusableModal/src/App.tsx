import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Reusable Modal</h2>
          <p>This is a reusable modal component in React with typescript</p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </Modal>
      </div>
    </>
  );
}

export default App;
