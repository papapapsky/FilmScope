import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../MainContext";
import "./header.css";

export const Header = () => {
  const { themeState } = useContext(MainContext);
  const [theme, setTheme] = themeState;

  const ChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header>
      <Link className="FavoritePage" to="/Favorite">
        Избранное
      </Link>
      <Link className="FavoritePage" to="/searchMovie">
        Найти
      </Link>
      <div className="centerSwitch">
        <label className="switch">
          <input type="checkbox" onChange={ChangeTheme} />
          <span className="slider"></span>
        </label>
      </div>
    </header>
  );
};
