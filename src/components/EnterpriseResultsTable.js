import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../resources/css/react-bootstrap-table-all.min.css';

const EnterpriseResultsTable = function ({ results }) {
  function buttonFormatter(cell, row, enumObject, index) {
    const focus = (index === 0);
    return (<Button
      autoFocus={focus}
      onClick={() => {
        browserHistory.push(`/Search/${row.enterprise}/${index}`);
      }}
      bsStyle="info"
    >
      Go to record
    </Button>);
  }
  return (
    <BootstrapTable
      striped
      pagination
      hover
      data={results}
    >
      <TableHeaderColumn dataField="enterprise" width="60" isKey>ID</TableHeaderColumn>
      <TableHeaderColumn dataField="source" width="50">Source</TableHeaderColumn>
      <TableHeaderColumn dataField="name" width="100">Name</TableHeaderColumn>
      <TableHeaderColumn dataField="button" dataFormat={buttonFormatter} width="60">Go to Enterprise View</TableHeaderColumn>
    </BootstrapTable>
  );
};

EnterpriseResultsTable.propTypes = {
  results: PropTypes.array.isRequired,
};

export default EnterpriseResultsTable;
