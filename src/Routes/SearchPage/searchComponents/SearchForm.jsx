import { useEffect, useState, useRef } from "react";
import { FetchToMovies } from "../../../Fetch/fetchToMovies";
import { RussianDetect } from "../SearchTrubblesFix";
import { Link } from "react-router-dom";
import { SearchInput } from "./SearchInput/SearchInput";

export const SearchForm = ({ register, errors, movieName }) => {
  const [blur, setBlur] = useState("blur");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const timer = useRef(null)
  const apiKey = 'e884f9fc';

  useEffect(() => {
    if (movieName !== "") {
      const hasRussian = /[а-яё]/i;

      let translatedName = movieName;
      if (hasRussian.test(movieName)) {
        translatedName = movieName.split("").map(char => RussianDetect[char] || char).join("");
      }

      setBlur("focus");
      setLoading(true);

      timer.current = setTimeout(() => {
        FetchToMovies(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${translatedName}`
        ).then((data) => {
          if (data.Search) {
            setMovies(data.Search);
          }
          setLoading(false);
        });
      }, 1000);
    } else {
      setBlur("blur");
    }
    
    return () => clearTimeout(timer.current)
  }, [movieName]);

  return (
    <>
      <h1>Найти фильм</h1>
      <SearchInput
        movieName={movieName}
        setBlur={setBlur}
        register={register}
      />
      <div className={`coincidencesMenu ${blur}`}>
        {loading && <h2>Загрузка...</h2>}
        {movies &&
          movies.slice(0, 3).map((value) => (
            <Link to={`/movie/${value.imdbID}`} key={value.imdbID}>
              <button className="coincidencesElem">
                <img className="miniPoster" src={value.Poster} alt="" />
                <div className="Description">
                  <h4>{value.Title}</h4>
                </div>
              </button>
              <hr />
            </Link>
          ))}
      </div>
      <button type="submit">Найти</button>
      {errors.Movie && <h2 className="error">Заполните все поля!</h2>}
    </>
  );
};
