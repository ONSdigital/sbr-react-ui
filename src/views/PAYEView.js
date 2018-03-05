import React from 'react';
import { connect } from 'react-redux';
import PAYEPanel from '../components/PAYEPanel';
import PanelContainer from '../components/PanelContainer';
import BreadCrumb from '../components/BreadCrumb';

const PAYEView = ({ data, enterprise }) => {
  const items = [
    { name: 'Enterprise', link: '' },
    { name: `${enterprise[0].id}`, link: `/Enterprises/${enterprise[0].id}/0`, unitType: 'ENT' },
    { name: 'Legal Unit', link: '' },
    { name: `${data[0].parents.LEU}`, link: `/LegalUnits/${data[0].parents.LEU}/0`, unitType: 'LEU' },
    { name: 'PAYE', link: '' },
    { name: `${data[0].id}`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb breadCrumbItems={items} />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <PanelContainer>
            <PAYEPanel
              key={data[0].id}
              paye={data[0]}
            />
          </PanelContainer>
        </div>
      </div>
    </div>
  );
};

PAYEView.propTypes = {
  data: React.PropTypes.array.isRequired,
  enterprise: React.PropTypes.array.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.paye.results,
    enterprise: state.apiSearch.enterprise.results,
  };
}

export default connect(select)(PAYEView);
