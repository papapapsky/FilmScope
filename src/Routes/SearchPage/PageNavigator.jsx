export const PageNavigator = ({ page, setPage }) => {
  return (
    <>
      <h2 className="PageRouter">Страница:{page}</h2>
      <div className="Navigator">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Предыдущая
        </button>
        <button onClick={() => setPage((p) => Math.min(p + 1, 100))}>
          Следующая
        </button>
      </div>
    </>
  );
};
