export const GenreTags = ({ genres, handleGenreRemove }) => {
  return (
    <>
      <h2>Текущие жанры:</h2>
      <div className="Genres">
        {genres.map((val) => (
          <button
            className="genreBtn"
            value={val}
            onClick={(event) => handleGenreRemove(event)}
            type="button"
          >
            {val} ×
          </button>
        ))}
      </div>
    </>
  );
};
