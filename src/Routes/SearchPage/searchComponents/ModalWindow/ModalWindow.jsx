import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./ModalWindow.css";
import { useEffect, useState, useContext } from "react";
import { FetchToMovies } from "../../../../Fetch/fetchToMovies";
import { MainContext } from "../../../../MainContext";

export const ModalInfo = ({ ...props }) => {
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  const [loading, setLoading] = useState(false);
  const { modalMovieInfo } = useContext(MainContext);
  const [modalInfo] = modalMovieInfo;

  const [modalContent, setModalContent] = useState();

  const disableModal = (event) => {
    if (event.target.id === "ModalBackground") {
      props.setActive("disable");
    }
  };

  useEffect(() => {
    if (modalInfo.length > 0) {
      setLoading(true);
      setModalContent();
      FetchToMovies(
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${modalInfo}`
      ).then((data) => {
        setLoading(false);
        setModalContent(data);
      });
    }
  }, [modalInfo]);

  return createPortal(
    <div
      open="open"
      className={`ModalBackground ${props.active}`}
      id="ModalBackground"
      onClick={(event) => disableModal(event)}
    >
      {loading && <div className="LoadingIndicator toCenter"></div>}
      {modalContent && (
        <div className="ModalWindow">
          <>
            <h2>
              Информация о фильме <span>{modalContent.Title}</span>:
            </h2>
            <div className="PosterDiv">
              <img src={modalContent.Poster} alt="" className="MiniPoster" />
            </div>
            <h4>
              Тип: <span>{modalContent.Type}</span>
            </h4>
            <h4>
              Дата выхода: <span>{modalContent.Released}</span>
            </h4>
            <h4>
              Языки: <span>{modalContent.Language}</span>
            </h4>
            <h4>
              Жанры: <span>{modalContent.Genre}</span>
            </h4>
            <h4>
              Рейтинг по imdb: <span>{modalContent.imdbRating}</span>
            </h4>
            <Link to={`/movie/${modalContent.imdbID}`}>
              <button>Посмотреть подробную информацию</button>
            </Link>
          </>
        </div>
      )}
    </div>,
    document.getElementById("ModalWindow")
  );
};
