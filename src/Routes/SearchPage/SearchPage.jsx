import { useEffect, useState } from "react";
import "./Searchpage.css";
import { useForm } from "react-hook-form";
import { FetchToMovies } from "../../Fetch/fetchToMovies";
import { MoviesFilter } from "./searchComponents/MovieFilter";
import { MovieRender } from "../MovieRender";
import { MovieOptions } from "./searchComponents/MovieOptions";
import { useInput } from "./searchComponents/useInput";

export const SearchPage = () => {
  const ApiKey = process.env.REACT_APP_OMDB_API_KEY;
  const inputYear = useInput();
  const [Movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");

  const [animation, setAnimation] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Movies.length > 0) {
      setAnimation("AnimationsShow");
    } else {
      setAnimation("");
    }
  }, [Movies]);

  const url = `http://www.omdbapi.com/?apikey=${ApiKey}&s=`;

  const HandleSubmit = (data) => {
    setLoading(true);
    setMovies([]);
    setError(false);

    FetchToMovies(`${url}${data.Movie}`).then((movie) => {
      if (movie.Search) {
        setMovies(movie.Search);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
      }
    });
  };

  const TypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  return (
    <>
      <div className="SearchPage">
        <form className="SearchBlock" onSubmit={handleSubmit(HandleSubmit)}>
          <div className="Filters">
            <div className="FilterDiv">
              <div className="FilterBlock">
                <label htmlFor="Type">Выберите тип</label>
                <select name="Type" onChange={TypeChange}>
                  <MovieOptions />
                </select>
              </div>
              <div className="FilterBlock">
                <label htmlFor="Year">Год</label>
                <input
                  type="text"
                  {...inputYear}
                  name="Year"
                  className="YearFilter"
                />
              </div>
            </div>
          </div>
          <h1>Найти фильм</h1>
          <input
            type="text"
            {...register("Movie", { required: true })}
            placeholder="Введите название фильма"
          />
          <button type="submit">Найти</button>
          {errors.Movie && <h2 className="error">Заполните все поля!</h2>}
          {loading && <div className="LoadingIndicator"></div>}
          {error && <h2>Не найдено подходящих результатов</h2>}
        </form>
        <div className={`MoviesShow ${animation}`}>
          {Movies.filter((item) => MoviesFilter(item, typeFilter))
            .filter((item) => item.Year === inputYear.value || !inputYear.value)
            .map((val) => (
              <MovieRender key={val.imdbID} val={val} />
            ))}
        </div>
      </div>
    </>
  );
};
