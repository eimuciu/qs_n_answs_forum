function paramsvalue(search: string) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(search);
}

export default paramsvalue;
