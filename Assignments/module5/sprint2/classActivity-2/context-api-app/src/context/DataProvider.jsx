import { createContext, useState } from "react";

//Create->Provide->Consume
export const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
  });
  //Fetch Data
  async function fetchData() {
    setState({ ...state, loading: true });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const result = await res.json();
      setState({ ...state, loading: false, data: result });
    } catch (error) {
      setState({ ...state, loading: false, error: error.message });
    }
  }
  return (
    <DataContext.Provider value={{ state, fetchData }}>
      {children}
    </DataContext.Provider>
  );
}
