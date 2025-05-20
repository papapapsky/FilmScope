import { useEffect, useContext, useState, act } from "react";
import { MovieRender } from "../MovieRender";
import "./FavoritePage.css";
import { MainContext } from "../../MainContext";
import { ModalInfo } from "../SearchPage/searchComponents/ModalWindow/ModalWindow";

export const FavoritePage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [animation, setAnimation] = useState("");
  const [count, setCount] = useState(localStorage.length);
  const [currentId, setCurrentId] = useState("");
  const [active, setActive] = useState("disable");

  const { modalMovieInfo } = useContext(MainContext);
  const [modalInfo] = modalMovieInfo;

  const [modalContent, setModalContent] = useState();

  useEffect(() => {
    setAnimation("AnimationsShowFavorite");
  }, []);

  useEffect(() => {
    const favorites = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      try {
        const movie = JSON.parse(value);
        if (movie.imdbID) favorites.push(movie);
      } catch (e) {}
    }
    setFavoriteMovies(favorites);
  }, []);
  return (
    <>
      <ModalInfo active={active} setActive={setActive} />
      <h1>Избранные фильмы</h1>
      <div className={`${animation} MoviesShow`}>
        {favoriteMovies &&
          favoriteMovies.map((val) => (
            <MovieRender
              key={val.imdbID}
              val={val}
              setActive={setActive}
              setCurrentId={setCurrentId}
            />
          ))}
        {favoriteMovies.length === 0 && (
          <h4 className="IfNotAdded">
            Пока что вы не добавили ничего в избранное...{" "}
          </h4>
        )}
      </div>
    </>
  );
};
