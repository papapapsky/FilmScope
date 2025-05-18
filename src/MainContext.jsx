import { createContext, useState } from "react";
export const MainContext = createContext(null);

export const MainContextProvider = ({ children }) => {
  const themeState = useState("dark");
  const modalMovieInfo = useState("");
  return (
    <MainContext.Provider value={{ themeState, modalMovieInfo }}>
      {children}
    </MainContext.Provider>
  );
};
