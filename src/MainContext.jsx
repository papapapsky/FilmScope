import { createContext, useState } from "react";
export const MainContext = createContext(null);

export const MainContextProvider = ({ children }) => {
  const themeState = useState("dark"); // [theme, setTheme]
  return (
    <MainContext.Provider value={themeState}>{children}</MainContext.Provider>
  );
};
