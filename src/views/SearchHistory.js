import React from 'react';
import { PageHeader } from 'react-bootstrap';
import searchHistory from '../utils/addHistory';

const SearchHistory = function () {
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
  const h = searchHistory.getSearchHistory();
  return (
    <div>
      <PageHeader>Search History</PageHeader>
      <h1>{h}</h1>

      <br />
    </div>
  );
};

export default SearchHistory;
