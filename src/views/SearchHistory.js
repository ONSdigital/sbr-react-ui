import React from 'react';
import { PageHeader, Label } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../resources/css/react-bootstrap-table-all.min.css';
import searchHistory from '../utils/addHistory';

function columnClassNameFormat(fieldValue) {
  const condition = (fieldValue >= 200 && fieldValue < 400);
  const colour = (condition) ? <Label bsStyle="success">{fieldValue}</Label> : <Label bsStyle="danger">{fieldValue}</Label>;
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
        <TableHeaderColumn dataField="HTTPCode" width="110" dataFormat={columnClassNameFormat} dataSort>HTTP Code</TableHeaderColumn>
      </BootstrapTable>
      <br />
    </div>
  );
};

export default SearchHistory;
