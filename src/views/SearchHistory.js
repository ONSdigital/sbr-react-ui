import React from 'react';
import { PageHeader, Label } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../resources/css/react-bootstrap-table-all.min.css';
import searchHistory from '../utils/addHistory';

function columnClassNameFormat(fieldValue) {
  const condition = (fieldValue >= 200 && fieldValue < 400);
  const style = { fontSize: '15px' };
  const colour = (condition) ?
    (<Label style={style} bsStyle="success">{fieldValue}</Label>) :
    (<Label style={style} bsStyle="danger">{fieldValue}</Label>);
  return colour;
}

function countStatus(history, status) {
  return history.filter(h => h.HTTPCode === status).length;
}

const SearchHistory = function () {
  const history = searchHistory.getSearchHistory();
  const style = {
    labels: {
      marginRight: '20',
    },
    h1: {
      float: 'left',
    },
  };
  return (
    <div>
      <PageHeader>Search History</PageHeader>
      <div style={{ clear: 'both' }}>
        <h3 style={style.h1}><Label bsSize="large" bsStyle="success">200</Label>&nbsp;<Label style={style.labels}>{countStatus(history, 200)}</Label></h3>
        <h3 style={style.h1}><Label bsStyle="danger">404</Label>&nbsp;<Label style={style.labels}>{countStatus(history, 404)}</Label></h3>
        <h3 style={style.h1}><Label bsStyle="warning">500</Label>&nbsp;<Label style={style.labels}>{countStatus(history, 500)}</Label></h3>
        <br /><br /><br /><br />
      </div>
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
