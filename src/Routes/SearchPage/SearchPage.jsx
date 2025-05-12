import { useEffect, useState } from "react";
import "./Searchpage.css";
import { useForm } from "react-hook-form";
import { FetchToMovies } from "../../Fetch/fetchToMovies";
import { MoviesFilter } from "./searchComponents/MovieFilter";
import { MovieRender } from "../MovieRender";
import { MovieOptions } from "./searchComponents/MovieOptions";
import { useInput } from "./searchComponents/useInput";
import { ToTop } from "./searchComponents/ToTop";

export const SearchPage = () => {
  const ApiKey = process.env.REACT_APP_OMDB_API_KEY;
  const inputYear = useInput();

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [animation, setAnimation] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const movieName = watch("Movie");

  useEffect(() => {
    if (movies.length > 0) {
      setAnimation("AnimationsShow");
    } else {
      setAnimation("");
    }
  }, [movies]);

  const fetchMovies = (name, pageNum = 1) => {
    if (!name) return;

    const url = `http://www.omdbapi.com/?apikey=${ApiKey}&page=${pageNum}&s=${name}`;
    setLoading(true);
    setError(false);
    setMovies([]);

    FetchToMovies(url).then((movie) => {
      if (movie.Search) {
        setMovies(movie.Search);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMovies(movieName, page);
  }, [page]);

  const onSubmit = (data) => {
    setPage(1);
    fetchMovies(data.Movie, 1);
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const filteredMovies = movies
    .filter((item) => MoviesFilter(item, typeFilter))
    .filter((item) => item.Year === inputYear.value || !inputYear.value);

  return (
    <>
      <ToTop />
      <div className="SearchPage">
        <form className="SearchBlock" onSubmit={handleSubmit(onSubmit)}>
          <div className="Filters">
            <div className="FilterDiv">
              <div className="FilterBlock">
                <label htmlFor="Type">Выберите тип</label>
                <select name="Type" onChange={handleTypeChange}>
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

        {movies.length > 0 && (
          <>
            <h2 className="PageRouter">
              Страница: <span>{page}</span>
            </h2>
            <div className="Navigator">
              <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                prev
              </button>
              <button onClick={() => setPage((p) => Math.min(p + 1, 100))}>
                next
              </button>
            </div>
          </>
        )}

        <div className={`MoviesShow ${animation}`}>
          {filteredMovies.map((val) => (
            <MovieRender key={val.imdbID} val={val} />
          ))}
        </div>
      </div>
    </>
  );
};
