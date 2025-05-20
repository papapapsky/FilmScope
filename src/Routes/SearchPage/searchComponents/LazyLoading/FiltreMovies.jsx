import { useEffect } from "react";

export const FilteredMoviesHandler = ({
  movies,
  genres,
  typeFilter,
  inputYear,
  fetchFullDetails,
  setFilteredMovies,
  setAnimation,
  windowPos,
  setWindowPos,
  MoviesFilter,
}) => {
  useEffect(() => {
    setWindowPos(window.scrollY);

    const applyFiltersAsync = async () => {
      let filteredList = movies.filter((item) =>
        MoviesFilter(item, typeFilter)
      );

      if (inputYear.value) {
        filteredList = filteredList.filter(
          (item) => item.Year === inputYear.value
        );
      }

      if (genres.length > 0 && filteredList.length > 0) {
        setAnimation("");

        const fullDetailsArray = await Promise.all(
          filteredList.map((movie) => fetchFullDetails(movie.imdbID))
        );

        filteredList = fullDetailsArray.filter((data) => {
          if (!data?.Genre) return false;
          const movieGenres = data.Genre.split(", ").map((g) => g.trim());
          return genres.every((genre) => movieGenres.includes(genre));
        });
        setAnimation("AnimationsShow");
      }

      setFilteredMovies(filteredList);

      setTimeout(() => {
        window.scrollTo({ top: window.scrollY, behavior: "smooth" });
      }, 100);
    };

    applyFiltersAsync();
  }, [movies, genres, typeFilter, inputYear.value]);

  return null; // Этот компонент ничего не рендерит
};
