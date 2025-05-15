import { MovieOptionsGenre, MovieOptionsType } from "./MovieOptions";

export const FilterPanel = ({
  inputYear,
  handleTypeChange,
  handleGenreAdd,
}) => {
  return (
    <div className="Filters">
      <div className="FilterDiv">
        <div className="FilterBlock">
          <label htmlFor="Type">Выберите тип</label>
          <select name="Type" onChange={handleTypeChange}>
            <MovieOptionsType />
          </select>
        </div>
        <div className="FilterBlock">
          <label htmlFor="Year">Год</label>
          <input
            type="text"
            {...inputYear}
            name="Year"
            className="YearFilter"
          />
        </div>
        <div className="FilterBlock">
          <label htmlFor="Genre">Добавить жанры</label>
          <select name="Genre" onChange={handleGenreAdd}>
            <MovieOptionsGenre />
          </select>
        </div>
      </div>
    </div>
  );
};
