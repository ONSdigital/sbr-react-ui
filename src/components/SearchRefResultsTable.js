import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Button, Panel } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { formatResultsTable } from '../utils/helperMethods';
import '../resources/css/react-bootstrap-table-all.min.css';

const SearchRefResultsTable = function ({ results }) {
  function buttonFormatter(cell, row, enumObject, index) {
    const focus = (index === 0);
    let destination;
    switch (row.source) {
      case 'Legal Unit':
        destination = 'LegalUnit';
        break;
      case 'PAYE':
        destination = 'PAYE';
        break;
      case 'VAT':
        destination = 'VAT';
        break;
      default:
        destination = 'Enterprise';
    }
    return (<Button
      aria-label="Go to record button"
      autoFocus={focus}
      onClick={() => {
        browserHistory.push(`/RefSearch/${destination}/${row.id}/${index}`);
      }}
      bsStyle="info"
    >
      Go to record
    </Button>);
  }
  const title = (<h1 style={{ fontSize: '20px' }}>Results</h1>);
  const formattedResults = formatResultsTable(results);
  return (
    <div className="bootstrap-iso">
      <Panel bsStyle="primary" collapsible={false} defaultExpanded header={title}>
        <BootstrapTable
          striped
          hover
          data={formattedResults}
        >
          <TableHeaderColumn dataField="id" width="60" isKey>ID</TableHeaderColumn>
          <TableHeaderColumn dataField="source" width="50">Source</TableHeaderColumn>
          <TableHeaderColumn dataField="name" width="100">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="button" dataFormat={buttonFormatter} width="80">View Record</TableHeaderColumn>
        </BootstrapTable>
      </Panel>
    </div>
  );
};

SearchRefResultsTable.propTypes = {
  results: PropTypes.array.isRequired,
};

export default SearchRefResultsTable;
