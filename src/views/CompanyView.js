import React from 'react';
import { connect } from 'react-redux';
import CompanyPanel from '../components/CompanyPanel';
import PanelContainer from '../components/PanelContainer';
import BreadCrumb from '../components/BreadCrumb';

const CompanyView = ({ data, enterprise }) => {
  const items = [
    { name: 'Enterprise', link: '' },
    { name: `${enterprise[0].id}`, link: `/Enterprises/${enterprise[0].id}/0`, unitType: 'ENT' },
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
          <PanelContainer>
            <CompanyPanel
              key={data[0].id}
              company={data[0]}
            />
          </PanelContainer>
        </div>
      </div>
    </div>
  );
};

CompanyView.propTypes = {
  data: React.PropTypes.array.isRequired,
  enterprise: React.PropTypes.array.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.ch.results,
    enterprise: state.apiSearch.enterprise.results,
  };
}

export default connect(select)(CompanyView);
