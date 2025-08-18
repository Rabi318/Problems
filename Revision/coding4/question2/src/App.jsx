// App.jsx
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

function App() {
  const [inputs, setInputs] = useState([]);

  // Add root input
  const addInput = () => {
    setInputs((prev) => [...prev, { id: uuid(), value: "", children: [] }]);
  };

  // Recursive helper: add child under parentId
  const addSubInput = (nodes, parentId) => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...node.children, { id: uuid(), value: "", children: [] }],
        };
      }
      return { ...node, children: addSubInput(node.children, parentId) };
    });
  };

  const handleAddSubInput = (parentId) => {
    setInputs((prev) => addSubInput(prev, parentId));
  };

  // Update input value
  const updateValue = (nodes, id, newValue) => {
    return nodes.map((node) => {
      if (node.id === id) return { ...node, value: newValue };
      return { ...node, children: updateValue(node.children, id, newValue) };
    });
  };

  const handleValueChange = (id, newValue) => {
    setInputs((prev) => updateValue(prev, id, newValue));
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={addInput}>➕ Add Input</button>
      <div style={{ marginTop: "20px" }}>
        {inputs.map((node) => (
          <InputNode
            key={node.id}
            node={node}
            onAddSubInput={handleAddSubInput}
            onValueChange={handleValueChange}
          />
        ))}
      </div>
    </div>
  );
}

// Recursive Component
function InputNode({ node, onAddSubInput, onValueChange }) {
  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      <input
        type="text"
        value={node.value}
        onChange={(e) => onValueChange(node.id, e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={() => onAddSubInput(node.id)}>➕ Add Sub Input</button>

      <div style={{ marginTop: "10px" }}>
        {node.children.map((child) => (
          <InputNode
            key={child.id}
            node={child}
            onAddSubInput={onAddSubInput}
            onValueChange={onValueChange}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
