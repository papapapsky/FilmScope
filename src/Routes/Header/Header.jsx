import { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../MainContext";
import "./header.css";

export const Header = () => {
  const [theme, setTheme] = useContext(MainContext);
  const ChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log(theme);
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
        <label class="switch">
          <input type="checkbox" onChange={ChangeTheme} id="themeToggle" />
          <span class="slider"></span>
        </label>
      </div>
    </header>
  );
};
