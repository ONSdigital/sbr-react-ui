import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import Button from 'react-bootstrap-button-loader';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { getHeight } from '../utils/helperMethods';
import { getSpecificUnitType } from '../actions/ApiActions';

const ChildrenTable = ({ dispatch, data, unitData, name, accessor }) => {
  // Below is an attempt to get sorting working
  // for (let x in unitData) {
  //   unitData[x][accessor] = parseInt(unitData[x][accessor])
  // }
  if (Object.keys(unitData).length === 0 && unitData.constructor === Object) {
    return (<p>Error, no child data available.</p>);
  }

  const columns = [
    {
      Header: name,
      id: 'full',
      accessor: d =>
        (<Button
          bsStyle="link"
          bsSize="xsmall"
          loading={data.currentlySending}
          onClick={() => dispatch(getSpecificUnitType(accessor, d[accessor], true))}
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
      defaultPageSize={unitData.length}
      style={{
        // This will force the table body to overflow and scroll, since there is not enough room
        height: getHeight(unitData.length),
      }}
      defaultSorted={[
        {
          id: 'full',
          desc: true,
        },
      ]}
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

export default connect(select)(ChildrenTable);
