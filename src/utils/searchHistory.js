const formatDate = require('../../server/formatDate.js');

const searchHistory = {
  /**
   * Gets version/lastUpdate info from the UI.
   * @param  {Function} callback Called with returned data.
   */
  addToHistory(data) {
    let historyArr = [];
    const startTime = formatDate(new Date());
    if (localStorage.length !== 0) {
      historyArr = JSON.parse(localStorage.getItem('searchHistory'));
    }
    historyArr.push({
      query: data.url,
      HTTPCode: data.status,
      timestamp: startTime,
    });
    localStorage.setItem('searchHistory', JSON.stringify(historyArr));
  },
  getSearchHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory'));
    return history;
  },
  clearSearchHistory() {
    localStorage.clear();
  },
};

export default searchHistory;
