import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FetchToMovies } from "../../Fetch/fetchToMovies";
import { MovieInfo } from "./MovieInfo";
import "./MovieDetails.css";

export const MovieDetails = () => {
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  const [loading, setLoading] = useState();
  const [findsMovie, setFindsMovie] = useState();
  const [favoriteState, setFavoriteState] = useState("AddToFavorites");

  useEffect(() => {
    if (findsMovie && localStorage.getItem(findsMovie.imdbID)) {
      setFavoriteState("activeFavorite");
    }
  }, [findsMovie]);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
    FetchToMovies(url).then((data) => {
      setFindsMovie(data);
      setLoading(false);
    });
  }, []);

  const AddToFavorite = () => {
    if (!localStorage.getItem(findsMovie.imdbID)) {
      setFavoriteState("activeFavorite");
      localStorage.setItem(findsMovie.imdbID, JSON.stringify(findsMovie));
    } else {
      setFavoriteState("AddToFavorites");
      localStorage.removeItem(findsMovie.imdbID);
    }
  };

  return (
    <>
      {loading && <div className="DetailsLoading"></div>}
      {findsMovie && (
        <div className="MovieDetails">
          <div className="Favorites">
            <h1 className={favoriteState} onClick={AddToFavorite}>
              ★
            </h1>
            <h1>{findsMovie.Title}</h1>
          </div>
          <h2 className="Rating">{findsMovie.imdbRating} / 10 ★</h2>
          <h2> {findsMovie.Year}</h2>
          <img className="Poster" src={findsMovie.Poster} alt="" />
          <h2>Общие сведения:</h2>
          <h2>Описание:</h2>
          <h4 style={{ fontSize: 16 }} className="DetailDesc">
            {findsMovie.Plot}
          </h4>
          <div className="WatchBlock">
            <h3>
              <span className="Black">Смотреть на:</span>
              <a
                target="_blank"
                href={`https://www.imdb.com/title/${findsMovie.imdbID}`}
                className="IMDb"
              >
                IMDb
              </a>
            </h3>
          </div>
          <MovieInfo MovieInfo={findsMovie} />
        </div>
      )}
    </>
  );
};
