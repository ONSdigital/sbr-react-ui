import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Table, Button } from 'react-bootstrap';

const EnterpriseResultsTable = function ({ results }) {
  function getTableRows() {
    const tableRows = results.map((enterprise, index) => {
      // Focus on the first result
      const focus = (index === 0);
      return (
        <tr>
          <td>{enterprise.enterprise}</td>
          <td>{enterprise.source}</td>
          <td>{enterprise.name}</td>
          <td>
            <Button
              autoFocus={focus}
              onClick={() => browserHistory.push(`/Search/${enterprise.enterprise}/${index}`)}
              bsStyle="info"
            >
              Go to record
            </Button>
          </td>
        </tr>
      );
    });
    return tableRows;
  }
  return (
    <Table style={{ width: '75%' }} striped bordered condensed hover>
      <thead>
        <tr>
          <th style={{ width: '120px' }}>ID</th>
          <th style={{ width: '80px' }}>Source</th>
          <th >Name</th>
          <th style={{ width: '120px' }}></th>
        </tr>
      </thead>
      <tbody>
        {getTableRows()}
      </tbody>
    </Table>
  );
};

EnterpriseResultsTable.propTypes = {
  results: PropTypes.array.isRequired,
};

export default EnterpriseResultsTable;
