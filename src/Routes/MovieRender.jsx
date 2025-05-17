import { Link } from "react-router-dom";

export const MovieRender = ({ val, setActive, setCurrentId }) => {
  const AdditionalInfo = (event) => {
    if (event.target.id === "AddInfo") {
      event.preventDefault();
      const id = event.target.parentElement.id;
      setCurrentId(id);
      setActive("active");
    }
  };
  return (
    <Link
      className="MoviePoster"
      id={val.imdbID}
      key={val.imdbID}
      to={`/movie/${val.imdbID}`}
    >
      <h2>{val.Title}</h2>
      <img src={val.Poster} alt="" />
      <h3>Год - {val.Year}</h3>
      <h3>Тип - {val.Type}</h3>
      <button
        className="Info"
        id="AddInfo"
        onClick={(event) => AdditionalInfo(event)}
      >
        Краткая информация
      </button>
      <button className="Info">Полная информации</button>
    </Link>
  );
};
