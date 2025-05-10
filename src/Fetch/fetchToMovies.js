export const FetchToMovies = (url) => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка");
    }

    return response.json();
  });
};
