export const SearchForm = ({ register, errors }) => {
  return (
    <>
      <h1>Найти фильм</h1>
      <input
        type="text"
        {...register("Movie", { required: true })}
        placeholder="Введите название фильма"
      />
      <button type="submit">Найти</button>

      {errors.Movie && <h2 className="error">Заполните все поля!</h2>}
    </>
  );
};
