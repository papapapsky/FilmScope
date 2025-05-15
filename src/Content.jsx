import { useContext, useEffect } from "react";
import { MainContext } from "./MainContext";

export const Content = ({ children }) => {
  const [theme] = useContext(MainContext);

  useEffect(() => {
    document.body.className = theme; // Применяет класс на body
  }, [theme]);

  return <div className="App">{children}</div>;
};
