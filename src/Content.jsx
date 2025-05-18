import { useContext, useEffect, useState } from "react";
import { MainContext } from "./MainContext";

export const Content = ({ children }) => {
  const { themeState } = useContext(MainContext);
  const [theme] = themeState;

  useEffect(() => {
    document.body.className = theme; // Применяет класс на body
  }, [theme]);

  return <div className="App">{children}</div>;
};
