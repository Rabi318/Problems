import React from "react";

import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskManager from "./pages/TaskManager";

const App: React.FC = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <TaskManager />
      </DndProvider>
    </>
  );
};

export default App;
