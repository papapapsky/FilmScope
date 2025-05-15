import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MainPage } from "./Routes/MainPage/MainPage";
import { SearchPage } from "./Routes/SearchPage/SearchPage";
import { MovieDetails } from "./Routes/MovieDetails/MovieDetails";
import { FavoritePage } from "./Routes/FavoritePage/FavoritePage";
import { MainContextProvider } from "./MainContext";
import { Header } from "./Routes/Header/Header";
import { Content } from "./Content";

function App() {
  return (
    <MainContextProvider>
      <Content>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" index element={<MainPage />} />
            <Route path="/searchMovie" element={<SearchPage />} />
            <Route path="/Favorite" element={<FavoritePage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </Content>
    </MainContextProvider>
  );
}

export default App;
