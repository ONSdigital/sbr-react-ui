import React from 'react';
import { connect } from 'react-redux';
import VATPanel from '../components/VATPanel';
import BreadCrumb from '../components/BreadCrumb';
import PanelContainer from '../components/PanelContainer';

const VATView = ({ data, enterprise }) => {
  const items = [
    { name: 'Enterprise', link: '' },
    { name: `${enterprise[0].id}`, link: `/Enterprises/${enterprise[0].id}/0`, unitType: 'ENT' },
    { name: 'Legal Unit', link: '' },
    { name: `${data[0].parents.LEU}`, link: `/LegalUnits/${data[0].parents.LEU}/0`, unitType: 'LEU' },
    { name: 'VAT', link: '' },
    { name: `${data[0].id}`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb breadCrumbItems={items} />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <PanelContainer>
            <VATPanel
              key={data[0].id}
              vat={data[0]}
            />
          </PanelContainer>
        </div>
      </div>
    </div>
  );
};

VATView.propTypes = {
  data: React.PropTypes.array.isRequired,
  enterprise: React.PropTypes.array.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.vat.results,
    enterprise: state.apiSearch.enterprise.results,
  };
}

export default connect(select)(VATView);
