import { createContext, useState } from "react";

export const UserContext = createContext();

const mockUser = {
  name: "Rabinarayan",
  email: "rabi@gmail.com",
};
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
