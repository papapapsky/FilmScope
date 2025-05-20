import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MainContext } from "../MainContext";

export const MovieRender = ({ val, setActive }) => {
  const { modalMovieInfo } = useContext(MainContext);
  const [modalContent, setModalContent] = modalMovieInfo;

  const AdditionalInfo = (event) => {
    if (event.target.name === "AddInfo") {
      event.preventDefault();
      setActive("active");
      setModalContent(val.imdbID);
    }
  };

  return (
    <Link
      className="MoviePoster"
      key={val.imdbID}
      to={`/movie/${val.imdbID}`}
      id={val.imdbID}
    >
      <h2>{val.Title}</h2>
      <img src={val.Poster} alt="" />
      <h3>Год - {val.Year}</h3>
      <h3>Тип - {val.Type}</h3>
      <button className="Info" name="AddInfo" onClick={AdditionalInfo}>
        Краткая информация
      </button>
      <button className="Info">Полная информации</button>
    </Link>
  );
};
