import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MainPage } from "./Routes/MainPage/MainPage";
import { SearchPage } from "./Routes/SearchPage/SearchPage";
import { MovieDetails } from "./Routes/MovieDetails/MovieDetails";
import { FavoritePage } from "./Routes/FavoritePage/FavoritePage";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link className="FavoritePage" to="/Favorite">
          Избранное
        </Link>
        <Link className="FavoritePage" to="/searchMovie">
          Найти
        </Link>
      </header>
      <Routes>
        <Route path="/" index element={<MainPage />} />
        <Route path="/searchMovie" element={<SearchPage />} />
        <Route path="/Favorite" element={<FavoritePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
