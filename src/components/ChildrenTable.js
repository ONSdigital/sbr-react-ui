import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import Button from 'react-bootstrap-button-loader';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { refSearch } from '../actions/ApiActions';

const ChildrenTable = ({ dispatch, data, unitData, name, accessor }) => {
const columns = [
    { Header: name,
      id: 'full',
      accessor: d =>
        (<Button
            bsStyle="link"
            bsSize="xsmall"
            loading={data.currentlySending}
            onClick={() => dispatch(refSearch(d[accessor]))}
          >
          {d[accessor]}
          </Button>),
    },
  ];

  return (
    <ReactTable
      data={unitData}
      columns={columns}
      showPaginationTop={false}
      showPaginationBottom={false}
      defaultPageSize={getPageSize(unitData.length)}
      style={{
        height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
      }}
      className="-highlight"
    />
  );
};

ChildrenTable.propTypes = {
  unitData: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  accessor: PropTypes.string.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch,
  };
}

function getPageSize(noOfItems) {
  if (noOfItems < 10) {
    return 10;
  }
  return noOfItems;
}

export default connect(select)(ChildrenTable);
