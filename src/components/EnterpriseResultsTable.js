import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Button, Panel } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../resources/css/react-bootstrap-table-all.min.css';

const EnterpriseResultsTable = function ({ results }) {
  function buttonFormatter(cell, row, enumObject, index) {
    const focus = (index === 0);
    return (<Button
      aria-label="Go to record button"
      autoFocus={focus}
      onClick={() => {
        browserHistory.push(`/Search/${row.id}/${index}`);
      }}
      bsStyle="info"
    >
      Go to record
    </Button>);
  }
  const title = (<h1 style={{ fontSize: '20px' }}>Results</h1>);
  return (
    <div className="bootstrap-iso">
      <Panel bsStyle="primary" collapsible={false} defaultExpanded header={title}>
        <BootstrapTable
          striped
          hover
          data={results}
        >
          <TableHeaderColumn dataField="id" width="60" isKey>ID</TableHeaderColumn>
          <TableHeaderColumn dataField="source" width="50">Source</TableHeaderColumn>
          <TableHeaderColumn dataField="name" width="100">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="button" dataFormat={buttonFormatter} width="80">Go to Enterprise View</TableHeaderColumn>
        </BootstrapTable>
      </Panel>
    </div>
  );
};

EnterpriseResultsTable.propTypes = {
  results: PropTypes.array.isRequired,
};

export default EnterpriseResultsTable;
