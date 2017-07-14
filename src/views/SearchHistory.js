import React from 'react';
import { PageHeader, Label, Badge } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../resources/css/react-bootstrap-table-all.min.css';
import searchHistory from '../utils/addHistory';

function columnClassNameFormat(fieldValue) {
  const condition = (fieldValue >= 200 && fieldValue < 400);
  const colour = (condition) ? <Label bsStyle="success">{fieldValue}</Label> : <Label bsStyle="danger">{fieldValue}</Label>;
  return colour;
}

function countStatus(history, status) {
  const count = history.filter(h => h.HTTPCode === status).length;
  return count;
}

const SearchHistory = function () {
  const history = searchHistory.getSearchHistory();
  const style = {
    labels: {
      marginRight: '20',
    },
  };
  return (
    <div>
      <PageHeader>Search History</PageHeader>
      <Label bsStyle="success">200</Label>&nbsp;<Badge style={style.labels}>{countStatus(history, 200)}</Badge>
      <Label bsStyle="danger">404</Label>&nbsp;<Badge style={style.labels}>{countStatus(history, 404)}</Badge>
      <Label bsStyle="warning">500</Label>&nbsp;<Badge style={style.labels}>{countStatus(history, 500)}</Badge>
      <br /><br />
      <BootstrapTable
        striped
        data={history}
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
