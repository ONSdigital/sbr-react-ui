import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import Button from 'react-bootstrap-button-loader';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { refSearch } from '../actions/ApiActions';

const ChildrenTable = ({ dispatch, data, unitData, name, accessor }) => {
  console.log(unitData)
  const columns = [
    { Header: name, accessor },
    { Header: 'Go to child',
      id: 'full',
      accessor: d =>
        (<span>
          <Button
            bsStyle="primary"
            style={{ width: '100%' }}
            loading={data.currentlySending}
            onClick={() => dispatch(refSearch(d[accessor]))}
          >
              Go to record [{d[accessor]}]
          </Button>
        </span>),
    },
  ];

  return (
    <ReactTable
      data={unitData}
      columns={columns}
      showPagination
      showPaginationTop
      showPaginationBottom
      showPageSizeOptions
      pageSizeOptions={[5, 10, 20, 25, 50, 100]}
      defaultPageSize={5}
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

export default connect(select)(ChildrenTable);
