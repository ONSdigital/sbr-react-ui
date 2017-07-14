import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../resources/css/react-bootstrap-table-all.min.css';
import searchHistory from '../utils/addHistory';

function columnClassNameFormat(fieldValue) {
  const condition = (fieldValue >= 200 && fieldValue < 400);
  const colour = (condition) ? 'valid-code' : 'invalid-code';
  return colour;
}

const SearchHistory = function () {
  const h = searchHistory.getSearchHistory();
  return (
    <div>
      <PageHeader>Search History</PageHeader>
      <BootstrapTable
        striped
        data={h}
        pagination
        hover
        exportCSV
        search
      >
        <TableHeaderColumn dataField="timestamp" width="200" dataSort>Time Stamp</TableHeaderColumn>
        <TableHeaderColumn dataField="query" isKey>Query</TableHeaderColumn>
        <TableHeaderColumn dataField="HTTPCode" width="100" columnClassName={columnClassNameFormat}>HTTP Code</TableHeaderColumn>
      </BootstrapTable>
      <br />
    </div>
  );
};

export default SearchHistory;
