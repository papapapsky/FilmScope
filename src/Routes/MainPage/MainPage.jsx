import { Link } from "react-router-dom";
import "./MainPage.css";

export const MainPage = () => {
  return (
    <>
      <div className="MainPage">
        <div className="Vertical">
          <h1>FilmScope - Больше, чем поиск кино.</h1>
          <Link to="/searchMovie/">
            <button>Найти кино</button>
          </Link>
        </div>
      </div>
    </>
  );
};
