import { useEffect, useState } from "react";
import { MovieRender } from "../MovieRender";
import "./FavoritePage.css";

export const FavoritePage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [animation, setAnimation] = useState("");
  const [count, setCount] = useState(localStorage.length);
  const [currentId, setCurrentId] = useState("");
  const [active, setActive] = useState("disable");

  useEffect(() => {
    setAnimation("AnimationsShowFavorite");
  }, []);

  useEffect(() => {
    if (count > 0) {
      const key = localStorage.key(count - 1);
      const value = localStorage.getItem(key);
      setFavoriteMovies([...favoriteMovies, JSON.parse(value)]);
      setCount(count - 1);
    }
  }, [count]);

  return (
    <>
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
          <h2 className="IfNotAdded">
            Пока что вы не добавили ничего в избранное...{" "}
          </h2>
        )}
      </div>
    </>
  );
};
