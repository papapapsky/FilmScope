import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./ModalWindow.css";
import { useEffect, useState } from "react";
import { FetchToMovies } from "../../../../Fetch/fetchToMovies";

export const ModalInfo = ({ ...props }) => {
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  const [info, setInfo] = useState("");
  const id = props.currentId;

  const disableModal = (event) => {
    if (event.target.id === "ModalBackground") {
      props.setActive("disable");
    }
  };

  useEffect(() => {
    FetchToMovies(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`).then(
      (data) => {
        setInfo(data);
      }
    );
  }, [props.currentId]);

  useEffect(() => {
    console.log(info);
  }, [info]);

  return createPortal(
    <div
      className={`ModalBackground ${props.active}`}
      id="ModalBackground"
      onClick={(event) => disableModal(event)}
    >
      <div className="ModalWindow">
        {info && (
          <>
            <h2>
              Краткая информация о фильме <span>{info.Title}</span>:
            </h2>
            <h4>
              Год: <span>{info.Year}</span>
            </h4>
            <h4>
              Тип: <span>{info.Type}</span>
            </h4>
            <h4>
              Оценка imdb: <span>{info.imdbRating}</span>
            </h4>
            <h4>
              Продолжительность: <span>{info.Runtime}</span>
            </h4>
            <h4>
              Язык: <span>{info.Language}</span>
            </h4>
            <h4>
              Всего сезонов: <span>{info.totalSeasons}</span>
            </h4>
            <Link to={`/movie/${id}`}>
              <button>Нажмите для большей информации</button>
            </Link>
          </>
        )}
      </div>
    </div>,
    document.getElementById("ModalWindow")
  );
};
