import React from 'react';
import { connect } from 'react-redux';
import CompanyPanel from '../components/CompanyPanel';
import BreadCrumb from '../components/BreadCrumb';

const CompanyView = ({ routeParams, data }) => {
  const items = [
    { name: 'Enterprise', link: '' },
    { name: `${data[routeParams.index].parents.ENT}`, link: `/Enterprises/${data[routeParams.index].parents.ENT}/0` },
    { name: 'Legal Unit', link: '' },
    { name: `${data[routeParams.index].parents.LEU}`, link: `/LegalUnits/${data[routeParams.index].parents.LEU}/0` },
    { name: 'Company Registration', link: '' },
    { name: `${data[routeParams.index].id}`, link: '' },
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
  data: React.PropTypes.array.isRequired,
  routeParams: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.ch.results,
  };
}

export default connect(select)(CompanyView);
