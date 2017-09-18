import React from 'react';
import { connect } from 'react-redux';
import LegalUnitPanel from '../components/LegalUnitPanel';
import BreadCrumb from '../components/BreadCrumb';
import PanelContainer from '../components/PanelContainer';

const LegalUnitView = ({ data }) => {
  const items = [
    { name: 'Enterprise', link: '' },
    { name: `${data[0].parents.ENT}`, link: `/Enterprises/${data[0].parents.ENT}/0`, unitType: 'ENT' },
    { name: 'Legal Unit', link: '' },
    { name: `${data[0].id}`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="Legal Unit View"
        description=""
        marginBottom={1}
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <PanelContainer>
            <LegalUnitPanel
              key={data[0].id}
              legalUnit={data[0]}
            />
          </PanelContainer>
        </div>
      </div>
    </div>
  );
};

LegalUnitView.propTypes = {
  data: React.PropTypes.array.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.legalUnit.results,
  };
}

export default connect(select)(LegalUnitView);
