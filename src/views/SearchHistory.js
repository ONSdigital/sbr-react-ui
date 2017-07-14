import React from 'react';
import { PageHeader } from 'react-bootstrap';

const SearchHistory = function () {
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
  return (
    <div>
      <PageHeader>Search History</PageHeader>
      <p>

      </p>
      <br />
    </div>
  );
};

export default SearchHistory;
