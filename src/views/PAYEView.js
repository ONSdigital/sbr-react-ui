import React from 'react';
import { connect } from 'react-redux';
import { BreadCrumb } from 'registers-react-library';
import PAYEPanel from '../components/PAYEPanel';
import PanelContainer from '../components/PanelContainer';

const PAYEView = ({ data }) => {
  const items = [
    { name: 'Home', link: '' },
    { name: 'Enterprise', link: '' },
    { name: `${data[0].parents.ENT}`, link: `/Enterprises/${data[0].parents.ENT}/0`, unitType: 'ENT' },
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
};

function select(state) {
  return {
    data: state.apiSearch.paye.results,
  };
}

export default connect(select)(PAYEView);
