import { useEffect, useState } from "react";
import "./Searchpage.css";
import { useForm } from "react-hook-form";
import { FetchToMovies } from "../../Fetch/fetchToMovies";
import { MoviesFilter } from "./searchComponents/MovieFilter";
import { MovieRender } from "../MovieRender";
import { useInput } from "./searchComponents/useInput";
import { ToTop } from "./searchComponents/ToTop";
import { GenreTags } from "./searchComponents/GenreTags";
import { FilterPanel } from "./searchComponents/FilterPanel";
import { SearchForm } from "./searchComponents/SearchForm";
import { PageNavigator } from "./PageNavigator";
import { ModalInfo } from "./searchComponents/ModalWindow/ModalWindow";

export const SearchPage = () => {
  const ApiKey = process.env.REACT_APP_OMDB_API_KEY;
  const inputYear = useInput();

  const [movies, setMovies] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [active, setActive] = useState("disable");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [genres, setGenres] = useState([]);

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

    const url = `http://www.omdbapi.com/?apikey=${ApiKey}&page=${pageNum}&s=${encodeURIComponent(
      name
    )}`;
    setLoading(true);
    setError(false);
    setMovies([]);

    FetchToMovies(url).then((movie) => {
      setAnimation("AnimationsShow");
      if (movie && movie.Search) {
        setMovies(movie.Search);
      } else {
        setError(true);
        setMovies([]);
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

  const handleGenreAdd = (event) => {
    if (!genres.includes(event.target.value)) {
      setGenres([...genres, event.target.value]);
    }
  };

  const handleGenreRemove = (event) => {
    setGenres(genres.filter((item) => item !== event.target.value));
  };

  const fetchFullDetails = async (imdbID) => {
    const url = `http://www.omdbapi.com/?apikey=${ApiKey}&i=${imdbID}`;
    return await FetchToMovies(url);
  };

  useEffect(() => {
    const applyFiltersAsync = async () => {
      let filteredList = movies;

      filteredList = filteredList.filter((item) =>
        MoviesFilter(item, typeFilter)
      );

      if (inputYear.value) {
        filteredList = filteredList.filter(
          (item) => item.Year === inputYear.value
        );
      }

      if (genres.length > 0 && filteredList.length > 0) {
        setAnimation("");
        const fullDetailsPromises = filteredList.map((movie) =>
          fetchFullDetails(movie.imdbID)
        );
        const fullDetailsArray = await Promise.all(fullDetailsPromises);
        filteredList = fullDetailsArray.filter((data) => {
          if (!data.Genre) {
            return false;
          }
          return genres.every((genre) => {
            setAnimation("AnimationsShow");
            const movieGenres = data.Genre.split(", ").map((g) => g.trim());

            return movieGenres.includes(genre);
          });
        });
      }
      setFilteredMovies(filteredList);
    };

    applyFiltersAsync();
  }, [movies, genres, typeFilter, inputYear.value]);

  return (
    <>
      <ModalInfo
        title="asdasd"
        active={active}
        setActive={setActive}
        currentId={currentId}
        filteredMovies={filteredMovies}
      />
      <ToTop />
      <div className="SearchPage">
        <form className="SearchBlock" onSubmit={handleSubmit(onSubmit)}>
          <GenreTags genres={genres} handleGenreRemove={handleGenreRemove} />
          <FilterPanel
            inputYear={inputYear}
            handleTypeChange={handleTypeChange}
            handleGenreAdd={handleGenreAdd}
          />

          <SearchForm errors={errors} register={register} />
        </form>

        <PageNavigator page={page} setPage={setPage} />
        {error && <h2>Не найдено подходящих результатов</h2>}
        {loading && <div className="LoadingIndicator"></div>}

        <div className={`MoviesShow ${animation}`}>
          {filteredMovies.map((val) => (
            <MovieRender
              key={val.imdbID}
              val={val}
              setActive={setActive}
              setCurrentId={setCurrentId}
            />
          ))}
        </div>
      </div>
    </>
  );
};
