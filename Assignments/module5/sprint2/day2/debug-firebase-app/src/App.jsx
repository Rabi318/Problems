import { useState, useEffect } from "react";
import "./App.css";
import { firestore } from "../firebase-config.js";
import { collection, onSnapshot } from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "tasks"),
      (snapshot) => {
        const taskData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskData);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div>
        <h1>Tasks</h1>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
