import React from 'react';
import { connect } from 'react-redux';
import CompanyPanel from '../components/CompanyPanel';
import BreadCrumb from '../components/BreadCrumb';

const CompanyView = ({ routeParams, data }) => {
  const items = [
    { name: 'Enterprise', link: '' },
    { name: `${data[0].parents.ENT}`, link: `/Enterprises/${data[0].parents.ENT}/0`, unitType: 'ENT' },
    { name: 'Legal Unit', link: '' },
    { name: `${data[0].parents.LEU}`, link: `/LegalUnits/${data[0].parents.LEU}/0`, unitType: 'LEU' },
    { name: 'Company Registration', link: '' },
    { name: `${data[0].id}`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb breadCrumbItems={items} />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <CompanyPanel
            key={data[0].id}
            company={data[0]}
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
