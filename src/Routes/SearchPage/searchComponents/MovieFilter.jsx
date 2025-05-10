export const MoviesFilter = (item, filter) => {
  if (filter !== "all") {
    return item.Type === filter;
  } else {
    return true;
  }
};
