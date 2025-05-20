import { useEffect, useState } from "react";
import { FetchToMovies } from "../../../Fetch/fetchToMovies";
import { RussianDetect } from "../SearchTrubblesFix";
import { Link } from "react-router-dom";
import { SearchInput } from "./SearchInput/SearchInput";

export const SearchForm = ({ register, errors, movieName }) => {
  const [blur, setBlur] = useState("blur");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  useEffect(() => {
    if (movieName !== "") {
      if (!movieName) return;
      const hasRussian = /[а-яё]/i;

      if (hasRussian.test(movieName)) {
        let Result = "";
        const AdditionalTitle = movieName.split("");

        for (let i = 0; i < AdditionalTitle.length; i++) {
          const letterToSearch = AdditionalTitle[i];
          Result += RussianDetect[letterToSearch];
        }
        movieName = Result;
      }
      setBlur("focus");
      setLoading(true);
      FetchToMovies(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`
      ).then((data) => {
        if (data.Search) {
          setMovies(data.Search);
        }
        setLoading(false);
      });
    } else {
      setBlur("blur");
    }
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
