import { useEffect, useRef, useState } from "react";

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
import { SkeletonLoading } from "./searchComponents/SkeletonLoading/SkeletonLoading";
import { RussianDetect } from "./SearchTrubblesFix";
import { FilteredMoviesHandler } from "./searchComponents/LazyLoading/FiltreMovies";

export const SearchPage = () => {
  const moviesContainerRef = useRef(null);

  const ApiKey = process.env.REACT_APP_OMDB_API_KEY;
  const inputYear = useInput();

  const [movies, setMovies] = useState([]);
  const [active, setActive] = useState("disable");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [genres, setGenres] = useState([]);

  const [renderNewMovies, setRenderNewMovies] = useState();
  const [page, setPage] = useState(1);
  const [animation, setAnimation] = useState("");
  const [loading, setLoading] = useState(false);
  const [windowPos, setWindowPos] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const movieName = watch("Movie");
  const [currentMovieName, setCurrentMovieName] = useState("");

  useEffect(() => {
    if (movies.length > 0) {
      setAnimation("AnimationsShow");
    } else {
      setAnimation("");
    }
  }, [movies]);

  const fetchMovies = (name, pageNum = 1) => {
    if (!name) return;
    const hasRussian = /[а-яё]/i;

    if (hasRussian.test(name)) {
      let Result = "";
      const AdditionalTitle = name.split("");

      for (let i = 0; i < AdditionalTitle.length; i++) {
        const letterToSearch = AdditionalTitle[i];
        Result += RussianDetect[letterToSearch];
      }
      name = Result;
      setCurrentMovieName(Result);
    }
    setCurrentMovieName(name);

    const url = `http://www.omdbapi.com/?apikey=${ApiKey}&page=${pageNum}&s=${encodeURIComponent(
      name
    )}`;
    setMovies([]);
    setLoading(true);
    setError(false);

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
    if (filteredMovies.length > 0) {
      const handleScroll = () => {
        const threshold = 100;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollY + windowHeight >= documentHeight - threshold) {
          setRenderNewMovies(true);
        }
      };

      handleScroll();

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [filteredMovies]);
  const [illusionPage, setIllusionPage] = useState(page);

  useEffect(() => {
    if (renderNewMovies) {
      setIllusionPage(illusionPage + 1);
    }
  }, [renderNewMovies]);

  useEffect(() => {
    if (illusionPage > 1) {
      const nextIllusionPage = illusionPage;
      setLoading(true);
      FetchToMovies(
        `http://www.omdbapi.com/?apikey=${ApiKey}&s=${currentMovieName}&page=${nextIllusionPage}`
      ).then((data) => {
        if (data.Search) {
          setMovies([...movies.concat(data.Search)]);
          setRenderNewMovies(false);
        }
        setLoading(false);
      });
    }
  }, [illusionPage]);

  return (
    <>
      <ModalInfo active={active} setActive={setActive} />
      <ToTop />
      <div className="SearchPage">
        <FilteredMoviesHandler
          movies={movies}
          genres={genres}
          typeFilter={typeFilter}
          inputYear={inputYear}
          fetchFullDetails={fetchFullDetails}
          setFilteredMovies={setFilteredMovies}
          setAnimation={setAnimation}
          windowPos={windowPos}
          setWindowPos={setWindowPos}
          MoviesFilter={MoviesFilter}
        />

        <form className="SearchBlock" onSubmit={handleSubmit(onSubmit)}>
          <GenreTags genres={genres} handleGenreRemove={handleGenreRemove} />
          <FilterPanel
            inputYear={inputYear}
            handleTypeChange={handleTypeChange}
            handleGenreAdd={handleGenreAdd}
          />
          <SearchForm
            movieName={movieName}
            errors={errors}
            register={register}
          />
        </form>

        <PageNavigator page={page} setPage={setPage} />
        {error && <h2>Не найдено подходящих результатов</h2>}
        {loading && <SkeletonLoading />}

        <div className={`MoviesShow ${animation}`} ref={moviesContainerRef}>
          {filteredMovies.map((val) => (
            <MovieRender val={val} setActive={setActive} key={val.imdbID} />
          ))}
        </div>
      </div>
    </>
  );
};
