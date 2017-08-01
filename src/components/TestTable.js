import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../resources/css/react-bootstrap-table-all.min.css';
import '../resources/css/bootstrap-iso.css';

class TestTable extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowingModal: false,
    };
  }
  render() {
    const history = [
      {t: 1},
      {t: 2},
    ];
    return (
      <div className="bootstrap-iso" style={{marginBottom:'200px'}}>
        <Button bsSize="large" bsStyle="info">Hello</Button>
        <BootstrapTable
          keyBoardNav
          striped
          data={history}
          hover
        >
          <TableHeaderColumn dataField="t" isKey dataSort>t</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

function select(state) {
  return {
    data: state.apiSearch,
  };
}

export default connect(select)(TestTable);
