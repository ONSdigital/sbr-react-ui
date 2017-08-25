import React from 'react';
import { connect } from 'react-redux';
import CompanyPanel from '../components/CompanyPanel';
import BreadCrumb from '../components/BreadCrumb';
import { getValueByKey } from '../utils/helperMethods';

const CompanyView = ({ routeParams, data }) => {
  const name = getValueByKey(data[routeParams.index].vars, 'companyname');
  const items = [
    { name: 'Reference Search', link: '/RefSearch' },
    { name: `${data[routeParams.index].id} [${name}]`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="Company View"
        description=""
        marginBottom={1}
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <CompanyPanel
            key={data[routeParams.index].id}
            company={data[routeParams.index]}
          />
        </div>
      </div>
    </div>
  );
};

CompanyView.propTypes = {
  data: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch.results,
  };
}

export default connect(select)(CompanyView);
