export const SearchInput = ({ movieName, setBlur, register }) => {
  return (
    <input
      autoComplete="off"
      type="text"
      {...register("Movie", {
        required: true,
        onBlur: () => {
          setTimeout(() => {
            setBlur("blur");
          }, 200);
        },
      })}
      onFocus={() => {
        if (movieName !== "") {
          setBlur("focus");
        }
      }}
      placeholder="Введите название фильма"
    />
  );
};
