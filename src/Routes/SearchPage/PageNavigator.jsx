export const PageNavigator = ({ page, setPage }) => {
  return (
    <>
      <h2 className="PageRouter">
        Страница: <span>{page}</span>
      </h2>
      <div className="Navigator">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>prev</button>
        <button onClick={() => setPage((p) => Math.min(p + 1, 100))}>
          next
        </button>
      </div>
    </>
  );
};
