export function addToHistory(data) {
  let historyArr = [];
  if (localStorage.length !== 0) {
    historyArr = JSON.parse(localStorage.getItem('searchHistory'));
  }
  historyArr.push({
    query: data.url,
    HTTPCode: data.status,
    timestamp: 'timestamp',
  });
  localStorage.setItem('searchHistory', JSON.stringify(historyArr));
}
