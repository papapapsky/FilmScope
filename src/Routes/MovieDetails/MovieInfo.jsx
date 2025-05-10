export const MovieInfo = ({ MovieInfo }) => {
  return (
    <div className="genInfo">
      <h3>
        Дата выхода: <span className="DetailDesc">{MovieInfo.Released}</span>
      </h3>
      <h3>
        Жанры: <span className="DetailDesc">{MovieInfo.Genre}</span>
      </h3>
      <h3>
        Сезонов: <span className="DetailDesc">{MovieInfo.totalSeasons}</span>
      </h3>
      <h3>
        Язык: <span className="DetailDesc">{MovieInfo.Language}</span>
      </h3>
      <h3>
        Режиссер: <span className="DetailDesc">{MovieInfo.Writer}</span>
      </h3>
      <h3>
        Актёры: <span className="DetailDesc">{MovieInfo.Actors}</span>
      </h3>
      <h3>
        Продолжительность:{" "}
        <span className="DetailDesc">{MovieInfo.Runtime}</span>
      </h3>
      <h3 className="Achievements">
        Наград: <span className="DetailDesc">{MovieInfo.Awards}</span>
      </h3>
      <h3 className="Achievements">
        Рейтинги:{" "}
        <span className="DetailDesc">
          {MovieInfo.Ratings.map((val) => (
            <div key={val.IMDbID}>
              {val.Source} - {val.Value}
            </div>
          ))}
        </span>
      </h3>
    </div>
  );
};
