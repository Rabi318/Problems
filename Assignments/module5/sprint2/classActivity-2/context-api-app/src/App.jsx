import { createContext, useContext, useState } from "react";
import "./App.css";
import DataComponent from "./components/DataComponent";
import { DataProvider } from "./context/DataProvider";

// const UserContext = createContext(); //step:1 create context

function Box({ children }) {
  return (
    <div style={{ border: "2px solid red", padding: "10px" }}>{children}</div>
  );
}
function App() {
  // const [user, setUser] = useState("John");

  return (
    <>
      {/* <UserContext.Provider value={user}>
        <Parent />
      </UserContext.Provider> */}
      {/* <Box>
        <h1>Hello from react</h1>
      </Box>
      <Box>
        <p>This is a paragraph</p>
      </Box> */}
      <DataProvider>
        <DataComponent />
      </DataProvider>
    </>
  );
}
// function Parent() {
//   return <Child />;
// }
// function Child() {
//   return <GrandChild />;
// }
// function GrandChild() {
//   const user = useContext(UserContext);
//   return <h1>Hello, {user}</h1>;
// }

export default App;
