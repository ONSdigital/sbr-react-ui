import React from 'react';
import { connect } from 'react-redux';
import PAYEPanel from '../components/PAYEPanel';
import BreadCrumb from '../components/BreadCrumb';
import { getValueByKey } from '../utils/helperMethods';

const PAYEView = ({ routeParams, data }) => {
  const name = getValueByKey(data[routeParams.index].UnitRecord.vars, 'name1');
  const items = [
    { name: 'Reference Search', link: '/RefSearch' },
    { name: `${data[routeParams.index].UnitRecord.key} [${name}]`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="PAYE View"
        description=""
        marginBottom={1}
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <PAYEPanel
            key={data[routeParams.index].UnitRecord.key}
            paye={data[routeParams.index]}
          />
        </div>
      </div>
    </div>
  );
};

PAYEView.propTypes = {
  data: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch.results,
  };
}

export default connect(select)(PAYEView);
