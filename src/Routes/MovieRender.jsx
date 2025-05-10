import { Link } from "react-router-dom";

export const MovieRender = (val) => {
  return (
    <Link
      className="MoviePoster"
      key={val.val.imdbID}
      to={`/movie/${val.val.imdbID}`}
    >
      <h2>{val.val.Title}</h2>
      <img src={val.val.Poster} alt="" />
      <h3>Год - {val.val.Year}</h3>
      <h3>Тип - {val.val.Type}</h3>
      <button className="Info">Нажмите для дополнительной информации</button>
    </Link>
  );
};
